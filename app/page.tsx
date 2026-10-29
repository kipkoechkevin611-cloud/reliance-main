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
      <section className="relative text-white overflow-hidden min-h-[450px] lg:min-h-[550px]">
        {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110" style={{ backgroundImage: 'url("/heroes page background.jpe")', filter: 'blur(2px)' }}></div>
          <div className="absolute inset-0 bg-navy/55"></div>
        </div>

        <Container>
          <div className="max-w-7xl min-w-0 relative z-10 flex items-center justify-center h-full py-8 lg:py-12 px-4">
            {/* Text Content - Centered for better balance */}
            <div className="text-center w-full max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 bg-yellow/20 px-3 py-1.5 rounded-full border border-yellow/30 backdrop-blur-sm">
                <Droplets className="w-4 h-4 text-yellow" />
                <span className="text-xs sm:text-sm font-semibold text-white">Kenya&apos;s Trusted Water Storage Solutions</span>
              </div>
              <h1 className="font-bold mb-4 leading-tight text-white" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.75rem)' }}>
                Reliable Water Storage Solutions for <span className="text-yellow">Every Need</span>
              </h1>
              <p className="mb-5 leading-relaxed max-w-xl mx-auto text-gray-100 text-sm sm:text-base">
                Find the right water tank for your home, farm or business. Durable, affordable, and built to last.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-5">
                <Link href={routes.products} className="flex-1 sm:flex-none min-w-0">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto bg-yellow text-navy hover:bg-yellow-light text-sm sm:text-base px-6 py-2.5">
                    Shop Water Tanks
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href={routes.quote} className="flex-1 sm:flex-none min-w-0">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20 text-sm sm:text-base px-6 py-2.5">
                    Get a Quote
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 text-yellow" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-base sm:text-lg lg:text-xl font-bold text-white hover:text-yellow transition-colors break-words"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Section */}
      <section className="py-8 lg:py-12 bg-white border-b border-border">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              { icon: Factory, title: 'Industrial Grade', desc: 'Premium HDPE materials' },
              { icon: CheckCircle2, title: 'Quality Assured', desc: 'Durable construction' },
              { icon: Calculator, title: 'Wide Range', desc: '100L to 24,000L tanks' },
              { icon: Wrench, title: 'Expert Support', desc: 'Technical assistance' },
            ].map((item, index) => (
              <div key={index} className="text-center min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-navy/10 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-navy" />
                </div>
                <h3 className="font-semibold text-navy text-xs sm:text-sm lg:text-base mb-1 break-words">{item.title}</h3>
                <p className="text-[11px] sm:text-xs lg:text-sm text-secondary break-words">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Shop by Category */}
      <section className="py-12 lg:py-16 bg-white">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3">
            <h2 className="text-h2 text-navy leading-tight">Shop by Category</h2>
            <Link href={routes.products} className="text-blue font-semibold inline-flex items-center hover:underline text-sm sm:text-base">
              View all
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
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
                className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 hover:shadow-lift transition-shadow group flex flex-col h-full min-w-0 border border-border"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-navy/10 rounded-xl flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 group-hover:bg-navy/20 transition-colors shrink-0">
                  <category.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-navy" />
                </div>
                <h3 className="font-semibold text-navy mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base leading-tight break-words">{category.title}</h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed break-words flex-1">{category.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-12 lg:py-16 bg-white">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3">
            <h2 className="text-h2 text-navy leading-tight">Vertical Cylindrical Water Tanks</h2>
            <Link href={routes.products} className="text-blue font-semibold inline-flex items-center hover:underline text-sm sm:text-base">
              View all products
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <FeaturedProducts products={featuredProducts} />
        </Container>
      </section>

      {/* Why Choose Reliance Tank */}
      <section className="py-12 lg:py-16 bg-background">
        <Container>
          <h2 className="text-h2 text-navy mb-8 text-center leading-tight">
            Why Choose Reliance Tank?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {features.map((feature) => {
              const Icon = getIcon(feature.icon)
              return (
                <div key={feature.id} className="p-4 sm:p-6 flex flex-col h-full items-start gap-3 sm:gap-4 min-w-0 bg-white border border-border rounded-xl sm:rounded-2xl shadow-soft hover:shadow-medium transition-shadow">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-navy/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-navy" />
                  </div>
                  <h3 className="font-semibold text-navy text-sm sm:text-base lg:text-lg leading-tight break-words">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed break-words">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Applications */}
      <section className="py-12 lg:py-16 bg-background">
        <Container>
          <h2 className="text-h2 text-navy mb-8 text-center leading-tight">
            Applications & Industries
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {[
              { title: 'Residential', icon: Home, description: 'Household water storage and rainwater harvesting' },
              { title: 'Agricultural', icon: Trees, description: 'Irrigation, livestock watering, farm operations' },
              { title: 'Commercial', icon: Factory, description: 'Office buildings, apartment complexes, retail' },
              { title: 'Industrial', icon: Wrench, description: 'Manufacturing, processing, industrial facilities' },
            ].map((app) => (
              <div key={app.title} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-soft hover:shadow-medium transition-shadow flex flex-col h-full min-w-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shrink-0">
                  <app.icon className="w-6 h-6 sm:w-7 sm:h-7 text-navy" />
                </div>
                <h3 className="font-semibold text-navy mb-2 text-sm sm:text-base leading-tight break-words">{app.title}</h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed break-words">{app.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Quality Section */}
      <section className="py-12 lg:py-16 bg-white">
        <Container className="text-center">
          <h2 className="text-h2 text-navy mb-4 sm:mb-6 leading-tight">Quality & Engineering</h2>
          <p className="text-secondary mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
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
      <section className="py-12 lg:py-16 bg-background">
        <Container>
          <h2 className="text-h2 text-navy mb-8 text-center leading-tight">
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
      <section className="py-12 lg:py-16 bg-navy text-white">
        <Container className="text-center">
          <h2 className="text-h2 mb-4 sm:mb-6 break-words leading-tight">
            Looking for the Right Water Storage Solution?
          </h2>
          <p className="text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
            Contact us today for a personalized quote tailored to your specific requirements.
          </p>
          <Link href={routes.quote} className="inline-block">
            <Button variant="primary" size="lg" className="bg-yellow text-navy hover:bg-yellow-light">
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
