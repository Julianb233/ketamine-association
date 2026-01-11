'use client';

import { useState } from 'react';
import {
  Search,
  ChevronDown,
  MoreVertical,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Trash2,
  Plus,
  Download,
  RefreshCw,
  Clock,
  FileText,
  Calendar,
  User,
  Tag,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

// Types matching Prisma schema
type ArticleCategory = 'CLINICAL_RESEARCH' | 'PRACTICE_MANAGEMENT' | 'PATIENT_STORIES' | 'REGULATORY_UPDATES' | 'TREATMENT_INNOVATIONS' | 'INDUSTRY_NEWS';
type ArticleStatus = 'DRAFT' | 'PENDING_REVIEW' | 'REVISION_NEEDED' | 'APPROVED' | 'PUBLISHED' | 'ARCHIVED';

interface Article {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: ArticleCategory;
  status: ArticleStatus;
  views: number;
  publishedAt: string | null;
  createdAt: string;
  excerpt: string;
}

interface ArticlesClientProps {
  articles: Article[];
}

const categoryLabels: Record<ArticleCategory, string> = {
  CLINICAL_RESEARCH: 'Clinical Research',
  PRACTICE_MANAGEMENT: 'Practice Management',
  PATIENT_STORIES: 'Patient Stories',
  REGULATORY_UPDATES: 'Regulatory Updates',
  TREATMENT_INNOVATIONS: 'Treatment Innovations',
  INDUSTRY_NEWS: 'Industry News',
};

const categoryColors: Record<ArticleCategory, string> = {
  CLINICAL_RESEARCH: 'bg-blue-500/10 text-blue-400',
  PRACTICE_MANAGEMENT: 'bg-emerald-500/10 text-emerald-400',
  PATIENT_STORIES: 'bg-pink-500/10 text-pink-400',
  REGULATORY_UPDATES: 'bg-amber-500/10 text-amber-400',
  TREATMENT_INNOVATIONS: 'bg-purple-500/10 text-purple-400',
  INDUSTRY_NEWS: 'bg-teal-500/10 text-teal-400',
};

const statusColors: Record<ArticleStatus, string> = {
  DRAFT: 'bg-slate-500/10 text-slate-400',
  PENDING_REVIEW: 'bg-amber-500/10 text-amber-400',
  REVISION_NEEDED: 'bg-orange-500/10 text-orange-400',
  APPROVED: 'bg-blue-500/10 text-blue-400',
  PUBLISHED: 'bg-emerald-500/10 text-emerald-400',
  ARCHIVED: 'bg-slate-500/10 text-slate-500',
};

const statusIcons: Record<ArticleStatus, typeof Clock> = {
  DRAFT: FileText,
  PENDING_REVIEW: Clock,
  REVISION_NEEDED: XCircle,
  APPROVED: CheckCircle,
  PUBLISHED: CheckCircle,
  ARCHIVED: FileText,
};

export default function ArticlesClient({ articles }: ArticlesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ArticleCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<ArticleStatus | 'all'>('all');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Filter articles
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Count articles by status
  const statusCounts = {
    pending: articles.filter((a) => a.status === 'PENDING_REVIEW').length,
    revision: articles.filter((a) => a.status === 'REVISION_NEEDED').length,
    approved: articles.filter((a) => a.status === 'APPROVED').length,
    published: articles.filter((a) => a.status === 'PUBLISHED').length,
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Articles</h1>
          <p className="mt-1 text-slate-400">
            Manage blog articles, reviews, and publications
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" icon={Plus}>
            New Article
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <button
          onClick={() => setStatusFilter('PENDING_REVIEW')}
          className={cn(
            'bg-slate-900 rounded-xl border p-4 text-left transition-colors hover:border-amber-500/50',
            statusFilter === 'PENDING_REVIEW' ? 'border-amber-500/50' : 'border-slate-800'
          )}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{statusCounts.pending}</p>
              <p className="text-sm text-slate-400">Pending Review</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setStatusFilter('REVISION_NEEDED')}
          className={cn(
            'bg-slate-900 rounded-xl border p-4 text-left transition-colors hover:border-orange-500/50',
            statusFilter === 'REVISION_NEEDED' ? 'border-orange-500/50' : 'border-slate-800'
          )}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <XCircle className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{statusCounts.revision}</p>
              <p className="text-sm text-slate-400">Needs Revision</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setStatusFilter('APPROVED')}
          className={cn(
            'bg-slate-900 rounded-xl border p-4 text-left transition-colors hover:border-blue-500/50',
            statusFilter === 'APPROVED' ? 'border-blue-500/50' : 'border-slate-800'
          )}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <CheckCircle className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{statusCounts.approved}</p>
              <p className="text-sm text-slate-400">Ready to Publish</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setStatusFilter('PUBLISHED')}
          className={cn(
            'bg-slate-900 rounded-xl border p-4 text-left transition-colors hover:border-emerald-500/50',
            statusFilter === 'PUBLISHED' ? 'border-emerald-500/50' : 'border-slate-800'
          )}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{statusCounts.published}</p>
              <p className="text-sm text-slate-400">Published</p>
            </div>
          </div>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search articles by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
            />
          </div>

          {/* Filter dropdowns */}
          <div className="flex flex-wrap gap-3">
            {/* Category filter */}
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as ArticleCategory | 'all')}
                className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 pr-10 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                <option value="all">All Categories</option>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            {/* Status filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ArticleStatus | 'all')}
                className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 pr-10 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                <option value="all">All Status</option>
                <option value="DRAFT">Draft</option>
                <option value="PENDING_REVIEW">Pending Review</option>
                <option value="REVISION_NEEDED">Revision Needed</option>
                <option value="APPROVED">Approved</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            <button
              onClick={() => {
                setCategoryFilter('all');
                setStatusFilter('all');
                setSearchQuery('');
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Articles table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredArticles.map((article) => {
                const StatusIcon = statusIcons[article.status];
                return (
                  <tr
                    key={article.id}
                    className="hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="max-w-md">
                        <p className="text-sm font-medium text-white line-clamp-1">{article.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <User className="w-3.5 h-3.5 text-slate-500" />
                          <span className="text-xs text-slate-500">{article.author}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium',
                          categoryColors[article.category]
                        )}
                      >
                        <Tag className="w-3 h-3" />
                        {categoryLabels[article.category]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium',
                          statusColors[article.status]
                        )}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {article.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-400">
                        {article.views > 0 ? article.views.toLocaleString() : '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.publishedAt
                          ? new Date(article.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : new Date(article.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setOpenDropdown(openDropdown === article.id ? null : article.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {openDropdown === article.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenDropdown(null)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 py-1">
                              <button className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                Preview
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-2">
                                <Edit className="w-4 h-4" />
                                Edit
                              </button>
                              {article.status === 'PENDING_REVIEW' && (
                                <>
                                  <button className="w-full px-4 py-2 text-left text-sm text-emerald-400 hover:bg-slate-700 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Approve
                                  </button>
                                  <button className="w-full px-4 py-2 text-left text-sm text-orange-400 hover:bg-slate-700 flex items-center gap-2">
                                    <XCircle className="w-4 h-4" />
                                    Request Revision
                                  </button>
                                </>
                              )}
                              {article.status === 'APPROVED' && (
                                <button className="w-full px-4 py-2 text-left text-sm text-emerald-400 hover:bg-slate-700 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4" />
                                  Publish Now
                                </button>
                              )}
                              <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-slate-700 flex items-center gap-2">
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty state for table */}
        {filteredArticles.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No articles found</h3>
            <p className="text-slate-400 text-sm">
              {articles.length === 0
                ? 'There are no articles in the system yet.'
                : 'Try adjusting your filters or search query.'}
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredArticles.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800">
            <p className="text-sm text-slate-400">
              Showing <span className="font-medium text-white">{filteredArticles.length}</span> of{' '}
              <span className="font-medium text-white">{articles.length}</span> articles
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-3 py-1.5 text-sm bg-teal-500/10 text-teal-400 rounded-lg">
                1
              </button>
              <button className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
