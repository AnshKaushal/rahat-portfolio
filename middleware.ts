import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl

  // Handle CORS for API routes
  if (pathname.startsWith("/api/")) {
    // Clone the request headers
    const requestHeaders = new Headers(request.headers)

    // Create response
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

    // Set CORS headers
    response.headers.set("Access-Control-Allow-Origin", origin)
    response.headers.set("Access-Control-Allow-Credentials", "true")
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET,DELETE,PATCH,POST,PUT,OPTIONS"
    )
    response.headers.set(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
    )

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 200, headers: response.headers })
    }

    // Specific handling for blog routes
    if (pathname.startsWith("/api/blogs/")) {
      const allowedMethods = ["GET", "PUT", "DELETE", "OPTIONS"]
      if (!allowedMethods.includes(request.method)) {
        return new NextResponse("Method Not Allowed", {
          status: 405,
          headers: {
            Allow: allowedMethods.join(", "),
          },
        })
      }
    }

    // Specific handling for main blogs route
    if (pathname === "/api/blogs") {
      const allowedMethods = ["GET", "POST", "OPTIONS"]
      if (!allowedMethods.includes(request.method)) {
        return new NextResponse("Method Not Allowed", {
          status: 405,
          headers: {
            Allow: allowedMethods.join(", "),
          },
        })
      }
    }

    // Specific handling for contacts routes
    if (pathname.startsWith("/api/contacts")) {
      const allowedMethods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
      if (!allowedMethods.includes(request.method)) {
        return new NextResponse("Method Not Allowed", {
          status: 405,
          headers: {
            Allow: allowedMethods.join(", "),
          },
        })
      }
    }

    // Specific handling for auth routes
    if (pathname.startsWith("/api/auth/")) {
      const allowedMethods = ["POST", "OPTIONS"]
      if (!allowedMethods.includes(request.method)) {
        return new NextResponse("Method Not Allowed", {
          status: 405,
          headers: {
            Allow: allowedMethods.join(", "),
          },
        })
      }
    }

    // Specific handling for upload route
    if (pathname === "/api/upload") {
      const allowedMethods = ["POST", "OPTIONS"]
      if (!allowedMethods.includes(request.method)) {
        return new NextResponse("Method Not Allowed", {
          status: 405,
          headers: {
            Allow: allowedMethods.join(", "),
          },
        })
      }
    }

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}
