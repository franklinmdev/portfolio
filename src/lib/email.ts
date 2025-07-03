export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY,
}

export const isEmailJSConfigured = () =>
  Object.values(EMAILJS_CONFIG).every(Boolean)
