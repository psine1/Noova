import styles from "./PortfolioCard.module.css";

type Props = {
  image: string;
  logo?: string;
  title: string;
  description: string;
  variant?: "default" | "compact";
};

export default function PortfolioCard({
  image,
  logo,
  title,
  description,
  variant = "default",
}: Props) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      
      {/* Background image */}
      <img src={image} alt="" className={styles.image} />

      {/* Logo (condicional) */}
      {logo && (
        <img src={logo} alt="" className={styles.logo} />
      )}

      {/* Bottom box */}
      <div className={styles.info}>
        <div className={styles.line}></div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

    </div>
  );
}