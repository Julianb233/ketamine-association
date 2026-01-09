import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const baseUrl = 'https://ketamineassociation.org'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    // Main Pages
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },

    // Provider Directory
    { url: `${baseUrl}/providers`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },

    // Academy - Patients
    { url: `${baseUrl}/academy`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/academy/patients`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/academy/patients/conditions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/academy/patients/treatments`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/academy/patients/preparation`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },

    // Academy - Practitioners
    { url: `${baseUrl}/academy/practitioners`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/academy/practitioners/certification`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/academy/practitioners/ce-credits`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },

    // Academy - Courses
    { url: `${baseUrl}/academy/courses`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },

    // Association
    { url: `${baseUrl}/association`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/association/membership`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/association/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/association/events`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/association/community`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },

    // Blog
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },

    // Store
    { url: `${baseUrl}/store`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },

    // Authentication
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/register`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/register/practitioner`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/register/patient`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  // Add blog articles dynamically
  const articlesDir = path.join(process.cwd(), 'content', 'articles')
  try {
    if (fs.existsSync(articlesDir)) {
      const files = fs.readdirSync(articlesDir)
      files.forEach(file => {
        if (file.endsWith('.md')) {
          const slug = file.replace('.md', '')
          routes.push({
            url: `${baseUrl}/blog/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6
          })
        }
      })
    }
  } catch (error) {
    console.error('Error reading articles directory:', error)
  }

  return routes
}
