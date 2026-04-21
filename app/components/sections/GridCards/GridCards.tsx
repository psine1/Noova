import { DiamondIcon, RocketIcon, PhysicsIcon } from "../../icons/DesignIcon";
import PortfolioCard from "../../ui/Cards/PortfolioCard";
import styles from "./GridCards.module.css";

type PortfolioItem = {
  image: string;
  logo?: string;
  title: string;
  description: string;
  variant?: "compact" | "default";
};

export const portfolioItems: PortfolioItem[] = [
  {
      image: "/images/ads_thumb/orlando.png",
      logo: "/images/tricks.svg",
      title: "Universal - RichMedia Ads",
      description: "Experiencia inmersiva con lógicas de interacción y video.",
      variant: "compact", 
  },
  {
      image: "/images/ads_thumb/lego_f1.jpg",
      logo: "/images/ads_thumb/logo_lego_f1.png",
      title: "Lego - Banners Ads 360",
      description: "Campaña global con escalado a múltiples formatos HTML5.",
      variant: "compact", 
  },
  {
      image: "/images/ads_thumb/sertal.png",
      logo: "/images/tricks.svg",
      title: "Sertal - Banners Ads 360",
      description: "Producción de alto volumen con optimización de peso.",
      variant: "compact", 
  },
  {
      image: "/images/ads_thumb/goojitzu.jpg",
      logo: "/images/ads_thumb/logo_goojitzu.png",
      title: "Goo Jit zu - Playable Ads",
      description: "Playable Ads con motion graphics de alta fidelidad.",
      variant: "compact", 
  },
  {
      image: "/images/ads_thumb/wonder.png",
      logo: "/images/tricks.svg",
      title: "Sertal - Wonder - Banners Ads",
      description: "Producción de alto volumen con optimización de peso.",
      variant: "compact", 
  },
  {
      image: "/images/ads_thumb/botleo.png",
      logo: "/images/tricks.svg",
      title: "Botle' O - Banners Ads 360",
      description: "Playable Ads con motion graphics de alta fidelidad.",
      variant: "compact", 
  },   
  {
      image: "/images/ads_thumb/resident_evil.jpg",
      logo: "/images/ads_thumb/residentEvil.png",
      title: "Resident Evil - Banners Ads ",
      description: "Formatos de alto impacto con estética pixel-perfect.",
      variant: "compact", 
  },
  {
      image: "/images/ads_thumb/venture_country.png",
      logo: "/images/tricks.svg",
      title: "Ventura - Banners Ads 360",
      description: "Ejecución técnica de piezas para pauta programática.",
      variant: "compact", 
  },
  {
      image: "/images/ads_thumb/cars.png",
      logo: "/images/tricks.svg",
      title: "NHTSA - Banners Ads 360",
      description: "Despliegue de formatos Ads 360 con lineamientos estrictos.",
      variant: "compact", 
  },         
  
];

export default function Portfolio() {
  return (
    <section className={styles.section}>
      <div className="w-[90%] max-w-[1200px] mx-auto">

        {/* Header */}

        {/* Cards */}
        <div className="grid py-12 md:grid-cols-3 gap-6">

          {portfolioItems.map((item, index) => (
            <PortfolioCard key={index} {...item} />
          ))}

        </div>



      </div>
    </section>
  );
}