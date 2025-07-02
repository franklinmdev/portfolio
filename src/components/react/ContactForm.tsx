import CustomLoader from "@/components/react/CustomLoader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import emailjs from "@emailjs/browser"
import { useState } from "react"

// EmailJS configuration from environment variables
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY,
}

// Validate EmailJS configuration
const isEmailJSConfigured = () => {
  return !!(
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.templateId &&
    EMAILJS_CONFIG.publicKey
  )
}

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

  const validateForm = () => {
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
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Check if EmailJS is properly configured
    if (!isEmailJSConfigured()) {
      console.error(
        "EmailJS is not properly configured. Check your environment variablesf."
      )
      setResult(translations.errorMessage)
      return
    }

    setIsSubmitting(true)

    try {
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Franklin Martinez", // Your name
        },
        {
          publicKey: EMAILJS_CONFIG.publicKey,
        }
      )

      setResult(translations.successMessage)
      setFormData({ name: "", email: "", message: "" })
      setErrors({})

      // Clear success message after 5 seconds
      setTimeout(() => {
        setResult("")
      }, 5000)
    } catch (error) {
      console.error("EmailJS Error:", error)
      setResult(translations.errorMessage)

      // Clear error message after 5 seconds
      setTimeout(() => {
        setResult("")
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

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
            className={`mb-4 text-center text-sm ${
              result.includes("error") || result.includes("Sorry")
                ? "text-red-400"
                : "text-green-400"
            }`}
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
              className={`form-input md:h-10 md:px-4 md:py-2 md:text-base lg:h-11 lg:px-4 lg:py-3 ${errors.name ? "!border-red-500 !ring-red-500/20" : ""}`}
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
              className={`form-input md:h-10 md:px-4 md:py-2 md:text-base lg:h-11 lg:px-4 lg:py-3 ${errors.email ? "!border-red-500 !ring-red-500/20" : ""}`}
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
            className={`form-textarea md:min-h-24 md:px-4 md:py-2 md:text-base lg:min-h-28 lg:px-4 lg:py-3 ${errors.message ? "!border-red-500 !ring-red-500/20" : ""}`}
            placeholder={translations.messagePlaceholder}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-400">{errors.message}</p>
          )}
        </div>

        <div className="text-center">
          <Button type="submit" disabled={isSubmitting} className="form-button">
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <CustomLoader size="sm" />
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
