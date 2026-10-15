import { z } from 'zod'

export const quoteRequestSchema = z.object({
  customer: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    company: z.string().optional(),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 characters'),
    location: z.string().min(2, 'Location is required'),
    preferredContact: z.enum(['email', 'phone', 'whatsapp']),
    timeline: z.string().optional(),
    notes: z.string().max(1000, 'Notes must be less than 1000 characters').optional(),
  }),
  requirements: z.object({
    productId: z.string().optional(),
    productName: z.string().optional(),
    category: z.string().optional(),
    capacityLiters: z.number().min(0).optional(),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    material: z.string().optional(),
    placement: z.string().optional(),
    intendedUse: z.string().optional(),
    deliveryRequirements: z.string().optional(),
    projectDescription: z.string().max(2000, 'Description must be less than 2000 characters').optional(),
    calculatorResults: z
      .object({
        dailyDemand: z.number(),
        recommendedCapacity: z.number(),
        autonomyDays: z.number(),
        rainwaterEstimate: z.number().optional(),
        unit: z.enum(['litres', 'cubic-metres', 'gallons']),
      })
      .optional(),
  }),
  consent: z.object({
    privacy: z.boolean().refine((val) => val === true, 'You must accept the privacy policy'),
    marketing: z.boolean(),
  }),
})

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>
