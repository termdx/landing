import Image from "next/image";
import { Star } from "lucide-react";
import { products } from "@/lib/products";

export default function Products() {
  return (
    <section id="products" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1060px] px-7 pb-[84px] pt-[76px]">
        <div className="mb-9 flex items-baseline gap-3.5">
          <span className="font-mono text-[13px] text-[color:var(--td-accent)]">
            $ ls products/
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {products.map((product) => (
            <article
              key={product.name}
              className="flex flex-col gap-3.5 rounded-xl border border-line bg-bg p-7 transition-colors hover:border-line-hover"
            >
              <div className="flex items-center justify-between">
                <h2 className="m-0 font-mono text-xl font-bold">
                  {product.name}
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-xs text-muted">
                  {product.stars != null && (
                    <>
                      <Star
                        className="h-3 w-3"
                        fill="currentColor"
                        strokeWidth={0}
                      />
                      {product.stars} ·{" "}
                    </>
                  )}
                  {product.badge}
                </span>
              </div>

              <p className="m-0 text-[15px] leading-[1.6] text-muted text-pretty">
                {product.description}
              </p>

              <a
                href={product.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden rounded-lg border border-line"
              >
                <Image
                  src={product.ogImage}
                  alt={`${product.name} on GitHub`}
                  width={1280}
                  height={640}
                  className="h-auto w-full"
                  sizes="(max-width: 768px) 100vw, 490px"
                  loading={product.name === "piper" ? "eager" : "lazy"}
                />
              </a>

              <a
                href={product.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[13.5px] font-medium"
              >
                {product.repoLabel}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
