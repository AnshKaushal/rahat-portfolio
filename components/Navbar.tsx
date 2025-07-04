"use client"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import { Fragment } from "react"
import { motion, AnimatePresence } from "motion/react"
import { IconMenu2, IconX } from "@tabler/icons-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("/#intro")
  const [isManualNavigation, setIsManualNavigation] = useState(false)

  const links = [
    {
      to: "/#intro",
      text: "Intro",
      sectionId: "intro",
    },
    {
      to: "/#aboutme",
      text: "About Me",
      sectionId: "aboutme",
    },
    {
      to: "/#myvision",
      text: "My Vision",
      sectionId: "myvision",
    },
    {
      to: "/#myexperience",
      text: "Experience",
      sectionId: "myexperience",
    },
    {
      to: "/#myprojects",
      text: "My Projects",
      sectionId: "myprojects",
    },
    {
      to: "/#mywork",
      text: "My Work",
      sectionId: "mywork",
    },
    {
      to: "/#workwithme",
      text: "Contact Me",
      sectionId: "workwithme",
    },
  ]

  useEffect(() => {
    if (!isManualNavigation || activeSection !== "/#intro") {
      const hash = activeSection.replace("/", "")

      window.history.replaceState(
        { ...window.history.state, as: hash, url: hash },
        "",
        hash
      )
    }

    if (isManualNavigation) {
      setIsManualNavigation(false)
    }
  }, [activeSection, isManualNavigation])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id

            if (sectionId === "intro" || window.scrollY < 200) {
              setActiveSection("/#intro")
            } else {
              setActiveSection(`/#${sectionId}`)
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    links.forEach((link) => {
      const element = document.getElementById(link.sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    const handleHashChange = () => {
      setIsManualNavigation(true)
      const hash = window.location.hash
      if (hash) {
        setActiveSection(`/${hash}`)
      } else {
        setActiveSection("/#intro")
      }
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)

    return () => {
      links.forEach((link) => {
        const element = document.getElementById(link.sectionId)
        if (element) {
          observer.unobserve(element)
        }
      })
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  const handleLinkClick = (to: string) => {
    setIsOpen(false)
    setIsManualNavigation(true)
    setActiveSection(to)

    setTimeout(() => {
      const sectionId = to.replace("/#", "")
      const element = document.getElementById(sectionId)
      if (element) {
        const navbarHeight = 64
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: "smooth",
        })
      }
    }, 10)
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-background/75 backdrop-blur-md border-b border-primary/50">
      <div className="hidden md:flex justify-around items-center h-16">
        {links.map((link) => (
          <Link
            key={link.to}
            href={link.to}
            onClick={(e) => {
              e.preventDefault()
              handleLinkClick(link.to)
            }}
            className="relative text-lg font-semibold text-primary hover:text-primary transition-all duration-300"
          >
            {link.text}
            <AnimatePresence>
              {activeSection === link.to && (
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ originX: 0.5 }}
                />
              )}
            </AnimatePresence>
          </Link>
        ))}
      </div>

      <div className="md:hidden flex justify-between items-center h-16 px-4">
        <div className="text-xl font-black text-primary">Rahat Sunil</div>
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsOpen(true)
          }}
          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
        >
          <IconMenu2 size={24} />
        </button>
      </div>

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
                        <nav className="space-y-1">
                          {links.map((link, index) => (
                            <motion.div
                              key={link.to}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.1,
                                ease: "easeOut",
                              }}
                            >
                              <Link
                                href={link.to}
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleLinkClick(link.to)
                                }}
                                className={`group relative flex items-center px-3 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                                  activeSection === link.to
                                    ? "bg-primary/10 text-primary"
                                    : "text-gray-700 hover:bg-primary/5 hover:text-primary"
                                }`}
                              >
                                <span className="relative">
                                  {link.text}
                                  <AnimatePresence>
                                    {activeSection === link.to && (
                                      <motion.div
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        exit={{ scaleX: 0 }}
                                        transition={{
                                          duration: 0.3,
                                          ease: "easeInOut",
                                        }}
                                        style={{ originX: 0 }}
                                      />
                                    )}
                                  </AnimatePresence>
                                </span>
                              </Link>
                            </motion.div>
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
