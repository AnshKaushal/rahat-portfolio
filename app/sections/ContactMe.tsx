"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  IconPhone,
  IconMail,
  IconBrandLinkedin,
  IconBrandInstagram,
} from "@tabler/icons-react"

export default function ContactMe() {
  const contactInfo = [
    {
      icon: IconPhone,
      label: "+917051146238",
      href: "tel:+917051146238",
      type: "phone",
    },
    {
      icon: IconMail,
      label: "rahatsunil05@gmail.com",
      href: "mailto:rahatsunil05@gmail.com",
      type: "email",
    },
    {
      icon: IconBrandLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rahat-sunil-7900aa211/",
      type: "Linkedin",
    },
    {
      icon: IconBrandInstagram,
      label: "Instagram",
      href: "https://instagram.com/rahxt_",
      type: "Instagram",
    },
  ]

  return (
    <div className="w-full py-24" id="workwithme">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-secondary/20 rounded-full transform -rotate-6"></div>
              <div className="relative bg-secondary rounded-full p-8">
                <Image
                  src="https://picsum.photos/800/1000?random=1"
                  alt="Rahat Sunil"
                  width={400}
                  height={500}
                  className="rounded-full object-cover w-full h-auto"
                  priority
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-800 mb-4">
                WORK WITH ME
              </h2>
              <p className="text-lg text-gray-600 mb-8">You can reach me on:</p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.type}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={contact.href}
                    className="flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center transition-colors duration-300">
                      <contact.icon size={24} className="text-white" />
                    </div>
                    <span className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
                      {contact.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              viewport={{ once: true }}
              className="pt-8"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Let's Create Something Amazing Together!
                </h3>
                <p className="text-gray-600 mb-4">
                  Ready to bring your vision to life? I'm here to help you
                  create exceptional digital experiences.
                </p>
                <Link
                  href="mailto:melinastudio@gmail.com"
                  className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-primary transition-colors duration-300"
                >
                  Start a Project
                  <IconMail size={20} className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
