"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
  IconArrowLeft,
  IconLoader,
} from "@tabler/icons-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs")
      const data = await response.json()
      setBlogs(data)
    } catch (error) {
      toast.error("Failed to fetch blogs")
    } finally {
      setIsLoading(false)
    }
  }

  const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== id))
        toast.success("Blog deleted successfully")
      } else {
        toast.error("Failed to delete blog")
      }
    } catch (error) {
      toast.error("Network error")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <IconLoader className="animate-spin w-8 h-8 text-primary" />
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-0 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Link href="/admin" className="mr-2">
              <IconArrowLeft className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            </Link>
            Blog Posts
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your blog posts here. You can create, edit, delete, and
            preview your posts.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/blogs/create">
            <IconPlus className="w-4 h-4" />
            Add Blog
          </Link>
        </Button>
      </div>

      {blogs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Card
              key={blog._id}
              className="flex flex-col justify-between hover:shadow-lg transition"
            >
              <CardHeader>
                <CardTitle className="truncate">{blog.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {blog.excerpt || "No description provided"}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-3">
                <Badge variant="secondary" className="w-fit">
                  {blog.category || "Uncategorized"}
                </Badge>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(blog.createdAt).toLocaleDateString()} •{" "}
                    {new Date(blog.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/blogs/${blog.slug}`} target="_blank">
                      <IconEye className="w-4 h-4" /> View
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="default">
                    <Link href={`/admin/blogs/edit/${blog.slug}`}>
                      <IconEdit className="w-4 h-4" /> Edit
                    </Link>
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteBlog(blog.slug)}
                >
                  <IconTrash className="w-4 h-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No blogs yet</h3>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first blog post.
          </p>
          <Button asChild>
            <Link href="/admin/blogs/create">
              <IconPlus className="w-4 h-4" />
              Create your first blog
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
