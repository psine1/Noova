import LandingHero from "../../components/sections/LandingHero/LandingHero";
import Header from "../../components/Header/Header";
import GridCards from "../../components/sections/GridCards/GridCards";
import Footer from "../../components/Footer/Footer";

import { ecommerceData } from "./data";

export default function EcommercePage() {
  return (
    <>
    <main className=" ">
      <LandingHero {...ecommerceData.hero} />
      <GridCards data={ecommerceData.metrics} />
      <Footer />

      
    </main>
      <Header />
      </>

  );
}