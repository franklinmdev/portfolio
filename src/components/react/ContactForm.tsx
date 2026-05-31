import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { EMAILJS_CONFIG, isEmailJSConfigured } from "@/lib/email"
import { cn } from "@/lib/utils"
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser"
import { CircleNotchIcon } from "@phosphor-icons/react"
import { useCallback, useState } from "react"

interface ContactTranslations {
  title: string
  subtitle: string
  moduleLabel: string
  channel: string
  namePlaceholder: string
  emailPlaceholder: string
  messagePlaceholder: string
  nameLabel: string
  emailLabel: string
  messageLabel: string
  sendButton: string
  sendingButton: string
  successMessage: string
  errorMessage: string
  nameRequired: string
  emailRequired: string
  emailInvalid: string
  messageRequired: string
}

interface ContactFormProps {
  translations: ContactTranslations
}

export default function ContactForm({ translations }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = translations.nameRequired
    }

    if (!formData.email.trim()) {
      newErrors.email = translations.emailRequired
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = translations.emailInvalid
    }

    if (!formData.message.trim()) {
      newErrors.message = translations.messageRequired
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, translations])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))

      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }))
      }
    },
    [errors]
  )

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault()

      if (!validateForm()) {
        return
      }

      if (!isEmailJSConfigured()) {
        console.error(
          "EmailJS is not properly configured. Check your environment variables."
        )
        setStatus("error")
        return
      }

      setIsSubmitting(true)

      try {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: "Franklin Martinez",
          },
          { publicKey: EMAILJS_CONFIG.publicKey }
        )

        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setErrors({})

        setTimeout(() => {
          setStatus("idle")
        }, 5000)
      } catch (error) {
        if (error instanceof EmailJSResponseStatus) {
          console.error("EmailJS Error:", error)
        } else {
          console.error(error)
        }
        setStatus("error")

        setTimeout(() => {
          setStatus("idle")
        }, 5000)
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, validateForm]
  )

  return (
    <section id="contact" className="scroll-mt-24 py-8 lg:py-12">
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="module-label">{translations.moduleLabel}</span>
        <h2 className="module-title text-foreground mt-3 mb-3">
          {translations.title}
        </h2>
        <p className="text-muted-foreground measure mx-auto text-sm leading-relaxed sm:text-base">
          {translations.subtitle}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="panel mx-auto max-w-2xl p-5 sm:p-6"
      >
        <div className="panel-header text-muted-foreground -mx-5 -mt-5 mb-5 sm:-mx-6 sm:-mt-6">
          <span className="inline-flex items-center gap-2">
            <span className="status-dot" />
            <span>{translations.channel}</span>
          </span>
        </div>

        {status !== "idle" && (
          <div
            role="status"
            aria-live="polite"
            className={cn(
              "mb-4 text-center font-mono text-sm",
              status === "error" ? "text-alert" : "text-primary"
            )}
          >
            {status === "error" ? (
              translations.errorMessage
            ) : (
              <span className="inline-flex items-center">
                <span className="text-muted-foreground mr-1.5 select-none">
                  &gt;
                </span>
                {translations.successMessage}
                <span className="caret" aria-hidden="true" />
              </span>
            )}
          </div>
        )}

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="name" className="sr-only">
              {translations.nameLabel}
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={cn(
                "form-input py-5 md:h-10 md:px-4 md:text-base lg:h-11 lg:px-4",
                errors.name && "!border-alert !ring-alert/20"
              )}
              placeholder={translations.namePlaceholder}
            />
            {errors.name && (
              <p id="name-error" className="text-alert mt-1 text-sm">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="email" className="sr-only">
              {translations.emailLabel}
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={cn(
                "form-input py-5 md:h-10 md:px-4 md:text-base lg:h-11 lg:px-4",
                errors.email && "!border-alert !ring-alert/20"
              )}
              placeholder={translations.emailPlaceholder}
            />
            {errors.email && (
              <p id="email-error" className="text-alert mt-1 text-sm">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="message" className="sr-only">
            {translations.messageLabel}
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(
              "form-textarea pt-3 md:min-h-24 md:px-4 md:text-base lg:min-h-28 lg:px-4",
              errors.message && "!border-alert !ring-alert/20"
            )}
            placeholder={translations.messagePlaceholder}
          />
          {errors.message && (
            <p id="message-error" className="text-alert mt-1 text-sm">
              {errors.message}
            </p>
          )}
        </div>

        <div className="text-center">
          <Button
            type="submit"
            variant="ghostDark"
            size="full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <CircleNotchIcon
                  className="size-4 animate-spin"
                  weight="bold"
                />
                {translations.sendingButton}
              </div>
            ) : (
              translations.sendButton
            )}
          </Button>
        </div>
      </form>
    </section>
  )
}
