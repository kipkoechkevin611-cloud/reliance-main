'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X, Droplets } from 'lucide-react'
import { products } from '../../data/products'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import type { ProductCategory, Material, Placement, UsageType } from '../../types/product'
import { ProductGrid } from '../../components/products/product-grid'
import { Container } from '../../components/layout/container'
import { PricingTable } from '../../components/pricing/pricing-table'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all')
  const [selectedMaterial, setSelectedMaterial] = useState<Material | 'all'>('all')
  const [selectedPlacement, setSelectedPlacement] = useState<Placement | 'all'>('all')
  const [selectedUsage, setSelectedUsage] = useState<UsageType | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        product.name.toLowerCase().includes(searchLower) ||
        product.shortDescription.toLowerCase().includes(searchLower) ||
        product.capacityLiters.toString().includes(searchLower)

      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesMaterial = selectedMaterial === 'all' || product.material === selectedMaterial
      const matchesPlacement = selectedPlacement === 'all' || product.placement === selectedPlacement
      const matchesUsage = selectedUsage === 'all' || product.usageTypes.includes(selectedUsage)

      return matchesSearch && matchesCategory && matchesMaterial && matchesPlacement && matchesUsage
    })
  }, [searchQuery, selectedCategory, selectedMaterial, selectedPlacement, selectedUsage])

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedMaterial !== 'all' ? 1 : 0) +
    (selectedPlacement !== 'all' ? 1 : 0) +
    (selectedUsage !== 'all' ? 1 : 0)

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedMaterial('all')
    setSelectedPlacement('all')
    setSelectedUsage('all')
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      {/* Header */}
      <div className="bg-[#103B66] text-white py-12 md:py-16 lg:py-20">
        <Container>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-[#B8C5D0] text-lg md:text-xl">Explore our range of water storage solutions</p>
        </Container>
      </div>

      <Container className="py-12 md:py-16 lg:py-20">
        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 min-w-0">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative min-w-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#526575] pointer-events-none" />
              <Input
                type="text"
                placeholder="Search products by name, capacity, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="shrink-0"
            >
              <SlidersHorizontal className="mr-2 w-5 h-5" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-[#0D9488] text-white text-sm px-2.5 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" onClick={clearFilters} className="shrink-0">
                <X className="mr-2 w-5 h-5" />
                Clear Filters
              </Button>
            )}
          </div>

          {showFilters && (
            <div className="border-t border-[#D9E2EC] pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="min-w-0">
                  <label htmlFor="filter-category" className="block text-sm font-medium text-[#172B3A] mb-2 break-words">Category</label>
                  <select
                    id="filter-category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'all')}
                    className="w-full min-w-0 h-11 px-3.5 py-2.5 rounded-md border border-[#D9E2EC] bg-white text-[#172B3A] focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-base"
                  >
                    <option value="all">All Categories</option>
                    <option value="vertical">Vertical Tanks</option>
                    <option value="horizontal">Horizontal Tanks</option>
                    <option value="underground">Underground Tanks</option>
                    <option value="industrial">Industrial Tanks</option>
                    <option value="agricultural">Agricultural Tanks</option>
                    <option value="custom">Custom Fabrication</option>
                  </select>
                </div>

                <div className="min-w-0">
                  <label htmlFor="filter-material" className="block text-sm font-medium text-[#172B3A] mb-2 break-words">Material</label>
                  <select
                    id="filter-material"
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value as Material | 'all')}
                    className="w-full min-w-0 h-11 px-3.5 py-2.5 rounded-md border border-[#D9E2EC] bg-white text-[#172B3A] focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-base"
                  >
                    <option value="all">All Materials</option>
                    <option value="steel">Steel</option>
                    <option value="polyethylene">Polyethylene</option>
                    <option value="concrete">Concrete</option>
                    <option value="fiberglass">Fiberglass</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div className="min-w-0">
                  <label htmlFor="filter-placement" className="block text-sm font-medium text-[#172B3A] mb-2 break-words">Placement</label>
                  <select
                    id="filter-placement"
                    value={selectedPlacement}
                    onChange={(e) => setSelectedPlacement(e.target.value as Placement | 'all')}
                    className="w-full min-w-0 h-11 px-3.5 py-2.5 rounded-md border border-[#D9E2EC] bg-white text-[#172B3A] focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-base"
                  >
                    <option value="all">All Placements</option>
                    <option value="above-ground">Above Ground</option>
                    <option value="underground">Underground</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div className="min-w-0">
                  <label htmlFor="filter-usage" className="block text-sm font-medium text-[#172B3A] mb-2 break-words">Intended Use</label>
                  <select
                    id="filter-usage"
                    value={selectedUsage}
                    onChange={(e) => setSelectedUsage(e.target.value as UsageType | 'all')}
                    className="w-full min-w-0 h-11 px-3.5 py-2.5 rounded-md border border-[#D9E2EC] bg-white text-[#172B3A] focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-base"
                  >
                    <option value="all">All Uses</option>
                    <option value="industrial">Industrial</option>
                    <option value="agricultural">Agricultural</option>
                    <option value="commercial">Commercial</option>
                    <option value="residential">Residential</option>
                    <option value="rainwater-harvesting">Rainwater Harvesting</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 text-base text-[#526575]">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {/* Products Grid — single grid owned by ProductGrid (no nested wrapper grid) */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 md:p-16 text-center">
            <Droplets className="w-16 h-16 text-[#526575] mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-[#172B3A] mb-3">No products found</h3>
            <p className="text-base text-[#526575] mb-8">Try adjusting your filters or search query</p>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}

        {/* 2026 Price List */}
        <div className="mt-12 md:mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#103B66] mb-6 md:mb-8 text-center">
            2026 Price List
          </h2>
          <PricingTable />
        </div>
      </Container>
    </div>
  )
}
