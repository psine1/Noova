import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

type Props = (ButtonProps | LinkProps) & { children: React.ReactNode };

export default function Button({ children, className = "", ...props }: Props) {
  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;

    return (
      <Link className={`${styles.cta} ${className}`} href={href} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${styles.cta} ${className}`} {...props}>
      {children}
    </button>
  );
}
