import Link from 'next/link'
import { routes } from '../lib/routes'
import { Button } from '../components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F3F6F8] flex items-center justify-center py-12">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-[#102A43] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#17212B] mb-4">Page Not Found</h2>
        <p className="text-[#526575] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={routes.home}>
            <Button variant="primary" size="lg">
              Return to Home
            </Button>
          </Link>
          <Link href={routes.products}>
            <Button variant="outline" size="lg">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
