import Link from 'next/link'
import { ArrowRight, Calculator, CheckCircle2, Droplets, Factory, Home, Phone, Trees, Wrench } from 'lucide-react'
import { routes } from '../lib/routes'
import { siteConfig } from '../lib/site-config'
import { features } from '../data/features'
import { getFeaturedProducts } from '../data/products'
import { faqs } from '../data/faq'
import { Button } from '../components/ui/button'
import { Accordion } from '../components/ui/accordion'
import { FeaturedProducts } from '../components/home/featured-products'
import { Container } from '../components/layout/container'

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] text-white min-h-[600px] lg:min-h-[700px] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] lg:w-[600px] h-[500px] lg:h-[600px] bg-[#2563eb] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        </div>
        <Container>
          <div className="max-w-7xl min-w-0 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 lg:py-24">
            {/* Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Droplets className="w-5 h-5 text-[#2563eb]" />
                <span className="text-sm md:text-base font-semibold text-white">Kenya&apos;s #1 Water Storage Solutions</span>
              </div>
              <h1 className="font-bold mb-6 leading-tight break-words max-w-4xl mx-auto lg:mx-0 text-white" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                Reliable Water Storage Solutions for Every Need
              </h1>
              <p className="mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-[#f1f5f9]" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
                Find the right water tank for your home, farm or business. Durable, affordable, and built to last.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center lg:justify-start mb-8">
                <Link href={routes.products} className="flex-1 sm:flex-none min-w-0">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto text-base px-8 py-3.5 min-h-[48px] bg-[#2563eb] hover:bg-[#1d4ed8] border-0 rounded-xl">
                    Shop Water Tanks
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href={routes.quote} className="flex-1 sm:flex-none min-w-0">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 text-base px-8 py-3.5 min-h-[48px] rounded-xl">
                    Get a Quote
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Phone className="w-5 h-5 text-[#2563eb]" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-xl md:text-2xl lg:text-3xl font-bold text-white hover:text-[#2563eb] transition-colors break-words"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex items-center justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px]">
                <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/vertical.jpeg"
                    alt="Vertical Cylindrical Water Tank"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Shop by Category */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 md:mb-12 gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B2E59] leading-tight">Shop by Category</h2>
            <Link href={routes.products} className="text-[#12A6A6] font-medium inline-flex items-center hover:underline text-base sm:text-lg">
              View all
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                title: 'Vertical Cylindrical',
                description: 'Above-ground cylindrical tanks',
                icon: Droplets,
                link: `${routes.products}?category=vertical-cylindrical`,
              },
              {
                title: 'Nestable Tanks',
                description: 'Space-saving nestable design',
                icon: Droplets,
                link: `${routes.products}?category=nestable`,
              },
              {
                title: 'Conical Hopper',
                description: 'Complete drainage tanks',
                icon: Droplets,
                link: `${routes.products}?category=conical-hopper`,
              },
              {
                title: 'Underground Spherical',
                description: 'Space-efficient below-ground',
                icon: Droplets,
                link: `${routes.products}?category=underground-spherical`,
              },
              {
                title: 'Horizontal Septic',
                description: 'Wastewater treatment tanks',
                icon: Droplets,
                link: `${routes.products}?category=horizontal-septic`,
              },
            ].map((category) => (
              <Link
                key={category.title}
                href={category.link}
                className="bg-[#F3F7FB] rounded-lg p-4 sm:p-5 md:p-6 lg:p-8 hover:shadow-md transition-shadow group flex flex-col h-full min-w-0 border border-[#DCE5EF]"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#12A6A6]/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#12A6A6]/20 transition-colors shrink-0">
                  <category.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#12A6A6]" />
                </div>
                <h3 className="font-semibold text-[#0B2E59] mb-2 sm:mb-3 text-sm sm:text-base md:text-lg lg:text-xl leading-tight break-words">{category.title}</h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#172B4D] leading-relaxed break-words flex-1">{category.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 md:mb-12 gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B2E59] leading-tight">Vertical Cylindrical Water Tanks</h2>
            <Link href={routes.products} className="text-[#12A6A6] font-medium inline-flex items-center hover:underline text-base sm:text-lg">
              View all products
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <FeaturedProducts products={featuredProducts} />
        </Container>
      </section>

      {/* Why Choose Reliance Tank */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <Container>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B2E59] mb-8 sm:mb-10 md:mb-12 text-center leading-tight">
            Why Choose Reliance Tank?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature) => {
              const Icon = getIcon(feature.icon)
              return (
                <div key={feature.id} className="p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col h-full items-start gap-3 sm:gap-4 md:gap-5 lg:gap-6 min-w-0 bg-white border border-[#DCE5EF] rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#12A6A6]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#12A6A6]" />
                  </div>
                  <h3 className="font-semibold text-[#0B2E59] text-sm sm:text-base md:text-lg lg:text-xl leading-tight break-words">{feature.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#172B4D] leading-relaxed break-words">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Featured Categories */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#F3F7FB]">
        <Container>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B2E59] mb-8 sm:mb-10 md:mb-12 text-center leading-tight">
            Our Product Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Vertical Cylindrical Tanks',
                description: 'Standard above-ground water storage solutions',
                icon: Droplets,
                link: `${routes.products}?category=vertical-cylindrical`,
              },
              {
                title: 'Nestable Tanks',
                description: 'Efficient shipping and storage design',
                icon: Droplets,
                link: `${routes.products}?category=nestable`,
              },
              {
                title: 'Conical Hopper Tanks',
                description: 'Industrial tanks with complete drainage',
                icon: Factory,
                link: `${routes.products}?category=conical-hopper`,
              },
              {
                title: 'Underground Spherical Tanks',
                description: 'Space-efficient below-ground storage',
                icon: Wrench,
                link: `${routes.products}?category=underground-spherical`,
              },
              {
                title: 'Horizontal Septic Tanks',
                description: 'Wastewater treatment and sewage management',
                icon: Wrench,
                link: `${routes.products}?category=horizontal-septic`,
              },
            ].map((category) => (
              <Link
                key={category.title}
                href={category.link}
                className="bg-white rounded-lg p-5 sm:p-6 md:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full min-w-0 border border-[#DCE5EF]"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#12A6A6]/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4 md:mb-5 lg:mb-6 group-hover:bg-[#12A6A6]/20 transition-colors shrink-0">
                  <category.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#12A6A6]" />
                </div>
                <h3 className="font-semibold text-[#0B2E59] mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base md:text-lg lg:text-xl leading-tight break-words">{category.title}</h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#172B4D] mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-relaxed break-words flex-1">{category.description}</p>
                <span className="text-[#12A6A6] text-xs sm:text-sm md:text-base lg:text-lg font-medium inline-flex items-center mt-auto group-hover:translate-x-1 transition-transform">
                  View Category →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Applications */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#F3F7FB]">
        <Container>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B2E59] mb-8 sm:mb-10 md:mb-12 text-center leading-tight">
            Applications & Industries
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title: 'Residential', icon: Home, description: 'Household water storage and rainwater harvesting' },
              { title: 'Agricultural', icon: Trees, description: 'Irrigation, livestock watering, farm operations' },
              { title: 'Commercial', icon: Factory, description: 'Office buildings, apartment complexes, retail' },
              { title: 'Industrial', icon: Wrench, description: 'Manufacturing, processing, industrial facilities' },
            ].map((app) => (
              <div key={app.title} className="bg-white rounded-lg p-4 sm:p-6 md:p-8 text-center shadow-sm hover:shadow-md transition-shadow flex flex-col h-full min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#F3F7FB] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 shrink-0">
                  <app.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#12A6A6]" />
                </div>
                <h3 className="font-semibold text-[#0B2E59] mb-2 sm:mb-3 text-sm sm:text-base md:text-lg leading-tight break-words">{app.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-[#172B4D] leading-relaxed break-words">{app.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Quality Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <Container className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B2E59] mb-8 sm:mb-10 md:mb-12 leading-tight">Quality & Engineering</h2>
          <p className="text-[#526579] mb-8 sm:mb-10 md:mb-12 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Our tanks are engineered for durability, structural integrity, and long service life. We focus on
            material selection, proper design considerations, and providing guidance on installation and
            maintenance.
          </p>
          <Link href={routes.quality}>
            <Button variant="secondary" size="lg">
              Learn About Quality Standards
            </Button>
          </Link>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <Container>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B2E59] mb-8 sm:mb-10 md:mb-12 text-center leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto min-w-0">
            <Accordion
              items={faqs.slice(0, 4).map((faq) => ({
                question: faq.question,
                answer: faq.answer
              }))}
            />
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#0B2E59] text-white">
        <Container className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 md:mb-10 break-words leading-tight">
            Looking for the Right Water Storage Solution?
          </h2>
          <p className="text-[#E8F5F5] mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
            Contact us today for a personalized quote tailored to your specific requirements.
          </p>
          <Link href={routes.quote} className="inline-block">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Request a Quote
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  )
}

function getIcon(name: string) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    Warehouse: Factory,
    Scale: Calculator,
    ClipboardCheck: CheckCircle2,
    FileText: Wrench,
  }
  return icons[name] || CheckCircle2
}
