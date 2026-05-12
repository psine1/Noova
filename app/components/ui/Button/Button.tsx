import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

type LinkButtonProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

type Props = (ButtonProps | LinkButtonProps) & { children: React.ReactNode };

function isLinkButton(props: Props): props is LinkButtonProps & {
  children: React.ReactNode;
} {
  return "href" in props;
}

export default function Button(props: Props) {
  const { children, className = "" } = props;

  if (isLinkButton(props)) {
    const { href, children, className = "", ...linkProps } = props;
    return (
      <Link className={`${styles.cta} ${className}`} href={href} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={`${styles.cta} ${className}`}>
      {children}
    </button>
  );
}
