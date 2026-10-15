'use client'

import Link from 'next/link'
import { Droplets, Plus } from 'lucide-react'
import { routes } from '../../lib/routes'
import { Button } from '../ui/button'
import { useCart } from '../../lib/cart-context'
import type { Product } from '../../types/product'

interface ProductGridProps {
  products: Product[]
  columns?: 'shop' | 'featured'
}

export function ProductGrid({ products, columns = 'shop' }: ProductGridProps) {
  const { addItem } = useCart()

  const gridClass =
    columns === 'featured'
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
      : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <article
          key={product.id}
          className="bg-white rounded-lg border border-[#D9E2EC] shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full min-w-0"
        >
          <div className="aspect-[4/3] bg-[#F4F7FA] flex items-center justify-center p-6 min-h-0">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            ) : (
              <Droplets className="w-16 h-16 text-[#526575] shrink-0" />
            )}
          </div>
          <div className="p-6 flex flex-col flex-1 gap-4 min-w-0">
            <h3 className="font-semibold text-[#172B3A] text-lg leading-snug break-words">
              {product.name}
            </h3>
            <p className="text-base text-[#526575] leading-relaxed break-words flex-1">
              {product.shortDescription}
            </p>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="text-[#0D9488] font-semibold text-lg">
                {product.capacityLiters.toLocaleString()}L
              </span>
              <span className="text-sm text-[#526575] capitalize bg-[#F4F7FA] px-3 py-1.5 rounded-full">
                {product.category}
              </span>
            </div>
            <div className="flex flex-col gap-3 pt-1 mt-auto">
              <Link href={`${routes.products}/${product.slug}`} className="w-full min-w-0">
                <Button variant="outline" size="md" textSize="sm" className="w-full">
                  View Details
                </Button>
              </Link>
              <Button
                variant="primary"
                size="md"
                textSize="sm"
                className="w-full min-w-0"
                onClick={() => addItem(product, 1)}
              >
                <Plus className="mr-1 w-4 h-4 shrink-0" />
                Add to Cart
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
