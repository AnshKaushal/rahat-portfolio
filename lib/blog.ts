import clientPromise from "./mongodb"

export interface Blog {
  _id: string
  title: string
  excerpt: string
  content: string
  slug: string
  tags: string[]
  featuredImage?: string
  createdAt: string
  updatedAt: string
}

export async function getAllBlogs(): Promise<Blog[]> {
  try {
    const client = await clientPromise
    const db = client.db("portfolio")

    const blogs = await db
      .collection("blogs")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return blogs.map((blog) => ({
      ...blog,
      _id: blog._id.toString(),
    })) as Blog[]
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return []
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const client = await clientPromise
    const db = client.db("portfolio")

    const blog = await db.collection("blogs").findOne({ slug })

    if (!blog) return null

    return {
      ...blog,
      _id: blog._id.toString(),
    } as Blog
  } catch (error) {
    console.error("Error fetching blog:", error)
    return null
  }
}

export async function getRecentBlogs(limit: number = 3): Promise<Blog[]> {
  try {
    const client = await clientPromise
    const db = client.db("portfolio")

    const blogs = await db
      .collection("blogs")
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray()

    return blogs.map((blog) => ({
      ...blog,
      _id: blog._id.toString(),
    })) as Blog[]
  } catch (error) {
    console.error("Error fetching recent blogs:", error)
    return []
  }
}
