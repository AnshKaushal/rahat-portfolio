"use client"
import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const router = useRouter()
  const { slug } = use(params)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    featuredImage: "",
  })

  useEffect(() => {
    fetchBlog()
  }, [slug])

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${slug}`)
      if (response.ok) {
        const blog = await response.json()
        setFormData({
          title: blog.title || "",
          excerpt: blog.excerpt || "",
          content: blog.content || "",
          category: blog.category || "",
          tags: blog.tags ? blog.tags.join(", ") : "",
          featuredImage: blog.featuredImage || "",
        })
      } else {
        toast.error("Blog not found")
        router.push("/admin/blogs")
      }
    } catch (error) {
      toast.error("Failed to fetch blog")
      router.push("/admin/blogs")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const blogData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      }

      const response = await fetch(`/api/blogs/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      })

      if (response.ok) {
        toast.success("Blog updated successfully!")
        router.push("/admin/blogs")
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to update blog")
      }
    } catch (error) {
      toast.error("Network error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this blog? This action cannot be undone."
      )
    ) {
      return
    }

    try {
      const response = await fetch(`/api/blogs/${slug}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Blog deleted successfully!")
        router.push("/admin/blogs")
      } else {
        toast.error("Failed to delete blog")
      }
    } catch (error) {
      toast.error("Network error")
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
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Edit Blog Post
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Update your blog post details and content.
            </p>

            {/* Preview Link */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Preview
              </h4>
              <a
                href={`/blogs/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                View live blog post →
              </a>
            </div>

            {/* Danger Zone */}
            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="text-sm font-medium text-red-900 mb-2">
                Danger Zone
              </h4>
              <p className="text-sm text-red-600 mb-3">
                Once you delete a blog post, there is no going back.
              </p>
              <button
                onClick={handleDelete}
                className="text-sm bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Delete this blog
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                    placeholder="Enter blog title..."
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Excerpt
                  </label>
                  <textarea
                    name="excerpt"
                    rows={3}
                    value={formData.excerpt}
                    onChange={handleChange}
                    className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                    placeholder="Brief description of the blog post (used in previews and SEO)..."
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    This will be shown in blog previews and search results.
                  </p>
                </div>

                {/* Category and Featured Image Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="">Select a category</option>
                      <option value="Technology">Technology</option>
                      <option value="Design">Design</option>
                      <option value="Business">Business</option>
                      <option value="Personal">Personal</option>
                      <option value="Tutorial">Tutorial</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Development">
                        Mobile Development
                      </option>
                      <option value="UI/UX">UI/UX</option>
                      <option value="Programming">Programming</option>
                      <option value="Productivity">Productivity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Featured Image URL
                    </label>
                    <input
                      type="url"
                      name="featuredImage"
                      value={formData.featuredImage}
                      onChange={handleChange}
                      className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                {/* Featured Image Preview */}
                {formData.featuredImage && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image Preview
                    </label>
                    <div className="max-w-sm">
                      <img
                        src={formData.featuredImage}
                        alt="Featured image preview"
                        className="w-full h-32 object-cover rounded-lg border border-gray-300"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                    placeholder="react, nextjs, javascript, web development"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Separate tags with commas. These help categorize your
                    content.
                  </p>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    rows={16}
                    required
                    value={formData.content}
                    onChange={handleChange}
                    className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3 border font-mono"
                    placeholder="Write your blog content here...

You can use basic markdown formatting:
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- List item 1
- List item 2

[Link text](https://example.com)"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    You can use basic Markdown formatting. The content will be
                    automatically formatted when displayed.
                  </p>
                </div>

                {/* Character Count */}
                <div className="text-right">
                  <span className="text-sm text-gray-500">
                    {formData.content.length} characters
                  </span>
                </div>
              </div>

              {/* Form Actions */}
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-2">
                <button
                  type="button"
                  onClick={() => router.push("/admin/blogs")}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => window.open(`/blogs/${slug}`, "_blank")}
                  className="bg-gray-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Preview
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    "Update Blog"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
