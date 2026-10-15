# Reliance Tanks Website

A modern, high-converting website for Reliance Tanks, a company specializing in industrial, agricultural, commercial, and residential water storage solutions.

## Tech Stack

- **Framework**: Next.js 16.4 (App Router)
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom components with Lucide React icons
- **Forms**: React Hook Form with Zod validation
- **Animation**: Framer Motion
- **Testing**: Vitest for unit tests
- **Deployment**: Vercel-compatible

## Features

### Core Functionality
- **Product Catalog**: Filterable product listing with search, category, material, placement, and usage filters
- **Product Detail Pages**: Dynamic product pages with specifications, features, and related products
- **Water Capacity Calculator**: Interactive calculator for estimating water storage requirements
- **Multi-step Quote Request**: Form with product requirements, customer details, and review steps
- **Contact Page**: Contact form with configurable contact information
- **About & Quality Pages**: Company information and quality standards documentation
- **Privacy Policy**: Configurable privacy policy template

### Design & UX
- **Responsive Design**: Mobile-first approach with layouts for mobile, tablet, laptop, and desktop
- **Brand Identity**: Consistent use of Reliance Tanks brand colors (Navy #102A43, Steel #526575, Teal #0F9D9A)
- **Accessibility**: WCAG 2.2 AA compliant with keyboard navigation, focus states, and screen reader support
- **SEO**: Optimized metadata, sitemap, robots.txt, and structured data ready
- **Performance**: Server Components by default, optimized images, minimal client-side JavaScript

## Project Structure

```
reliance-tanks/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with header and footer
│   ├── page.tsx             # Homepage
│   ├── products/           # Product catalogue and detail pages
│   ├── calculator/         # Water capacity calculator
│   ├── request-quote/      # Multi-step quote form
│   ├── about/              # About page
│   ├── quality-standards/  # Quality standards page
│   ├── contact/            # Contact page
│   ├── privacy-policy/     # Privacy policy
│   ├── api/quotes/         # Quote submission API
│   ├── robots.ts           # Robots.txt
│   └── sitemap.ts          # XML sitemap
├── components/              # React components
│   ├── ui/                 # Base UI components (Button, Input, Label)
│   ├── layout/             # Layout components (Header, Footer)
│   └── shared/             # Shared components
├── data/                   # Mock data
│   ├── products.ts         # Product catalogue
│   ├── features.ts         # Feature list
│   ├── testimonials.ts     # Customer testimonials (demo)
│   └── faq.ts              # FAQ content
├── lib/                    # Utilities and business logic
│   ├── calculators/        # Water calculator logic
│   ├── validations/        # Zod schemas
│   ├── site-config.ts      # Site configuration
│   └── utils.ts            # Utility functions
├── types/                  # TypeScript type definitions
│   ├── product.ts          # Product types
│   ├── quote.ts            # Quote request types
│   └── calculator.ts       # Calculator types
└── public/                 # Static assets
```

## Getting Started

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd reliance-tanks
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_PHONE=+1234567890
NEXT_PUBLIC_PHONE_DISPLAY=+1 234 567 890
NEXT_PUBLIC_WHATSAPP=1234567890
NEXT_PUBLIC_EMAIL=info@reliancetanks.com
NEXT_PUBLIC_ADDRESS=123 Industrial Ave, City, State, Country
NEXT_PUBLIC_HOURS=Mon-Fri 8:00 AM - 5:00 PM
QUOTE_MODE=demo
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:
```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Testing

Run unit tests:
```bash
npm test
```

### Linting

Run ESLint:
```bash
npm run lint
```

## Configuration

### Site Configuration

Edit `lib/site-config.ts` to configure:
- Company name and description
- Contact information
- Social media links
- Brand colors
- Quote submission mode (demo/production)

### Product Data

Edit `data/products.ts` to:
- Add, modify, or remove products
- Update specifications
- Change pricing (if applicable)
- Update availability status

### Quote Delivery

The quote API (`app/api/quotes/route.ts`) currently runs in demo mode, logging submissions to the console. To enable production delivery:

1. Set `QUOTE_MODE=production` in environment variables
2. Implement email service integration (e.g., SendGrid, Resend, Mailgun)
3. Implement database storage (e.g., PostgreSQL, MongoDB)
4. Implement CRM integration (e.g., HubSpot, Salesforce)

Example email integration:
```typescript
// Uncomment and configure in app/api/quotes/route.ts
import { sendQuoteEmail } from '@/lib/services/email'
await sendQuoteEmail(quoteRequest)
```

## Pages Overview

### Homepage
- Hero section with CTAs
- Trust features
- Product categories
- Featured products
- Applications and industries
- Quality and engineering section
- Testimonials (demo content)
- FAQ section
- Final CTA

### Products
- Filterable product catalogue
- Search functionality
- Category, material, placement, and usage filters
- Product cards with quick actions
- Product detail pages with full specifications

### Calculator
- Household water demand calculator
- Agricultural calculator (livestock, irrigation)
- Commercial/Industrial calculator
- Rainwater harvesting calculator
- Unit conversion (litres, cubic metres, gallons)
- Product recommendations based on results

### Quote Request
- Multi-step form (Product Requirements → Your Details → Review)
- Prefilled data from product pages and calculator
- Form validation with Zod
- Privacy consent
- Demo mode logging or production delivery

### Contact
- Configurable contact information
- Click-to-call and WhatsApp links
- Contact form
- Map placeholder

### About
- Company mission and values
- Sectors served
- Water storage and sustainability context

### Quality Standards
- Material selection guidance
- Design considerations
- Installation and maintenance information
- Standards and certifications (general information)

## SEO

The site includes:
- Dynamic metadata generation
- Open Graph tags
- XML sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`
- Semantic HTML structure
- Breadcrumb navigation

## Accessibility

- Keyboard navigation throughout
- Visible focus states
- ARIA labels where needed
- Semantic HTML landmarks
- Color contrast compliance (WCAG AA)
- Reduced motion support

## Performance

- Server Components by default
- Client Components only for interactivity
- Optimized font loading
- Minimal client-side JavaScript
- Image optimization ready (Next.js Image component)

## Security

- Server-side validation for all form submissions
- Zod schema validation
- No secrets exposed in client code
- Configurable quote mode (demo/production)
- Environment variable configuration

## Demonstration Data

The following content is marked as demonstration data and should be replaced with actual company information:
- Customer testimonials (`data/testimonials.ts`)
- Company contact details (configured in environment variables)
- Product specifications (update in `data/products.ts`)
- Certifications and accreditations (update Quality Standards page)

## Deployment

### Vercel

1. Push code to Git repository
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

The site is compatible with any platform that supports Next.js:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Railway
- Render

## Support

For issues or questions about this implementation, refer to the Next.js documentation or contact the development team.

## License

This project is proprietary software for Reliance Tanks.
