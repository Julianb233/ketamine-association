import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Article frontmatter type from markdown files
export interface ArticleFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  featuredImage: string;
  tags: string[];
  audience?: string;
}

// Full article type with body content
export interface Article extends ArticleFrontmatter {
  body: string;
  readTime: string;
}

// Article card type for listings (without full body)
export interface ArticleCard {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: string;
  image: string;
  tags: string[];
  audience?: string;
}

// Category mapping from enum to display name
export const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  CLINICAL_RESEARCH: 'Clinical Research',
  PRACTICE_MANAGEMENT: 'Practice Management',
  PATIENT_STORIES: 'Patient Stories',
  INDUSTRY_NEWS: 'Industry News',
  TREATMENT_PROTOCOLS: 'Treatment Protocols',
  POLICY_ADVOCACY: 'Policy & Advocacy',
  PATIENT_EDUCATION: 'Patient Education',
};

// Reverse mapping for filtering
export const CATEGORY_ENUM_VALUES: Record<string, string> = {
  'Clinical Research': 'CLINICAL_RESEARCH',
  'Practice Management': 'PRACTICE_MANAGEMENT',
  'Patient Stories': 'PATIENT_STORIES',
  'Industry News': 'INDUSTRY_NEWS',
  'Treatment Protocols': 'TREATMENT_PROTOCOLS',
  'Policy & Advocacy': 'POLICY_ADVOCACY',
  'Patient Education': 'PATIENT_EDUCATION',
};

const articlesDirectory = path.join(process.cwd(), 'content/articles');

/**
 * Calculate estimated reading time based on word count
 */
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Format date string for display
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Get display category from enum value
 */
function getDisplayCategory(category: string): string {
  return CATEGORY_DISPLAY_NAMES[category] || category;
}

/**
 * Parse a markdown file and return article data
 */
function parseArticleFile(filename: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const frontmatter = data as ArticleFrontmatter;

    return {
      ...frontmatter,
      body: content,
      readTime: calculateReadTime(content),
    };
  } catch (error) {
    console.error(`Error parsing article ${filename}:`, error);
    return null;
  }
}

/**
 * Convert article to card format for listings
 */
function articleToCard(article: Article): ArticleCard {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: getDisplayCategory(article.category),
    author: {
      name: article.author,
      avatar: undefined, // Could be extended to support author images
    },
    publishedAt: formatDate(article.publishedAt),
    readTime: article.readTime,
    image: article.featuredImage || '/images/blog/placeholder.jpg',
    tags: article.tags || [],
    audience: article.audience,
  };
}

/**
 * Get all articles sorted by publish date (newest first)
 */
export async function getAllArticles(): Promise<ArticleCard[]> {
  try {
    if (!fs.existsSync(articlesDirectory)) {
      console.warn('Articles directory not found');
      return [];
    }

    const filenames = fs.readdirSync(articlesDirectory);
    const mdFiles = filenames.filter(file => file.endsWith('.md'));

    const articles: Article[] = [];

    for (const filename of mdFiles) {
      const article = parseArticleFile(filename);
      if (article) {
        articles.push(article);
      }
    }

    // Sort by publish date (newest first)
    articles.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return dateB - dateA;
    });

    return articles.map(articleToCard);
  } catch (error) {
    console.error('Error getting all articles:', error);
    return [];
  }
}

/**
 * Get article by slug with full content
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    if (!fs.existsSync(articlesDirectory)) {
      return null;
    }

    const filenames = fs.readdirSync(articlesDirectory);
    const mdFiles = filenames.filter(file => file.endsWith('.md'));

    for (const filename of mdFiles) {
      const article = parseArticleFile(filename);
      if (article && article.slug === slug) {
        return article;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error getting article ${slug}:`, error);
    return null;
  }
}

/**
 * Get article by slug with HTML content
 */
export async function getArticleBySlugWithHtml(slug: string): Promise<(Article & { htmlContent: string }) | null> {
  const article = await getArticleBySlug(slug);
  if (!article) return null;

  const processedContent = await remark()
    .use(html)
    .process(article.body);

  return {
    ...article,
    htmlContent: processedContent.toString(),
  };
}

/**
 * Get articles filtered by category
 */
