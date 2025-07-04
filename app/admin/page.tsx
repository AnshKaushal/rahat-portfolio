"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function AdminDashboard() {
  const [stats, setStats] = useState<{
    totalBlogs: number
    totalContacts: number
    unreadContacts: number
    recentActivity: Array<{
      type: string
      title: string
      date: string
    }>
  }>({
    totalBlogs: 0,
    totalContacts: 0,
    unreadContacts: 0,
    recentActivity: [],
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [blogsRes, contactsRes] = await Promise.all([
        fetch("/api/blogs"),
        fetch("/api/contacts"),
      ])

      const blogs = await blogsRes.json()
      const contacts = await contactsRes.json()

      const unreadContacts = contacts.filter((c: any) => !c.read).length

      const recentActivity = [
        ...blogs.slice(0, 3).map((blog: any) => ({
          type: "blog",
          title: blog.title,
          date: blog.createdAt,
        })),
        ...contacts.slice(0, 3).map((contact: any) => ({
          type: "contact",
          title: contact.name,
          date: contact.createdAt,
        })),
      ]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)

      setStats({
        totalBlogs: blogs.length,
        totalContacts: contacts.length,
        unreadContacts,
        recentActivity,
      })
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    }
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-primary/20 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">B</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Blogs
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalBlogs}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">C</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Contacts
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalContacts}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">U</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Unread Messages
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.unreadContacts}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/admin/blogs"
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Manage Blogs
            </h3>
            <p className="text-gray-600">
              Create, edit, and manage your blog posts
            </p>
          </Link>

          <Link
            href="/admin/contacts"
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              View Contacts
              {stats.unreadContacts > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {stats.unreadContacts}
                </span>
              )}
            </h3>
            <p className="text-gray-600">
              Review and respond to contact form submissions
            </p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {stats.recentActivity.map((activity: any, index) => (
                  <li key={index}>
                    <div className="relative pb-8">
                      {index !== stats.recentActivity.length - 1 && (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              activity.type === "blog"
                                ? "bg-primary"
                                : "bg-green-500"
                            }`}
                          >
                            <span className="text-white text-sm font-bold">
                              {activity.type === "blog" ? "B" : "C"}
                            </span>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              {activity.type === "blog"
                                ? "New blog: "
                                : "New contact: "}
                              <span className="font-medium text-gray-900">
                                {activity.title}
                              </span>
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {new Date(activity.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
