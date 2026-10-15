'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import { siteConfig } from '../../lib/site-config'
import { routes } from '../../lib/routes'
import { Button } from '../ui/button'
import { CartDrawer } from '../cart/cart-drawer'
import { Container } from './container'

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#D9E2EC]">
      <Container>
        <div className="flex items-center justify-between h-20 md:h-24 min-w-0">
          {/* Logo */}
          <Link href={routes.home} className="flex items-center space-x-3 sm:space-x-4 min-w-0 shrink">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#103B66] rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xl sm:text-2xl">R</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-[#103B66] hidden sm:block truncate">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0">
            <Link href={routes.home} className="text-[#172B3A] hover:text-[#0D9488] transition-colors font-medium text-base lg:text-lg whitespace-nowrap">
              Home
            </Link>
            <Link href={routes.products} className="text-[#172B3A] hover:text-[#0D9488] transition-colors font-medium text-base lg:text-lg whitespace-nowrap">
              Shop Tanks
            </Link>
            <Link href={routes.calculator} className="text-[#172B3A] hover:text-[#0D9488] transition-colors font-medium text-base lg:text-lg whitespace-nowrap">
              Calculator
            </Link>
            <Link href={routes.about} className="text-[#172B3A] hover:text-[#0D9488] transition-colors font-medium text-base lg:text-lg whitespace-nowrap">
              About Us
            </Link>
            <Link href={routes.contact} className="text-[#172B3A] hover:text-[#0D9488] transition-colors font-medium text-base lg:text-lg whitespace-nowrap">
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
            {siteConfig.contact.phone && (
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center space-x-2 text-[#526575] hover:text-[#0D9488] transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="text-base font-medium hidden xl:inline">{siteConfig.contact.phoneDisplay}</span>
              </a>
            )}
            <Link href={routes.quote} className="shrink-0">
              <Button variant="primary" size="lg" className="text-base">
                Request Quote
              </Button>
            </Link>
            <CartDrawer />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2 shrink-0">
            <CartDrawer />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 text-[#172B3A] hover:text-[#0D9488]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-6 border-t border-[#D9E2EC]">
            <div className="flex flex-col space-y-5">
              <Link
                href={routes.home}
                className="text-[#172B3A] hover:text-[#0D9488] transition-colors font-medium text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href={routes.products}
                className="text-[#172B3A] hover:text-[#0D9488] transition-colors font-medium text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop Tanks
              </Link>
              <Link
                href={routes.calculator}
                className="text-[#172B3A] hover:text-[#0D9488] transition-colors font-medium text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                Calculator
              </Link>
              <Link
                href={routes.about}
                className="text-[#172B3A] hover:text-[#0D9488] transition-colors font-medium text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href={routes.contact}
                className="text-[#172B3A] hover:text-[#0D9488] transition-colors font-medium text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-5 border-t border-[#D9E2EC] flex flex-col space-y-4">
                {siteConfig.contact.whatsapp && (
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-[#0D9488] text-white py-3 rounded-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">WhatsApp</span>
                  </a>
                )}
                <Link href={routes.quote} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
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
