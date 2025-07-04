import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { verifyToken } from "@/lib/auth"
import { ObjectId } from "mongodb"

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("admin-token")?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("portfolio")

    const contacts = await db
      .collection("contacts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(contacts)
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const contactData = await req.json()

    const client = await clientPromise
    const db = client.db("portfolio")

    const contact = {
      ...contactData,
      _id: new ObjectId(),
      read: false,
      createdAt: new Date(),
    }

    await db.collection("contacts").insertOne(contact)

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
