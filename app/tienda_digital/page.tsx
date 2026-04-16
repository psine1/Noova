import LandingHero from "../components/sections/LandingHero/LandingHero";
import Metrics from "../components/sections/Metrics/Metrics";
import Header from "../components/Header/Header";
import Solution from "../components/sections/Solution/Solution";
import MediaShowcase from "../components/sections/MediaShowcase/MediaShowcase";
import Footer from "../components/sections/Footer/Footer";

import { ecommerceData } from "./data";

export default function EcommercePage() {
  return (
    <>
    <main className=" ">
      <LandingHero {...ecommerceData.hero} />
      <Metrics data={ecommerceData.metrics} />
      <Solution {...ecommerceData.solution} />
      <MediaShowcase {...ecommerceData.media} />
      <Footer />

      
    </main>
      <Header />
      </>

  );
}