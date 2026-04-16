import { FlameIcon, UserIcon, DownloadIcon, TicketIcon } from "../../icons/DesignIcon";
import styles from "./MetricCard.module.css";
// import otros si querés

const iconMap = {
  flame: <FlameIcon />,
  user: <UserIcon />,
  download: <DownloadIcon />,
  ticket: <TicketIcon />,

  // rocket: <RocketIcon />,
  // physics: <PhysicsIcon />,
};

interface Props {
  icon?: string; // 🔥 ESTE ES EL FIX
  value: string;
  title: string;
  content?: string;
}


export default function MetricCard({ icon, value, title, content }: Props) {
  return (
    <div className={styles.metricCard}>
      
      {icon && (
        <div className="mb-4 flex items-center justify-start"
          style={{ color: "var(--color-bg-main)" }}>
          {iconMap[icon]}
        </div>
      )}

      <h3 className={styles.value}>
        {value}
      </h3>

      <p className={styles.title}>
        {title}
      </p>
      <p className={styles.content}>
        {content}
      </p>      
    </div>
  );
}