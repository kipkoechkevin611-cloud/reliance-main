'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, CheckCircle2, FileText, User, Package } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Container } from '../../components/layout/container'
import { routes } from '../../lib/routes'

type Step = 1 | 2 | 3

function QuoteRequestPageContent() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('productId')
  const productName = searchParams.get('productName')
  const capacity = searchParams.get('capacity')

  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Step 1: Product Requirements
  const [category, setCategory] = useState('')
  const [capacityLiters, setCapacityLiters] = useState(capacity ? Number(capacity) : '')
  const [quantity, setQuantity] = useState(1)
  const [material, setMaterial] = useState('')
  const [placement, setPlacement] = useState('')
  const [intendedUse, setIntendedUse] = useState('')
  const [deliveryRequirements, setDeliveryRequirements] = useState('')
  const [projectDescription, setProjectDescription] = useState('')

  // Step 2: Customer Details
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [preferredContact, setPreferredContact] = useState<'email' | 'phone' | 'whatsapp'>('email')
  const [timeline, setTimeline] = useState('')
  const [notes, setNotes] = useState('')

  // Step 3: Consent
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)

  const handleSubmit = async () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as Step)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: {
            name,
            company,
            email,
            phone,
            location,
            preferredContact,
            timeline,
            notes,
          },
          requirements: {
            productId: productId || undefined,
            productName: productName || undefined,
            category,
            capacityLiters: capacityLiters ? Number(capacityLiters) : undefined,
            quantity,
            material,
            placement,
            intendedUse,
            deliveryRequirements,
            projectDescription,
          },
          consent: {
            privacy: privacyConsent,
            marketing: marketingConsent,
          },
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => (prev - 1) as Step)
  }

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-[#F3F6F8] flex items-center justify-center py-12">
        <div className="bg-white rounded-lg shadow-sm p-12 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-[#0F9D9A] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#102A43] mb-4">Quote Request Submitted</h1>
          <p className="text-[#526575] mb-6">
            Thank you for your inquiry. We will review your requirements and get back to you within 1-2
            business days.
          </p>
          <div className="space-y-3">
            <Link href={routes.home}>
              <Button variant="primary" size="lg" className="w-full">
                Return to Home
              </Button>
            </Link>
            <Link href={routes.products}>
              <Button variant="outline" size="lg" className="w-full">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F3F6F8]">
      {/* Header */}
      <div className="bg-[#103B66] text-white py-12 md:py-16">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Request a Quote</h1>
          <p className="text-[#B8C5D0]">
            Tell us about your water storage requirements and we&apos;ll provide a personalized quotation
          </p>
        </Container>
      </div>

      <Container className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto min-w-0">
          {/* Progress Steps */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${currentStep >= step
                        ? 'bg-[#0F9D9A] text-white'
                        : 'bg-[#F3F6F8] text-[#526575]'
                      }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${currentStep > step ? 'bg-[#0F9D9A]' : 'bg-[#F3F6F8]'
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className={currentStep >= 1 ? 'text-[#0F9D9A] font-medium' : 'text-[#526575]'}>
                Product Requirements
              </span>
              <span className={currentStep >= 2 ? 'text-[#0F9D9A] font-medium' : 'text-[#526575]'}>
                Your Details
              </span>
              <span className={currentStep >= 3 ? 'text-[#0F9D9A] font-medium' : 'text-[#526575]'}>
                Review & Submit
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">
                  There was an error submitting your request. Please try again or contact us directly.
                </p>
              </div>
            )}

            {/* Step 1: Product Requirements */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#102A43] flex items-center">
                  <Package className="mr-2 w-6 h-6 text-[#0F9D9A]" />
                  Product Requirements
                </h2>

                {productName && (
                  <div className="bg-[#F3F6F8] rounded-lg p-4">
                    <p className="text-sm text-[#526575]">Selected Product</p>
                    <p className="font-semibold text-[#17212B]">{productName}</p>
                  </div>
                )}

                <div>
                  <Label htmlFor="category">Product Category</Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 mt-2 px-4 rounded-md border border-[#DCE4EA] bg-white text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#0F9D9A]"
                  >
                    <option value="">Select a category</option>
                    <option value="industrial">Industrial Storage</option>
                    <option value="agricultural">Agricultural Storage</option>
                    <option value="underground">Underground Tanks</option>
                    <option value="rainwater-harvesting">Rainwater Harvesting</option>
                    <option value="custom-fabrication">Custom Fabrication</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="capacity">Required Capacity (Litres)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="0"
                    value={capacityLiters}
                    onChange={(e) => setCapacityLiters(e.target.value)}
                    className="mt-2"
                    placeholder="e.g., 10000"
                  />
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="material">Material Preference</Label>
                  <select
                    id="material"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full h-11 mt-2 px-4 rounded-md border border-[#DCE4EA] bg-white text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#0F9D9A]"
                  >
                    <option value="">Select material</option>
                    <option value="steel">Steel</option>
                    <option value="polyethylene">Polyethylene</option>
                    <option value="concrete">Concrete</option>
                    <option value="fiberglass">Fiberglass</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="placement">Installation Placement</Label>
                  <select
                    id="placement"
                    value={placement}
                    onChange={(e) => setPlacement(e.target.value)}
                    className="w-full h-11 mt-2 px-4 rounded-md border border-[#DCE4EA] bg-white text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#0F9D9A]"
                  >
                    <option value="">Select placement</option>
                    <option value="above-ground">Above Ground</option>
                    <option value="underground">Underground</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="intendedUse">Intended Use</Label>
                  <Input
                    id="intendedUse"
                    value={intendedUse}
                    onChange={(e) => setIntendedUse(e.target.value)}
                    className="mt-2"
                    placeholder="e.g., Irrigation, household use, industrial processing"
                  />
                </div>

                <div>
                  <Label htmlFor="delivery">Delivery/Installation Requirements</Label>
                  <textarea
                    id="delivery"
                    value={deliveryRequirements}
                    onChange={(e) => setDeliveryRequirements(e.target.value)}
                    className="w-full mt-2 px-4 py-2 rounded-md border border-[#DCE4EA] bg-white text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#0F9D9A] min-h-[100px]"
                    placeholder="Any specific delivery or installation requirements"
                  />
                </div>

                <div>
                  <Label htmlFor="project">Project Description</Label>
                  <textarea
                    id="project"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full mt-2 px-4 py-2 rounded-md border border-[#DCE4EA] bg-white text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#0F9D9A] min-h-[100px]"
                    placeholder="Tell us more about your project"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Customer Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#102A43] flex items-center">
                  <User className="mr-2 w-6 h-6 text-[#0F9D9A]" />
                  Your Details
                </h2>

                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="company">Company Name (Optional)</Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2"
                    placeholder="+1 234 567 8900"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Project/Delivery Location *</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-2"
                    placeholder="City, State/Province, Country"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                  <select
                    id="preferredContact"
                    value={preferredContact}
                    onChange={(e) => setPreferredContact(e.target.value as 'email' | 'phone' | 'whatsapp')}
                    className="w-full h-11 mt-2 px-4 rounded-md border border-[#DCE4EA] bg-white text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#0F9D9A]"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="timeline">Expected Project Timeline (Optional)</Label>
                  <Input
                    id="timeline"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="mt-2"
                    placeholder="e.g., Within 3 months"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full mt-2 px-4 py-2 rounded-md border border-[#DCE4EA] bg-white text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#0F9D9A] min-h-[100px]"
                    placeholder="Any additional information"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#102A43] flex items-center">
                  <FileText className="mr-2 w-6 h-6 text-[#0F9D9A]" />
                  Review & Submit
                </h2>

                <div className="space-y-4">
                  <div className="bg-[#F3F6F8] rounded-lg p-4">
                    <h3 className="font-semibold text-[#17212B] mb-3">Product Requirements</h3>
                    <dl className="space-y-2 text-sm">
                      {productName && (
                        <div className="flex justify-between">
                          <dt className="text-[#526575]">Product:</dt>
                          <dd className="text-[#17212B]">{productName}</dd>
                        </div>
                      )}
                      {category && (
                        <div className="flex justify-between">
                          <dt className="text-[#526575]">Category:</dt>
                          <dd className="text-[#17212B] capitalize">{category}</dd>
                        </div>
                      )}
                      {capacityLiters && (
                        <div className="flex justify-between">
                          <dt className="text-[#526575]">Capacity:</dt>
                          <dd className="text-[#17212B]">{Number(capacityLiters).toLocaleString()}L</dd>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <dt className="text-[#526575]">Quantity:</dt>
                        <dd className="text-[#17212B]">{quantity}</dd>
                      </div>
                      {material && (
                        <div className="flex justify-between">
                          <dt className="text-[#526575]">Material:</dt>
                          <dd className="text-[#17212B] capitalize">{material}</dd>
                        </div>
                      )}
                      {placement && (
                        <div className="flex justify-between">
                          <dt className="text-[#526575]">Placement:</dt>
                          <dd className="text-[#17212B] capitalize">{placement}</dd>
                        </div>
                      )}
                      {intendedUse && (
                        <div className="flex justify-between">
                          <dt className="text-[#526575]">Intended Use:</dt>
                          <dd className="text-[#17212B]">{intendedUse}</dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  <div className="bg-[#F3F6F8] rounded-lg p-4">
                    <h3 className="font-semibold text-[#17212B] mb-3">Your Details</h3>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-[#526575]">Name:</dt>
                        <dd className="text-[#17212B]">{name}</dd>
                      </div>
                      {company && (
                        <div className="flex justify-between">
                          <dt className="text-[#526575]">Company:</dt>
                          <dd className="text-[#17212B]">{company}</dd>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <dt className="text-[#526575]">Email:</dt>
                        <dd className="text-[#17212B]">{email}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-[#526575]">Phone:</dt>
                        <dd className="text-[#17212B]">{phone}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-[#526575]">Location:</dt>
                        <dd className="text-[#17212B]">{location}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-[#526575]">Preferred Contact:</dt>
                        <dd className="text-[#17212B] capitalize">{preferredContact}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={privacyConsent}
                        onChange={(e) => setPrivacyConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 text-[#0F9D9A] border-[#DCE4EA] rounded focus:ring-[#0F9D9A]"
                        required
                      />
                      <span className="text-sm text-[#526575]">
                        I have read and agree to the{' '}
                        <Link href={routes.privacy} className="text-[#0F9D9A] hover:underline">
                          Privacy Policy
                        </Link>{' '}
                        and consent to the collection and processing of my personal information for quote
                        purposes. *
                      </span>
                    </label>

                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={(e) => setMarketingConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 text-[#0F9D9A] border-[#DCE4EA] rounded focus:ring-[#0F9D9A]"
                      />
                      <span className="text-sm text-[#526575]">
                        I would like to receive marketing communications and product updates from Reliance
                        Tanks.
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-[#DCE4EA]">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={handlePrevious} disabled={isSubmitting}>
                  Previous
                </Button>
              ) : (
                <div />
              )}

              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={isSubmitting || (currentStep === 3 && !privacyConsent)}
              >
                {isSubmitting ? 'Submitting...' : currentStep === 3 ? 'Submit Quote Request' : 'Next'}
                {currentStep < 3 && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default function QuoteRequestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F3F6F8] flex items-center justify-center">Loading...</div>}>
      <QuoteRequestPageContent />
    </Suspense>
  )
}
