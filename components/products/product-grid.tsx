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
      ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'

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
            className="bg-white rounded-2xl border border-border shadow-soft overflow-hidden hover:shadow-lift hover:-translate-y-1 transition-all duration-300 flex flex-col h-full min-w-0 relative"
          >
            <div className="aspect-square bg-background flex items-center justify-center p-6 min-h-0 relative">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-w-full max-h-full w-full h-full object-contain"
                />
              ) : (
                <Droplets className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-secondary shrink-0" />
              )}
            </div>
            <div className="p-5 sm:p-6 flex flex-col flex-1 gap-3 min-w-0">
              <h3 className="font-semibold text-navy text-sm sm:text-base leading-snug break-words line-clamp-2 min-h-0">
                {product.name}
              </h3>
              <p className="text-sm text-secondary leading-relaxed break-words flex-1 line-clamp-2 min-h-0">
                {product.shortDescription}
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-blue font-semibold text-sm sm:text-base shrink-0">
                  {product.capacityLiters > 0 ? `${product.capacityLiters.toLocaleString()}L` : 'Capacity on request'}
                </span>
                <span className="text-xs text-secondary capitalize bg-background px-3 py-1 rounded-full shrink-0">
                  {product.category.replace('-', ' ')}
                </span>
              </div>
              {product.price && (
                <div className="text-xl sm:text-2xl font-bold text-navy break-words">
                  KSh {product.price.toLocaleString()}
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(product.id, -1)}
                  className="w-11 h-11 p-0 flex items-center justify-center min-h-[44px] rounded-xl"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-14 text-center font-semibold text-dark text-sm sm:text-base">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(product.id, 1)}
                  className="w-11 h-11 p-0 flex items-center justify-center min-h-[44px] rounded-xl"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-col gap-3 pt-2 mt-auto min-w-0">
                <Link href={`${routes.products}/${product.slug}`} className="w-full min-w-0">
                  <Button variant="secondary" size="md" className="w-full min-h-[44px]">
                    View Details
                  </Button>
                </Link>
                <div className="flex items-center justify-center">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full min-w-0 font-semibold min-h-[44px]"
                    type="button"
                    onClick={() => addItem(product, quantity)}
                  >
                    <Plus className="mr-2 w-4 h-4 shrink-0" />
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
