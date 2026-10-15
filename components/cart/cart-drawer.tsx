'use client'

import { useState } from 'react'
import { X, ShoppingBag, Plus, Minus, Trash2, MessageCircle } from 'lucide-react'
import { useCart } from '../../lib/cart-context'
import { siteConfig } from '../../lib/site-config'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function CartDrawer() {
  const { items, updateQuantity, removeItem, clearCart, itemCount, getTotal, isQuotationOnly } = useCart()
  const [isOpen, setIsOpen] = useState(false)
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
    const itemsList = items.map(item => {
      const itemTotal = item.product.price ? item.product.price * item.quantity : 'Quote Required'
      return `- ${item.product.name} x ${item.quantity} — ${typeof itemTotal === 'number' ? `KSh ${itemTotal.toLocaleString()}` : itemTotal}`
    }).join('\n')

    const message = `*NEW ORDER - RELIANCE TANKS*
--------------------------------
Client Name: ${clientDetails.fullName}
Phone: ${clientDetails.phoneNumber}
Location: ${clientDetails.location}
Notes: ${clientDetails.notes}

*ORDER ITEMS:*
${itemsList}

*ESTIMATED TOTAL:* ${typeof total === 'number' ? `KSh ${total.toLocaleString()}` : 'Quote Required'}
--------------------------------
Please confirm stock availability and delivery timeline.`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      {/* Cart Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-[#172B3A] hover:text-[#0D9488] transition-colors"
        aria-label="Open cart"
      >
        <ShoppingBag className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#0D9488] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
            {itemCount}
          </span>
        )}
      </button>

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
            <div className="flex items-center justify-between p-6 border-b border-[#D9E2EC]">
              <h2 className="text-xl font-bold text-[#172B3A]">Shopping Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-[#526575] hover:text-[#172B3A] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-[#526575] mx-auto mb-4" />
                  <p className="text-[#526575] text-lg">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 pb-6 border-b border-[#D9E2EC]">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-[#F4F7FA] rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.product.images && item.product.images.length > 0 ? (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-contain p-2"
                          />
                        ) : (
                          <ShoppingBag className="w-8 h-8 text-[#526575]" />
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#172B3A] text-base line-clamp-2 mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-[#526575] mb-2">
                          {item.product.capacityLiters.toLocaleString()}L
                        </p>
                        <p className="text-[#0D9488] font-semibold text-base">
                          {item.product.price ? `KSh ${item.product.price.toLocaleString()}` : 'Quote Required'}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-md border border-[#D9E2EC] flex items-center justify-center hover:bg-[#F4F7FA] transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium text-[#172B3A]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-md border border-[#D9E2EC] flex items-center justify-center hover:bg-[#F4F7FA] transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="ml-auto p-2 text-[#526575] hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
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
              <div className="border-t border-[#D9E2EC] p-6 space-y-4">
                <h3 className="font-semibold text-[#172B3A] text-lg">Delivery Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#172B3A] mb-2">
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
                    <label className="block text-sm font-medium text-[#172B3A] mb-2">
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
                    <label className="block text-sm font-medium text-[#172B3A] mb-2">
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
                    <label className="block text-sm font-medium text-[#172B3A] mb-2">
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
              <div className="border-t border-[#D9E2EC] p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#172B3A]">Total</span>
                  <span className="text-xl font-bold text-[#0D9488]">
                    {typeof getTotal() === 'number' ? `KSh ${getTotal().toLocaleString()}` : 'Quote Required'}
                  </span>
                </div>
                {isQuotationOnly && (
                  <p className="text-sm text-[#526575] italic">
                    * Some items require quotation. Final price will be confirmed.
                  </p>
                )}
                <Button
                  onClick={handleWhatsAppOrder}
                  className="w-full"
                  size="lg"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Send Order via WhatsApp
                </Button>
                <Button
                  onClick={clearCart}
                  variant="ghost"
                  className="w-full"
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
