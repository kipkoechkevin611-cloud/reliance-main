import Link from 'next/link'
import { Target, Users, Leaf, Shield } from 'lucide-react'
import { routes } from '../../lib/routes'
import { Button } from '../../components/ui/button'
import { Container } from '../../components/layout/container'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      {/* Header */}
      <div className="bg-[#103B66] text-white py-12 md:py-16 lg:py-20">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Reliance Tanks</h1>
          <p className="text-[#B8C5D0] text-lg">
            Engineering reliable water storage solutions for diverse applications
          </p>
        </Container>
      </div>

      <Container className="py-12 md:py-16 lg:py-20 space-y-8">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 min-w-0">
          <h2 className="text-2xl font-bold text-[#103B66] mb-6 md:mb-8">Our Mission</h2>
          <p className="text-[#526575] mb-4 leading-relaxed">
            Reliance Tanks is dedicated to providing reliable, high-quality water storage solutions for
            industrial, agricultural, commercial, and residential applications. We focus on engineering
            excellence, material quality, and customer service to deliver storage systems that meet the
            diverse needs of our clients.
          </p>
          <p className="text-[#526575] leading-relaxed">
            Our approach combines practical engineering with an understanding of real-world water
            storage challenges. Whether you need a small residential tank or a large industrial storage
            system, we provide solutions designed for durability, reliability, and long-term value.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Target,
              title: 'Reliability',
              description: 'We engineer storage solutions that deliver consistent performance over time.',
            },
            {
              icon: Shield,
              title: 'Quality',
              description: 'Material selection and structural design are fundamental to our approach.',
            },
            {
              icon: Users,
              title: 'Customer Service',
              description: 'We provide technical support and guidance throughout the selection and installation process.',
            },
            {
              icon: Leaf,
              title: 'Sustainability',
              description: 'Water storage supports water conservation and resource management initiatives.',
            },
          ].map((value) => (
            <div key={value.title} className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full min-w-0">
              <div className="w-12 h-12 bg-[#0D9488]/10 rounded-lg flex items-center justify-center mb-4 shrink-0">
                <value.icon className="w-6 h-6 text-[#0D9488]" />
              </div>
              <h3 className="font-semibold text-[#172B3A] mb-2 break-words">{value.title}</h3>
              <p className="text-sm text-[#526575] leading-relaxed break-words">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Sectors */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 min-w-0">
          <h2 className="text-2xl font-bold text-[#103B66] mb-6 md:mb-8">Sectors We Serve</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {[
              {
                title: 'Industrial',
                description: 'Manufacturing facilities, processing plants, and industrial operations requiring large-scale water storage.',
              },
              {
                title: 'Agricultural',
                description: 'Farms, agribusiness operations, irrigation systems, and livestock watering applications.',
              },
              {
                title: 'Commercial',
                description: 'Office buildings, apartment complexes, retail centers, and commercial developments.',
              },
              {
                title: 'Residential',
                description: 'Household water storage, rainwater harvesting, and garden irrigation systems.',
              },
            ].map((sector) => (
              <div key={sector.title} className="min-w-0">
                <h3 className="font-semibold text-[#172B3A] mb-2 break-words">{sector.title}</h3>
                <p className="text-sm text-[#526575] leading-relaxed break-words">{sector.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Water Security Context */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 min-w-0">
          <h2 className="text-2xl font-bold text-[#103B66] mb-6 md:mb-8">Water Storage & Sustainability</h2>
          <p className="text-[#526575] mb-4 leading-relaxed">
            Reliable water storage is increasingly important in the context of water security, climate
            variability, and growing demand. Storage solutions enable:
          </p>
          <ul className="space-y-3 text-[#526575]">
            <li className="flex items-start gap-2">
              <span className="text-[#0D9488] shrink-0">•</span>
              <span>Rainwater harvesting and water conservation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0D9488] shrink-0">•</span>
              <span>Backup supply during water interruptions or shortages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0D9488] shrink-0">•</span>
              <span>Efficient water management for agricultural and industrial use</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0D9488] shrink-0">•</span>
              <span>Reduced dependence on municipal water supplies</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-[#103B66] text-white rounded-lg p-6 md:p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Discuss Your Project?</h2>
          <p className="text-[#B8C5D0] mb-6">
            Contact us to discuss your water storage requirements and get a personalized quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={routes.quote}>
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Request a Quote
              </Button>
            </Link>
            <Link href={routes.contact}>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
