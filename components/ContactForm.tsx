"use client"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import {
  IconMail,
  IconPhone,
  IconUser,
  IconMessage,
  IconSend,
  IconCheck,
} from "@tabler/icons-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    if (
      formData.phone &&
      !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Message sent successfully! I'll get back to you soon.")
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
        setErrors({})
      } else {
        const errorData = await response.json()
        toast.error(
          errorData.error || "Failed to send message. Please try again."
        )
      }
    } catch (error) {
      console.error("Error submitting contact form:", error)
      toast.error("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Let's Start a Conversation
        </h3>
        <p className="text-gray-600">
          Have a project in mind or just want to chat? I'd love to hear from
          you. Fill out the form below and I'll get back to you as soon as
          possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <IconUser className="w-4 h-4 mr-2 text-gray-500" />
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.name
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary focus:border-primary"
                } ${formData.name && !errors.name ? "border-green-300" : ""}`}
                placeholder="Enter your full name"
              />
              {formData.name && !errors.name && (
                <IconCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.name && (
              <p className="text-sm text-red-600 flex items-center">
                <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">
                  !
                </span>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <IconMail className="w-4 h-4 mr-2 text-gray-500" />
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.email
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary focus:border-primary"
                } ${formData.email && !errors.email ? "border-green-300" : ""}`}
                placeholder="your.email@example.com"
              />
              {formData.email &&
                !errors.email &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                  <IconCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 flex items-center">
                <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">
                  !
                </span>
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone Field */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <IconPhone className="w-4 h-4 mr-2 text-gray-500" />
              Phone Number
              <span className="text-gray-400 ml-1">(optional)</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.phone
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary focus:border-primary"
                } ${formData.phone && !errors.phone ? "border-green-300" : ""}`}
                placeholder="+1 (555) 123-4567"
              />
              {formData.phone && !errors.phone && (
                <IconCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.phone && (
              <p className="text-sm text-red-600 flex items-center">
                <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">
                  !
                </span>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <IconMessage className="w-4 h-4 mr-2 text-gray-500" />
              Subject *
            </label>
            <div className="relative">
              <select
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${
                  errors.subject
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-primary focus:border-primary"
                } ${
                  formData.subject && !errors.subject ? "border-green-300" : ""
                }`}
              >
                <option value="">Select a subject</option>
                <option value="Project Inquiry">Project Inquiry</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Job Opportunity">Job Opportunity</option>
                <option value="Consultation">Consultation</option>
                <option value="Question">General Question</option>
                <option value="Other">Other</option>
              </select>
              {formData.subject && !errors.subject && (
                <IconCheck className="absolute right-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.subject && (
              <p className="text-sm text-red-600 flex items-center">
                <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">
                  !
                </span>
                {errors.subject}
              </p>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <IconMessage className="w-4 h-4 mr-2 text-gray-500" />
            Your Message *
          </label>
          <div className="relative">
            <textarea
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 resize-y min-h-[120px] ${
                errors.message
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-primary focus:border-primary"
              } ${
                formData.message && !errors.message ? "border-green-300" : ""
              }`}
              placeholder="Tell me about your project, ideas, or just say hello! I'd love to hear what you're working on and how I can help bring your vision to life."
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {formData.message.length}/500
            </div>
          </div>
          {errors.message && (
            <p className="text-sm text-red-600 flex items-center">
              <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">
                !
              </span>
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto group bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg disabled:transform-none disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending Message...
              </>
            ) : (
              <>
                <IconSend className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                Send Message
              </>
            )}
          </Button>
        </div>

        {/* Additional Info */}
        <div className="pt-6 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                <IconMail className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Quick Response</p>
                <p>Usually within 24 hours</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                <IconCheck className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-900">No Spam</p>
                <p>Your info stays private</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                <IconMessage className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Free Consultation</p>
                <p>Let's discuss your project</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
