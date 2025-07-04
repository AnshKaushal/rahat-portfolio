"use client"
import { Button } from "@/components/ui/button"
import { IconLoader } from "@tabler/icons-react"
import { useState, useEffect } from "react"
import { toast, Toaster } from "sonner"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/verify")
      if (response.ok) {
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        toast.success("Login successful!")
      } else {
        const error = await response.json()
        toast.error(error.error || "Login failed")
      }
    } catch (error) {
      toast.error("Network error")
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setIsAuthenticated(false)
      setEmail("")
      setPassword("")
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error("Logout failed")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <IconLoader className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <>
        <Toaster />
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-primary text-white p-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen pt-16">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {window.location.pathname === "/admin" ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : null}
          {children}
        </main>
      </div>
    </>
  )
}
