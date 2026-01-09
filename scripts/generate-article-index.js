#!/usr/bin/env node
/**
 * Generate Article Index
 *
 * This script generates an index.json file containing metadata for all markdown
 * articles in the content/articles directory. This enables faster loading of
 * article lists without parsing every markdown file on each request.
 *
 * Usage: node scripts/generate-article-index.js
 * Or: npm run articles:index
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(process.cwd(), 'content/articles');
const outputFile = path.join(articlesDir, 'index.json');

// Category display name mapping
const CATEGORY_DISPLAY_NAMES = {
  CLINICAL_RESEARCH: 'Clinical Research',
  PRACTICE_MANAGEMENT: 'Practice Management',
  PATIENT_STORIES: 'Patient Stories',
  INDUSTRY_NEWS: 'Industry News',
  TREATMENT_PROTOCOLS: 'Treatment Protocols',
  POLICY_ADVOCACY: 'Policy & Advocacy',
  PATIENT_EDUCATION: 'Patient Education',
  TREATMENT_INNOVATIONS: 'Treatment Innovations',
};

function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

function generateIndex() {
  console.log('Generating article index...');

  if (!fs.existsSync(articlesDir)) {
    console.error(`Error: Articles directory not found at ${articlesDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
  console.log(`Found ${files.length} markdown files`);

  const articles = files.map(filename => {
    try {
      const filePath = path.join(articlesDir, filename);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data, content: body } = matter(content);

      return {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        category: data.category,
        categoryDisplay: CATEGORY_DISPLAY_NAMES[data.category] || data.category,
        author: data.author,
        publishedAt: data.publishedAt,
        featuredImage: data.featuredImage || '/images/articles/placeholder.jpg',
        tags: data.tags || [],
        readTime: calculateReadTime(body),
        filename,
      };
    } catch (error) {
      console.error(`Error processing ${filename}:`, error.message);
      return null;
    }
  }).filter(Boolean);

  // Sort by publish date (newest first)
  articles.sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });

  // Gather unique categories and tags
  const categories = [...new Set(articles.map(a => a.categoryDisplay))];
  const tags = [...new Set(articles.flatMap(a => a.tags))].sort();

  const indexData = {
    generated: new Date().toISOString(),
    count: articles.length,
    categories,
    tags,
    articles,
  };

  fs.writeFileSync(outputFile, JSON.stringify(indexData, null, 2));

  console.log(`\nGenerated ${outputFile}`);
  console.log(`  - ${articles.length} articles indexed`);
  console.log(`  - ${categories.length} categories found`);
  console.log(`  - ${tags.length} unique tags found`);
}

// Run if called directly
if (require.main === module) {
  generateIndex();
}

module.exports = { generateIndex };
