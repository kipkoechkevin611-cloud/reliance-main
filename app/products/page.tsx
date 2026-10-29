'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X, Droplets } from 'lucide-react'
import { products } from '../../data/products'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import type { ProductCategory, Material, Placement, UsageType } from '../../types/product'
import { ProductGrid } from '../../components/products/product-grid'
import { Container } from '../../components/layout/container'
import { PricingTable } from '../../components/pricing/pricing-table'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all')
  const [selectedMaterial, setSelectedMaterial] = useState<Material | 'all'>('all')
  const [selectedPlacement, setSelectedPlacement] = useState<Placement | 'all'>('all')
  const [selectedUsage, setSelectedUsage] = useState<UsageType | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'capacity-asc' | 'capacity-desc'>('name-asc')
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 500000 })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Handle category from URL query parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam && categoryParam !== 'all') {
      setSelectedCategory(categoryParam as ProductCategory)
    }
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        product.name.toLowerCase().includes(searchLower) ||
        product.shortDescription.toLowerCase().includes(searchLower) ||
        product.capacityLiters.toString().includes(searchLower)

      const matchesCategory = selectedCategory === 'all'
        ? true
        : product.category === selectedCategory

      const matchesMaterial = selectedMaterial === 'all' || product.material === selectedMaterial
      const matchesPlacement = selectedPlacement === 'all' || product.placement === selectedPlacement
      const matchesUsage = selectedUsage === 'all' || product.usageTypes.includes(selectedUsage)
      const matchesPrice = !product.price || (product.price >= priceRange.min && product.price <= priceRange.max)

      return matchesSearch && matchesCategory && matchesMaterial && matchesPlacement && matchesUsage && matchesPrice
    })

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'price-asc':
          return (a.price || 0) - (b.price || 0)
        case 'price-desc':
          return (b.price || 0) - (a.price || 0)
        case 'capacity-asc':
          return a.capacityLiters - b.capacityLiters
        case 'capacity-desc':
          return b.capacityLiters - a.capacityLiters
        default:
          return 0
      }
    })

    // For vertical-cylindrical category, always sort by capacity ascending to match homepage
    if (selectedCategory === 'vertical-cylindrical') {
      result.sort((a, b) => a.capacityLiters - b.capacityLiters)
    }

    return result
  }, [searchQuery, selectedCategory, selectedMaterial, selectedPlacement, selectedUsage, sortBy, priceRange])

  // Reset to page 1 when filters change
  const effectivePage = filteredProducts.length > 0 && (currentPage - 1) * itemsPerPage >= filteredProducts.length ? 1 : currentPage

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (effectivePage - 1) * itemsPerPage,
    effectivePage * itemsPerPage
  )

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedMaterial !== 'all' ? 1 : 0) +
    (selectedPlacement !== 'all' ? 1 : 0) +
    (selectedUsage !== 'all' ? 1 : 0) +
    (priceRange.min > 0 || priceRange.max < 500000 ? 1 : 0)

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedMaterial('all')
    setSelectedPlacement('all')
    setSelectedUsage('all')
    setPriceRange({ min: 0, max: 500000 })
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-[#F3F7FB]">
      {/* Header */}
      <div className="bg-[#0B2E59] text-white py-8 sm:py-12 md:py-16 lg:py-20">
        <Container>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">Our Products</h1>
          <p className="text-[#B8C5D0] text-sm sm:text-base md:text-lg lg:text-xl">Explore our range of water storage solutions</p>
        </Container>
      </div>

      <Container className="py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 min-w-0">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative min-w-0">
              <Input
                type="text"
                placeholder="Search products by name, capacity, or description..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="text-center"
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
                <span className="ml-2 bg-[#12A6A6] text-white text-sm px-2.5 py-1 rounded-full">
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
            <div className="border-t border-[#DCE5EF] pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="min-w-0">
                  <label htmlFor="filter-category" className="block text-sm font-medium text-[#172B4D] mb-2 break-words">Category</label>
                  <select
                    id="filter-category"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value as ProductCategory | 'all')
                      // Reset to page 1 when category changes
                      setCurrentPage(1)
                    }}
                    className="w-full min-w-0 h-11 px-3.5 py-2.5 rounded-md border border-[#DCE5EF] bg-white text-[#172B4D] focus:outline-none focus:ring-2 focus:ring-[#12A6A6] text-base"
                  >
                    <option value="all">All Categories</option>
                    <option value="vertical-cylindrical">Vertical Cylindrical Tanks</option>
                    <option value="nestable">Nestable Tanks</option>
                    <option value="conical-hopper">Conical Hopper Tanks</option>
                    <option value="underground-spherical">Underground Spherical Tanks</option>
                    <option value="horizontal-septic">Horizontal Septic Tanks</option>
                  </select>
                </div>

                <div className="min-w-0">
                  <label htmlFor="filter-material" className="block text-sm font-medium text-[#172B4D] mb-2 break-words">Material</label>
                  <select
                    id="filter-material"
                    value={selectedMaterial}
                    onChange={(e) => {
                      setSelectedMaterial(e.target.value as Material | 'all')
                      setCurrentPage(1)
                    }}
                    className="w-full min-w-0 h-11 px-3.5 py-2.5 rounded-md border border-[#DCE5EF] bg-white text-[#172B4D] focus:outline-none focus:ring-2 focus:ring-[#12A6A6] text-base"
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
                  <label htmlFor="filter-placement" className="block text-sm font-medium text-[#172B4D] mb-2 break-words">Placement</label>
                  <select
                    id="filter-placement"
                    value={selectedPlacement}
                    onChange={(e) => {
                      setSelectedPlacement(e.target.value as Placement | 'all')
                      setCurrentPage(1)
                    }}
                    className="w-full min-w-0 h-11 px-3.5 py-2.5 rounded-md border border-[#DCE5EF] bg-white text-[#172B4D] focus:outline-none focus:ring-2 focus:ring-[#12A6A6] text-base"
                  >
                    <option value="all">All Placements</option>
                    <option value="above-ground">Above Ground</option>
                    <option value="underground">Underground</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div className="min-w-0">
                  <label htmlFor="filter-usage" className="block text-sm font-medium text-[#172B4D] mb-2 break-words">Intended Use</label>
                  <select
                    id="filter-usage"
                    value={selectedUsage}
                    onChange={(e) => {
                      setSelectedUsage(e.target.value as UsageType | 'all')
                      setCurrentPage(1)
                    }}
                    className="w-full min-w-0 h-11 px-3.5 py-2.5 rounded-md border border-[#DCE5EF] bg-white text-[#172B4D] focus:outline-none focus:ring-2 focus:ring-[#12A6A6] text-base"
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

              {/* Price Range Filter */}
              <div className="mt-6 pt-6 border-t border-[#DCE5EF]">
                <label className="block text-sm font-medium text-[#172B4D] mb-3">Price Range (KSh)</label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min || ''}
                    onChange={(e) => {
                      setPriceRange({ ...priceRange, min: Number(e.target.value) || 0 })
                      setCurrentPage(1)
                    }}
                    className="w-full"
                  />
                  <span className="text-[#526579]">to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max || ''}
                    onChange={(e) => {
                      setPriceRange({ ...priceRange, max: Number(e.target.value) || 500000 })
                      setCurrentPage(1)
                    }}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sort By */}
          <div className="mt-4 flex items-center gap-3">
            <label htmlFor="sort-by" className="text-sm font-medium text-[#172B4D] shrink-0">Sort by:</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'capacity-asc' | 'capacity-desc')
                setCurrentPage(1)
              }}
              disabled={selectedCategory === 'vertical-cylindrical'}
              className="h-10 px-3 py-2 rounded-md border border-[#DCE5EF] bg-white text-[#172B4D] focus:outline-none focus:ring-2 focus:ring-[#12A6A6] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="capacity-asc">Capacity (Low to High)</option>
              <option value="capacity-desc">Capacity (High to Low)</option>
            </select>
            {selectedCategory === 'vertical-cylindrical' && (
              <span className="text-xs text-[#526579] italic">Vertical cylindrical tanks sorted by capacity</span>
            )}
          </div>

          <div className="mt-6 text-base text-[#526579]">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {/* Products Grid — single grid owned by ProductGrid (no nested wrapper grid) */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 md:p-16 text-center">
            <Droplets className="w-16 h-16 text-[#526579] mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-[#172B4D] mb-3">No products found</h3>
            <p className="text-base text-[#526579] mb-8">Try adjusting your filters or search query</p>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        ) : (
          <>
            <ProductGrid products={paginatedProducts} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-[#526579]">
                  Showing {((effectivePage - 1) * itemsPerPage) + 1} to {Math.min(effectivePage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={effectivePage === 1}
                    className="shrink-0"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                      if (totalPages > 7 && Math.abs(page - effectivePage) > 2 && page !== 1 && page !== totalPages) {
                        return <span key={page} className="text-[#526579] px-2">...</span>
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${effectivePage === page
                            ? 'bg-[#12A6A6] text-white'
                            : 'bg-white border border-[#DCE5EF] text-[#172B4D] hover:bg-[#F3F7FB]'
                            }`}
                        >
                          {page}
                        </button>
                      )
                    })}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={effectivePage === totalPages}
                    className="shrink-0"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* 2026 Price List */}
        <div className="mt-12 md:mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2E59] mb-6 md:mb-8 text-center">
            2026 Price List
          </h2>
          <PricingTable />
        </div>
      </Container>
    </div>
  )
}
