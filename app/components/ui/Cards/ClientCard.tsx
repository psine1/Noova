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
    <div className="rounded-r-lg rounded-t-lg overflow-hidden shadow-sm flex flex-col h-full">

  {/* IMAGE */}
  <div className="h-[250px]">
    <img
      src={image}
      className="w-full h-full object-cover grayscale"
    />
  </div>

  {/* SEPARATOR */}
  <div className="h-[4px] bg-[[[var(--color-primary)]]]" />

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