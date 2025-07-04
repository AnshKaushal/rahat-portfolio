import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { Toaster } from "sonner"

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-familgen",
})

export const metadata: Metadata = {
  title: "Rahat Sunil | Portfolio",
  description: "Rahat Sunil's Portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </head>
      <body className={`${space.variable} antialiased h-full`}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
