/**
 * Ketamine Association - Image Generation Script
 * Uses Google Gemini API (Imagen 3) for image generation
 */

import * as fs from 'fs';
import * as path from 'path';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyCNMR5qCc8eU23B_tkir_bN9SgQ3s6mGbw';

interface ImageConfig {
  name: string;
  path: string;
  prompt: string;
  aspectRatio?: string;
}

const images: ImageConfig[] = [
  {
    name: 'Official Logo',
    path: 'public/images/logo-full.png',
    prompt: `Professional national organization logo for "Ketamine Association", clean modern design with medical/healthcare symbolism, incorporates subtle brain or neural pathway element representing mental health, teal (#14B8A6) and deep navy color scheme, trustworthy authoritative feel like AMA or APA logos, balanced typography with sans-serif font, suitable for letterheads and digital use, vector style clean edges, white background`,
    aspectRatio: '1:1',
  },
  {
    name: 'Logo Icon',
    path: 'public/images/logo-icon.png',
    prompt: `Minimal icon/monogram logo "KA" for Ketamine Association, teal (#14B8A6) gradient, modern geometric design, subtle brain/neural element, professional medical organization style, clean vector graphic, suitable for favicon and app icons, white background`,
    aspectRatio: '1:1',
  },
  {
    name: 'Homepage Hero',
    path: 'public/images/hero-home.jpg',
    prompt: `Professional healthcare photography, warm modern clinic interior, compassionate female doctor in white coat consulting with middle-aged patient, soft natural lighting from large windows, teal and warm wood accents in decor, genuine connection and hope in expressions, high-end commercial photography style, shallow depth of field, photorealistic`,
    aspectRatio: '16:9',
  },
  {
    name: 'Directory Hero',
    path: 'public/images/hero-directory.jpg',
    prompt: `Patient using smartphone to search for healthcare provider, hopeful calm expression, modern comfortable home setting with soft natural light, person appears relaxed and optimistic, screen shows map or directory interface, warm color tones, professional commercial photography, photorealistic`,
    aspectRatio: '16:9',
  },
  {
    name: 'Academy Hero',
    path: 'public/images/hero-academy.jpg',
    prompt: `Medical education setting, diverse group of healthcare professionals in training workshop or seminar room, modern classroom with large screens, collaborative learning environment, professionals wearing business casual attire, teal accent colors in room design, professional commercial photography, photorealistic`,
    aspectRatio: '16:9',
  },
  {
    name: 'Treatment Room',
    path: 'public/images/treatment-room.jpg',
    prompt: `Serene ketamine infusion suite, comfortable recliner chair in spa-like medical setting, soft sage green and lavender tones, patient relaxed with eye mask, gentle ambient lighting, IV stand visible but not prominent, professional nurse monitoring compassionately, calming safe atmosphere, commercial healthcare photography, photorealistic`,
    aspectRatio: '16:9',
  },
  {
    name: 'Certification Badge',
    path: 'public/images/certification-badge.png',
    prompt: `Elegant professional certification badge design, circular emblem with laurel wreath border, text reads "Certified Ketamine Provider", teal (#14B8A6) and gold color scheme with subtle medical caduceus symbol, clean modern prestigious design, vector style sharp edges, transparent or white background`,
    aspectRatio: '1:1',
  },
  {
    name: 'Provider Placeholder',
    path: 'public/images/provider-placeholder.jpg',
    prompt: `Professional headshot silhouette placeholder image, clean teal (#14B8A6) gradient background, subtle person silhouette outline in darker teal, modern professional medical style, clean and minimal, suitable as avatar placeholder`,
    aspectRatio: '1:1',
  },
  {
    name: 'Testimonial Avatar 1',
    path: 'public/images/testimonials/avatar-1.jpg',
    prompt: `Professional headshot portrait, friendly middle-aged woman, warm genuine smile, soft professional lighting, neutral background, appears as a patient who has found healing, warm color tones, photorealistic`,
    aspectRatio: '1:1',
  },
  {
    name: 'Testimonial Avatar 2',
    path: 'public/images/testimonials/avatar-2.jpg',
    prompt: `Professional headshot portrait, friendly middle-aged man, warm genuine smile, soft professional lighting, neutral background, appears hopeful and healthy, warm color tones, photorealistic`,
    aspectRatio: '1:1',
  },
  {
    name: 'Testimonial Avatar 3',
    path: 'public/images/testimonials/avatar-3.jpg',
    prompt: `Professional headshot portrait, young professional woman doctor in white coat, confident warm smile, soft professional lighting, neutral background, competent and compassionate expression, photorealistic`,
    aspectRatio: '1:1',
  },
  {
    name: 'About Team',
    path: 'public/images/team/team-photo.jpg',
    prompt: `Professional team photo of diverse healthcare leadership team, 5-6 people in business professional attire, modern office conference room with teal accent wall, confident friendly expressions, professional commercial photography, photorealistic`,
    aspectRatio: '16:9',
  },
  {
    name: 'Blog - Research',
    path: 'public/images/blog/research.jpg',
    prompt: `Medical research laboratory setting, scientist analyzing data on computer screen with brain scan images, modern high-tech equipment, soft blue and teal lighting, professional atmosphere, commercial photography style, photorealistic`,
    aspectRatio: '16:9',
  },
  {
    name: 'Blog - Patient Stories',
    path: 'public/images/blog/patient-stories.jpg',
    prompt: `Diverse group of people in support group setting, comfortable living room atmosphere, warm natural lighting, genuine connection and hope in expressions, candid documentary style photography, photorealistic`,
    aspectRatio: '16:9',
  },
  {
    name: 'Blog - Practice Management',
    path: 'public/images/blog/practice-management.jpg',
    prompt: `Modern medical office reception area, clean contemporary design with teal accents, friendly receptionist at check-in desk, professional healthcare environment, commercial photography, photorealistic`,
    aspectRatio: '16:9',
  },
];

async function generateImage(config: ImageConfig): Promise<void> {
  console.log(`Generating: ${config.name}...`);

  const outputPath = path.join(process.cwd(), config.path);
  const outputDir = path.dirname(outputPath);

  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // Use Gemini's Imagen 3 API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instances: [
            {
              prompt: config.prompt,
            },
          ],
          parameters: {
            sampleCount: 1,
            aspectRatio: config.aspectRatio || '16:9',
            safetyFilterLevel: 'block_some',
            personGeneration: 'allow_adult',
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error: ${response.status} - ${error}`);
    }

    const data = await response.json();

    if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
      const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
      fs.writeFileSync(outputPath, imageBuffer);
      console.log(`✓ Saved: ${config.path}`);
    } else {
      console.error(`✗ No image data returned for: ${config.name}`);
      console.log('Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error(`✗ Failed to generate ${config.name}:`, error);
  }
}

async function generateAllImages(): Promise<void> {
  console.log('🎨 Ketamine Association Image Generation');
  console.log('=========================================\n');

  for (const image of images) {
    await generateImage(image);
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n✨ Image generation complete!');
}

// Run the script
generateAllImages().catch(console.error);
