import { caseStudies } from "../data";
import { notFound } from "next/navigation";

import LandingHero from "../../../components/sections/LandingHero/LandingHero";
import Metrics from "../../../components/sections/Metrics/Metrics";
import Header from "../../../components/Header/Header";
import Solution from "../../../components/sections/Solution/Solution";
import MediaShowcase from "../../../components/sections/MediaShowcase/MediaShowcase";
import Footer from "../../../components/Footer/Footer";

type Props = {
  params: {
    slug: string;
  };
};



export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;

  const data = caseStudies[slug as keyof typeof caseStudies];

  if (!data) return notFound();

  return (
    <>
      <main>
        <LandingHero {...data.hero} />
        <Metrics data={data.metrics} />
        <Solution {...data.solution} />
        <MediaShowcase {...data.media} />
        <Footer />
      </main>
      <Header />
    </>
  );
}