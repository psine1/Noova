import { DiamondIcon, RocketIcon, PhysicsIcon } from "../../icons/DesignIcon";
import ExpertiseCard from "../../ui/Cards/ExpertiseCard";


export const expertiseItems = [
  {
    icon: <DiamondIcon />,
    title: "Product Design",
    description:
      "Diseñamos experiencias digitales escalables, desde el concepto hasta el Design System final. Creamos interfaces que no solo atraen, sino que son técnicamente viables.",
  },
  {
    icon: <RocketIcon />,
    title: "Desarrollo High-Fidelity",
    description:
      "Front-end de precisión que respeta el 100% de tu visión creativa. Cerramos la brecha entre el diseño y el código vivo con ejecución píxel-perfect.",
  },
  {
    icon: <PhysicsIcon  />,
    title: "Rich Media & Motion",
    description:
      "Damos vida a tus activos digitales con animaciones interactivas de alto rendimiento. Movimiento premium optimizado para impactar en cualquier plataforma.",
  },
];

export default function Expertise() {
  return (
    <section className="py-24 bg-[var(--color-bg-section)]">
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
            Expertise que impulsa resultados.
          </h2>

          <p
            className="mt-4 max-w-3xl mx-auto"
            style={{
              fontSize: "var(--text-body)",
              color: "var(--color-text-dark-secondary)",
            }}
          >
            Consolidamos las capacidades clave para llevar cualquier idea al mercado.
            Tres pilares estratégicos diseñados para escalar la calidad de tus productos
            digitales con agilidad y precisión.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {expertiseItems.map((item, index) => (
            <ExpertiseCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}

        </div>



      </div>
    </section>
  );
}