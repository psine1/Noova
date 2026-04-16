import type { ReactNode } from "react";
import MetricCard from "../../ui/Cards/MetricCard";
import styles from "./Metrics.module.css";

import { LayersIcon, ChessPieceIcon, ChartNetwork } from "../../icons/DesignIcon";

interface BulletItem {
  icon: "layers" | "chessPiece" | "chartNetwork";
  title: string;
  text: string;
}

interface MetricItem {
  icon?: string;
  value: string;
  title: string;
  content?: string;
}

interface MetricsData {
  label: string;
  title: string;
  description: string;
  bullets: BulletItem[];
  metrics: MetricItem[];
}

interface Props {
  data: MetricsData;
}

const iconMap: Record<string, ReactNode> = {
  layers: <LayersIcon />,
  chessPiece: <ChessPieceIcon />,
  chartNetwork: <ChartNetwork />,
};

export default function Metrics({ data }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.left}>
          <p className={styles.label}>{data.label}</p>

          <h2 className={styles.title}>{data.title}</h2>

          <p className={styles.description}>{data.description}</p>

          <div className={styles.list}>
            {data.bullets.map((item, i) => (
              <div key={i} className={styles.item}>
                
                <div className={styles.icon}>
                  {iconMap[item.icon] || null}
                </div>

                <div className={styles.text}>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {data.metrics.map((item, i) => (
            <MetricCard key={i} {...item} icon={item.icon || ""} />
          ))}
        </div>

      </div>
    </section>
  );
}