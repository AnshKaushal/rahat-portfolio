"use client"
import { useState, useEffect } from "react"
import { IconArrowLeft, IconMail, IconPhone, IconTrash } from "@tabler/icons-react"
import { toast } from "sonner"
import Link from "next/link"

export default function ContactsPage() {
  const [contacts, setContacts] = useState<
    {
      _id: string
      name: string
      email: string
      phone?: string
      subject: string
      message: string
      read: boolean
      createdAt: string
    }[]
  >([])
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contacts")
      const data = await response.json()
      setContacts(data)
    } catch (error) {
      toast.error("Failed to fetch contacts")
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: true }),
      })

      if (response.ok) {
        setContacts(
          contacts.map((contact: any) =>
            contact._id === id ? { ...contact, read: true } : contact
          )
        )
      }
    } catch (error) {
      console.error("Failed to mark as read:", error)
    }
  }

  const deleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return

    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setContacts(contacts.filter((contact: any) => contact._id !== id))
        setSelectedContact(null)
        toast.success("Contact deleted successfully")
      } else {
        toast.error("Failed to delete contact")
      }
    } catch (error) {
      toast.error("Network error")
    }
  }

  const handleContactClick = (contact: any) => {
    setSelectedContact(contact)
    if (!contact.read) {
      markAsRead(contact._id)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            <Link href="/admin">  
              <IconArrowLeft className="inline-block w-6 h-6 mr-2 text-gray-700 hover:text-gray-900 transition-colors" />
            </Link>
            Contact Responses
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage contact form submissions
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                All Messages ({contacts.length})
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {contacts.map((contact: any) => (
                  <div
                    key={contact._id}
                    onClick={() => handleContactClick(contact)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedContact?._id === contact._id
                        ? "bg-primary/10 border-2 border-primary"
                        : contact.read
                        ? "bg-gray-50 hover:bg-gray-100"
                        : "bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${
                            !contact.read ? "text-blue-900" : "text-gray-900"
                          }`}
                        >
                          {contact.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {contact.subject}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      {!contact.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
                {contacts.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No contact submissions yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {selectedContact.subject}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      From: {selectedContact.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(selectedContact.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteContact(selectedContact._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    <IconTrash className="w-4 h-4" />
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <IconMail className="w-5 h-5 text-gray-400" />
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="text-primary hover:text-primary/80"
                      >
                        {selectedContact.email}
                      </a>
                    </div>

                    {selectedContact.phone && (
                      <div className="flex items-center space-x-3">
                        <IconPhone className="w-5 h-5 text-gray-400" />
                        <a
                          href={`tel:${selectedContact.phone}`}
                          className="text-primary hover:text-primary/80"
                        >
                          {selectedContact.phone}
                        </a>
                      </div>
                    )}

                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Message:
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {selectedContact.message}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <a
                        href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
                      >
                        <IconMail className="w-4 h-4 mr-2" />
                        Reply via Email
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 text-center">
                <p className="text-gray-500">
                  Select a contact message to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
