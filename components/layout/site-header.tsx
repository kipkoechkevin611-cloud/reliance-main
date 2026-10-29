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
    <header className="sticky top-0 z-50 bg-white shadow-soft backdrop-blur-sm">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20 min-w-0">
          {/* Logo */}
          <Link href={routes.home} className="flex items-center space-x-2 sm:space-x-3 min-w-0 shrink">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-navy rounded-xl flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xl sm:text-2xl">R</span>
            </div>
            <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-navy truncate">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 shrink-0">
            <Link href={routes.home} className="text-dark hover:text-blue transition-colors font-medium text-base whitespace-nowrap relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href={routes.products} className="text-dark hover:text-blue transition-colors font-medium text-base whitespace-nowrap relative group">
              Shop Tanks
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href={routes.calculator} className="text-dark hover:text-blue transition-colors font-medium text-base whitespace-nowrap relative group">
              Calculator
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href={routes.about} className="text-dark hover:text-blue transition-colors font-medium text-base whitespace-nowrap relative group">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href={routes.contact} className="text-dark hover:text-blue transition-colors font-medium text-base whitespace-nowrap relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {siteConfig.contact.phone && (
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center space-x-2 text-secondary hover:text-navy transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-base font-medium hidden xl:inline">{siteConfig.contact.phoneDisplay}</span>
              </a>
            )}
            <Link href={routes.quote} className="shrink-0">
              <Button variant="primary" size="md" className="text-base">
                Request Quote
              </Button>
            </Link>
            <Link href={routes.cart} className="relative p-2 text-dark hover:text-navy transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow text-navy text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-1 sm:gap-2 shrink-0">
            <Link href={routes.cart} className="relative p-1.5 sm:p-2 text-dark hover:text-navy transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow text-navy text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-dark hover:text-navy w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-6 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link
                href={routes.home}
                className="text-dark hover:text-navy transition-colors font-medium text-lg py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href={routes.products}
                className="text-dark hover:text-navy transition-colors font-medium text-lg py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop Tanks
              </Link>
              <Link
                href={routes.calculator}
                className="text-dark hover:text-navy transition-colors font-medium text-lg py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Calculator
              </Link>
              <Link
                href={routes.about}
                className="text-dark hover:text-navy transition-colors font-medium text-lg py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href={routes.contact}
                className="text-dark hover:text-navy transition-colors font-medium text-lg py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-border flex flex-col space-y-3">
                {siteConfig.contact.whatsapp && (
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-navy hover:bg-navy-light text-white py-4 rounded-xl min-h-[52px] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium text-lg">WhatsApp</span>
                  </a>
                )}
                <Link href={routes.quote} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="lg" className="w-full min-h-[52px]">
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
