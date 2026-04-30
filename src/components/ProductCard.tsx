import type { PublicProduct } from "@/lib/product-queries";
import { formatProductPrice } from "@/lib/product-utils";

type ProductCardProps = {
  product: PublicProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card group flex min-w-0 flex-col overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#0f4fc9]/40 hover:shadow-xl hover:shadow-blue-100">
      <div className="shine-frame relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          width="600"
          height="600"
          loading="lazy"
          decoding="async"
        />
        <span className="absolute left-2 top-2 rounded-md bg-[#0f4fc9] px-2 py-1 text-[11px] font-semibold text-white">
          {product.categoryName ?? "พร้อมขาย"}
        </span>
        <span className="absolute right-2 top-2 rounded-md bg-[#ff8a1d] px-2 py-1 text-[11px] font-extrabold text-white shadow-md">
          {product.brandName ?? "ราคาคุ้ม"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-slate-950 sm:min-h-12 sm:text-base sm:leading-6">
          {product.name}
        </h3>
        <p className="animate-price-pop mt-2 rounded-md bg-orange-50 px-2 py-2 text-lg font-extrabold leading-tight text-[#df4f00] ring-1 ring-orange-100 sm:text-xl">
          {formatProductPrice(product.price)}
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          สอบถามสถานะล่าสุดและดูรายละเอียดผ่านโพสต์ร้าน
        </p>

        <a
          href={product.fbPostUrl}
          target="_blank"
          rel="noreferrer"
          className="cta-sweep mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#1877f2] px-3 py-2 text-center text-xs font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#0f63d6] focus:outline-none focus:ring-2 focus:ring-blue-300 active:translate-y-0 sm:text-sm"
        >
          ดูรายละเอียด / สั่งซื้อ →
        </a>
      </div>
    </article>
  );
}
