import { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
};

export default function ExpertiseCard({
  icon,
  title,
  description,
  className,
}: Props) {
  return (
    <div
      className={`p-6 rounded-xl border border-black/10 bg-white shadow-sm hover:shadow-md hover:bg-[#4AFF96] transition ${className || ""}`}
    >
      {/* ICON */}
      {icon && (
        <div
          className="mb-4 flex items-center justify-start"
          style={{ color: "var(--color-bg-main)" }}
        >
          {icon}
        </div>
      )}

      {/* TITLE */}
      <h3
        className="font-semibold"
        style={{
          fontSize: "var(--text-card)",
          color: "var(--color-text-dark)",
        }}
      >
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p
        className="mt-2"
        style={{
          fontSize: "var(--text-body)",
          color: "var(--color-text-dark-secondary)",
        }}
      >
        {description}
      </p>
    </div>
  );
}