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
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-[12px] border-b border-[#e2e8f0] shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 min-w-0">
          {/* Logo */}
          <Link href={routes.home} className="flex items-center space-x-2 sm:space-x-3 min-w-0 shrink">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0f172a] rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">R</span>
            </div>
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#0f172a] hidden sm:block truncate">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0">
            <Link href={routes.home} className="text-[#0f172a] hover:text-[#2563eb] transition-colors font-medium text-sm md:text-base whitespace-nowrap">
              Home
            </Link>
            <Link href={routes.products} className="text-[#0f172a] hover:text-[#2563eb] transition-colors font-medium text-sm md:text-base whitespace-nowrap">
              Shop Tanks
            </Link>
            <Link href={routes.calculator} className="text-[#0f172a] hover:text-[#2563eb] transition-colors font-medium text-sm md:text-base whitespace-nowrap">
              Calculator
            </Link>
            <Link href={routes.about} className="text-[#0f172a] hover:text-[#2563eb] transition-colors font-medium text-sm md:text-base whitespace-nowrap">
              About Us
            </Link>
            <Link href={routes.contact} className="text-[#0f172a] hover:text-[#2563eb] transition-colors font-medium text-sm md:text-base whitespace-nowrap">
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {siteConfig.contact.phone && (
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center space-x-2 text-[#64748b] hover:text-[#2563eb] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm md:text-base font-medium hidden xl:inline">{siteConfig.contact.phoneDisplay}</span>
              </a>
            )}
            <Link href={routes.quote} className="shrink-0">
              <Button variant="primary" size="lg" className="text-sm md:text-base">
                Request Quote
              </Button>
            </Link>
            <Link href={routes.cart} className="relative p-2 text-[#0f172a] hover:text-[#2563eb] transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2563eb] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2 shrink-0">
            <Link href={routes.cart} className="relative p-2 text-[#0f172a] hover:text-[#2563eb] transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2563eb] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0f172a] hover:text-[#2563eb] w-11 h-11 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-6 border-t border-[#e2e8f0]">
            <div className="flex flex-col space-y-4">
              <Link
                href={routes.home}
                className="text-[#0f172a] hover:text-[#2563eb] transition-colors font-medium text-base py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href={routes.products}
                className="text-[#0f172a] hover:text-[#2563eb] transition-colors font-medium text-base py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop Tanks
              </Link>
              <Link
                href={routes.calculator}
                className="text-[#0f172a] hover:text-[#2563eb] transition-colors font-medium text-base py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Calculator
              </Link>
              <Link
                href={routes.about}
                className="text-[#0f172a] hover:text-[#2563eb] transition-colors font-medium text-base py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href={routes.contact}
                className="text-[#0f172a] hover:text-[#2563eb] transition-colors font-medium text-base py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-[#e2e8f0] flex flex-col space-y-3">
                {siteConfig.contact.whatsapp && (
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3 rounded-lg min-h-[48px] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium text-base">WhatsApp</span>
                  </a>
                )}
                <Link href={routes.quote} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="lg" className="w-full min-h-[48px]">
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
