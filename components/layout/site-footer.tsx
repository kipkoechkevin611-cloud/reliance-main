import Link from 'next/link'
import { siteConfig } from '../../lib/site-config'
import { routes } from '../../lib/routes'
import { Container } from './container'

export function SiteFooter() {
  const currentYear = 2024

  return (
    <footer className="bg-[#0B2E59] text-white">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="min-w-0">
            <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center shrink-0">
                <span className="text-[#0B2E59] font-bold text-lg sm:text-xl">R</span>
              </div>
              <span className="text-lg sm:text-xl font-bold break-words">{siteConfig.name}</span>
            </div>
            <p className="text-[#B8C5D0] text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
              Reliable water storage solutions for residential, agricultural, commercial, and industrial applications.
            </p>
            {siteConfig.contact.address && (
              <address className="text-[#B8C5D0] text-sm sm:text-base not-italic leading-relaxed break-words">
                {siteConfig.contact.address}
              </address>
            )}
          </div>

          {/* Products */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg">Products</h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <li>
                <Link href={routes.products} className="text-[#B8C5D0] hover:text-white transition-colors">
                  Vertical Tanks
                </Link>
              </li>
              <li>
                <Link href={routes.products} className="text-[#B8C5D0] hover:text-white transition-colors">
                  Horizontal Tanks
                </Link>
              </li>
              <li>
                <Link href={routes.products} className="text-[#B8C5D0] hover:text-white transition-colors">
                  Underground Tanks
                </Link>
              </li>
              <li>
                <Link href={routes.products} className="text-[#B8C5D0] hover:text-white transition-colors">
                  Industrial Tanks
                </Link>
              </li>
              <li>
                <Link href={routes.products} className="text-[#B8C5D0] hover:text-white transition-colors">
                  Custom Fabrication
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg">Company</h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <li>
                <Link href={routes.about} className="text-[#B8C5D0] hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={routes.quality} className="text-[#B8C5D0] hover:text-white transition-colors">
                  Quality Standards
                </Link>
              </li>
              <li>
                <Link href={routes.contact} className="text-[#B8C5D0] hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href={routes.quote} className="text-[#B8C5D0] hover:text-white transition-colors">
                  Request Quote
                </Link>
              </li>
              <li>
                <Link href={routes.privacy} className="text-[#B8C5D0] hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="min-w-0">
            <h3 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg">Contact</h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              {siteConfig.contact.phone && (
                <li>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-[#B8C5D0] hover:text-white transition-colors break-words"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </li>
              )}
              {siteConfig.contact.email && (
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-[#B8C5D0] hover:text-white transition-colors break-words"
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
                    className="text-[#B8C5D0] hover:text-white transition-colors break-words"
                  >
                    WhatsApp: {siteConfig.contact.phoneDisplay}
                  </a>
                </li>
              )}
              {siteConfig.contact.hours && (
                <li className="text-[#B8C5D0]">{siteConfig.contact.hours}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#526575] mt-8 sm:mt-10 pt-6 sm:pt-8 text-center text-sm sm:text-base text-[#B8C5D0]">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
