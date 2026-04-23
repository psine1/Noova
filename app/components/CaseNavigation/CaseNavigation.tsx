import Link from "next/link";

type CaseNavItem = {
  slug: string;
  title: string;
};

type Props = {
  prev: CaseNavItem | null;
  next: CaseNavItem | null;
};

export default function CaseNavigation({ prev, next }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">

      {/* PREV */}
      {prev ? (
        <Link href={`/works/ads/${prev.slug}#case-content`}>
          <div className="p-6 rounded-xl bg-[#111] border border-[#222] hover:border-green-500 transition cursor-pointer">
            <span className="text-sm text-gray-500">← ANTERIOR</span>
            <p className="text-white mt-2 font-medium">
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div /> // espacio vacío para mantener layout
      )}

      {/* NEXT */}
      {next ? (
        <Link href={`/works/ads/${next.slug}#case-content`}>
          <div className="p-6 rounded-xl bg-[#111] border border-[#222] hover:border-green-500 transition cursor-pointer text-right">
            <span className="text-sm text-gray-500">SIGUIENTE →</span>
            <p className="text-white mt-2 font-medium">
              {next.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}

    </div>
  );
}