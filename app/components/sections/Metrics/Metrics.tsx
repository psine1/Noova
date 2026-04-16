import MetricCard from "../../ui/Cards/MetricCard";
import styles from "./Metrics.module.css";

import { LayersIcon, ChessPieceIcon, ChartNetwork } from "../../icons/DesignIcon";

const iconMap = {
  layers: <LayersIcon />,
  chessPiece: <ChessPieceIcon />,
  chartNetwork: <ChartNetwork />,

};

export default function Metrics({ data }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* LEFT */}
        <div className={styles.left}>
          <p className={styles.label}>
            {data.label}
          </p>

          <h2 className={styles.title}>
            {data.title}
          </h2>

          <p className={styles.description}>
            {data.description} 
          </p>

          <div className={styles.list}>
            {data.bullets.map((item, i) => (
              <div key={i} className={styles.item}>
                
                {/* ICONO */}
                <div className={styles.icon}>
                  {iconMap[item.icon]}
                </div>

                {/* TEXTO */}
                <div className={styles.text}>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* RIGHT */}
        <div className={styles.grid}>
          {data.metrics.map((item, i) => (
            <MetricCard key={i} {...item} />
          ))}
        </div>

      </div>
    </section>
  );
}