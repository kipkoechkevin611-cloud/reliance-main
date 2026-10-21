'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../lib/cart-context'
import { routes } from '../../lib/routes'

export function FloatingCart() {
  const { itemCount } = useCart()

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      <Link
        href={routes.cart}
        className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#12A6A6] hover:bg-[#0B7D73] text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        aria-label="Open cart"
      >
        <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
            {itemCount}
          </span>
        )}
      </Link>
    </div>
  )
}
