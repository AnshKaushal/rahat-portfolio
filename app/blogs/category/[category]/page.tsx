import Link from "next/link"
import Image from "next/image"
import { getBlogsByCategory, getAllBlogs, Blog } from "@/lib/blog"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const blogs = await getAllBlogs()
  const categories = [
    ...new Set(blogs.map((blog) => blog.category.toLowerCase())),
  ]

  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const blogs = await getBlogsByCategory(category)

  if (blogs.length === 0) {
    return {
      title: "Category Not Found | Rahat Sunil",
    }
  }

  return {
    title: `${
      category.charAt(0).toUpperCase() + category.slice(1)
    } | Blog | Rahat Sunil`,
    description: `Browse all blog posts in the ${category} category`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const blogs = await getBlogsByCategory(category)
  const allBlogs = await getAllBlogs()
  const allCategories = [...new Set(allBlogs.map((blog) => blog.category))]

  if (blogs.length === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <Link
              href="/blogs"
              className="hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-gray-900 capitalize">{category}</span>
          </nav>

          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 capitalize">
              {category}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {blogs.length} {blogs.length === 1 ? "post" : "posts"} in the{" "}
              {category} category
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Categories
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blogs"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              All Posts ({allBlogs.length})
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat}
                href={`/blogs/category/${encodeURIComponent(
                  cat.toLowerCase()
                )}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat.toLowerCase() === category.toLowerCase()
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat} (
                {
                  allBlogs.filter(
                    (blog) => blog.category.toLowerCase() === cat.toLowerCase()
                  ).length
                }
                )
              </Link>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  )
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blogs/${blog._id}`} className="group block">
      <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] h-full flex flex-col">
        {blog.featuredImage && (
          <div className="aspect-w-16 aspect-h-9 relative h-48">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        )}

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
              {blog.category}
            </span>
            <span>•</span>
            <time dateTime={blog.createdAt}>
              {new Date(blog.createdAt).toLocaleDateString()}
            </time>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {blog.title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
            {blog.excerpt}
          </p>

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {blog.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
              {blog.tags.length > 3 && (
                <span className="text-xs text-gray-400">
                  +{blog.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors mt-auto">
            Read More
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}
