import React from "react"
import Link from "next/link"
import {
  IconMail,
  IconPhone,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconGlobe,
} from "@tabler/icons-react"

export default function ContactMe() {
  const contactInfo = [
    {
      icon: IconMail,
      label: "rahatsunil05@gmail.com",
      href: "mailto:rahatsunil05@gmail.com",
      type: "email",
    },
    {
      icon: IconGlobe,
      label: "rahatsunil.in",
      href: "https://rahatsunil.in",
      type: "website",
    },
    {
      icon: IconPhone,
      label: "+123 985 206 653",
      href: "tel:+123985206653",
      type: "phone",
    },
  ]

  const socialLinks = [
    {
      icon: IconBrandInstagram,
      href: "https://instagram.com/rahxt_",
      label: "Instagram",
    },
    {
      icon: IconMail,
      href: "mailto:rahatsunil05@gmail.com",
      label: "Email",
    },
    {
      icon: IconBrandLinkedin,
      href: "https://linkedin.com/in/rahatsunil",
      label: "LinkedIn",
    },
  ]

  return (
    <div className="w-full font-sans" id="workwithme">
      <div className="bg-primary px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-card">
        <div className="flex flex-col gap-2 md:gap-4 md:flex-row md:items-center">
          {contactInfo.map((contact) => (
            <Link
              key={contact.type}
              href={contact.href}
              className="flex items-center gap-2 hover:text-primary transition-colors duration-300"
            >
              <contact.icon size={18} />
              <span>{contact.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex gap-4 mt-4 md:mt-0 text-lg">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-primary transition-colors duration-300"
              aria-label={social.label}
            >
              <social.icon size={20} />
            </Link>
          ))}
        </div>
      </div>

      <div className="relative">
        <img
          src="https://picsum.photos/id/237/1200/500"
          alt="model"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-end p-8">
          <h2 className="text-white text-3xl sm:text-5xl font-light">
            <span className="font-[cursive] text-5xl">W</span>
            <span className="font-bold tracking-wide">ORK </span>
            <span className="font-light ml-2">WITH ME</span>
          </h2>
        </div>
      </div>
    </div>
  )
}
