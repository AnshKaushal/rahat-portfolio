"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function MyWork() {
  return (
    <div className="w-full md:py-24 py-12" id="mywork">
      <h2 className="font-black text-4xl sm:text-6xl md:text-7xl text-center mb-16 max-w-screen-xl mx-auto px-4">
        My Work
      </h2>

      <section className="overflow-hidden flex flex-col sm:grid sm:grid-cols-2">
        <Image
          height={1080}
          width={1920}
          alt="Alt"
          src="https://picsum.photos/1280/720?random=123"
          className="h-56 w-full object-cover sm:h-full sm:order-2"
        />
        <div className="p-8 md:p-12 lg:px-16 lg:py-24 flex items-center justify-center sm:order-1">
          <div className="mx-auto max-w-xl text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit
            </h2>

            <p className="md:mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
              egestas tempus tellus etiam sed. Quam a scelerisque amet
              ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat
              quisque ut interdum tincidunt duis.
            </p>

            <div className="mt-4 md:mt-8">
              <Button asChild>
                <Link href="/blog">View My Blogs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="overflow-hidden sm:grid sm:grid-cols-2">
        <Image
          height={1080}
          width={1920}
          alt="Alt"
          src="https://picsum.photos/1280/720?random=122"
          className="h-56 w-full object-cover sm:h-full"
        />
        <div className="p-8 md:p-12 lg:px-16 lg:py-24 flex items-center justify-center order-1">
          <div className="mx-auto max-w-xl text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit
            </h2>

            <p className="md:mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
              egestas tempus tellus etiam sed. Quam a scelerisque amet
              ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat
              quisque ut interdum tincidunt duis.
            </p>

            <div className="mt-4 md:mt-8">
              <Button asChild>
                <Link href="/blog">View My Blogs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
