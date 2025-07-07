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

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
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
        setBlogs(blogs.filter((blog: any) => blog._id !== id))
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
    <div className="px-4 py-6 sm:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 inline-flex items-center">
              <Link href="/admin">
                <IconArrowLeft className="w-6 h-6 text-gray-700 hover:text-gray-700 transition-colors mr-2" />
              </Link>
              Blog Posts
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your blog posts here. You can create, edit, delete, and
              preview your blog posts.
            </p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button asChild>
            <Link href="/admin/blogs/create">
              <IconPlus className="w-4 h-4" />
              Add Blog
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-8 flex flex-col border-4 border-dashed rounded-lg border-primary/20">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs.map((blog: any) => (
                    <tr key={blog._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {blog.title}
                          </div>
                          {blog.excerpt && (
                            <div className="text-sm text-gray-500 truncate">
                              {blog.excerpt}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          Published
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(blog.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/blogs/${blog._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                            title="Preview blog"
                          >
                            <IconEye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/admin/blogs/edit/${blog._id}`}
                            className="text-primary hover:text-primary/80 p-1 rounded hover:bg-primary/10"
                            title="Edit blog"
                          >
                            <IconEdit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => deleteBlog(blog._id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                            title="Delete blog"
                          >
                            <IconTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {blogs.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No blogs yet
                  </h3>
                  <p className="text-gray-500 mb-4">
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
          </div>
        </div>
      </div>
    </div>
  )
}
