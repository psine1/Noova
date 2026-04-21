import { DiamondIcon, RocketIcon, PhysicsIcon } from "../../icons/DesignIcon";
import PortfolioCard from "../../ui/Cards/PortfolioCard";
import styles from "./GridCards.module.css";
import Link from "next/link";

type PortfolioItem = {
  slug: string; 
  image: string;
  logo?: string;
  title: string;
  description: string;
  variant?: "compact" | "default";
};

type Props = {
  items: PortfolioItem[];
};



export const portfolioItems: PortfolioItem[] = [
  {
      slug: "universal-ads",
      image: "/images/ads_thumb/orlando.png",
      logo: "/images/tricks.svg",
      title: "Universal - RichMedia Ads",
      description: "Experiencia inmersiva con lógicas de interacción y video.",
      variant: "compact", 
  },
  {
      slug: "lego-ads",
      image: "/images/ads_thumb/lego_f1.jpg",
      logo: "/images/ads_thumb/logo_lego_f1.png",
      title: "Lego - Banners Ads 360",
      description: "Campaña global con escalado a múltiples formatos HTML5.",
      variant: "compact", 
  },
  {
      slug: "sertal-ads",
      image: "/images/ads_thumb/sertal.png",
      logo: "/images/tricks.svg",
      title: "Sertal - Banners Ads 360",
      description: "Producción de alto volumen con optimización de peso.",
      variant: "compact", 
  },
  {
      slug: "goojitzu-ads",
      image: "/images/ads_thumb/goojitzu.jpg",
      logo: "/images/ads_thumb/logo_goojitzu.png",
      title: "Goo Jit zu - Playable Ads",
      description: "Playable Ads con motion graphics de alta fidelidad.",
      variant: "compact", 
  },
  {
      slug: "wonder-ads",
      image: "/images/ads_thumb/wonder.png",
      logo: "/images/tricks.svg",
      title: "Sertal - Wonder - Banners Ads",
      description: "Producción de alto volumen con optimización de peso.",
      variant: "compact", 
  },
  {
    slug: "bottleo-ads",
      image: "/images/ads_thumb/botleo.png",
      logo: "/images/tricks.svg",
      title: "Botle' O - Banners Ads 360",
      description: "Playable Ads con motion graphics de alta fidelidad.",
      variant: "compact", 
  },   
  {
    slug: "resident-evil-ads",
      image: "/images/ads_thumb/resident_evil.jpg",
      logo: "/images/ads_thumb/residentEvil.png",
      title: "Resident Evil - Banners Ads ",
      description: "Formatos de alto impacto con estética pixel-perfect.",
      variant: "compact", 
  },
  {
    slug: "ventura-country-ads",
      image: "/images/ads_thumb/venture_country.png",
      logo: "/images/tricks.svg",
      title: "Ventura - Banners Ads 360",
      description: "Ejecución técnica de piezas para pauta programática.",
      variant: "compact", 
  },
  {
    slug: "nhtsa-ads",
      image: "/images/ads_thumb/cars.png",
      logo: "/images/tricks.svg",
      title: "NHTSA - Banners Ads 360",
      description: "Despliegue de formatos Ads 360 con lineamientos estrictos.",
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