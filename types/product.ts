export type ProductCategory =
  | 'vertical-cylindrical'
  | 'nestable'
  | 'conical-hopper'
  | 'underground-spherical'
  | 'horizontal-septic'

export type Material = 'steel' | 'polyethylene' | 'concrete' | 'fiberglass' | 'custom'

export type Placement = 'above-ground' | 'underground' | 'custom'

export type UsageType =
  | 'industrial'
  | 'agricultural'
  | 'commercial'
  | 'residential'
  | 'rainwater-harvesting'

export type PriceStatus = 'verified' | 'reference' | 'quote-required' | 'wholesale'

export interface Product {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  category: ProductCategory
  capacityLiters: number
  material: Material
  usageTypes: UsageType[]
  placement: Placement
  dimensions: {
    diameter?: number
    length?: number
    width?: number
    height: number
    unit: 'm' | 'mm'
  }
  weightKg?: number
  colorOptions: string[]
  features: string[]
  specifications: Record<string, string>
  images: string[]
  price?: number
  referenceOffer?: number
  priceStatus?: PriceStatus
  availability: 'in-stock' | 'made-to-order' | 'contact-for-availability'
  warranty?: string
  featured: boolean
  seoTitle?: string
  seoDescription?: string
}
