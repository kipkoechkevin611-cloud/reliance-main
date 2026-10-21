'use client'

import { useState } from 'react'
import { X, ShoppingBag, Plus, Minus, Trash2, MessageCircle } from 'lucide-react'
import { useCart } from '../../lib/cart-context'
import { siteConfig } from '../../lib/site-config'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface CartDrawerProps {
  showButton?: boolean
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CartDrawer({ showButton = true, isOpen: controlledIsOpen, onOpenChange }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, clearCart, itemCount, getTotal, isQuotationOnly } = useCart()
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = onOpenChange || setInternalIsOpen
  const [clientDetails, setClientDetails] = useState({
    fullName: '',
    phoneNumber: '',
    location: '',
    notes: ''
  })

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity)
  }

  const handleWhatsAppOrder = () => {
    if (!clientDetails.fullName || !clientDetails.phoneNumber || !clientDetails.location) {
      alert('Please fill in all required fields (Name, Phone, and Location)')
      return
    }

    const total = getTotal()
    const itemsList = items.map((item, index) => {
      const capacity = item.product.capacityLiters > 0 ? `${item.product.capacityLiters.toLocaleString()}L` : 'Capacity on request'
      const itemTotal = item.product.price ? item.product.price * item.quantity : null
      const priceText = item.product.price ? `KSh ${item.product.price.toLocaleString()}` : 'Quote Required'
      const totalText = itemTotal ? `KSh ${itemTotal.toLocaleString()}` : 'Quote Required'

      return `${index + 1}. ${item.product.name}
   Capacity: ${capacity}
   Quantity: ${item.quantity}
   Unit Price: ${priceText}
   Line Total: ${totalText}`
    }).join('\n\n')

    const totalText = total ? `KSh ${total.toLocaleString()}` : 'Quote Required (some items require quotation)'

    const message = `Hello Reliance Tank Ltd,

I would like to place an order for the following products:

${itemsList}

Order Subtotal: ${totalText}

Client Details:
Name: ${clientDetails.fullName}
Phone: ${clientDetails.phoneNumber}
Location: ${clientDetails.location}
${clientDetails.notes ? `Notes: ${clientDetails.notes}` : ''}

Please confirm product availability, delivery charges, payment instructions, and the final total.

Thank you.`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank')
    clearCart()
    setIsOpen(false)
  }

  return (
    <>
      {showButton && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative p-2 text-[#172B4D] hover:text-[#12A6A6] transition-colors"
          aria-label="Open cart"
        >
          <ShoppingBag className="w-6 h-6" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#12A6A6] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
              {itemCount}
            </span>
          )}
        </button>
      )}

      {/* Cart Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 md:p-7 border-b border-[#DCE5EF]">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B2E59]">Shopping Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-[#526579] hover:text-[#0B2E59] transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-7">
              {items.length === 0 ? (
                <div className="text-center py-10 sm:py-14">
                  <ShoppingBag className="w-14 h-14 sm:w-18 sm:h-18 text-[#526579] mx-auto mb-4" />
                  <p className="text-[#526579] text-base sm:text-lg">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-5 sm:space-y-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 sm:gap-5 pb-5 sm:pb-6 border-b border-[#DCE5EF]">
                      {/* Product Image */}
                      <div className="w-18 h-18 sm:w-20 sm:h-20 bg-[#F3F7FB] rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.product.images && item.product.images.length > 0 ? (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-contain p-2.5"
                          />
                        ) : (
                          <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 text-[#526579]" />
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#0B2E59] text-sm sm:text-base line-clamp-2 mb-2">
                          {item.product.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#526579] mb-2">
                          {item.product.capacityLiters > 0 ? `${item.product.capacityLiters.toLocaleString()}L` : 'Capacity on request'}
                        </p>
                        <p className="text-[#12A6A6] font-semibold text-sm sm:text-base mb-3">
                          {item.product.price ? `KSh ${item.product.price.toLocaleString()}` : 'Quote Required'}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 sm:gap-4">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-md border border-[#DCE5EF] flex items-center justify-center hover:bg-[#F3F7FB] transition-colors"
                          >
                            <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <span className="w-8 sm:w-10 text-center font-medium text-[#0B2E59] text-sm sm:text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-md border border-[#DCE5EF] flex items-center justify-center hover:bg-[#F3F7FB] transition-colors"
                          >
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="ml-auto p-2 text-[#526579] hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Client Details Form */}
            {items.length > 0 && (
              <div className="border-t border-[#DCE5EF] p-5 sm:p-6 md:p-7 space-y-4 sm:space-y-5">
                <h3 className="font-semibold text-[#0B2E59] text-base sm:text-lg">Delivery Details</h3>
                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#0B2E59] mb-2 sm:mb-2.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={clientDetails.fullName}
                      onChange={(e) => setClientDetails({ ...clientDetails, fullName: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#0B2E59] mb-2 sm:mb-2.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={clientDetails.phoneNumber}
                      onChange={(e) => setClientDetails({ ...clientDetails, phoneNumber: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#0B2E59] mb-2 sm:mb-2.5">
                      Delivery Location <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your delivery location/region"
                      value={clientDetails.location}
                      onChange={(e) => setClientDetails({ ...clientDetails, location: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#0B2E59] mb-2 sm:mb-2.5">
                      Delivery Instructions (Optional)
                    </label>
                    <Input
                      type="text"
                      placeholder="Any special instructions or tank capacity notes"
                      value={clientDetails.notes}
                      onChange={(e) => setClientDetails({ ...clientDetails, notes: e.target.value })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Drawer Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#DCE5EF] p-5 sm:p-6 md:p-7 space-y-4 sm:space-y-5 bg-[#F3F7FB]">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="text-[#526579]">Subtotal ({itemCount} items)</span>
                    <span className="font-medium text-[#0B2E59]">
                      {typeof getTotal() === 'number' ? `KSh ${getTotal().toLocaleString()}` : 'Quote Required'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="text-[#526579]">Delivery</span>
                    <span className="font-medium text-[#0B2E59]">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-[#DCE5EF] pt-3 sm:pt-4 flex justify-between items-center">
                    <span className="text-lg sm:text-xl font-bold text-[#0B2E59]">Total</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#12A6A6]">
                      {typeof getTotal() === 'number' ? `KSh ${getTotal().toLocaleString()}` : 'Quote Required'}
                    </span>
                  </div>
                </div>
                {isQuotationOnly && (
                  <p className="text-xs sm:text-sm text-[#526579] italic bg-white p-3 rounded">
                    * Some items require quotation. Final price will be confirmed.
                  </p>
                )}
                <Button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-[#12A6A6] hover:bg-[#0B7A70] text-white font-semibold"
                  size="lg"
                >
                  <MessageCircle className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
                  Order Now
                </Button>
                <Button
                  onClick={clearCart}
                  variant="ghost"
                  className="w-full text-[#526579] hover:text-red-600"
                >
                  Clear Cart
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
