import Image from "next/image"
import React from "react"

export default function AboutMe() {
  return (
    <div className="w-full" id="aboutme">
      <Image
        src="https://dummyimage.com/1920x1080/fcf7ff/0a0a0a?text=rahat+image"
        alt="Image"
        height={1080}
        width={1920}
        priority
        className="w-full h-full md:block hidden"
      />
      <Image
        src="https://dummyimage.com/1080x1920/fcf7ff/0a0a0a?text=rahat+image"
        alt="Image"
        height={1080}
        width={1920}
        priority
        className="w-full h-full md:hidden block"
      />
    </div>
  )
}
