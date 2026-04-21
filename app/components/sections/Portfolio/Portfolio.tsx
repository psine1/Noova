import { DiamondIcon, RocketIcon, PhysicsIcon } from "../../icons/DesignIcon";
import PortfolioCard from "../../ui/Cards/PortfolioCard";

type PortfolioItem = {
  image: string;
  logo?: string;
  title: string;
  description: string;
  variant?: "compact" | "default";
};

export const portfolioItems: PortfolioItem[] = [
  {
      image: "/images/tricks.jpg",
      logo: "/images/tricks.svg",
      title: "Tricks Studio",
      description: "Full-service Game Development",
      variant: "default", 
  },
  {
      image: "/images/tienda.jpg",
      logo: "/images/tricks.svg",
      title: "Tienda Digital",
      description: "Plataforma flexible para vender online sin intermediarios",
      variant: "default", 
  },
  {
      image: "/images/universal.jpg",
      logo: "/images/tricks.svg",
      title: "Universal Orlando Resoty",
      description: "Rich Media Ad, for Universal Orlando Resort's 2025",
      variant: "default", 
  },
  
];

export default function Portfolio() {
  return (
    <section className="py-12 bg-[var(--color-bg-section)]">
      <div className="w-[90%] max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="font-semibold"
            style={{
              fontSize: "var(--text-main-heading)",
              color: "var(--color-text-dark)",
            }}
          >
            Nuestra visión puesta a prueba.
          </h2>

          <p
            className="mt-4 max-w-2xl mx-auto"
            style={{
              fontSize: "var(--text-body)",
              color: "var(--color-text-dark-secondary)",
            }}
          >
            Una muestra de cómo llevamos cada concepto al límite para crear productos digitales que funcionan y destacan.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {portfolioItems.map((item, index) => (
            <PortfolioCard key={index} {...item} />
          ))}

        </div>



      </div>
    </section>
  );
}