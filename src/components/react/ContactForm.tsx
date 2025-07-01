import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setResult("Thank you! Your message has been sent.")
      setIsSubmitting(false)
      setFormData({ name: "", email: "", message: "" })

      // Clear success message after 5 seconds
      setTimeout(() => {
        setResult("")
      }, 5000)
    }, 1000)
  }

  return (
    <section id="contact" className="scroll-mt-24 py-8 xl:py-12 2xl:py-16">
      <div className="mb-8 text-center sm:mb-12">
        <h2 className="section-title mb-3 text-2xl font-bold tracking-tight text-zinc-100 sm:mb-4 sm:text-3xl xl:mb-3 xl:text-2xl 2xl:mb-4 2xl:text-3xl">
          Get In Touch
        </h2>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-zinc-400 sm:max-w-2xl sm:text-lg xl:max-w-xl xl:text-sm 2xl:max-w-2xl 2xl:text-lg">
          Have a project, or just want to connect? My inbox is open.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-lg sm:max-w-xl xl:max-w-lg 2xl:max-w-xl"
      >
        {result && (
          <div className="mb-4 text-center text-sm text-green-400 sm:text-base xl:text-sm 2xl:text-base">
            {result}
          </div>
        )}

        <div className="mb-4 grid grid-cols-1 gap-4 sm:mb-6 sm:grid-cols-2 sm:gap-6">
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="form-input w-full rounded-md px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base xl:px-3 xl:py-2 xl:text-sm 2xl:px-4 2xl:py-3 2xl:text-base"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="form-input w-full rounded-md px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base xl:px-3 xl:py-2 xl:text-sm 2xl:px-4 2xl:py-3 2xl:text-base"
              placeholder="Your Email"
            />
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="form-input sm:rows-5 xl:rows-4 2xl:rows-5 w-full rounded-md px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base xl:px-3 xl:py-2 xl:text-sm 2xl:px-4 2xl:py-3 2xl:text-base"
            placeholder="Your Message"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-zinc-800 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 sm:w-auto sm:px-8 sm:py-3 sm:text-base xl:px-6 xl:py-2 xl:text-sm 2xl:px-8 2xl:py-3 2xl:text-base"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </section>
  )
}
