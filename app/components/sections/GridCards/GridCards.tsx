import PortfolioCard from "../../ui/Cards/PortfolioCard";
import styles from "./GridCards.module.css";
import Link from "next/link";

type PortfolioItem = {
  slug: string; 
  image: string;
  logo?: string;
  title: string;
  description: string;
  alt: string;
  variant?: "compact" | "default";
};

type Props = {
  items: PortfolioItem[];
};



export const portfolioItems: PortfolioItem[] = [
  {
      slug: "universal-ads",
      image: "/images/ads_thumb/orlando.png",
      logo: "/images/ads_thumb/logo_universal.png",
      title: "Universal · Rich Media interactivo",
      alt: "Universal RichMedia Ads producido por NOOVA",
      description: "Video HTML5 con lógicas de interacción.",
      variant: "compact", 
  },
  {
      slug: "lego-ads",
      image: "/images/ads_thumb/lego_f1.jpg",
      logo: "/images/ads_thumb/logo_lego_f1.png",
      title: "Lego · Campaña global HTML",
      alt: "Lego Banners Ads 360 producido por NOOVA",
      description: "Escalado a múltiples formatos y mercados",
      variant: "compact", 
  },
  {
      slug: "subway-ads",
      image: "/images/ads_thumb/subway.png",
      logo: "/images/ads_thumb/logo_subway.png",
      title: "Subway · Producción de playable ad",
      alt: "Subway Banner Ads playable producido por NOOVA",
      description: "Motion graphics con mecánicas jugables.",
      variant: "compact", 
  },
  {
      slug: "goojitzu-ads",
      image: "/images/ads_thumb/goojitzu.jpg",
      logo: "/images/ads_thumb/logo_goojitzu.png",
      title: "Goo Jit Zu · Playable Ads",
      alt: "Goo Jit zu Playable Ads producido por NOOVA",
      description: "Motion graphics con mecánicas jugables.",
      variant: "compact", 
  },
  {
      slug: "wonder-ads",
      image: "/images/ads_thumb/wonder.png",
      logo: "/images/ads_thumb/logo_wonder.png",
      title: "Wonder · Formatos estándar",
      alt: "Wonder Banners Ads producido por NOOVA",
      description: "Máxima visibilidad en pauta programática.",
      variant: "compact", 
  },
  {
    slug: "bottleo-ads",
      image: "/images/ads_thumb/botleo.png",
      logo: "/images/ads_thumb/logo_botleo.png",
      title: "Botle' O - Playable Ads",
      alt: "Botle O Banners Ads 360 producido por NOOVA",
      description: "Playable Ads con Geolocalización y juegos interactivo.",
      variant: "compact", 
  },   
  {
    slug: "resident-evil-ads",
      image: "/images/ads_thumb/resident_evil.jpg",
      logo: "/images/ads_thumb/residentEvil.png",
      title: "Resident Evil · Banners Ads ",
      alt: "Resident Evil Banners Ads producido por NOOVA",
      description: "Pixel-perfect para campaña global.",
      variant: "compact", 
  },
  {
    slug: "ventura-country-ads",
      image: "/images/ads_thumb/venture_country.png",
      logo: "/images/ads_thumb/logo_ventura.png",
      title: "Ventura · Banners Ads 360",
      alt: "Ventura Banners Ads 360 producido por NOOVA",
      description: "Piezas para pauta programática en EEUU.",
      variant: "compact", 
  },
  {
    slug: "nhtsa-ads",
      image: "/images/ads_thumb/cars.png",
      logo: "/images/ads_thumb/logo_nhtsa.png",
      title: "NHTSA · Banners Ads 360",
      alt: "NHTSA Banners Ads 360 producido por NOOVA",
      description: "Formatos regulados para campaña federal.",
      variant: "compact", 
  },         
  
];

export default function GridCards({ items = portfolioItems }: Props) {
  return (
    <section className={styles.section}>
      <div className="w-[90%] max-w-[1200px] mx-auto">

        <div className="grid py-12 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <Link
            key={index}
            href={`/works/ads/${item.slug}`}
            className="block hover:scale-[1.02] transition-transform"
          >
              <PortfolioCard {...item} />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
