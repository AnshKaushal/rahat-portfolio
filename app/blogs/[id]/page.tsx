import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogById, getRecentBlogs } from "@/lib/blog"
import { Metadata } from "next"

interface BlogPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const blog = await getBlogById(params.id)

  if (!blog) {
    return {
      title: "Blog Not Found | Rahat Sunil",
    }
  }

  return {
    title: `${blog.title} | Rahat Sunil`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.featuredImage ? [blog.featuredImage] : [],
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: ["Rahat Sunil"],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: blog.featuredImage ? [blog.featuredImage] : [],
    },
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const [blog, recentBlogs] = await Promise.all([
    getBlogById(params.id),
    getRecentBlogs(3),
  ])

  if (!blog) {
    notFound()
  }

  const otherBlogs = recentBlogs.filter(
    (recentBlog) => recentBlog._id !== blog._id
  )

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/blogs" className="hover:text-primary transition-colors">
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
          <span className="text-gray-900">{blog.title}</span>
        </nav>

        {/* Blog Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
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
            {blog.updatedAt !== blog.createdAt && (
              <>
                <span>•</span>
                <span>
                  Updated {new Date(blog.updatedAt).toLocaleDateString()}
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {blog.excerpt}
            </p>
          )}

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm bg-white/80 text-gray-700 px-3 py-1 rounded-full border border-gray-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {blog.featuredImage && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
          <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <article className="lg:col-span-3">
            <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-primary prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100">
              <BlogContent content={blog.content} />
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">R</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Rahat Sunil
                  </h4>
                  <p className="text-gray-600">
                    Designer & Developer passionate about creating exceptional
                    digital experiences.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Share this article
              </h4>
              <div className="flex space-x-4">
                <ShareButton
                  platform="twitter"
                  url={`${
                    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
                  }/blogs/${blog._id}`}
                  title={blog.title}
                />
                <ShareButton
                  platform="linkedin"
                  url={`${
                    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
                  }/blogs/${blog._id}`}
                  title={blog.title}
                />
                <ShareButton
                  platform="facebook"
                  url={`${
                    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
                  }/blogs/${blog._id}`}
                  title={blog.title}
                />
              </div>
            </div>
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Table of Contents
                </h4>
                <TableOfContents content={blog.content} />
              </div>

              {otherBlogs.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Recent Posts
                  </h4>
                  <div className="space-y-4">
                    {otherBlogs.map((recentBlog) => (
                      <Link
                        key={recentBlog._id}
                        href={`/blogs/${recentBlog._id}`}
                        className="block group"
                      >
                        <h5 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                          {recentBlog.title}
                        </h5>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(recentBlog.createdAt).toLocaleDateString()}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <Link
                href="/blogs"
                className="block w-full bg-primary text-white text-center py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                ← Back to All Posts
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function BlogContent({ content }: { content: string }) {
  const formattedContent = content.split("\n\n").map((paragraph, index) => {
    if (paragraph.startsWith("# ")) {
      return (
        <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
          {paragraph.slice(2)}
        </h1>
      )
    }
    if (paragraph.startsWith("## ")) {
      return (
        <h2 key={index} className="text-2xl font-bold mt-6 mb-3">
          {paragraph.slice(3)}
        </h2>
      )
    }
    if (paragraph.startsWith("### ")) {
      return (
        <h3 key={index} className="text-xl font-bold mt-4 mb-2">
          {paragraph.slice(4)}
        </h3>
      )
    }
    if (paragraph.startsWith("- ") || paragraph.startsWith("* ")) {
      const items = paragraph
        .split("\n")
        .filter((item) => item.startsWith("- ") || item.startsWith("* "))
      return (
        <ul key={index} className="list-disc list-inside space-y-2 my-4">
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{item.slice(2)}</li>
          ))}
        </ul>
      )
    }
    if (paragraph.trim() === "") return null
    return (
      <p key={index} className="mb-4">
        {paragraph}
      </p>
    )
  })

  return <div>{formattedContent}</div>
}

function TableOfContents({ content }: { content: string }) {
  const headings = content
    .split("\n")
    .filter((line) => line.startsWith("#"))
    .map((heading, index) => {
      const level = heading.match(/^#+/)?.[0].length || 1
      const text = heading.replace(/^#+\s/, "")
      const id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "")

      return { level, text, id, index }
    })

  if (headings.length === 0) {
    return <p className="text-sm text-gray-500">No headings found</p>
  }

  return (
    <nav className="space-y-2">
      {headings.map((heading) => (
        <a
          key={heading.index}
          href={`#${heading.id}`}
          className={`block text-sm hover:text-primary transition-colors ${
            heading.level === 1
              ? "font-medium"
              : heading.level === 2
              ? "ml-2"
              : "ml-4 text-gray-600"
          }`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  )
}

function ShareButton({
  platform,
  url,
  title,
}: {
  platform: string
  url: string
  title: string
}) {
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
  }

  const icons = {
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  }

  return (
    <a
      href={shareUrls[platform as keyof typeof shareUrls]}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-700 rounded-full transition-colors"
    >
      {icons[platform as keyof typeof icons]}
    </a>
  )
}
