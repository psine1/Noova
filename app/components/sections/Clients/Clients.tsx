import ClientCard from "../../ui/Cards/ClientCard";


export const clientsItems = [
  {
      image: "/images/client_img1.png",
      title: "Startups & SaaS",
      description: "Diseño y desarrollo front-end para lanzar tu MVP o escalar tu producto actual con una base sólida."
  },
  {
      image: "/images/client_img2.png",
      title: "Equipos de Producto",
      description: "Apoyo en diseño de interfaz y construcción de componentes para acelerar tus tiempos de entrega."
  },
  {
      image: "/images/client_img3.png",
      title: "Agencias",
      description: "Producción técnica de interfaces, prototipos y piezas de Rich Media bajo tus lineamientos."
  },
  
];

export default function Clients() {
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
            Con quiénes trabajamos.
          </h2>

          <p
            className="mt-4 max-w-2xl mx-auto"
            style={{
              fontSize: "var(--text-body)",
              color: "var(--color-text-dark-secondary)",
            }}
          >
            Nos sumamos a equipos y proyectos que buscan una ejecución visual y técnica de alto nivel.
Resolvemos la capa de experiencia e interfaz, integrándonos con tus procesos y tecnología
para asegurar el resultado final.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {clientsItems.map((item, index) => (
            <ClientCard
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          ))}

        </div>



      </div>
    </section>
  );
}