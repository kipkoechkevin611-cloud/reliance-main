export interface QuoteRequest {
  id: string
  timestamp: Date
  customer: {
    name: string
    company?: string
    email: string
    phone: string
    location: string
    preferredContact: 'email' | 'phone' | 'whatsapp'
    timeline?: string
    notes?: string
  }
  requirements: {
    productId?: string
    productName?: string
    category?: string
    capacityLiters?: number
    quantity: number
    material?: string
    placement?: string
    intendedUse?: string
    deliveryRequirements?: string
    projectDescription?: string
    calculatorResults?: CalculatorResults
  }
  consent: {
    privacy: boolean
    marketing: boolean
  }
}

export interface CalculatorResults {
  dailyDemand: number
  recommendedCapacity: number
  autonomyDays: number
  rainwaterEstimate?: number
  unit: 'litres' | 'cubic-metres' | 'gallons'
}
