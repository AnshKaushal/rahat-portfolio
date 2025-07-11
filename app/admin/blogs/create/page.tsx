"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"
import {
  IconArrowLeft,
  IconEye,
  IconCode,
  IconTag,
  IconFileText,
  IconCategory,
  IconEdit,
  IconPhoto,
} from "@tabler/icons-react"
import FileUpload from "@/components/FileUpload"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import dynamic from "next/dynamic"

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
)

export default function CreateBlog() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    featuredImage: "",
  })

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

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      })

      if (response.ok) {
        toast.success("Blog created successfully!")
        router.push("/admin/blogs")
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to create blog")
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

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value })
  }

  const tagsArray = formData.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag)

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
            <h1 className="text-2xl font-bold text-gray-900">
              Create New Blog Post
            </h1>
          </div>
        </div>
        <p className="text-gray-600">
          Craft your next blog post with our powerful editor. Add rich content,
          images, and organize your thoughts.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <IconFileText className="w-5 h-5 text-primary" />
                <span>Basic Information</span>
              </CardTitle>
              <CardDescription>
                Set up the fundamental details of your blog post
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

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <IconCode className="w-5 h-5 text-primary" />
                  <span>Content</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant={isPreviewMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                  >
                    <IconEye className="w-4 h-4 mr-2" />
                    {isPreviewMode ? "Edit" : "Preview"}
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Write your blog content using Markdown syntax for rich
                formatting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <MDEditor
                  value={formData.content}
                  onChange={(value) =>
                    setFormData({ ...formData, content: value || "" })
                  }
                  preview={isPreviewMode ? "preview" : "edit"}
                  hideToolbar={false}
                  height={500}
                  data-color-mode="light"
                />
                <p className="text-xs text-gray-500">
                  Use Markdown syntax for formatting. You can add headings,
                  lists, links, code blocks, and more.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/blogs")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isSubmitting || !formData.title || !formData.content
                  }
                  className="flex-1"
                >
                  {isSubmitting ? "Publishing..." : "Publish"}
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Your blog post will be published immediately
              </p>
            </CardContent>
          </Card>

          {/* Category & Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <IconCategory className="w-5 h-5 text-primary" />
                <span>Organization</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Tutorial">Tutorial</SelectItem>
                    <SelectItem value="Web Development">
                      Web Development
                    </SelectItem>
                    <SelectItem value="Mobile Development">
                      Mobile Development
                    </SelectItem>
                    <SelectItem value="UI/UX">UI/UX</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                  placeholder="react, nextjs, javascript, tutorial"
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
              <CardDescription>
                Add a compelling image to represent your blog post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Image URL</Label>
                  <Input
                    type="url"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                </div>

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
                  <Label className="text-sm font-medium">Preview</Label>
                  <div className="relative group">
                    <img
                      src={formData.featuredImage}
                      alt="Featured image preview"
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
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

          {/* Blog Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Word count:</span>
                <span className="font-medium">
                  {
                    formData.content
                      .split(/\s+/)
                      .filter((word) => word.length > 0).length
                  }
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Character count:</span>
                <span className="font-medium">{formData.content.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Reading time:</span>
                <span className="font-medium">
                  {Math.max(
                    1,
                    Math.ceil(formData.content.split(/\s+/).length / 200)
                  )}{" "}
                  min
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </main>
  )
}
