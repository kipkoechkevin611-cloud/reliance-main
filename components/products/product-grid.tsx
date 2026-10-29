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
      ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6'

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
            className="bg-white rounded-lg sm:rounded-xl border border-border shadow-soft overflow-hidden hover:shadow-lift hover:-translate-y-1 transition-all duration-300 flex flex-col h-full min-w-0 relative"
          >
            <div className="h-[120px] sm:h-[140px] md:h-[150px] lg:h-[180px] bg-background flex items-center justify-center p-2 sm:p-3 lg:p-4 min-h-0 relative">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-w-full max-h-full w-full h-full object-contain"
                />
              ) : (
                <Droplets className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-secondary shrink-0" />
              )}
            </div>
            <div className="p-2 sm:p-3 lg:p-4 flex flex-col flex-1 gap-1.5 sm:gap-2 lg:gap-3 min-w-0">
              <h3 className="font-semibold text-navy text-[11px] sm:text-[13px] lg:text-[14px] xl:text-base leading-snug break-words line-clamp-2 min-h-0">
                {product.name}
              </h3>
              <p className="text-[10px] sm:text-[11px] lg:text-[12px] text-secondary leading-relaxed break-words flex-1 line-clamp-2 min-h-0">
                {product.shortDescription}
              </p>
              <div className="flex flex-col gap-0.5 sm:gap-1 lg:gap-2">
                <span className="text-blue font-semibold text-[11px] sm:text-[12px] lg:text-[13px] xl:text-sm shrink-0">
                  {product.capacityLiters > 0 ? `${product.capacityLiters.toLocaleString()}L` : 'Capacity on request'}
                </span>
                <span className="text-[9px] sm:text-[10px] lg:text-[11px] text-secondary capitalize bg-background px-1.5 py-0.5 sm:px-2 sm:py-0.5 lg:px-3 lg:py-1 rounded-full shrink-0 inline-block max-w-full truncate">
                  {product.category.replace('-', ' ')}
                </span>
              </div>
              {product.price && (
                <div className="text-[15px] sm:text-[17px] lg:text-[19px] xl:text-xl font-bold text-navy break-words">
                  KSh {product.price.toLocaleString()}
                </div>
              )}
              <div className="flex items-center gap-0.5 sm:gap-1 lg:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(product.id, -1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-10 p-0 flex items-center justify-center min-h-[28px] sm:min-h-[32px] lg:min-h-[36px] rounded-lg"
                >
                  <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-4" />
                </Button>
                <span className="w-8 sm:w-10 lg:w-12 text-center font-semibold text-dark text-xs sm:text-sm lg:text-base">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(product.id, 1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-10 p-0 flex items-center justify-center min-h-[28px] sm:min-h-[32px] lg:min-h-[36px] rounded-lg"
                >
                  <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-4" />
                </Button>
              </div>
              <div className="flex flex-col gap-1.5 sm:gap-2 lg:gap-3 pt-0.5 sm:pt-1 mt-auto min-w-0">
                <Link href={`${routes.products}/${product.slug}`} className="w-full min-w-0">
                  <Button variant="secondary" size="md" className="w-full min-h-[36px] sm:min-h-[40px] lg:min-h-[42px] xl:min-h-[44px] text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px]">
                    View Details
                  </Button>
                </Link>
                <div className="flex items-center justify-center">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full min-w-0 font-semibold min-h-[38px] sm:min-h-[42px] lg:min-h-[44px] xl:min-h-[46px] text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px]"
                    type="button"
                    onClick={() => addItem(product, quantity)}
                  >
                    <Plus className="mr-0.5 sm:mr-1 lg:mr-1.5 xl:mr-2 w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-4 shrink-0" />
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
