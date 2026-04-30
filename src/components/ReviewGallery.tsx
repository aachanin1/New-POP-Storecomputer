"use client";

import { useEffect, useState } from "react";

type ReviewGalleryProps = {
  images: string[];
};

export function ReviewGallery({ images }: ReviewGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (!activeImage) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`group relative overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm outline-none transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100 focus:ring-2 focus:ring-[#0f4fc9] ${
              index === 1 ? "lg:col-span-2" : ""
            }`}
            aria-label={`ดูภาพรีวิวหน้าร้าน POP Store Computer ${index + 1}`}
          >
            <img
              src={image}
              alt={`ภาพรีวิวหน้าร้าน POP Store Computer ${index + 1}`}
              className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <span className="absolute inset-x-3 bottom-3 rounded-md bg-slate-950/80 px-3 py-2 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100">
              กดเพื่อดูรูปใหญ่
            </span>
          </button>
        ))}
      </div>

      {activeImage ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/85 p-4 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="absolute right-4 top-4 rounded-md bg-white px-3 py-2 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
          >
            ปิด
          </button>
          <img
            src={activeImage}
            alt="ภาพรีวิวหน้าร้าน POP Store Computer แบบขยาย"
            className="max-h-[86vh] max-w-[94vw] rounded-lg bg-white object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
