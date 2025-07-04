import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function Hero() {
  const images = [
    "https://picsum.photos/900/1200?random=1",
    "https://picsum.photos/900/1200?random=2",
    "https://picsum.photos/900/1200?random=3",
    "https://picsum.photos/900/1200?random=4",
  ]

  return (
    <div className="w-full min-h-screen py-16 relative overflow-hidden" id="intro">

      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-gray-50/20 pointer-events-none" />
      
      <div className="flex items-center w-full overflow-hidden relative">
        <div className="hidden lg:flex w-full">
          {images.map((image, i) => (
            <div 
              key={i} 
              className="flex-1 min-w-0 group relative overflow-hidden"
              style={{
                animationDelay: `${i * 0.2}s`
              }}
            >
              <div className="relative overflow-hidden shadow-lg transition-all duration-700">
                <Image
                  src={image}
                  alt={`Hero Image ${i + 1}`}
                  width={720}
                  height={1280}
                  className="w-full h-auto object-cover transition-transform duration-700"
                  priority={i < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:flex lg:hidden w-full">
          {images.slice(0, 3).map((image, i) => (
            <div 
              key={i} 
              className="flex-1 min-w-0 group relative overflow-hidden"
              style={{
                animationDelay: `${i * 0.2}s`
              }}
            >
              <div className="relative overflow-hidden shadow-lg transition-all duration-700">
                <Image
                  src={image}
                  alt={`Hero Image ${i + 1}`}
                  width={720}
                  height={1280}
                  className="w-full h-auto object-cover transition-transform duration-700"
                  priority={i < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex md:hidden w-full">
          {images.slice(0, 1).map((image, i) => (
            <div key={i} className="flex-1 min-w-0 group relative overflow-hidden">
              <div className="relative overflow-hidden shadow-lg transition-all duration-700">
                <Image
                  src={image}
                  alt={`Hero Image ${i + 1}`}
                  width={720}
                  height={1280}
                  className="w-full h-auto object-cover transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 gap-8 flex justify-between items-center flex-col md:flex-row border-y-2 border-gray-200/60 py-12 md:py-16 relative backdrop-blur-sm">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-300/40 to-transparent hidden md:block" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-300/40 to-transparent hidden md:block" />
        
        <div className="relative">
          <h2 className="font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-none text-left tracking-tighter">
            PORTFOLIO
          </h2>
        </div>
        
        <div className="space-y-6 text-center md:text-left relative">
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary/75 to-primary/20 mx-auto md:mx-0 mb-6" />
          
          <div className="space-y-3 max-w-md">
            <h2 className="text-3xl font-bold tracking-tight hover:tracking-wide transition-all duration-300">
              Rahat Sunil
            </h2>
            <p className="text-lg text-gray-600 font-medium tracking-wider uppercase">
              Project Manager / Content & Social Media Strategist
            </p>
          </div>
          
          <div className="pt-4">
            <Button 
              asChild 
              variant="outline"
            >
              <Link href="/#aboutme" className="relative z-10">
                <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                  Know Me
                </span>
                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300 inline-block opacity-70 group-hover:opacity-100">
                  →
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 left-8 w-2 h-2 bg-gray-300 rounded-full opacity-40 animate-pulse hidden lg:block" />
      <div className="absolute top-3/4 right-12 w-1 h-1 bg-gray-400 rounded-full opacity-60 animate-pulse hidden lg:block" style={{animationDelay: '1s'}} />
      <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-gray-200 rounded-full opacity-30 animate-pulse hidden xl:block" style={{animationDelay: '2s'}} />
    </div>
  )
}