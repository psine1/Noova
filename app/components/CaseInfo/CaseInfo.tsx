type Props = {
  description?: string;
  solution: string[];
  stack: string[];
};

export default function CaseInfo({
  description,
  solution,
  stack,
}: Props) {
  return (
    <div className="flex flex-col gap-6">

      {/* SOLUCIÓN */}
      <div className="rounded-2xl bg-[#111] p-6 border border-[#222]">
        <h3 className="text-green-400 font-semibold mb-4 tracking-wide">
          LA SOLUCIÓN
        </h3>

        {description && (
          <p className="text-gray-400 mb-4">
            {description}
          </p>
        )}

        <ul className="space-y-2 text-gray-300">
          {solution.map((item, i) => (
            <li key={i}>→ {item}</li>
          ))}
        </ul>
      </div>

      {/* STACK */}
      <div className="rounded-2xl bg-[#111] p-6 border border-[#222]">
        <h3 className="text-green-400 font-semibold mb-4 tracking-wide">
          STACK TÉCNICO
        </h3>

        <div className="flex flex-wrap gap-3">
          {stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-[#1a1a1a] text-sm text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}