"use client"
import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"
import {
  IconArrowLeft,
  IconTag,
  IconFileText,
  IconEdit,
  IconPhoto,
  IconTrash,
} from "@tabler/icons-react"
import FileUpload from "@/components/FileUpload"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Editor from "@/components/Editor"

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const getWordCount = () => {
    const textContent = formData.content.replace(/<[^>]*>/g, "")
    return textContent.split(/\s+/).filter((word) => word.length > 0).length
  }

  const getCharCount = () => {
    return formData.content.replace(/<[^>]*>/g, "").length
  }

  const tagsArray = formData.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag)

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
    <main>
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/blogs">
            <Button variant="ghost" size="sm" className="pl-2">
              <IconArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center space-x-2">
            <IconEdit className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
          </div>
        </div>
        <p className="text-gray-600">
          Update your blog post with our powerful editor.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 xl:grid-cols-4 gap-8"
      >
        <div className="xl:col-span-3 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <IconFileText className="w-5 h-5 text-primary" />
                <span>Basic Information</span>
              </CardTitle>
              <CardDescription>
                Update the fundamental details of your blog post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter an engaging title for your blog post..."
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-sm font-medium">
                  Excerpt
                </Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Write a compelling summary that will appear in previews and search results..."
                  rows={3}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500">
                  {formData.excerpt.length}/300 characters recommended
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <IconEdit className="w-5 h-5 text-primary" />
                <span>Content Editor</span>
              </CardTitle>
              <CardDescription>
                Edit your content using our rich text editor. Click the image
                button to upload images at cursor position.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Editor
                content={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Button
                  type="submit"
                  disabled={
                    isSubmitting || !formData.title || !formData.content
                  }
                  className="w-full"
                >
                  {isSubmitting ? "Updating..." : "Update Blog"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.open(`/blogs/${slug}`, "_blank")}
                  className="w-full"
                >
                  Preview
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/blogs")}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Changes will be saved immediately
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <IconTag className="w-5 h-5 text-primary" />
                <span>Organization</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="tags"
                  className="text-sm font-medium flex items-center space-x-2"
                >
                  <IconTag className="w-4 h-4" />
                  <span>Tags</span>
                </Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="react, nextjs, javascript"
                />
                <p className="text-xs text-gray-500">
                  Separate tags with commas
                </p>
                {tagsArray.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tagsArray.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <IconPhoto className="w-5 h-5 text-primary" />
                <span>Featured Image</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Input
                  type="url"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">
                      Or upload
                    </span>
                  </div>
                </div>

                <FileUpload
                  onUpload={(url) =>
                    setFormData({ ...formData, featuredImage: url })
                  }
                  accept="image/*"
                  className="w-full"
                />
              </div>

              {formData.featuredImage && (
                <div className="space-y-2">
                  <div className="relative group">
                    <img
                      src={formData.featuredImage}
                      alt="Featured image preview"
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() =>
                        setFormData({ ...formData, featuredImage: "" })
                      }
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Words:</span>
                <span className="font-medium">{getWordCount()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Characters:</span>
                <span className="font-medium">{getCharCount()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Read time:</span>
                <span className="font-medium">
                  {Math.max(1, Math.ceil(getWordCount() / 200))} min
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <IconTrash className="w-5 h-5" />
                <span>Danger Zone</span>
              </CardTitle>
              <CardDescription className="text-red-600">
                Once you delete a blog post, there is no going back.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                className="w-full"
              >
                <IconTrash className="w-4 h-4 mr-2" />
                Delete Blog Post
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </main>
  )
}
