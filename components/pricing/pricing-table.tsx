import { Phone, MessageCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { siteConfig } from '@/lib/site-config'
import { pricing2026 } from '@/data/pricing'

export function PricingTable() {
  const formatPrice = (price: number) => {
    return `KSh ${price.toLocaleString()}`
  }

  return (
    <div className="w-full">
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {pricing2026.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-[#D9E2EC] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-bold text-[#103B66]">
                  {item.capacity.toLocaleString()}L
                </h3>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-[#0D9488]">
                  {formatPrice(item.price)}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {siteConfig.contact.phone && (
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex-1"
                >
                  <Button variant="outline" size="sm" className="w-full text-sm">
                    <Phone className="mr-1 w-4 h-4" />
                    Call
                  </Button>
                </a>
              )}
              {siteConfig.contact.whatsapp && (
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="primary" size="sm" className="w-full text-sm">
                    <MessageCircle className="mr-1 w-4 h-4" />
                    WhatsApp
                  </Button>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="bg-white border border-[#D9E2EC] rounded-lg overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-[#103B66] text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Capacity</th>
                <th className="px-6 py-4 text-left font-semibold">Price (2026)</th>
                <th className="px-6 py-4 text-center font-semibold">Contact</th>
              </tr>
            </thead>
            <tbody>
              {pricing2026.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-[#D9E2EC] hover:bg-[#F4F7FA] transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-[#172B3A]">
                    {item.capacity.toLocaleString()}L
                  </td>
                  <td className="px-6 py-4 font-bold text-[#0D9488] text-lg">
                    {formatPrice(item.price)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      {siteConfig.contact.phone && (
                        <a
                          href={`tel:${siteConfig.contact.phone}`}
                          className="inline-flex"
                        >
                          <Button variant="outline" size="sm" className="text-sm">
                            <Phone className="mr-1 w-4 h-4" />
                            Call
                          </Button>
                        </a>
                      )}
                      {siteConfig.contact.whatsapp && (
                        <a
                          href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex"
                        >
                          <Button variant="primary" size="sm" className="text-sm">
                            <MessageCircle className="mr-1 w-4 h-4" />
                            WhatsApp
                          </Button>
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 text-center">
        <p className="text-[#526575] mb-4">
          Prices subject to change. Contact us for current availability and delivery options.
        </p>
        {siteConfig.contact.phone && (
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="inline-flex"
          >
            <Button variant="primary" size="lg">
              <Phone className="mr-2 w-5 h-5" />
              Call {siteConfig.contact.phoneDisplay}
            </Button>
          </a>
        )}
      </div>
    </div>
  )
}
