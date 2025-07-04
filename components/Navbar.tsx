"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import { Fragment } from "react"
import { IconMenu2, IconX } from "@tabler/icons-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { to: "/#intro", text: "Intro" },
    { to: "/#aboutme", text: "About Me" },
    { to: "/#myvision", text: "My Vision" },
    { to: "/#myexperience", text: "Experience" },
    { to: "/#myprojects", text: "My Projects" },
    { to: "/blogs", text: "Blogs" },
    { to: "/#mywork", text: "My Work" },
    { to: "/#workwithme", text: "Contact Me" },
  ]

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    to: string
  ) => {
    const isHashLink = to.startsWith("/#")
    const isHome = window.location.pathname === "/"

    if (isHashLink) {
      e.preventDefault()

      const sectionId = to.replace("/#", "")
      if (isHome) {
        const element = document.getElementById(sectionId)
        if (element) {
          const offset = 64
          const position =
            element.getBoundingClientRect().top + window.scrollY - offset
          window.scrollTo({ top: position, behavior: "smooth" })
        }
      } else {
        sessionStorage.setItem("scrollTo", sectionId)
        window.location.href = "/"
      }

      setIsOpen(false)
    } else {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const sectionId = sessionStorage.getItem("scrollTo")
    if (sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        const offset = 64
        const position =
          element.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top: position, behavior: "smooth" })
        sessionStorage.removeItem("scrollTo")
      }
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-background/75 backdrop-blur-md border-b border-primary/50">
      {/* Desktop Nav */}
      <div className="hidden md:flex justify-around items-center h-16">
        {links.map((link) => (
          <Link
            key={link.to}
            href={link.to}
            onClick={(e) => handleLinkClick(e, link.to)}
            className="text-lg font-semibold text-primary hover:text-primary transition-all duration-300"
          >
            {link.text}
          </Link>
        ))}
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex justify-between items-center h-16 px-4">
        <div className="text-xl font-black text-primary">Rahat Sunil</div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
        >
          <IconMenu2 size={24} />
        </button>
      </div>

      {/* Mobile Dialog */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
                <TransitionChild
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto w-72 max-w-sm">
                    <div className="flex h-full flex-col bg-background shadow-xl">
                      <div className="flex items-center justify-between px-4 h-16 border-b border-primary/20">
                        <DialogTitle className="text-lg font-semibold text-primary">
                          Menu
                        </DialogTitle>
                        <button
                          type="button"
                          className="rounded-md text-primary hover:bg-primary/10 p-2 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <IconX size={24} />
                        </button>
                      </div>

                      <div className="flex-1 px-4 py-6">
                        <nav className="space-y-2">
                          {links.map((link) => (
                            <Link
                              key={link.to}
                              href={link.to}
                              onClick={(e) => handleLinkClick(e, link.to)}
                              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-all"
                            >
                              {link.text}
                            </Link>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
