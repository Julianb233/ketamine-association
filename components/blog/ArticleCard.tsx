import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: string;
}

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const categoryColors: Record<string, 'primary' | 'secondary' | 'accent' | 'default'> = {
  'Clinical Research': 'primary',
  'Practice Management': 'secondary',
  'Patient Stories': 'accent',
  'Industry News': 'default',
  'Treatment Protocols': 'primary',
  'Policy & Advocacy': 'secondary',
};

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const badgeVariant = categoryColors[article.category] || 'default';

  if (featured) {
    return (
      <Link href={`/blog/${article.slug}`} className="block group">
        <Card hover padding="none" className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-[4/3] md:aspect-auto">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <Badge variant={badgeVariant} size="sm" className="self-start mb-4">
                {article.category}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                {article.title}
              </h2>
              <p className="text-slate-600 mb-6 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-3">
                <Avatar
                  src={article.author.avatar}
                  name={article.author.name}
                  size="sm"
                />
                <div className="text-sm">
                  <p className="font-medium text-slate-900">{article.author.name}</p>
                  <p className="text-slate-500">
                    {article.publishedAt} &middot; {article.readTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${article.slug}`} className="block group">
      <Card hover padding="none" className="overflow-hidden h-full flex flex-col">
        <div className="relative aspect-[16/10]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <Badge variant={badgeVariant} size="sm" className="self-start mb-3">
            {article.category}
          </Badge>
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <Avatar
              src={article.author.avatar}
              name={article.author.name}
              size="sm"
            />
            <div className="text-sm">
              <p className="font-medium text-slate-900">{article.author.name}</p>
              <p className="text-slate-500">
                {article.publishedAt} &middot; {article.readTime}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
