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
      <div className="bg-[#0B2E59] text-white py-8 sm:py-10 md:py-14 lg:py-16">
        <Container>
          <Link
            href={routes.products}
            className="inline-flex items-center text-[#B8C5D0] hover:text-white mb-4 sm:mb-5 md:mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">Shopping Cart</h1>
          <p className="text-[#B8C5D0] text-sm sm:text-base md:text-lg">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </Container>
      </div>

      <Container className="py-8 sm:py-10 md:py-14 lg:py-16 flex-1">
        {items.length === 0 ? (
          <div className="text-center py-10 sm:py-12 md:py-14 lg:py-18">
            <ShoppingBag className="w-14 h-14 sm:w-16 sm:w-18 md:w-20 text-[#526579] mx-auto mb-4 sm:mb-5 md:mb-6" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B2E59] mb-2 sm:mb-3 md:mb-4">Your cart is empty</h2>
            <p className="text-[#526579] mb-5 sm:mb-6 md:mb-7 lg:mb-8 text-sm sm:text-base md:text-lg">
              Add some water tanks to get started
            </p>
            <Link href={routes.products}>
              <Button variant="primary" size="lg">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-5 md:space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 sm:gap-4 md:gap-5 p-4 sm:p-5 md:p-6 bg-white border border-[#DCE5EF] rounded-lg">
                  {/* Product Image */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:w-24 bg-[#F3F7FB] rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.product.images && item.product.images.length > 0 ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:w-10 text-[#526579]" />
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#0B2E59] text-xs sm:text-sm md:text-base line-clamp-2 mb-1.5 sm:mb-2">
                      {item.product.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-sm text-[#526579] mb-1.5 sm:mb-2">
                      {item.product.capacityLiters > 0 ? `${item.product.capacityLiters.toLocaleString()}L` : 'Capacity on request'}
                    </p>
                    <p className="text-[#12A6A6] font-semibold text-xs sm:text-sm md:text-base mb-2 sm:mb-3">
                      {item.product.price ? `KSh ${item.product.price.toLocaleString()}` : 'Quote Required'}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-md border border-[#DCE5EF] flex items-center justify-center hover:bg-[#F3F7FB] transition-colors min-h-[36px] sm:min-h-[40px] md:min-h-[44px]"
                      >
                        <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      </button>
                      <span className="w-8 sm:w-10 md:w-12 text-center font-medium text-[#0B2E59] text-xs sm:text-sm md:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-md border border-[#DCE5EF] flex items-center justify-center hover:bg-[#F3F7FB] transition-colors min-h-[36px] sm:min-h-[40px] md:min-h-[44px]"
                      >
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto p-1.5 sm:p-2 text-[#526579] hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Form */}
            <div className="space-y-5 sm:space-y-6">
              {/* Order Summary */}
              <div className="bg-[#F3F7FB] p-4 sm:p-5 md:p-6 rounded-lg border border-[#DCE5EF]">
                <h3 className="font-semibold text-[#0B2E59] text-sm sm:text-base md:text-lg mb-4 sm:mb-5">Order Summary</h3>
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex justify-between items-center text-xs sm:text-sm md:text-base">
                    <span className="text-[#526579]">Subtotal ({itemCount} items)</span>
                    <span className="font-medium text-[#0B2E59]">
                      {typeof getTotal() === 'number' ? `KSh ${getTotal().toLocaleString()}` : 'Quote Required'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm md:text-base">
                    <span className="text-[#526579]">Delivery</span>
                    <span className="font-medium text-[#0B2E59]">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-[#DCE5EF] pt-2 sm:pt-3 md:pt-4 flex justify-between items-center">
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#0B2E59]">Total</span>
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#12A6A6]">
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
