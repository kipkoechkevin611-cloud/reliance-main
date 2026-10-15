export const siteConfig = {
  name: 'Reliance Tank Ltd',
  description: 'Reliable water storage solutions for residential, agricultural, commercial, and industrial applications.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  contact: {
    phone: process.env.NEXT_PUBLIC_PHONE || '+254732934360',
    phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || '+254 732 934 360',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '254732934360',
    email: process.env.NEXT_PUBLIC_EMAIL || 'reliancetanksltd@gmail.com',
    address: process.env.NEXT_PUBLIC_ADDRESS || '',
    hours: process.env.NEXT_PUBLIC_HOURS || '',
  },
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK || '',
    twitter: process.env.NEXT_PUBLIC_TWITTER || '',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN || '',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || '',
  },
  currency: {
    code: 'KES',
    symbol: 'KSh',
  },
  units: {
    volume: 'litres',
    distance: 'metric',
  },
  quoteMode: (process.env.QUOTE_MODE || 'demo') as 'demo' | 'production',
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
  },
} as const

export const brandColors = {
  navy: '#103B66',
  blue: '#155E9A',
  teal: '#0D9488',
  tealLight: '#DDF4F2',
  white: '#FFFFFF',
  lightBg: '#F4F7FA',
  darkText: '#172B3A',
  secondaryText: '#526575',
  border: '#D9E2EC',
} as const


