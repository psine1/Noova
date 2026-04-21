"use client";

import { useState } from "react";

type BannerSize = {
  label: string;
  width: number;
  height: number;
  src: string;
};

type Props = {
  sizes: BannerSize[];
};

export default function BannerPreview({ sizes }: Props) {
  const [active, setActive] = useState<BannerSize>(sizes[0]);
  const [reloadKey, setReloadKey] = useState(0);

  const handleChangeSize = (size: BannerSize) => {
    setActive(size);
    setReloadKey((prev) => prev + 1); // 👈 reinicia al cambiar size
  };

  const handleRestart = () => {
    setReloadKey((prev) => prev + 1); // 👈 restart manual
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] p-8">

      {/* BOTONES */}
      <div className="flex gap-3 mb-6 flex-wrap items-center">

        {sizes.map((size) => (
          <button
            key={size.label}
            onClick={() => handleChangeSize(size)}
            className={`px-4 py-2 rounded-full text-sm transition
              ${
                active.label === size.label
                  ? "bg-green-500 text-black"
                  : "bg-[#1f1f1f] text-gray-400 hover:bg-green-500 hover:text-black"
              }`}
          >
            {size.label}
          </button>
        ))}

        {/* RESTART BUTTON */}
        <button
          onClick={handleRestart}
          className="ml-2 px-3 py-2 rounded-full text-sm bg-[#1f1f1f] text-gray-400 hover:bg-green-500 hover:text-black transition"
        >
          ↻ Restart
        </button>

      </div>

      {/* STAGE */}
      <div className="flex justify-center items-start">
        <div
          style={{
            width: active.width,
            height: active.height,
          }}
        >
          <iframe
            key={`${active.src}-${reloadKey}`} // 👈 CLAVE
            src={active.src}
            width={active.width}
            height={active.height}
            className="border-0 bg-black"
          />
        </div>
      </div>

    </div>
  );
}