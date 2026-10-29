'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../lib/cart-context'
import { routes } from '../../lib/routes'

export function FloatingCart() {
  const { itemCount } = useCart()

  return (
    <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-40">
      <Link
        href={routes.cart}
        className="relative w-12 h-12 sm:w-14 sm:h-14 bg-navy hover:bg-navy-light text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        aria-label="Open cart"
      >
        <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellow text-navy text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {itemCount}
          </span>
        )}
      </Link>
    </div>
  )
}
