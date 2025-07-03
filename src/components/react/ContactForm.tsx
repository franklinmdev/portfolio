import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { EMAILJS_CONFIG, isEmailJSConfigured } from "@/lib/email"
import { cn } from "@/lib/utils"
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser"
import { Loader2 } from "lucide-react"
import { useCallback, useState } from "react"

interface ContactTranslations {
  title: string
  subtitle: string
  namePlaceholder: string
  emailPlaceholder: string
  messagePlaceholder: string
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
  const [result, setResult] = useState("")

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
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!validateForm()) {
        return
      }

      if (!isEmailJSConfigured()) {
        console.error(
          "EmailJS is not properly configured. Check your environment variables."
        )
        setResult(translations.errorMessage)
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

        setResult(translations.successMessage)
        setFormData({ name: "", email: "", message: "" })
        setErrors({})

        setTimeout(() => {
          setResult("")
        }, 5000)
      } catch (error) {
        if (error instanceof EmailJSResponseStatus) {
          console.error("EmailJS Error:", error)
        } else {
          console.error(error)
        }
        setResult(translations.errorMessage)

        setTimeout(() => {
          setResult("")
        }, 5000)
      } finally {
        setIsSubmitting(false)
      }
    },
    [
      formData,
      translations.errorMessage,
      translations.successMessage,
      validateForm,
    ]
  )

  return (
    <section id="contact" className="scroll-mt-24 py-8 lg:py-12">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-zinc-100">
          {translations.title}
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          {translations.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-2xl">
        {result && (
          <div
            role="status"
            aria-live="polite"
            className={cn(
              "mb-4 text-center text-sm",
              result.includes("error") || result.includes("Sorry")
                ? "text-red-400"
                : "text-green-400"
            )}
          >
            {result}
          </div>
        )}

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="name" className="sr-only">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={cn(
                "form-input md:h-10 md:px-4 md:py-2 md:text-base lg:h-11 lg:px-4 lg:py-3",
                errors.name && "!border-red-500 !ring-red-500/20"
              )}
              placeholder={translations.namePlaceholder}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={cn(
                "form-input md:h-10 md:px-4 md:py-2 md:text-base lg:h-11 lg:px-4 lg:py-3",
                errors.email && "!border-red-500 !ring-red-500/20"
              )}
              placeholder={translations.emailPlaceholder}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className={cn(
              "form-textarea md:min-h-24 md:px-4 md:py-2 md:text-base lg:min-h-28 lg:px-4 lg:py-3",
              errors.message && "!border-red-500 !ring-red-500/20"
            )}
            placeholder={translations.messagePlaceholder}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-400">{errors.message}</p>
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
                <Loader2 className="size-4 animate-spin" />
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
