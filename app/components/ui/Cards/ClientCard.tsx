type Props = {
  image: string;
  title: string;
  description: string;
};

export default function ClientCard({
  image,
  title,
  description,
}: Props) {
  return (
    <div className="group rounded-r-lg rounded-t-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">

      {/* IMAGE */}
      <div className="relative h-[250px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover grayscale transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />
      </div>

      {/* SEPARATOR */}
      <div className="h-[4px] bg-[var(--color-primary)]" />

      {/* FOOTER */}
      <div className="p-5 bg-[#000000] flex-1">
        <h3 className="font-semibold text-[var(--title-card)] text-white" style={{ fontSize: "var(--title-card)" }}>
          {title}
        </h3>

        <p className="mt-2 text-[var(--text-body-card)] text-white/90" style={{ fontSize: "var(--text-body)" }}>
          {description}
        </p>
      </div>

    </div>
  );
}
