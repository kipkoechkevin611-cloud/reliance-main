import Link from 'next/link'
import { ArrowRight, Calculator, CheckCircle2, Droplets, Factory, Home, Phone, Trees, Wrench } from 'lucide-react'
import { routes } from '../lib/routes'
import { siteConfig } from '../lib/site-config'
import { features } from '../data/features'
import { getFeaturedProducts } from '../data/products'
import { testimonials } from '../data/testimonials'
import { faqs } from '../data/faq'
import { Button } from '../components/ui/button'
import { Accordion } from '../components/ui/accordion'
import { FeaturedProducts } from '../components/home/featured-products'
import { ProductGrid } from '../components/products/product-grid'
import { Container } from '../components/layout/container'

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0D9488] via-[#103B66] to-[#0A2848] text-white py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#0D9488] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#103B66] rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#0D9488]/30 rounded-full blur-2xl"></div>
        </div>
        <Container>
          <div className="max-w-6xl min-w-0 relative z-10 text-center">
            <div className="mb-8 inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 mx-auto">
              <Droplets className="w-6 h-6 text-[#0D9488]" />
              <span className="text-base font-semibold text-white">Kenya's #1 Water Storage Solutions</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight break-words bg-gradient-to-r from-white via-[#E0F2FE] to-white bg-clip-text text-transparent">
              Premium Water Storage for Every Application
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#B8C5D0] mb-12 leading-relaxed max-w-4xl mx-auto">
              From residential homes to industrial facilities, we deliver durable, reliable water storage solutions across Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center">
              <Link href={routes.products} className="flex-1 sm:flex-none">
                <Button variant="primary" size="lg" className="w-full sm:w-auto text-base md:text-lg px-10 py-4 bg-[#0D9488] hover:bg-[#0B7D73] border-0">
                  Explore Products
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href={routes.quote} className="flex-1 sm:flex-none">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/50 text-white hover:bg-white/10 text-base md:text-lg px-10 py-4">
                  Get Free Quote
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-[#0D9488]" />
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white hover:text-[#0D9488] transition-colors"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#0D9488] mb-1">500L+</div>
                <div className="text-sm text-[#B8C5D0]">Tank Capacity</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#0D9488] mb-1">15+</div>
                <div className="text-sm text-[#B8C5D0]">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#0D9488] mb-1">1000+</div>
                <div className="text-sm text-[#B8C5D0]">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#0D9488] mb-1">Nationwide</div>
                <div className="text-sm text-[#B8C5D0]">Delivery</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-24 lg:py-28 bg-white">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 md:mb-14 gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#103B66]">Explore Our Vertical Water Tanks</h2>
            <Link href={routes.products} className="text-[#0D9488] font-medium inline-flex items-center hover:underline text-base sm:text-lg">
              View All Products
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <FeaturedProducts products={featuredProducts} />
        </Container>
      </section>

      {/* Why Choose Reliance Tank */}
      <section className="py-20 md:py-24 lg:py-28 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-[#103B66] mb-12 md:mb-14 text-center">
            Why Choose Reliance Tank?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = getIcon(feature.icon)
              return (
                <div key={feature.id} className="p-6 sm:p-8 flex flex-col h-full items-start gap-4 sm:gap-5 min-w-0 bg-white border border-[#D9E2EC] rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-[#0D9488]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 text-[#0D9488]" />
                  </div>
                  <h3 className="font-semibold text-[#172B3A] text-base sm:text-lg leading-tight break-words">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-[#526575] leading-relaxed break-words">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Featured Categories */}
      <section className="py-20 md:py-24 lg:py-28 bg-[#F4F7FA]">
        <Container>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#103B66] mb-12 md:mb-14 text-center">
            Our Product Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Industrial Storage',
                description: 'Heavy-duty steel tanks for industrial applications',
                icon: Factory,
                link: routes.products,
              },
              {
                title: 'Agricultural Storage',
                description: 'UV-stabilized poly tanks for farms and irrigation',
                icon: Trees,
                link: routes.products,
              },
              {
                title: 'Underground Tanks',
                description: 'Reinforced concrete tanks for below-ground installation',
                icon: Wrench,
                link: routes.products,
              },
              {
                title: 'Rainwater Harvesting',
                description: 'Specialized tanks for water collection systems',
                icon: Droplets,
                link: routes.products,
              },
              {
                title: 'Custom Fabrication',
                description: 'Bespoke tank design and manufacturing',
                icon: Wrench,
                link: routes.products,
              },
            ].map((category) => (
              <Link
                key={category.title}
                href={category.link}
                className="bg-white rounded-lg p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full min-w-0 border border-[#D9E2EC]"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#0D9488]/10 rounded-lg flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-[#0D9488]/20 transition-colors shrink-0">
                  <category.icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#0D9488]" />
                </div>
                <h3 className="font-semibold text-[#172B3A] mb-2 sm:mb-3 text-base sm:text-lg leading-tight break-words">{category.title}</h3>
                <p className="text-sm sm:text-base text-[#526575] mb-4 sm:mb-5 leading-relaxed break-words flex-1">{category.description}</p>
                <span className="text-[#0D9488] text-sm sm:text-base font-medium inline-flex items-center mt-auto group-hover:translate-x-1 transition-transform">
                  View Category →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Applications */}
      <section className="py-20 md:py-24 lg:py-28 bg-[#F4F7FA]">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-[#103B66] mb-12 md:mb-14 text-center">
            Applications & Industries
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Residential', icon: Home, description: 'Household water storage and rainwater harvesting' },
              { title: 'Agricultural', icon: Trees, description: 'Irrigation, livestock watering, farm operations' },
              { title: 'Commercial', icon: Factory, description: 'Office buildings, apartment complexes, retail' },
              { title: 'Industrial', icon: Wrench, description: 'Manufacturing, processing, industrial facilities' },
            ].map((app) => (
              <div key={app.title} className="bg-white rounded-lg p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow flex flex-col h-full min-w-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#F4F7FA] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 shrink-0">
                  <app.icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#0D9488]" />
                </div>
                <h3 className="font-semibold text-[#172B3A] mb-2 sm:mb-3 text-base sm:text-lg leading-tight break-words">{app.title}</h3>
                <p className="text-sm sm:text-base text-[#526575] leading-relaxed break-words">{app.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Quality Section */}
      <section className="py-20 md:py-24 lg:py-28 bg-white">
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#103B66] mb-10 md:mb-12">Quality & Engineering</h2>
          <p className="text-[#526575] mb-10 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
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

      {/* Testimonials */}
      <section className="py-20 md:py-24 lg:py-28 bg-[#F4F7FA]">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-[#103B66] mb-12 md:mb-14 text-center">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full min-w-0">
                <div className="flex items-center mb-4 sm:mb-5 gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <CheckCircle2 key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-[#0D9488] fill-[#0D9488] shrink-0" />
                  ))}
                </div>
                <p className="text-[#526575] text-sm sm:text-base mb-4 sm:mb-5 italic leading-relaxed break-words flex-1">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="mt-auto">
                  <p className="font-semibold text-[#172B3A] text-sm sm:text-base break-words">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-[#526575] break-words">{testimonial.company}</p>
                  {testimonial.isDemo && (
                    <p className="text-xs sm:text-sm text-[#526575] mt-2 italic">(Demonstration content)</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-24 lg:py-28 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-[#103B66] mb-12 md:mb-14 text-center">
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
      <section className="py-20 md:py-24 lg:py-28 bg-[#103B66] text-white">
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10 break-words">
            Looking for the Right Water Storage Solution?
          </h2>
          <p className="text-[#B8C5D0] mb-10 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
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
