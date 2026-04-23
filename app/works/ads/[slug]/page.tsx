import { cases, data } from "./data/cases";

import BannerPreview from "../../../components/BannerPreview/BannerPreview";
import CaseInfo from "../../../components/CaseInfo/CaseInfo";
import CaseNavigation from "../../../components/CaseNavigation/CaseNavigation";
import LandingHero from "../../../components/sections/LandingHero/LandingHero";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";

import styles from "./page.module.css";

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const caseItem = cases.find((c) => c.slug === slug);

  console.log("slug:", slug);
  console.log("cases:", cases.map((c) => c.slug));

  if (!caseItem) {
    return <div>Not found: {slug}</div>;
  }

  const index = cases.findIndex((c) => c.slug === slug);
  const prev = cases[index - 1] || null;
  const next = cases[index + 1] || null;


  return (
    <>
      <Header />

      <main>
        <LandingHero {...data.hero} />

        <section id="case-content" className={styles.section}>
          <div className={styles.container}>

            {/* TOP GRID */}
              <div className="flex gap-3 flex-wrap items-center justify-around mb-8">

              {/* LEFT */}
              <div className="lg:col-span-1">
                <CaseInfo
                  solution={caseItem.solution}
                  stack={caseItem.stack}
                />
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-2">
                <BannerPreview sizes={caseItem.sizes} />
              </div>

            </div>

            {/* NAV */}
            <CaseNavigation prev={prev} next={next} />

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}