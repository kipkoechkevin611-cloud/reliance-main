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
      <div className="bg-[#0f172a] text-white py-10 sm:py-12 md:py-16">
        <Container>
          <Link
            href={routes.products}
            className="inline-flex items-center text-[#94a3b8] hover:text-white mb-4 sm:mb-5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3" style={{ letterSpacing: '-0.02em' }}>Shopping Cart</h1>
          <p className="text-[#94a3b8] text-sm sm:text-base md:text-lg">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </Container>
      </div>

      <Container className="py-10 sm:py-12 md:py-16 flex-1">
        {items.length === 0 ? (
          <div className="text-center py-16 sm:py-20 md:py-24">
            <ShoppingBag className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 text-[#64748b] mx-auto mb-5 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-3 sm:mb-4" style={{ letterSpacing: '-0.02em' }}>Your cart is empty</h2>
            <p className="text-[#64748b] mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
              Add some water tanks to get started
            </p>
            <Link href={routes.products}>
              <Button variant="primary" size="lg">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 md:space-y-5">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 md:gap-5 p-4 md:p-5 bg-white border border-[#e2e8f0] rounded-2xl">
                  {/* Product Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-[#f1f5f9] rounded-xl flex items-center justify-center flex-shrink-0">
                    {item.product.images && item.product.images.length > 0 ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#64748b]" />
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#0f172a] text-sm md:text-base line-clamp-2 mb-2" style={{ letterSpacing: '-0.02em' }}>
                      {item.product.name}
                    </h3>
                    <p className="text-xs md:text-sm text-[#64748b] mb-2">
                      {item.product.capacityLiters > 0 ? `${item.product.capacityLiters.toLocaleString()}L` : 'Capacity on request'}
                    </p>
                    <p className="text-[#2563eb] font-semibold text-sm md:text-base mb-3">
                      {item.product.price ? `KSh ${item.product.price.toLocaleString()}` : 'Quote Required'}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 md:gap-3">
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="w-10 h-10 md:w-11 md:h-11 rounded-lg border border-[#e2e8f0] flex items-center justify-center hover:bg-[#f1f5f9] transition-colors min-h-[44px]"
                      >
                        <Minus className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                      <span className="w-12 md:w-14 text-center font-medium text-[#0f172a] text-sm md:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="w-10 h-10 md:w-11 md:h-11 rounded-lg border border-[#e2e8f0] flex items-center justify-center hover:bg-[#f1f5f9] transition-colors min-h-[44px]"
                      >
                        <Plus className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto p-2 text-[#64748b] hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Form */}
            <div className="space-y-5 sm:space-y-6">
              {/* Order Summary */}
              <div className="bg-[#f1f5f9] p-5 md:p-6 rounded-2xl border border-[#e2e8f0]">
                <h3 className="font-semibold text-[#0f172a] text-base md:text-lg mb-5" style={{ letterSpacing: '-0.02em' }}>Order Summary</h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between items-center text-sm md:text-base">
                    <span className="text-[#64748b]">Subtotal ({itemCount} items)</span>
                    <span className="font-medium text-[#0f172a]">
                      {typeof getTotal() === 'number' ? `KSh ${getTotal().toLocaleString()}` : 'Quote Required'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm md:text-base">
                    <span className="text-[#64748b]">Delivery</span>
                    <span className="font-medium text-[#0f172a]">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-[#e2e8f0] pt-3 md:pt-4 flex justify-between items-center">
                    <span className="text-lg md:text-xl font-bold text-[#0f172a]" style={{ letterSpacing: '-0.02em' }}>Total</span>
                    <span className="text-lg md:text-xl xl:text-2xl font-bold text-[#2563eb]">
                      {typeof getTotal() === 'number' ? `KSh ${getTotal().toLocaleString()}` : 'Quote Required'}
                    </span>
                  </div>
                </div>
                {isQuotationOnly && (
                  <p className="text-xs md:text-sm text-[#64748b] italic mt-5 bg-white p-3 rounded-lg">
                    * Some items require quotation. Final price will be confirmed.
                  </p>
                )}
              </div>

              {/* Client Details Form */}
              <div className="bg-white p-5 md:p-6 rounded-2xl border border-[#e2e8f0]">
                <h3 className="font-semibold text-[#0f172a] text-base md:text-lg mb-5" style={{ letterSpacing: '-0.02em' }}>Delivery Details</h3>
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
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
