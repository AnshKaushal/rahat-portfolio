import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { verifyToken } from "@/lib/auth"
import slugify from "slugify"

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await context.params
    const { slug } = params

    const client = await clientPromise
    const db = client.db("portfolio")

    const res = await db.collection("blogs").findOne({ slug })

    if (!res) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    const blog = {
      ...res,
      _id: res._id.toString(),
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error fetching blog:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await context.params
    const { slug } = params

    const token = req.cookies.get("admin-token")?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const blogData = await req.json()

    const client = await clientPromise
    const db = client.db("portfolio")

    const updatedBlog = await db.collection("blogs").findOneAndUpdate(
      { slug },
      {
        $set: {
          ...blogData,
          slug: blogData.title
            ? slugify(blogData.title, { lower: true, strict: true })
            : undefined,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    )

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({
      ...updatedBlog.value,
      _id: updatedBlog.value._id.toString(),
    })
  } catch (error) {
    console.error("Error updating blog:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await context.params
    const { slug } = params

    const token = req.cookies.get("admin-token")?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("portfolio")

    const result = await db.collection("blogs").deleteOne({ slug })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
