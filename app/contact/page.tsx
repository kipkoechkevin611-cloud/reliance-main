'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react'
import { siteConfig } from '../../lib/site-config'
import { routes } from '../../lib/routes'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Container } from '../../components/layout/container'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // In a real implementation, this would send to an API endpoint
    // For now, simulate a submission
    setTimeout(() => {
      setSubmitStatus('success')
      setIsSubmitting(false)
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      {/* Header */}
      <div className="bg-[#103B66] text-white py-12 md:py-16 lg:py-20">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-[#B8C5D0] text-lg">
            Get in touch with our team for inquiries, quotes, and technical support
          </p>
        </Container>
      </div>

      <Container className="py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 min-w-0">
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#103B66] mb-6 md:mb-8">Get in Touch</h2>

              <div className="space-y-6">
                {siteConfig.contact.phone && (
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#0D9488]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[#172B3A] mb-1">Phone</h3>
                      <a
                        href={`tel:${siteConfig.contact.phone}`}
                        className="text-[#526575] hover:text-[#0D9488] transition-colors break-words"
                      >
                        {siteConfig.contact.phoneDisplay}
                      </a>
                    </div>
                  </div>
                )}

                {siteConfig.contact.email && (
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#0D9488]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[#172B3A] mb-1">Email</h3>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-[#526575] hover:text-[#0D9488] transition-colors break-words"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {siteConfig.contact.whatsapp && (
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5 text-[#0D9488]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[#172B3A] mb-1">WhatsApp</h3>
                      <a
                        href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#526575] hover:text-[#0D9488] transition-colors break-words"
                      >
                        Message us on WhatsApp
                      </a>
                    </div>
                  </div>
                )}

                {siteConfig.contact.address && (
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#0D9488]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[#172B3A] mb-1">Address</h3>
                      <address className="text-[#526575] not-italic break-words">
                        {siteConfig.contact.address}
                      </address>
                    </div>
                  </div>
                )}

                {siteConfig.contact.hours && (
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#0D9488]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[#172B3A] mb-1">Business Hours</h3>
                      <p className="text-[#526575] break-words">{siteConfig.contact.hours}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#103B66] mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Link href={routes.quote} className="block w-full">
                  <Button variant="primary" size="lg" className="w-full">
                    Request a Quote
                  </Button>
                </Link>
                <Link href={routes.calculator} className="block w-full">
                  <Button variant="outline" size="lg" className="w-full">
                    Calculate Your Needs
                  </Button>
                </Link>
                <Link href={routes.products} className="block w-full">
                  <Button variant="outline" size="lg" className="w-full">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 min-w-0 w-full h-fit">
            <h2 className="text-xl font-bold text-[#103B66] mb-6 md:mb-8">Send Us a Message</h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-green-800 text-sm break-words">
                  Message sent successfully! We&apos;ll get back to you soon.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm break-words">
                  There was an error sending your message. Please try again.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 w-full min-w-0">
              <div className="min-w-0 w-full">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2"
                  required
                />
              </div>

              <div className="min-w-0 w-full">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2"
                  required
                />
              </div>

              <div className="min-w-0 w-full">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-2"
                  required
                />
              </div>

              <div className="min-w-0 w-full">
                <Label htmlFor="message">Message *</Label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full min-w-0 mt-2 px-3.5 py-2.5 rounded-md border border-[#D9E2EC] bg-white text-[#172B3A] focus:outline-none focus:ring-2 focus:ring-[#0D9488] min-h-[150px] text-base"
                  required
                />
              </div>

              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-8 lg:mt-12 bg-white rounded-lg shadow-sm p-6 md:p-8 min-w-0">
          <h2 className="text-xl font-bold text-[#103B66] mb-6">Our Location</h2>
          <div className="aspect-video bg-[#F4F7FA] rounded-lg flex items-center justify-center">
            <div className="text-center px-4 min-w-0">
              <MapPin className="w-12 h-12 text-[#526575] mx-auto mb-2" />
              <p className="text-[#526575] break-words">
                {siteConfig.contact.address || 'Location to be configured'}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
