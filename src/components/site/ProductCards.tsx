import { products, type ProductId } from "@/content/catalog";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { StatusBadge } from "./ui";
import { CoolingOsMark } from "./visuals";

// A row of product cards linking into the Products page.
export default function ProductCards({ ids }: { ids: ProductId[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ids.map((id) => {
        const product = products[id];
        return (
          <li key={id}>
            <Link
              to={`/products#${id}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-gray-400"
            >
              <div
                className={`flex aspect-[4/3] items-center justify-center overflow-hidden ${product.image ? "bg-gray-50" : "bg-navy"}`}
              >
                {product.image ? (
                  <img
                    src={product.image.src}
                    alt=""
                    width={product.image.width}
                    height={product.image.height}
                    loading="lazy"
                    className="h-full w-full object-contain p-6"
                  />
                ) : (
                  <CoolingOsMark compact />
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3">
                  <StatusBadge status={product.status} />
                </div>
                <h3 className="font-serif text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-gray-600">
                  {product.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  View product
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
