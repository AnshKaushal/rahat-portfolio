import ContactForm from "@/components/ContactForm"
import { Button } from "@/components/ui/button"
import {
  IconMail,
  IconPhone,
  IconBrandInstagram,
  IconWorld,
  IconBrandLinkedin,
} from "@tabler/icons-react"
import Link from "next/link"

export default function ContactMe() {
  return (
    <section id="workwithme" className="md:py-32 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-black text-4xl sm:text-6xl md:text-7xl text-center mb-6 max-w-screen-xl mx-auto px-4">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? I'm here to help transform your vision into something exceptional. Whether you're exploring a new project, considering a collaboration, or simply want to discuss design and technology, I’d be glad to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <p className="text-gray-600 text-lg mb-8">
                I’m always excited to take on meaningful challenges and collaborate with passionate, purpose-driven people. Let’s connect and see how we can create impact together.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
                  <IconMail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <a
                    href="mailto:rahatsunil05@gmail.com"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    rahatsunil05@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
                  <IconPhone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <a
                    href="tel:+1234567890"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    +917051146238
                  </a>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
                  <IconWorld className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Website</h4>
                  <Link
                    href="https://rahatsunil.in"
                    target="_blank"
                    className="text-gray-600"
                  >
                    https://rahatsunil.in
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">
                Connect with me
              </h4>
              <div className="flex space-x-4">
                <Button variant="outline" asChild>
                  <Link
                    href="https://linkedin.com/in/rahatsunil"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconBrandLinkedin className="w-5 h-5" />
                  </Link>
                </Button>
                <a
                  href="https://instagram.com/rahxt_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200 group"
                >
                  <IconBrandInstagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
