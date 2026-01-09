'use client';

import { useState, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArticleCard, type Article } from '@/components/blog/ArticleCard';

interface BlogContentProps {
  articles: Article[];
  categories: string[];
}

export function BlogContent({ articles, categories }: BlogContentProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const articlesPerPage = 9;

  // Filter articles based on category and search
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [articles, selectedCategory, searchQuery]);

  const featuredArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);

  const totalPages = Math.ceil(remainingArticles.length / articlesPerPage);
  const paginatedArticles = remainingArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Get unique tags from all articles for the sidebar
  const popularTopics = useMemo(() => {
    const topics = new Set<string>();
    articles.forEach(article => {
      // Add category as a topic
      topics.add(article.category);
    });
    return Array.from(topics).slice(0, 8);
  }, [articles]);

  return (
    <>
      {/* Category Filter & Search */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <Container>
          <div className="py-4 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Results Count */}
      {(selectedCategory !== 'All' || searchQuery) && (
        <section className="bg-slate-50 py-4">
          <Container>
            <p className="text-slate-600">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
              {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </Container>
        </section>
      )}

      {/* Content */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    className="w-16 h-16 mx-auto text-slate-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No articles found</h3>
                  <p className="text-slate-600 mb-4">
                    Try adjusting your search or filter to find what you are looking for.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              ) : (
                <>
                  {/* Featured Article */}
                  {featuredArticle && (
                    <div className="mb-12">
                      <h2 className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-4">
                        Featured Article
                      </h2>
                      <ArticleCard article={featuredArticle} featured />
                    </div>
                  )}

                  {/* Article Grid */}
                  {paginatedArticles.length > 0 && (
                    <div>
                      <h2 className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-6">
                        {selectedCategory === 'All' ? 'Latest Articles' : selectedCategory}
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-6">
                        {paginatedArticles.map((article) => (
                          <ArticleCard key={article.slug} article={article} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-8">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        // Show pages around current page
                        let pageNum: number;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                              currentPage === pageNum
                                ? 'bg-teal-600 text-white'
                                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                <p className="text-teal-100 text-sm mb-4">
                  Get the latest research and insights delivered to your inbox weekly.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    required
                  />
                  <Button type="submit" variant="amber" fullWidth size="sm">
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-teal-200 mt-3">
                  No spam. Unsubscribe anytime.
                </p>
              </div>

              {/* Popular Topics */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Browse by Category</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTopics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => handleCategoryChange(topic)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        selectedCategory === topic
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resources CTA */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Member Resources</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Access exclusive research papers, clinical guidelines, and practice tools.
                </p>
                <Button href="/association/membership" variant="amber" fullWidth size="sm">
                  Become a Member
                </Button>
              </div>

              {/* Article Stats */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Content Library</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Articles</span>
                    <span className="font-semibold text-teal-600">{articles.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Categories</span>
                    <span className="font-semibold text-teal-600">{popularTopics.length}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
