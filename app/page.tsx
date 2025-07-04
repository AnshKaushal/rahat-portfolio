import React from "react"
import Hero from "./sections/Hero"
import AboutMe from "./sections/AboutMe"
import MyVision from "./sections/MyVision"
import Experience from "./sections/Experience"
import MyProjects from "./sections/MyProjects"
import MyWork from "./sections/MyWork"
import WhoIHaveWorkedWith from "./sections/WhoIHaveWorkedWith"
import ContactMe from "./sections/ContactMe"

export default function page() {
  return (
    <div>
      <Hero />
      <AboutMe />
      <MyVision />
      <Experience />
      <MyProjects />
      <MyWork />
      <WhoIHaveWorkedWith />
      <ContactMe />
    </div>
  )
}
