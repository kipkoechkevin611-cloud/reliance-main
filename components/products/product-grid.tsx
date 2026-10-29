'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Droplets, Plus, Minus } from 'lucide-react'
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
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const gridClass =
    columns === 'featured'
      ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6'

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1
      const newQty = Math.max(1, current + delta)
      return { ...prev, [productId]: newQty }
    })
  }

  return (
    <div className={gridClass}>
      {products.map((product) => {
        const quantity = quantities[product.id] || 1
        return (
          <article
            key={product.id}
            className="bg-white rounded-xl border border-border shadow-soft overflow-hidden hover:shadow-lift hover:-translate-y-1 transition-all duration-300 flex flex-col h-full min-w-0 relative"
          >
            <div className="h-[140px] sm:h-[150px] md:h-[180px] bg-background flex items-center justify-center p-3 sm:p-4 min-h-0 relative">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-w-full max-h-full w-full h-full object-contain"
                />
              ) : (
                <Droplets className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-secondary shrink-0" />
              )}
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-1 gap-2 sm:gap-3 min-w-0">
              <h3 className="font-semibold text-navy text-[14px] sm:text-[15px] md:text-base leading-snug break-words line-clamp-2 min-h-0">
                {product.name}
              </h3>
              <p className="text-[12px] sm:text-[13px] text-secondary leading-relaxed break-words flex-1 line-clamp-2 min-h-0">
                {product.shortDescription}
              </p>
              <div className="flex flex-col gap-1 sm:gap-2">
                <span className="text-blue font-semibold text-[13px] sm:text-sm md:text-base shrink-0">
                  {product.capacityLiters > 0 ? `${product.capacityLiters.toLocaleString()}L` : 'Capacity on request'}
                </span>
                <span className="text-[11px] sm:text-xs text-secondary capitalize bg-background px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shrink-0 inline-block max-w-full truncate">
                  {product.category.replace('-', ' ')}
                </span>
              </div>
              {product.price && (
                <div className="text-[19px] sm:text-xl md:text-2xl font-bold text-navy break-words">
                  KSh {product.price.toLocaleString()}
                </div>
              )}
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(product.id, -1)}
                  className="w-9 h-9 sm:w-10 sm:h-10 p-0 flex items-center justify-center min-h-[36px] sm:min-h-[40px] rounded-lg"
                >
                  <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <span className="w-10 sm:w-12 text-center font-semibold text-dark text-sm sm:text-base">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(product.id, 1)}
                  className="w-9 h-9 sm:w-10 sm:h-10 p-0 flex items-center justify-center min-h-[36px] sm:min-h-[40px] rounded-lg"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 pt-1 mt-auto min-w-0">
                <Link href={`${routes.products}/${product.slug}`} className="w-full min-w-0">
                  <Button variant="secondary" size="md" className="w-full min-h-[42px] sm:min-h-[44px] text-[13px] sm:text-[14px]">
                    View Details
                  </Button>
                </Link>
                <div className="flex items-center justify-center">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full min-w-0 font-semibold min-h-[44px] sm:min-h-[46px] text-[13px] sm:text-[14px]"
                    type="button"
                    onClick={() => addItem(product, quantity)}
                  >
                    <Plus className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
