import { FlameIcon, UserIcon, DownloadIcon, TicketIcon } from "../../icons/DesignIcon";
import styles from "./SolutionCard.module.css";
// import otros si querés

const iconMap = {
  flame: <FlameIcon />,
  user: <UserIcon />,
  download: <DownloadIcon />,
  ticket: <TicketIcon />,

  // rocket: <RocketIcon />,
  // physics: <PhysicsIcon />,
};

export default function SolutionCard({ icon, value, title, content }) {
  return (
    <div className={styles.solutionCard}>
      
      {icon && (
        <div className="mb-4 flex items-center justify-start"
          style={{ color: "var(--color-bg-main)" }}>
          {iconMap[icon]}
        </div>
      )}


      <p className={styles.title}>
        {title}
      </p>
      <p className={styles.content}>
        {content}
      </p>      
    </div>
  );
}