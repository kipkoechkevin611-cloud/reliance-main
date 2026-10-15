'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Droplets, CheckCircle2, Info, Package, Ruler, Plus, Minus } from 'lucide-react'
import { routes } from '../../lib/routes'
import { Button } from '../ui/button'
import { Container } from '../layout/container'
import { useCart } from '../../lib/cart-context'
import { getRelatedProducts } from '../../data/products'
import type { Product } from '../../types/product'

interface ProductDetailContentProps {
  product: Product
}

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const relatedProducts = getRelatedProducts(product)

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="min-h-screen bg-[#F3F6F8]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#D9E2EC]">
        <Container className="py-4">
          <nav className="flex items-center flex-wrap gap-x-2 gap-y-1 text-sm text-[#526575] min-w-0">
            <Link href={routes.home} className="hover:text-[#0D9488]">
              Home
            </Link>
            <span>/</span>
            <Link href={routes.products} className="hover:text-[#0D9488]">
              Products
            </Link>
            <span>/</span>
            <span className="text-[#172B3A] break-words">{product.name}</span>
          </nav>
        </Container>
      </div>

      {/* Product Detail */}
      <Container className="py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 min-w-0">
            <div className="aspect-[4/3] bg-[#F4F7FA] rounded-lg flex items-center justify-center min-h-0">
              {product.images && product.images.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                />
              ) : (
                <Droplets className="w-24 h-24 sm:w-32 sm:h-32 text-[#526575]" />
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#103B66] mb-3 sm:mb-4 break-words">{product.name}</h1>
            <p className="text-sm sm:text-base text-[#526575] mb-4 sm:mb-6 leading-relaxed break-words">{product.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-[#F4F7FA] rounded-lg p-3 sm:p-4 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-[#0D9488] shrink-0" />
                  <span className="text-xs sm:text-sm text-[#526575]">Capacity</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-[#103B66]">
                  {product.capacityLiters.toLocaleString()}L
                </p>
              </div>
              <div className="bg-[#F4F7FA] rounded-lg p-3 sm:p-4 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#0D9488] shrink-0" />
                  <span className="text-xs sm:text-sm text-[#526575]">Material</span>
                </div>
                <p className="text-lg sm:text-xl font-semibold text-[#103B66] capitalize break-words">{product.material}</p>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
                <span className="font-medium text-[#172B3A] text-sm sm:text-base">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-[#D9E2EC] flex items-center justify-center hover:bg-[#F4F7FA] transition-colors"
                    type="button"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 sm:w-12 text-center font-medium text-[#172B3A] text-sm sm:text-base">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-[#D9E2EC] flex items-center justify-center hover:bg-[#F4F7FA] transition-colors"
                    type="button"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1 min-w-0"
                  onClick={handleAddToCart}
                >
                  <Plus className="mr-2 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  Add to Cart
                </Button>
                <Link href={routes.quote} className="flex-1 min-w-0">
                  <Button variant="outline" size="lg" className="w-full">
                    Request Quote
                  </Button>
                </Link>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-[#526575]">
              <p>
                <span className="font-medium">Availability:</span>{' '}
                <span className="capitalize">{product.availability.replace('-', ' ')}</span>
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Specifications */}
      <Container className="pb-8 sm:pb-12 md:pb-16">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-[#103B66] mb-4 sm:mb-6 md:mb-8 flex items-center">
            <Ruler className="mr-2 w-5 h-5 sm:w-6 sm:h-6 text-[#0D9488] shrink-0" />
            Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="min-w-0">
              <h3 className="font-semibold text-[#172B3A] mb-2 sm:mb-3 text-sm sm:text-base">Dimensions</h3>
              <dl className="space-y-1 sm:space-y-2">
                {product.dimensions.diameter && (
                  <div className="flex justify-between gap-2 sm:gap-4 py-1.5 sm:py-2 border-b border-[#D9E2EC]">
                    <dt className="text-xs sm:text-sm text-[#526575]">Diameter</dt>
                    <dd className="font-medium text-[#172B3A] text-right text-xs sm:text-sm">
                      {product.dimensions.diameter} {product.dimensions.unit}
                    </dd>
                  </div>
                )}
                {product.dimensions.length && (
                  <div className="flex justify-between gap-2 sm:gap-4 py-1.5 sm:py-2 border-b border-[#D9E2EC]">
                    <dt className="text-xs sm:text-sm text-[#526575]">Length</dt>
                    <dd className="font-medium text-[#172B3A] text-right text-xs sm:text-sm">
                      {product.dimensions.length} {product.dimensions.unit}
                    </dd>
                  </div>
                )}
                {product.dimensions.width && (
                  <div className="flex justify-between gap-2 sm:gap-4 py-1.5 sm:py-2 border-b border-[#D9E2EC]">
                    <dt className="text-xs sm:text-sm text-[#526575]">Width</dt>
                    <dd className="font-medium text-[#172B3A] text-right text-xs sm:text-sm">
                      {product.dimensions.width} {product.dimensions.unit}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between gap-2 sm:gap-4 py-1.5 sm:py-2 border-b border-[#D9E2EC]">
                  <dt className="text-xs sm:text-sm text-[#526575]">Height</dt>
                  <dd className="font-medium text-[#172B3A] text-right text-xs sm:text-sm">
                    {product.dimensions.height} {product.dimensions.unit}
                  </dd>
                </div>
                {product.weightKg && (
                  <div className="flex justify-between gap-2 sm:gap-4 py-1.5 sm:py-2 border-b border-[#D9E2EC]">
                    <dt className="text-xs sm:text-sm text-[#526575]">Weight</dt>
                    <dd className="font-medium text-[#172B3A] text-right text-xs sm:text-sm">{product.weightKg} kg</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-[#172B3A] mb-2 sm:mb-3 text-sm sm:text-base">Technical Details</h3>
              <dl className="space-y-1 sm:space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-2 sm:gap-4 py-1.5 sm:py-2 border-b border-[#D9E2EC]">
                    <dt className="text-xs sm:text-sm text-[#526575] break-words min-w-0">{key}</dt>
                    <dd className="font-medium text-[#172B3A] text-right break-words text-xs sm:text-sm">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>

      {/* Features */}
      <Container className="pb-8 sm:pb-12 md:pb-16">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-[#103B66] mb-4 sm:mb-6 md:mb-8 flex items-center">
            <CheckCircle2 className="mr-2 w-5 h-5 sm:w-6 sm:h-6 text-[#0D9488] shrink-0" />
            Key Features
          </h2>
          <ul className="space-y-2 sm:space-y-3">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 sm:gap-3 min-w-0">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0D9488] mt-0.5 shrink-0" />
                <span className="text-sm sm:text-base text-[#526575] break-words">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Container className="pb-8 sm:pb-12 md:pb-20">
          <h2 className="text-xl sm:text-2xl font-bold text-[#103B66] mb-4 sm:mb-6 md:mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`${routes.products}/${relatedProduct.slug}`}
                className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow flex flex-col h-full min-w-0"
              >
                <div className="aspect-[4/3] bg-[#F4F7FA] rounded-lg flex items-center justify-center mb-3 sm:mb-4 min-h-0">
                  {relatedProduct.images && relatedProduct.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                    />
                  ) : (
                    <Droplets className="w-12 h-12 sm:w-16 sm:h-16 text-[#526575]" />
                  )}
                </div>
                <h3 className="font-semibold text-[#172B3A] mb-1 sm:mb-2 break-words text-sm sm:text-base line-clamp-2">{relatedProduct.name}</h3>
                <p className="text-xs sm:text-sm text-[#526575] mb-2">{relatedProduct.capacityLiters.toLocaleString()}L</p>
                <span className="text-[#0D9488] text-xs sm:text-sm font-medium inline-flex items-center mt-auto">
                  View Details
                  <ArrowRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      )}
    </div>
  )
}
