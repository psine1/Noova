import styles from "./Solution.module.css";
import SolutionCard from "../../ui/Cards/SolutionCard";

interface ImageItem {
  src: string;
  bg?: string;
}

interface Props {
  images?: ImageItem[];
  label: string;
  description?: string;
  title?: string;
  content?: any[];
}

export default function Solution({
  images,
  label,
  title,
  content,
}: Props) {
  const mainImage = images?.[0];

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {mainImage && (
          <div
            className={styles.main}
            style={{ background: mainImage.bg || "#0a0a0a" }}
          >
            <img src={mainImage.src} alt="" />
          </div>
        )}

        <div className={styles.left}>
          <p className={styles.label}>{label}</p>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <div className={styles.grid}>
          {content?.map((item, i) => (
            <SolutionCard key={i} {...item} />
          ))}
        </div>

      </div>
    </section>
  );
}