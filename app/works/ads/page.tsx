import LandingHero from "../../components/sections/LandingHero/LandingHero";
import Header from "../../components/Header/Header";
import GridCards, { portfolioItems } from "../../components/sections/GridCards/GridCards";
import Footer from "../../components/Footer/Footer";


import { ecommerceData } from "./data";

export default function EcommercePage() {
  return (
    <>
    <Header />   
    <main className=" ">
      <LandingHero {...ecommerceData.hero} />
      <GridCards items={portfolioItems} />

      
    </main>
    <Footer />


      </>

  );
}