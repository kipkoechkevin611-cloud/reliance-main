import Link from 'next/link'
import { siteConfig } from '../../lib/site-config'
import { routes } from '../../lib/routes'
import { Container } from './container'

export function SiteFooter() {
  const currentYear = 2024

  return (
    <footer className="bg-navy text-white">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="min-w-0">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0">
                <span className="text-navy font-bold text-xl">R</span>
              </div>
              <span className="text-xl font-bold break-words">{siteConfig.name}</span>
            </div>
            <p className="text-gray-300 text-base mb-6 leading-relaxed">
              Reliable water storage solutions for residential, agricultural, commercial, and industrial applications across Kenya.
            </p>
            {siteConfig.contact.address && (
              <address className="text-gray-300 text-base not-italic leading-relaxed break-words">
                {siteConfig.contact.address}
              </address>
            )}
          </div>

          {/* Products */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-6 text-lg">Products</h3>
            <ul className="space-y-4 text-base">
              <li>
                <Link href={`${routes.products}?category=vertical-cylindrical`} className="text-gray-300 hover:text-white transition-colors">
                  Vertical Cylindrical Tanks
                </Link>
              </li>
              <li>
                <Link href={`${routes.products}?category=nestable`} className="text-gray-300 hover:text-white transition-colors">
                  Nestable Tanks
                </Link>
              </li>
              <li>
                <Link href={`${routes.products}?category=conical-hopper`} className="text-gray-300 hover:text-white transition-colors">
                  Conical Hopper Tanks
                </Link>
              </li>
              <li>
                <Link href={`${routes.products}?category=underground-spherical`} className="text-gray-300 hover:text-white transition-colors">
                  Underground Spherical Tanks
                </Link>
              </li>
              <li>
                <Link href={`${routes.products}?category=horizontal-septic`} className="text-gray-300 hover:text-white transition-colors">
                  Horizontal Septic Tanks
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-6 text-lg">Company</h3>
            <ul className="space-y-4 text-base">
              <li>
                <Link href={routes.about} className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={routes.quality} className="text-gray-300 hover:text-white transition-colors">
                  Quality Standards
                </Link>
              </li>
              <li>
                <Link href={routes.contact} className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href={routes.quote} className="text-gray-300 hover:text-white transition-colors">
                  Request Quote
                </Link>
              </li>
              <li>
                <Link href={routes.privacy} className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-6 text-lg">Contact</h3>
            <ul className="space-y-4 text-base">
              {siteConfig.contact.phone && (
                <li>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-gray-300 hover:text-white transition-colors break-words"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </li>
              )}
              {siteConfig.contact.email && (
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-gray-300 hover:text-white transition-colors break-words"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
              )}
              {siteConfig.contact.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors break-words"
                  >
                    WhatsApp: {siteConfig.contact.phoneDisplay}
                  </a>
                </li>
              )}
              {siteConfig.contact.hours && (
                <li className="text-gray-300">{siteConfig.contact.hours}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-base text-gray-300">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
