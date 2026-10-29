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
      <section className="relative bg-gradient-to-br from-white via-background to-white text-dark overflow-hidden">
        <Container>
          <div className="max-w-7xl min-w-0 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 lg:py-24">
            {/* Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="mb-6 inline-flex items-center gap-2 bg-yellow/10 px-4 py-2 rounded-full border border-yellow/20">
                <Droplets className="w-5 h-5 text-navy" />
                <span className="text-sm md:text-base font-semibold text-navy">Kenya&apos;s Trusted Water Storage Solutions</span>
              </div>
              <h1 className="font-bold mb-6 leading-tight break-words max-w-4xl mx-auto lg:mx-0 text-navy text-hero">
                Reliable Water Storage Solutions for Every Need
              </h1>
              <p className="mb-8 leading-relaxed max-w-[550px] mx-auto lg:mx-0 text-secondary text-base lg:text-lg">
                Durable water tanks for homes, farms, businesses, industries and institutions across Kenya. Built to last with premium quality materials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center lg:justify-start mb-8">
                <Link href={routes.products} className="flex-1 sm:flex-none min-w-0">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Shop Water Tanks
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href={routes.quote} className="flex-1 sm:flex-none min-w-0">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Get a Quote
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Phone className="w-5 h-5 text-navy" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-xl md:text-2xl lg:text-3xl font-bold text-navy hover:text-blue transition-colors break-words"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex items-center justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px]">
                <div className="w-full rounded-2xl overflow-hidden shadow-lift bg-white p-8">
                  <img
                    src="/vertical.jpeg"
                    alt="Vertical Cylindrical Water Tank"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Shop by Category */}
      <section className="py-20 lg:py-24 bg-white">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <h2 className="text-h2 text-navy leading-tight">Shop by Category</h2>
            <Link href={routes.products} className="text-blue font-semibold inline-flex items-center hover:underline text-base">
              View all
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
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
                className="bg-background rounded-2xl p-6 hover:shadow-lift transition-shadow group flex flex-col h-full min-w-0 border border-border"
              >
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-navy/20 transition-colors shrink-0">
                  <category.icon className="w-7 h-7 text-navy" />
                </div>
                <h3 className="font-semibold text-navy mb-2 text-sm sm:text-base leading-tight break-words">{category.title}</h3>
                <p className="text-sm text-secondary leading-relaxed break-words flex-1">{category.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-20 lg:py-24 bg-white">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <h2 className="text-h2 text-navy leading-tight">Vertical Cylindrical Water Tanks</h2>
            <Link href={routes.products} className="text-blue font-semibold inline-flex items-center hover:underline text-base">
              View all products
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <FeaturedProducts products={featuredProducts} />
        </Container>
      </section>

      {/* Why Choose Reliance Tank */}
      <section className="py-20 lg:py-24 bg-white">
        <Container>
          <h2 className="text-h2 text-navy mb-12 text-center leading-tight">
            Why Choose Reliance Tank?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = getIcon(feature.icon)
              return (
                <div key={feature.id} className="p-6 flex flex-col h-full items-start gap-4 min-w-0 bg-background border border-border rounded-2xl shadow-soft hover:shadow-medium transition-shadow">
                  <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 text-navy" />
                  </div>
                  <h3 className="font-semibold text-navy text-base sm:text-lg leading-tight break-words">{feature.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed break-words">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Featured Categories */}
      <section className="py-20 lg:py-24 bg-background">
        <Container>
          <h2 className="text-h2 text-navy mb-12 text-center leading-tight">
            Our Product Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow group flex flex-col h-full min-w-0 border border-border"
              >
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-navy/20 transition-colors shrink-0">
                  <category.icon className="w-7 h-7 text-navy" />
                </div>
                <h3 className="font-semibold text-navy mb-2 text-base sm:text-lg leading-tight break-words">{category.title}</h3>
                <p className="text-sm text-secondary mb-4 leading-relaxed break-words flex-1">{category.description}</p>
                <span className="text-blue text-sm font-semibold inline-flex items-center mt-auto group-hover:translate-x-1 transition-transform">
                  View Category →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Applications */}
      <section className="py-20 lg:py-24 bg-background">
        <Container>
          <h2 className="text-h2 text-navy mb-12 text-center leading-tight">
            Applications & Industries
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Residential', icon: Home, description: 'Household water storage and rainwater harvesting' },
              { title: 'Agricultural', icon: Trees, description: 'Irrigation, livestock watering, farm operations' },
              { title: 'Commercial', icon: Factory, description: 'Office buildings, apartment complexes, retail' },
              { title: 'Industrial', icon: Wrench, description: 'Manufacturing, processing, industrial facilities' },
            ].map((app) => (
              <div key={app.title} className="bg-white rounded-2xl p-6 text-center shadow-soft hover:shadow-medium transition-shadow flex flex-col h-full min-w-0">
                <div className="w-14 h-14 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
                  <app.icon className="w-7 h-7 text-navy" />
                </div>
                <h3 className="font-semibold text-navy mb-2 text-base leading-tight break-words">{app.title}</h3>
                <p className="text-sm text-secondary leading-relaxed break-words">{app.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Quality Section */}
      <section className="py-20 lg:py-24 bg-white">
        <Container className="text-center">
          <h2 className="text-h2 text-navy mb-6 leading-tight">Quality & Engineering</h2>
          <p className="text-secondary mb-8 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
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
      <section className="py-20 lg:py-24 bg-white">
        <Container>
          <h2 className="text-h2 text-navy mb-12 text-center leading-tight">
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
      <section className="py-20 lg:py-24 bg-navy text-white">
        <Container className="text-center">
          <h2 className="text-h2 mb-6 break-words leading-tight">
            Looking for the Right Water Storage Solution?
          </h2>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
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
