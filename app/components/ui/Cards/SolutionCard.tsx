import { FlameIcon, UserIcon, DownloadIcon, TicketIcon } from "../../icons/DesignIcon";
import styles from "./SolutionCard.module.css";
import type { ReactNode } from "react";

export type SolutionIcon = "flame" | "user" | "download" | "ticket";

const iconMap: Record<SolutionIcon, ReactNode> = {
  flame: <FlameIcon />,
  user: <UserIcon />,
  download: <DownloadIcon />,
  ticket: <TicketIcon />,
};

interface Props {
  icon?: SolutionIcon;
  value?: string;
  title: string;
  content?: string;
}

export default function SolutionCard({ icon, value, title, content }: Props) {
  return (
    <div className={styles.solutionCard}>
      
      {icon && (
        <div
          className="mb-4 flex items-center justify-start"
          style={{ color: "var(--color-bg-main)" }}
        >
          {iconMap[icon]}
        </div>
      )}

      {value && <h3 className={styles.value}>{value}</h3>}

      <p className={styles.title}>{title}</p>

      {content && <p className={styles.content}>{content}</p>}
    </div>
  );
}