import Link from 'next/link'
import { CheckCircle2, Shield, Wrench, FileText } from 'lucide-react'
import { routes } from '../../lib/routes'
import { Button } from '../../components/ui/button'
import { Container } from '../../components/layout/container'

export default function QualityStandardsPage() {
  return (
    <div className="min-h-screen bg-[#F3F6F8]">
      {/* Header */}
      <div className="bg-[#103B66] text-white py-12 md:py-16">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Quality Standards</h1>
          <p className="text-[#B8C5D0]">
            Engineering excellence and quality considerations in water storage systems
          </p>
        </Container>
      </div>

      <Container className="py-12 md:py-16 space-y-8">
        {/* Material Selection */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#102A43] mb-6 flex items-center">
            <Shield className="mr-2 w-6 h-6 text-[#0F9D9A]" />
            Material Selection
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-[#17212B] mb-2">Steel</h3>
              <p className="text-[#526575] mb-3">
                Steel tanks offer high strength and durability for industrial applications. Key considerations
                include corrosion protection through coatings or galvanization, appropriate wall thickness for
                the intended capacity, and structural reinforcement for large tanks.
              </p>
              <ul className="text-sm text-[#526575] space-y-1">
                <li>• Suitable for large-capacity storage</li>
                <li>• Requires corrosion protection</li>
                <li>• Foundation requirements are critical</li>
                <li>• Long service life with proper maintenance</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#17212B] mb-2">Polyethylene</h3>
              <p className="text-[#526575] mb-3">
                Polyethylene tanks are lightweight, corrosion-resistant, and suitable for a wide range of
                applications. UV stabilization is essential for outdoor use, and food-grade materials are
                available for potable water storage.
              </p>
              <ul className="text-sm text-[#526575] space-y-1">
                <li>• Lightweight and easy to install</li>
                <li>• Naturally corrosion-resistant</li>
                <li>• UV stabilization required for outdoor use</li>
                <li>• Food-grade options available</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#17212B] mb-2">Concrete</h3>
              <p className="text-[#526575] mb-3">
                Concrete tanks provide excellent durability for underground installations. Proper waterproofing,
                reinforcement, and curing are essential. Concrete tanks offer thermal insulation benefits and a
                long service life.
              </p>
              <ul className="text-sm text-[#526575] space-y-1">
                <li>• Ideal for underground installation</li>
                <li>• Excellent durability and longevity</li>
                <li>• Provides thermal insulation</li>
                <li>• Requires proper waterproofing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Design Considerations */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#102A43] mb-6 flex items-center">
            <Wrench className="mr-2 w-6 h-6 text-[#0F9D9A]" />
            Design Considerations
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#17212B] mb-2">Structural Integrity</h3>
              <p className="text-[#526575]">
                Tank design must account for hydrostatic pressure, wind loads (for above-ground tanks), soil
                pressure (for underground tanks), and seismic considerations where applicable. Engineering
                calculations should ensure adequate safety factors.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#17212B] mb-2">Capacity Planning</h3>
              <p className="text-[#526575]">
                Capacity should be based on daily demand, desired autonomy period, and available space. Use
                our calculator to estimate requirements, but consider consulting with a specialist for complex
                industrial or agricultural applications.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#17212B] mb-2">Site Conditions</h3>
              <p className="text-[#526575]">
                Soil conditions, drainage, accessibility for delivery and installation, proximity to other
                structures, and local regulations all influence tank selection and placement. Underground
                installations require particular attention to water table levels and soil stability.
              </p>
            </div>
          </div>
        </div>

        {/* Installation & Maintenance */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#102A43] mb-6 flex items-center">
            <CheckCircle2 className="mr-2 w-6 h-6 text-[#0F9D9A]" />
            Installation & Maintenance
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#17212B] mb-2">Foundation Preparation</h3>
              <p className="text-[#526575]">
                Proper foundation preparation is critical for tank stability and longevity. Requirements vary
                by tank size and material—from compacted sand for small poly tanks to reinforced concrete pads
                for large steel tanks. The foundation must be level and capable of supporting the tank&apos;s
                weight when full.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#17212B] mb-2">Installation Planning</h3>
              <p className="text-[#526575]">
                Consider site access for delivery equipment, clearance for installation, proximity to water
                sources and discharge points, and accessibility for ongoing maintenance. Professional
                installation is recommended for larger tanks.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#17212B] mb-2">Ongoing Maintenance</h3>
              <p className="text-[#526575]">
                Regular maintenance includes inspecting for leaks or damage, cleaning sediment buildup,
                checking fittings and connections, ensuring proper cover/lid security, and monitoring water
                quality. Maintenance frequency depends on usage, water source, and environmental conditions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#17212B] mb-2">Inspection</h3>
              <p className="text-[#526575]">
                Periodic inspection helps identify potential issues before they become problems. Check for
                signs of corrosion, structural stress, foundation settling, and wear on fittings and
                accessories. Documentation of inspections supports warranty claims and compliance with
                maintenance schedules.
              </p>
            </div>
          </div>
        </div>

        {/* Standards & Certifications */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#102A43] mb-6 flex items-center">
            <FileText className="mr-2 w-6 h-6 text-[#0F9D9A]" />
            Standards & Certifications
          </h2>
          <p className="text-[#526575] mb-4">
            Water storage tanks may be subject to various standards and regulations depending on location,
            application, and capacity. These may include:
          </p>
          <ul className="space-y-2 text-[#526575]">
            <li className="flex items-start">
              <span className="text-[#0F9D9A] mr-2">•</span>
              <span>
                Building codes and zoning regulations for tank placement and installation
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0F9D9A] mr-2">•</span>
              <span>
                Health department requirements for potable water storage
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0F9D9A] mr-2">•</span>
              <span>
                Environmental regulations for above-ground and underground storage
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0F9D9A] mr-2">•</span>
              <span>
                Industry standards for material specifications and manufacturing quality
              </span>
            </li>
          </ul>
          <p className="text-sm text-[#526575] mt-4 italic">
            Note: Specific certifications held by Reliance Tanks should be verified directly with the company.
            This page provides general information about quality considerations in water storage systems.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-[#102A43] text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Technical Guidance?</h2>
          <p className="text-[#B8C5D0] mb-6">
            Contact us for assistance with material selection, capacity planning, and installation requirements
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
