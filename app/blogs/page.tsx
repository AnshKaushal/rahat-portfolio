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
              development, and everything in between.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {blogs.length > 0 && (
          <>
            <FeaturedBlogCard blog={blogs[0]} />

            <div className="mt-24">
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
    <Link href={`/blogs/${blog.slug}`} className="group block">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>
          )}
          <div className={`p-8 ${blog.featuredImage ? "md:w-1/2" : "w-full"}`}>
            <div className="flex items-center space-x-2 text-xs text-gray-500 mb-4">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                Featured
              </span>
              <span>•</span>
              <time dateTime={blog.createdAt}>
                {new Date(blog.createdAt).toLocaleDateString()}
              </time>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors line-clamp-3">
              {blog.title}
            </h2>
            <p className="text-gray-600 mb-6 line-clamp-3 text-lg">
              {blog.excerpt}
            </p>
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {blog.tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
                {blog.tags.length > 4 && (
                  <span className="text-xs text-gray-400">
                    +{blog.tags.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group block">
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
          <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
            <span>Read more →</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
