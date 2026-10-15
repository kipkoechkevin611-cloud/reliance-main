import { MetadataRoute } from 'next'
import { siteConfig } from '../lib/site-config'
import { routes } from '../lib/routes'
import { products } from '../data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}${routes.products}`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}${routes.calculator}`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${routes.quote}`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}${routes.about}`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}${routes.quality}`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}${routes.contact}`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}${routes.privacy}`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Product pages
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}${routes.products}/${product.slug}`,
    lastModified: new Date('2024-01-01'),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...productPages]
}
