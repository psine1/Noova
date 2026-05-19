import PortfolioCard from "../../ui/Cards/PortfolioCard";
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

export const portfolioItems: PortfolioItem[] = [
  {
      slug: "/works/case-studies/tricks",
      image: "/images/tricks.jpg",
      logo: "",
      title: "Diseño de Producto · Game Dev",
      description: "Full-service · Desarrollo front-end",
      variant: "default", 
      alt: "Diseño de producto digital para Tricks Studio, estudio de Game Development — por NOOVA"
  },
  {
      slug: "/works/case-studies/tienda-digital",
      image: "/images/tienda.jpg",
      logo: "",
      title: "UX/UI para Plataforma Ecommerce",
      description: "E-commerce · Brand Scaling · Desarrollo front-end",
      variant: "default", 
      alt: "UX UI diseño de plataforma ecommerce Tienda Digital realizado por NOOVA"
  },
  {
      slug: "/works/ads", 
      image: "/images/universal.jpg",
      logo: "",
      title: "Banners HTML5 · Rich Media",
      description: "Animación · Google Ads · Programática",
      variant: "default", 
      alt: "Producción de banners animados Rich Media HTML5 para campañas digitales — por NOOVA"
  },
  
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-12 bg-[var(--color-bg-section)]">
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
            <Link
            key={index}
            href={`${item.slug}`}
            scroll={true}
            className="block"
          >
            <PortfolioCard key={index} {...item} />
            </Link>            
          ))}

        </div>



      </div>
    </section>
  );
}
