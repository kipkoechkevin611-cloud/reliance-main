import { NextRequest, NextResponse } from 'next/server'
import { quoteRequestSchema } from '../../../lib/validations/quote'
import { siteConfig } from '../../../lib/site-config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const validatedData = quoteRequestSchema.parse(body)

    // Generate a unique ID for the quote request
    const quoteId = `QT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const quoteRequest = {
      id: quoteId,
      timestamp: new Date().toISOString(),
      ...validatedData,
    }

    // In demo mode, just log the request and return success
    if (siteConfig.quoteMode === 'demo') {
      console.log('Quote request received (demo mode):', JSON.stringify(quoteRequest, null, 2))
      return NextResponse.json(
        {
          success: true,
          id: quoteId,
          message: 'Quote request received successfully (demo mode)',
        },
        { status: 200 }
      )
    }

    // In production mode, you would:
    // 1. Send email using a service like SendGrid, Mailgun, or Resend
    // 2. Store in database (PostgreSQL, MongoDB, etc.)
    // 3. Send to CRM (HubSpot, Salesforce, etc.)
    // 4. Trigger webhook notifications

    // Example email integration (uncomment and configure):
    // await sendQuoteEmail(quoteRequest)

    // Example database integration (uncomment and configure):
    // await db.quoteRequests.create({ data: quoteRequest })

    // For now, return a configuration error for production mode without integration
    return NextResponse.json(
      {
        success: false,
        error: 'Quote delivery service not configured. Please contact us directly.',
      },
      { status: 503 }
    )
  } catch (error) {
    console.error('Quote submission error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    )
  }
}
