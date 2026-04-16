import styles from "./Solution.module.css";
import SolutionCard from "../../ui/Cards/SolutionCard";

interface Props {
  images?: string;
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
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {images?.[0] && (
          <div
            className={styles.main} style={{ background: images[0].bg }} >
            <img src={images[0].src} alt="" />
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