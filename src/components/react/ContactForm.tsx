import { EMAILJS_CONFIG, isEmailJSConfigured } from "@/lib/email"
import { cn } from "@/lib/utils"
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser"
import { CircleNotchIcon } from "@phosphor-icons/react"
import { useCallback, useState } from "react"

interface ContactTranslations {
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

  const field = (
    name: "name" | "email" | "message",
    label: string,
    placeholder: string,
    type = "text"
  ) => {
    const error = errors[name]
    const shared = {
      id: `contact-${name}`,
      name,
      required: true,
      value: formData[name],
      onChange: handleChange,
      placeholder,
      "aria-invalid": !!error,
      "aria-describedby": error ? `contact-${name}-error` : undefined,
      className: cn(
        "bg-background placeholder:text-muted-foreground/70 focus-visible:border-foreground w-full rounded-[2px] border px-3 py-2.5 font-sans text-base outline-none transition-colors duration-150",
        error ? "border-measure" : "border-input"
      ),
    }
    return (
      <div className={name === "message" ? "sm:col-span-2" : ""}>
        <label
          htmlFor={`contact-${name}`}
          className="mb-1.5 block font-sans text-[0.875rem] font-medium"
        >
          {label}
        </label>
        {name === "message" ? (
          <textarea rows={5} {...shared} />
        ) : (
          <input
            type={type}
            autoComplete={name === "email" ? "email" : "name"}
            {...shared}
          />
        )}
        {error && (
          <p
            id={`contact-${name}-error`}
            className="measured mt-1 font-sans text-[0.875rem]"
          >
            {error}
          </p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {field("name", translations.nameLabel, translations.namePlaceholder)}
        {field(
          "email",
          translations.emailLabel,
          translations.emailPlaceholder,
          "email"
        )}
        {field(
          "message",
          translations.messageLabel,
          translations.messagePlaceholder
        )}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary disabled:opacity-60"
        >
          {isSubmitting && (
            <CircleNotchIcon
              aria-hidden="true"
              className="size-4 animate-spin"
              weight="bold"
            />
          )}
          {isSubmitting ? translations.sendingButton : translations.sendButton}
        </button>
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "font-sans text-[0.9375rem]",
            status === "error" && "measured"
          )}
        >
          {status === "success" && translations.successMessage}
          {status === "error" && translations.errorMessage}
        </p>
      </div>
    </form>
  )
}
