import { cases } from "./data/cases";

import BannerPreview from "../../../components/BannerPreview/BannerPreview";
import CaseInfo from "../../../components/CaseInfo/CaseInfo";
import CaseNavigation from "../../../components/CaseNavigation/CaseNavigation";

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
    <section className={styles.section}>
      <div className={styles.container}>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 items-start">

          <CaseInfo
            solution={caseItem.solution}
            stack={caseItem.stack}
          />

          <BannerPreview sizes={caseItem.sizes} />

        </div>

        <CaseNavigation prev={prev} next={next} />

      </div>
    </section>
  );
}