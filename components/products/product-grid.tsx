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
      ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 md:gap-8'

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
            className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-[#cbd5e1] transition-all duration-300 flex flex-col h-full min-w-0 relative"
          >
            <div className="aspect-square bg-[#f1f5f9] flex items-center justify-center p-4 min-h-0 relative rounded-t-2xl overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-w-[95%] max-h-[95%] w-full h-full object-contain"
                />
              ) : (
                <Droplets className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-[#64748b] shrink-0" />
              )}
            </div>
            <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3 min-w-0">
              <h3 className="font-semibold text-[#0f172a] text-sm sm:text-base leading-snug break-words line-clamp-2 min-h-0" style={{ letterSpacing: '-0.02em' }}>
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed break-words flex-1 line-clamp-2 min-h-0">
                {product.shortDescription}
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-[#2563eb] font-semibold text-sm sm:text-base shrink-0">
                  {product.capacityLiters > 0 ? `${product.capacityLiters.toLocaleString()}L` : 'Capacity on request'}
                </span>
                <span className="text-[10px] sm:text-xs text-[#64748b] capitalize bg-[#f1f5f9] px-2 sm:px-3 py-1 rounded-full shrink-0">
                  {product.category}
                </span>
              </div>
              {product.price && (
                <div className="text-lg sm:text-xl font-bold text-[#2563eb] break-words">
                  KSh {product.price.toLocaleString()}
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(product.id, -1)}
                  className="w-11 h-11 p-0 flex items-center justify-center min-h-[44px] rounded-lg active:scale-95 transition-transform"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-14 text-center font-semibold text-[#0f172a] text-sm sm:text-base">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(product.id, 1)}
                  className="w-11 h-11 p-0 flex items-center justify-center min-h-[44px] rounded-lg active:scale-95 transition-transform"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-col gap-2 pt-2 mt-auto min-w-0">
                <Link href={`${routes.products}/${product.slug}`} className="w-full min-w-0">
                  <Button variant="outline" size="md" textSize="base" className="w-full min-h-[44px] rounded-lg">
                    View Details
                  </Button>
                </Link>
                <div className="flex items-center justify-center">
                  <Button
                    variant="primary"
                    size="md"
                    textSize="base"
                    className="w-full min-w-0 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold min-h-[44px] rounded-lg active:scale-95 transition-transform"
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
