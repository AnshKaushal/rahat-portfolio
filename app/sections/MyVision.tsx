import Image from "next/image"

export default function MyVision() {
  return (
    <section
      className="flex flex-col lg:flex-row min-h-screen items-stretch"
      id="myvision"
    >
      <div className="w-full lg:w-1/2 relative aspect-[3/4] lg:aspect-auto">
        <Image
          src="https://picsum.photos/800/1200"
          alt="Model"
          fill
          className="object-cover md:rounded-r-[56px]"
        />
      </div>

      <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
        <h1 className="text-[3rem] sm:text-[7rem] leading-tight font-semibold">
          Who’s <br />
          that <br />
          <span className="text-[4rem] sm:text-[6rem] font-bold italic">
            girl?
          </span>
        </h1>

        <p className="md:text-xl text-md mt-6 max-w-xl">
          Model <strong>ABBEY LEE</strong> turns her attention to{" "}
          <strong>ACTING</strong> with her debut role in the upcoming{" "}
          <em>Mad Max: Fury Road</em>, writes <strong>Sophie Heilmans</strong>.
          Styled by
          <strong> Christine Centenera</strong>. Photographed by{" "}
          <strong>Gilles Bensimon</strong>.
        </p>

        <p className="mt-6 md:text-xl text-md leading-relaxed max-w-xl">
          Abbey Lee is striking, camel-like, atop ragged sandstone cliffs...
          <br />
          <br />
          Abbey Lee has shared that over the past seven years, she was back in
          Sydney over Christmas to reboot scenes for <em>Mad Max: Fury...</em>
        </p>
      </div>
    </section>
  )
}
