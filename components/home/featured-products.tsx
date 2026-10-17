'use client'

import { ProductGrid } from '../products/product-grid'
import type { Product } from '../../types/product'

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return <ProductGrid products={products.slice(0, 6)} columns="featured" />
}
