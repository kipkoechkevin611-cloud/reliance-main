'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Droplets, Plus, Minus, ShoppingBag } from 'lucide-react'
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
      ? 'grid grid-cols-2 gap-4 sm:gap-6'
      : 'grid grid-cols-2 gap-4 sm:gap-6'

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
            className="bg-white rounded-lg border border-[#D9E2EC] shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full min-w-0 relative"
          >
            <div className="aspect-[4/3] bg-[#F4F7FA] flex items-center justify-center p-2 sm:p-4 min-h-0 relative">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-w-[95%] max-h-[95%] w-full h-full object-contain"
                />
              ) : (
                <Droplets className="w-12 h-12 sm:w-16 sm:h-16 text-[#526575] shrink-0" />
              )}
            </div>
            <div className="p-4 sm:p-6 flex flex-col flex-1 gap-3 sm:gap-4 min-w-0">
              <h3 className="font-semibold text-[#172B3A] text-base sm:text-lg leading-snug break-words line-clamp-2 min-h-0">
                {product.name}
              </h3>
              <p className="text-sm sm:text-base text-[#526575] leading-relaxed break-words flex-1 line-clamp-2 min-h-0">
                {product.shortDescription}
              </p>
              <div className="flex items-center justify-between gap-2 sm:gap-3 flex-wrap">
                <span className="text-[#0D9488] font-semibold text-base sm:text-lg shrink-0">
                  {product.capacityLiters.toLocaleString()}L
                </span>
                <span className="text-xs sm:text-sm text-[#526575] capitalize bg-[#F4F7FA] px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shrink-0">
                  {product.category}
                </span>
              </div>
              {product.price && (
                <div className="text-xl sm:text-2xl font-bold text-[#103B66] break-words">
                  KSh {product.price.toLocaleString()}
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(product.id, -1)}
                  className="w-10 h-10 p-0 flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-semibold text-[#172B3A]">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(product.id, 1)}
                  className="w-10 h-10 p-0 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 pt-1 mt-auto min-w-0">
                <Link href={`${routes.products}/${product.slug}`} className="w-full min-w-0">
                  <Button variant="outline" size="md" textSize="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
                <div className="flex items-center justify-center">
                  <Button
                    variant="primary"
                    size="md"
                    textSize="sm"
                    className="w-full min-w-0 bg-[#0D9488] hover:bg-[#0B7A70] text-white font-semibold"
                    type="button"
                    onClick={() => addItem(product, quantity)}
                  >
                    <Plus className="mr-1 w-4 h-4 shrink-0" />
                    Add to Cart
                  </Button>
                </div>
              </div>
              {/* Hanging Cart Icon at Bottom Left */}
              <button
                onClick={() => addItem(product, quantity)}
                className="absolute bottom-4 left-4 bg-[#0D9488] text-white p-2 rounded-full shadow-md hover:bg-[#0B7A70] transition-colors cursor-pointer"
                aria-label="Add to cart"
              >
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}
