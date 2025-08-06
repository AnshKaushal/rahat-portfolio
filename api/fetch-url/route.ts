import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ success: 0, error: "URL is required" })
  }

  try {
    const response = await fetch(url)
    const html = await response.text()

    const titleMatch = html.match(/<title>(.*?)<\/title>/i)
    const descMatch =
      html.match(/<meta name="description" content="(.*?)"/i) ||
      html.match(/<meta property="og:description" content="(.*?)"/i)
    const imageMatch = html.match(/<meta property="og:image" content="(.*?)"/i)

    return NextResponse.json({
      success: 1,
      meta: {
        title: titleMatch ? titleMatch[1] : url,
        description: descMatch ? descMatch[1] : "",
        image: {
          url: imageMatch ? imageMatch[1] : "",
        },
      },
    })
  } catch (error) {
    return NextResponse.json({ success: 0, error: "Failed to fetch URL" })
  }
}
