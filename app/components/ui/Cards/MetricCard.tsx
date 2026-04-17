import { FlameIcon, UserIcon, DownloadIcon, TicketIcon } from "../../icons/DesignIcon";
import styles from "./MetricCard.module.css";
import type { ReactNode } from "react";

export type MetricIcon = "flame" | "user" | "download" | "ticket";

const iconMap: Record<MetricIcon, ReactNode> = {
  flame: <FlameIcon />,
  user: <UserIcon />,
  download: <DownloadIcon />,
  ticket: <TicketIcon />,
  
};

interface Props {
  icon?: MetricIcon;
  value: string;
  title: string;
  content?: string;
  
}

export default function MetricCard({ icon, value, title, content }: Props) {
  return (
    <div className={styles.metricCard}>
      
      {icon && (
        <div
          className="mb-4 flex items-center justify-start"
          style={{ color: "var(--color-bg-main)" }}
        >
          {iconMap[icon]}
        </div>
      )}

      <h3 className={styles.value}>{value}</h3>

      <p className={styles.title}>{title}</p>

      {content && <p className={styles.content}>{content}</p>}
    </div>
  );
}