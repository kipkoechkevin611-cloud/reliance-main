'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone, MessageCircle, ShoppingBag } from 'lucide-react'
import { siteConfig } from '../../lib/site-config'
import { routes } from '../../lib/routes'
import { Button } from '../ui/button'
import { Container } from './container'
import { useCart } from '../../lib/cart-context'

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#DCE5EF] shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 lg:h-24 min-w-0">
          {/* Logo */}
          <Link href={routes.home} className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 min-w-0 shrink">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#0B2E59] rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm sm:text-lg md:text-xl lg:text-2xl">R</span>
            </div>
            <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#0B2E59] hidden sm:block truncate">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 shrink-0">
            <Link href={routes.home} className="text-[#172B4D] hover:text-[#12A6A6] transition-colors font-medium text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap">
              Home
            </Link>
            <Link href={routes.products} className="text-[#172B4D] hover:text-[#12A6A6] transition-colors font-medium text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap">
              Shop Tanks
            </Link>
            <Link href={routes.calculator} className="text-[#172B4D] hover:text-[#12A6A6] transition-colors font-medium text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap">
              Calculator
            </Link>
            <Link href={routes.about} className="text-[#172B4D] hover:text-[#12A6A6] transition-colors font-medium text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap">
              About Us
            </Link>
            <Link href={routes.contact} className="text-[#172B4D] hover:text-[#12A6A6] transition-colors font-medium text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap">
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 shrink-0">
            {siteConfig.contact.phone && (
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center space-x-1.5 sm:space-x-2 text-[#526579] hover:text-[#12A6A6] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="text-xs sm:text-sm md:text-base font-medium hidden xl:inline">{siteConfig.contact.phoneDisplay}</span>
              </a>
            )}
            <Link href={routes.quote} className="shrink-0">
              <Button variant="primary" size="lg" className="text-xs sm:text-sm md:text-base">
                Request Quote
              </Button>
            </Link>
            <Link href={routes.cart} className="relative p-1.5 sm:p-2 text-[#172B4D] hover:text-[#12A6A6] transition-colors">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#12A6A6] text-white text-[10px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link href={routes.cart} className="relative p-1.5 sm:p-2 text-[#172B4D] hover:text-[#12A6A6] transition-colors">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#12A6A6] text-white text-[10px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 md:p-3 text-[#172B4D] hover:text-[#12A6A6]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 sm:py-5 md:py-6 border-t border-[#DCE5EF]">
            <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-5">
              <Link
                href={routes.home}
                className="text-[#172B4D] hover:text-[#12A6A6] transition-colors font-medium text-sm sm:text-base md:text-lg py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href={routes.products}
                className="text-[#172B4D] hover:text-[#12A6A6] transition-colors font-medium text-sm sm:text-base md:text-lg py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop Tanks
              </Link>
              <Link
                href={routes.calculator}
                className="text-[#172B4D] hover:text-[#12A6A6] transition-colors font-medium text-sm sm:text-base md:text-lg py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Calculator
              </Link>
              <Link
                href={routes.about}
                className="text-[#172B4D] hover:text-[#12A6A6] transition-colors font-medium text-sm sm:text-base md:text-lg py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href={routes.contact}
                className="text-[#172B4D] hover:text-[#12A6A6] transition-colors font-medium text-sm sm:text-base md:text-lg py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-3 sm:pt-4 md:pt-5 border-t border-[#DCE5EF] flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
                {siteConfig.contact.whatsapp && (
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-[#12A6A6] text-white py-2.5 sm:py-3 md:py-3.5 rounded-lg min-h-[44px] sm:min-h-[48px]"
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    <span className="font-medium text-sm sm:text-base md:text-lg">WhatsApp</span>
                  </a>
                )}
                <Link href={routes.quote} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full min-h-[44px] sm:min-h-[48px]">
                    Request Quote
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </Container>
    </header>
  )
}
