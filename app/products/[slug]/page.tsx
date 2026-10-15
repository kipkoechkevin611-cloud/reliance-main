import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getProductBySlug } from '../../../data/products'
import { ProductDetailContent } from '../../../components/products/product-detail-content'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

async function ProductContent({ paramsPromise }: { paramsPromise: Promise<{ slug: string }> }) {
  const { slug } = await paramsPromise
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailContent product={product} />
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F3F6F8] flex items-center justify-center">Loading...</div>}>
      <ProductContent paramsPromise={params} />
    </Suspense>
  )
}
