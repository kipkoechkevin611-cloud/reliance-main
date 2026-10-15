import Link from 'next/link'
import { Container } from '../../components/layout/container'
import { routes } from '../../lib/routes'

export default function PrivacyPolicyPage() {
  const lastUpdated = 'January 1, 2024'

  return (
    <div className="min-h-screen bg-[#F3F6F8]">
      {/* Header */}
      <div className="bg-[#103B66] text-white py-12 md:py-16">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-[#B8C5D0]">Last updated: {lastUpdated}</p>
        </Container>
      </div>

      <Container className="py-12 md:py-16">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 max-w-4xl mx-auto min-w-0">
          <div className="prose prose-lg max-w-none">
            <p className="text-[#526575] mb-6">
              This Privacy Policy describes how Reliance Tanks collects, uses, and protects your personal
              information. By using our website and services, you agree to the collection and use of
              information in accordance with this policy.
            </p>

            <h2 className="text-2xl font-bold text-[#102A43] mt-8 mb-4">Information We Collect</h2>
            <p className="text-[#526575] mb-4">We may collect the following types of personal information:</p>
            <ul className="space-y-2 text-[#526575] mb-6">
              <li>• Contact information: name, email address, phone number</li>
              <li>• Company information: company name, business address</li>
              <li>• Project details: location, requirements, specifications</li>
              <li>• Communication preferences: preferred contact method</li>
              <li>• Usage data: website interactions, pages visited (via analytics)</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#102A43] mt-8 mb-4">How We Collect Information</h2>
            <p className="text-[#526575] mb-4">We collect information through:</p>
            <ul className="space-y-2 text-[#526575] mb-6">
              <li>• Quote request forms</li>
              <li>• Contact forms</li>
              <li>• Email communications</li>
              <li>• Phone conversations</li>
              <li>• Website analytics tools</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#102A43] mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-[#526575] mb-4">We use your information to:</p>
            <ul className="space-y-2 text-[#526575] mb-6">
              <li>• Process and respond to quote requests</li>
              <li>• Provide technical support and product information</li>
              <li>• Communicate about your inquiries and projects</li>
              <li>• Improve our products and services</li>
              <li>• Send marketing communications (with your consent)</li>
              <li>• Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#102A43] mt-8 mb-4">Information Sharing</h2>
            <p className="text-[#526575] mb-4">
              We do not sell your personal information to third parties. We may share your information with:
            </p>
            <ul className="space-y-2 text-[#526575] mb-6">
              <li>• Service providers who assist in quote processing and delivery</li>
              <li>• Business partners involved in fulfilling your request</li>
              <li>• Legal authorities when required by law</li>
            </ul>
            <p className="text-[#526575] mb-6">
              We ensure that any third parties we share with have appropriate data protection measures in place.
            </p>

            <h2 className="text-2xl font-bold text-[#102A43] mt-8 mb-4">Data Security</h2>
            <p className="text-[#526575] mb-6">
              We implement appropriate technical and organizational measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction. However, no method
              of transmission over the internet is completely secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-[#102A43] mt-8 mb-4">Data Retention</h2>
            <p className="text-[#526575] mb-6">
              We retain your personal information for as long as necessary to fulfill the purposes for which it
              was collected, unless a longer retention period is required or permitted by law. You may request
              deletion of your information by contacting us.
            </p>

            <h2 className="text-2xl font-bold text-[#102A43] mt-8 mb-4">Your Rights</h2>
            <p className="text-[#526575] mb-4">You have the right to:</p>
            <ul className="space-y-2 text-[#526575] mb-6">
              <li>• Access your personal information</li>
              <li>• Correct inaccurate information</li>
              <li>• Request deletion of your information</li>
              <li>• Object to processing of your information</li>
              <li>• Withdraw consent for marketing communications</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#102A43] mt-8 mb-4">Cookies and Analytics</h2>
            <p className="text-[#526575] mb-6">
              We may use cookies and similar technologies to improve your browsing experience and analyze
              website traffic. You can control cookie settings through your browser preferences. Analytics data
              is used anonymously to understand how our website is used.
            </p>

            <h2 className="text-2xl font-bold text-[#102A43] mt-8 mb-4">Third-Party Links</h2>
            <p className="text-[#526575] mb-6">
              Our website may contain links to third-party websites. We are not responsible for the privacy
              practices of these external sites. We encourage you to review their privacy policies.
            </p>

            <h2 className="text-2xl font-bold text-[#102A43] mt-8 mb-4">Changes to This Policy</h2>
            <p className="text-[#526575] mb-6">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by
              posting the new policy on our website and updating the &ldquo;Last updated&rdquo; date.
            </p>

            <h2 className="text-2xl font-bold text-[#102A43] mt-8 mb-4">Contact Us</h2>
            <p className="text-[#526575] mb-4">
              If you have questions about this Privacy Policy or your personal information, please contact us
              through:
            </p>
            <ul className="space-y-2 text-[#526575] mb-6">
              <li>• Email: [Configure email address]</li>
              <li>• Phone: [Configure phone number]</li>
              <li>• <Link href={routes.contact} className="text-[#0F9D9A] hover:underline">Contact Form</Link></li>
            </ul>

            <div className="bg-[#F3F6F8] border-l-4 border-[#0F9D9A] p-4 mt-8">
              <p className="text-sm text-[#526575] italic">
                <strong>Note:</strong> This is a template privacy policy. Company-specific details (email
                addresses, phone numbers, data processing practices) should be reviewed and updated before
                publication. Legal review is recommended to ensure compliance with applicable data protection
                laws.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
