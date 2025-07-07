import Link from "next/link"
import Image from "next/image"
import { Blog, getAllBlogs } from "@/lib/blog"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Rahat Sunil",
  description:
    "Thoughts, insights, and experiences from my journey in design and development.",
}

export default async function BlogsPage() {
  const blogs = await getAllBlogs()
  const categories = [...new Set(blogs.map((blog) => blog.category))]

  return (
    <div className="min-h-screen pt-16">
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Thoughts, insights, and experiences from my journey in design,
              development, and everything in between. Welcome to my digital
              diary.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Blog Posts Yet
              </h3>
              <p className="text-gray-500">
                I'm working on some amazing content. Check back soon for new
                posts!
              </p>
            </div>
          </div>
        ) : (
          <>
            {blogs && blogs.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Featured Post
                </h2>
                <FeaturedBlogCard blog={blogs[0]} />
              </div>
            )}

            {categories.length > 1 && (
              <div className="mb-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/blogs"
                    className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    All Posts ({blogs.length})
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/blogs/category/${encodeURIComponent(
                        category.toLowerCase()
                      )}`}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      {category} (
                      {
                        blogs.filter((blog) => blog.category === category)
                          .length
                      }
                      )
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                All Posts ({blogs.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function FeaturedBlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blogs/${blog._id}`} className="group block">
      <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
        <div className="md:flex">
          {blog.featuredImage && (
            <div className="md:w-1/2">
              <div className="h-64 md:h-full relative">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          )}
          <div
            className={`p-8 ${
              blog.featuredImage ? "md:w-1/2" : "w-full"
            } flex flex-col justify-center`}
          >
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                {blog.category}
              </span>
              <span>•</span>
              <time dateTime={blog.createdAt}>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
              {blog.title}
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-3">
              {blog.excerpt}
            </p>

            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center text-primary font-semibold group-hover:text-primary/80 transition-colors">
              Read Full Article
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
        </div>
      </article>
    </Link>
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
