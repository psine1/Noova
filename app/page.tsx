import Image from "next/image";
import Hero from "./components/sections/Hero/Hero";
import Expertise from "./components/sections/Expertise/Expertise";
import Header from "./components/Header/Header";
import Portfolio from "./components/sections/Portfolio/Portfolio";
import Clients from "./components/sections/Clients/Clients";
import VisionSection from "./components/sections/VisionSection/VisionSection";
import Footer from "./components/sections/Footer/Footer";


export default function Home() {
  return (
    <>
      <Hero />
      <Expertise />
      <Portfolio />
      <Clients />
      <VisionSection />
      <Header />
      <Footer />

    </>
  );
}
