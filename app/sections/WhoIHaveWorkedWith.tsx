"use client"
import React from "react"
import Image from "next/image"
import Marquee from "react-fast-marquee"

export default function WhoIHaveWorkedWith() {
  const brands = [
    { name: "ajio", logo: "/logos/ajio.png" },
    { name: "novatr", logo: "/logos/novatr.png" },
    { name: "bhive", logo: "/logos/bhive.png" },
    { name: "policybazaar", logo: "/logos/policybazaar.png" },
    { name: "5paisa", logo: "/logos/5paisa.png" },
    { name: "digiligo", logo: "/logos/digiligo.png" },
    { name: "TripXL", logo: "/logos/tripxl.png" },
    { name: "Bajaj", logo: "/logos/bajaj.png" },
    { name: "Acko", logo: "/logos/acko.png" },
    {
      name: "Atal Pension Yojana, Government of India",
      logo: "/logos/atal-pension-yojana.png",
    },
    { name: "Niti Aayog, GOI", logo: "/logos/niti-aayog.png" },
    { name: "The Jurni.io", logo: "/logos/the-jurni.png" },
    { name: "Drip Capital", logo: "/logos/drip-capital.png" },
    { name: "Groww", logo: "/logos/groww.png" },
    { name: "RUPEEZY", logo: "/logos/rupeezy.png" },
    { name: "Magma HDI", logo: "/logos/magma-hdi.png" },
    { name: "Religare", logo: "/logos/religare.png" },
    { name: "Myra", logo: "/logos/myra.png" },
    { name: "Libas", logo: "/logos/libas.png" },
    { name: "TVS Emerald", logo: "/logos/tvs-emerald.png" },
    { name: "House of Indya", logo: "/logos/house-of-indya.png" },
    { name: "House of Indriya", logo: "/logos/house-of-indriya.png" },
    { name: "Doon International School", logo: "/logos/doon-intl-school.png" },
  ]

  return (
    <div className="w-full py-24" id="brandsworked">
      <div className="relative max-w-screen-xl w-full mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-black text-4xl sm:text-6xl md:text-7xl text-center tracking-tight">
            BRANDS I&apos;VE WORKED WITH
          </h2>
        </div>

        <div className="relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />

          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

          <Marquee
            speed={60}
            gradient={false}
            pauseOnHover={true}
            className="py-8 relative"
          >
            {brands.slice(0,11).map((brand) => (
              <div
                key={brand.name}
                className="mx-8 md:mx-12 w-32 md:w-40 flex items-center justify-center"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={160}
                  height={80}
                  className="object-contain"
                />
              </div>
            ))}
          </Marquee>

          <Marquee
            speed={60}
            direction="right"
            gradient={false}
            pauseOnHover={true}
            className="py-8 relative"
          >
            {brands
              .slice(11)
              .reverse()
              .map((brand) => (
                <div
                  key={brand.name}
                  className="mx-8 md:mx-12 w-32 md:w-40 flex items-center justify-center"
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={160}
                    height={80}
                    className="object-contain"
                  />
                </div>
              ))}
          </Marquee>
        </div>
      </div>
    </div>
  )
}
