"use client"
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
    <div className="px-6 py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            label: "Total Blogs",
            value: stats.totalBlogs,
            icon: "B",
            color: "bg-primary",
          },
          {
            label: "Total Contacts",
            value: stats.totalContacts,
            icon: "C",
            color: "bg-green-500",
          },
          {
            label: "Unread Messages",
            value: stats.unreadContacts,
            icon: "U",
            color: "bg-orange-500",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${item.color}`}
            >
              {item.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-xl font-semibold text-gray-900">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/blogs"
            className="block bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Manage Blogs
            </h3>
            <p className="text-sm text-gray-600">
              Create, edit, and manage your blog posts
            </p>
          </Link>
          <Link
            href="/admin/contacts"
            className="block bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              View Contacts
              {stats.unreadContacts > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {stats.unreadContacts}
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-600">
              Review and respond to contact form submissions
            </p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Recent Activity
        </h2>
        <ul className="space-y-6">
          {stats.recentActivity.map((activity, index) => (
            <li key={index} className="flex items-start gap-4">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  activity.type === "blog" ? "bg-primary" : "bg-green-500"
                }`}
              >
                {activity.type === "blog" ? "B" : "C"}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">
                  {activity.type === "blog" ? "New blog:" : "New contact:"}{" "}
                  <span className="font-medium text-gray-900">
                    {activity.title}
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(activity.date).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
