import clsx from "clsx";
import { ReactNode, ElementType } from "react";

type Props = {
  as?: ElementType;
  variant?: "display" | "section" | "card" | "body" | "small";
  children: ReactNode;
  className?: string;
};

export default function Text({
  as: Tag = "p",
  variant = "body",
  children,
  className,
}: Props) {
  return (
    <Tag
      className={clsx(
        {
          "font-heading text-display font-bold tracking-tight": variant === "display",
          "font-heading text-section font-semibold tracking-tight": variant === "section",
          "font-heading text-card font-semibold": variant === "card",
          "text-body text-neutral-600": variant === "body",
          "text-small text-neutral-500": variant === "small",
        },
        className
      )}
    >
      {children}
    </Tag>
  );
}