export async function getArticlesByCategory(category: string): Promise<ArticleCard[]> {
  const allArticles = await getAllArticles();

  // Handle both enum and display name formats
  const enumValue = CATEGORY_ENUM_VALUES[category] || category;
  const displayName = CATEGORY_DISPLAY_NAMES[category] || category;

  return allArticles.filter(article =>
    article.category === displayName ||
    article.category === enumValue ||
    article.category === category
  );
}

/**
 * Get articles filtered by audience type
 */
export async function getArticlesByAudience(audience: string): Promise<ArticleCard[]> {
  const allArticles = await getAllArticles();
  return allArticles.filter(article => article.audience === audience);
}

/**
 * Get articles filtered by tag
 */
export async function getArticlesByTag(tag: string): Promise<ArticleCard[]> {
  const allArticles = await getAllArticles();
  const tagLower = tag.toLowerCase();
  return allArticles.filter(article =>
    article.tags.some(t => t.toLowerCase() === tagLower)
  );
}

/**
 * Search articles by title, excerpt, or tags
 */
export async function searchArticles(query: string): Promise<ArticleCard[]> {
  const allArticles = await getAllArticles();
  const queryLower = query.toLowerCase();

  return allArticles.filter(article =>
    article.title.toLowerCase().includes(queryLower) ||
    article.excerpt.toLowerCase().includes(queryLower) ||
    article.tags.some(tag => tag.toLowerCase().includes(queryLower))
  );
}

/**
 * Get all unique categories from articles
 */
export async function getAllCategories(): Promise<string[]> {
  const allArticles = await getAllArticles();
  const categories = new Set(allArticles.map(article => article.category));
  return Array.from(categories);
}

/**
 * Get all unique tags from articles
 */
export async function getAllTags(): Promise<string[]> {
  const allArticles = await getAllArticles();
  const tags = new Set<string>();

  allArticles.forEach(article => {
    article.tags.forEach(tag => tags.add(tag));
  });

  return Array.from(tags).sort();
}

/**
 * Get related articles based on category and tags
 */
export async function getRelatedArticles(slug: string, limit: number = 3): Promise<ArticleCard[]> {
  const article = await getArticleBySlug(slug);
  if (!article) return [];

  const allArticles = await getAllArticles();

  // Filter out the current article
  const otherArticles = allArticles.filter(a => a.slug !== slug);

  // Score articles by relevance
  const scoredArticles = otherArticles.map(a => {
    let score = 0;

    // Same category = +3 points
    if (a.category === getDisplayCategory(article.category)) {
      score += 3;
    }

    // Shared tags = +1 point each
    const articleTags = article.tags.map(t => t.toLowerCase());
    const sharedTags = a.tags.filter(t =>
      articleTags.includes(t.toLowerCase())
    );
    score += sharedTags.length;

    return { article: a, score };
  });

  // Sort by score and return top matches
  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);
}

/**
 * Get article slugs for static generation
 */
export async function getArticleSlugs(): Promise<string[]> {
  try {
    if (!fs.existsSync(articlesDirectory)) {
      return [];
    }

    const filenames = fs.readdirSync(articlesDirectory);
    const mdFiles = filenames.filter(file => file.endsWith('.md'));

    const slugs: string[] = [];

    for (const filename of mdFiles) {
      const article = parseArticleFile(filename);
      if (article) {
        slugs.push(article.slug);
      }
    }

    return slugs;
  } catch (error) {
    console.error('Error getting article slugs:', error);
    return [];
  }
}

/**
 * Get paginated articles
 */
export async function getPaginatedArticles(
  page: number = 1,
  limit: number = 10,
  category?: string,
  search?: string
): Promise<{
  articles: ArticleCard[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}> {
  let articles = await getAllArticles();

  // Apply category filter
  if (category && category !== 'All') {
    const enumValue = CATEGORY_ENUM_VALUES[category] || category;
    const displayName = CATEGORY_DISPLAY_NAMES[category] || category;

    articles = articles.filter(article =>
      article.category === displayName ||
      article.category === enumValue ||
      article.category === category
    );
  }

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    articles = articles.filter(article =>
      article.title.toLowerCase().includes(searchLower) ||
      article.excerpt.toLowerCase().includes(searchLower) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  const total = articles.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginatedArticles = articles.slice(start, start + limit);

  return {
    articles: paginatedArticles,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  };
}
