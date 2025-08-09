"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Mail, FileText, MessageSquare } from "lucide-react"

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
    <div className="py-10 space-y-10">
      <h1 className="text-4xl font-bold tracking-tight">Rahat's Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Total Blogs",
            value: stats.totalBlogs,
            icon: FileText,
            color: "bg-primary",
          },
          {
            label: "Total Contacts",
            value: stats.totalContacts,
            icon: Mail,
            color: "bg-green-500",
          },
          {
            label: "Unread Messages",
            value: stats.unreadContacts,
            icon: MessageSquare,
            color: "bg-orange-500",
          },
        ].map((item, idx) => (
          <Card key={idx} className="flex items-center gap-4 p-6">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-white",
                item.color
              )}
            >
              <item.icon size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-2xl text-center font-semibold">{item.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Manage Blogs</CardTitle>
              <CardDescription>
                Create, edit, and manage your blog posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/admin/blogs">Go to Blogs</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>View Contacts</CardTitle>
                <CardDescription>
                  Review and respond to messages
                </CardDescription>
              </div>
              {stats.unreadContacts > 0 && (
                <Badge variant="destructive">{stats.unreadContacts}</Badge>
              )}
            </CardHeader>
            <CardContent>
              <Button asChild variant="secondary">
                <Link href="/admin/contacts">Go to Contacts</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates from blogs and contacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recentActivity.length > 0 ? (
            <ul className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold",
                      activity.type === "blog" ? "bg-primary" : "bg-green-500"
                    )}
                  >
                    {activity.type === "blog" ? "B" : "C"}
                  </div>
                  <div>
                    <p className="text-sm">
                      {activity.type === "blog" ? "New blog:" : "New contact:"}{" "}
                      <span className="font-medium">{activity.title}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No recent activity</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
