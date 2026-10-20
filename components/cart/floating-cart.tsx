'use client'

import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../lib/cart-context'

export function FloatingCart() {
  const { itemCount } = useCart()

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      <button
        onClick={() => {
          // Click the header cart button
          const headerCartButton = document.querySelector('button[aria-label="Open cart"]') as HTMLButtonElement
          if (headerCartButton) {
            headerCartButton.click()
          }
        }}
        className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#0D9488] hover:bg-[#0B7D73] text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        aria-label="Open cart"
      >
        <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
            {itemCount}
          </span>
        )}
      </button>
    </div>
  )
}
