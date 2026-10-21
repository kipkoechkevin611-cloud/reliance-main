'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Plus, Minus, Trash2, MessageCircle, ArrowLeft } from 'lucide-react'
import { useCart } from '../../lib/cart-context'
import { siteConfig } from '../../lib/site-config'
import { routes } from '../../lib/routes'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Container } from '../../components/layout/container'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, itemCount, getTotal, isQuotationOnly } = useCart()
  const [clientDetails, setClientDetails] = useState({
    fullName: '',
    phoneNumber: '',
    location: '',
    notes: ''
  })

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
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
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-[#0B2E59] text-white py-10 sm:py-14 md:py-16">
        <Container>
          <Link
            href={routes.products}
            className="inline-flex items-center text-[#B8C5D0] hover:text-white mb-5 sm:mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">Shopping Cart</h1>
          <p className="text-[#B8C5D0] text-base sm:text-lg">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </Container>
      </div>

      <Container className="py-10 sm:py-14 md:py-16 flex-1">
        {items.length === 0 ? (
          <div className="text-center py-14 sm:py-18">
            <ShoppingBag className="w-18 h-18 sm:w-20 sm:h-20 text-[#526579] mx-auto mb-5 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2E59] mb-3 sm:mb-4">Your cart is empty</h2>
            <p className="text-[#526579] mb-7 sm:mb-8 text-base sm:text-lg">
              Add some water tanks to get started
            </p>
            <Link href={routes.products}>
              <Button variant="primary" size="lg">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-5 sm:space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 sm:gap-5 p-5 sm:p-6 bg-white border border-[#DCE5EF] rounded-lg">
                  {/* Product Image */}
                  <div className="w-22 h-22 sm:w-24 sm:h-24 bg-[#F3F7FB] rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.product.images && item.product.images.length > 0 ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-contain p-2.5"
                      />
                    ) : (
                      <ShoppingBag className="w-9 h-9 sm:w-10 sm:h-10 text-[#526579]" />
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
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-[#DCE5EF] flex items-center justify-center hover:bg-[#F3F7FB] transition-colors"
                      >
                        <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <span className="w-10 sm:w-12 text-center font-medium text-[#0B2E59] text-sm sm:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-[#DCE5EF] flex items-center justify-center hover:bg-[#F3F7FB] transition-colors"
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

            {/* Order Summary & Form */}
            <div className="space-y-5 sm:space-y-6">
              {/* Order Summary */}
              <div className="bg-[#F3F7FB] p-5 sm:p-6 rounded-lg border border-[#DCE5EF]">
                <h3 className="font-semibold text-[#0B2E59] text-base sm:text-lg mb-5">Order Summary</h3>
                <div className="space-y-4 sm:space-y-5">
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
                  <p className="text-xs sm:text-sm text-[#526579] italic mt-4 sm:mt-5 bg-white p-3 rounded">
                    * Some items require quotation. Final price will be confirmed.
                  </p>
                )}
              </div>

              {/* Client Details Form */}
              <div className="bg-white p-5 sm:p-6 rounded-lg border border-[#DCE5EF]">
                <h3 className="font-semibold text-[#0B2E59] text-base sm:text-lg mb-5">Delivery Details</h3>
                <div className="space-y-3 sm:space-4">
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

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-[#12A6A6] hover:bg-[#0B7A70] text-white font-semibold"
                  size="lg"
                >
                  <MessageCircle className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
                  Order via WhatsApp
                </Button>
                <Button
                  onClick={clearCart}
                  variant="ghost"
                  className="w-full text-[#526579] hover:text-red-600"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
