import styles from "./PortfolioCard.module.css";

type Props = {
  image: string;
  logo: string;
  title: string;
  description: string;
};

export default function PortfolioCard({
  image,
  logo,
  title,
  description,
}: Props) {
  return (
    <div className={styles.card}>
      
      {/* Background image */}
      <img src={image} alt="" className={styles.image} />

      {/* Logo */}
      <img src={logo} alt="" className={styles.logo} />

      {/* Bottom box */}
      <div className={styles.info}>
        <div className={styles.line}></div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

    </div>
  );
}