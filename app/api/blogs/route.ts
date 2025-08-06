import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { verifyToken } from "@/lib/auth"
import slugify from "slugify"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("portfolio")

    const blogs = await db
      .collection("blogs")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(blogs)
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("admin-token")?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const blogData = await req.json()

    const client = await clientPromise
    const db = client.db("portfolio")

    const blog = {
      ...blogData,
      slug: slugify(blogData.title, { lower: true, strict: true }),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await db.collection("blogs").insertOne(blog)

    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
