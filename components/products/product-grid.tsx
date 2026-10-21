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
      ? 'grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8'

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
            className="bg-white rounded-lg border border-[#DCE5EF] shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full min-w-0 relative"
          >
            <div className="aspect-[4/3] bg-[#F3F7FB] flex items-center justify-center p-4 sm:p-6 min-h-0 relative">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-w-[95%] max-h-[95%] w-full h-full object-contain"
                />
              ) : (
                <Droplets className="w-16 h-16 sm:w-20 sm:h-20 text-[#526579] shrink-0" />
              )}
            </div>
            <div className="p-5 sm:p-6 md:p-7 flex flex-col flex-1 gap-4 sm:gap-5 min-w-0">
              <h3 className="font-semibold text-[#172B4D] text-base sm:text-lg md:text-xl leading-snug break-words line-clamp-2 min-h-0">
                {product.name}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-[#526579] leading-relaxed break-words flex-1 line-clamp-2 min-h-0">
                {product.shortDescription}
              </p>
              <div className="flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
                <span className="text-[#12A6A6] font-semibold text-base sm:text-lg md:text-xl shrink-0">
                  {product.capacityLiters > 0 ? `${product.capacityLiters.toLocaleString()}L` : 'Capacity on request'}
                </span>
                <span className="text-xs sm:text-sm md:text-base text-[#526579] capitalize bg-[#F3F7FB] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shrink-0">
                  {product.category}
                </span>
              </div>
              {product.price && (
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B2E59] break-words">
                  KSh {product.price.toLocaleString()}
                </div>
              )}
              <div className="flex items-center gap-3 mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(product.id, -1)}
                  className="w-11 h-11 sm:w-12 sm:h-12 p-0 flex items-center justify-center"
                >
                  <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <span className="w-14 text-center font-semibold text-[#172B4D] text-base sm:text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(product.id, 1)}
                  className="w-11 h-11 sm:w-12 sm:h-12 p-0 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
              <div className="flex flex-col gap-3 sm:gap-4 pt-2 mt-auto min-w-0">
                <Link href={`${routes.products}/${product.slug}`} className="w-full min-w-0">
                  <Button variant="outline" size="md" textSize="base" className="w-full">
                    View Details
                  </Button>
                </Link>
                <div className="flex items-center justify-center">
                  <Button
                    variant="primary"
                    size="md"
                    textSize="base"
                    className="w-full min-w-0 bg-[#12A6A6] hover:bg-[#0B7A70] text-white font-semibold"
                    type="button"
                    onClick={() => addItem(product, quantity)}
                  >
                    <Plus className="mr-2 w-5 h-5 shrink-0" />
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
