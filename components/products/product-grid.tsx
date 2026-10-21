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
      ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8'

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
            <div className="aspect-[4/3] bg-[#F3F7FB] flex items-center justify-center p-3 sm:p-4 md:p-6 min-h-0 relative">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-w-[95%] max-h-[95%] w-full h-full object-contain"
                />
              ) : (
                <Droplets className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#172B4D] shrink-0" />
              )}
            </div>
            <div className="p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col flex-1 gap-3 sm:gap-4 md:gap-5 min-w-0">
              <h3 className="font-semibold text-[#0B2E59] text-sm sm:text-base md:text-lg lg:text-xl leading-snug break-words line-clamp-2 min-h-0">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#172B4D] leading-relaxed break-words flex-1 line-clamp-2 min-h-0">
                {product.shortDescription}
              </p>
              <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4 flex-wrap">
                <span className="text-[#12A6A6] font-semibold text-sm sm:text-base md:text-lg lg:text-xl shrink-0">
                  {product.capacityLiters > 0 ? `${product.capacityLiters.toLocaleString()}L` : 'Capacity on request'}
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#172B4D] capitalize bg-[#F3F7FB] px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full shrink-0">
                  {product.category}
                </span>
              </div>
              {product.price && (
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#0B2E59] break-words">
                  KSh {product.price.toLocaleString()}
                </div>
              )}
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(product.id, -1)}
                  className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 p-0 flex items-center justify-center min-h-[40px] sm:min-h-[44px] md:min-h-[48px]"
                >
                  <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </Button>
                <span className="w-12 sm:w-14 text-center font-semibold text-[#0B2E59] text-sm sm:text-base md:text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(product.id, 1)}
                  className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 p-0 flex items-center justify-center min-h-[40px] sm:min-h-[44px] md:min-h-[48px]"
                >
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </Button>
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 pt-2 mt-auto min-w-0">
                <Link href={`${routes.products}/${product.slug}`} className="w-full min-w-0">
                  <Button variant="outline" size="md" textSize="base" className="w-full min-h-[40px] sm:min-h-[44px] md:min-h-[48px]">
                    View Details
                  </Button>
                </Link>
                <div className="flex items-center justify-center">
                  <Button
                    variant="primary"
                    size="md"
                    textSize="base"
                    className="w-full min-w-0 bg-[#12A6A6] hover:bg-[#0B7A70] text-white font-semibold min-h-[40px] sm:min-h-[44px] md:min-h-[48px]"
                    type="button"
                    onClick={() => addItem(product, quantity)}
                  >
                    <Plus className="mr-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0" />
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
