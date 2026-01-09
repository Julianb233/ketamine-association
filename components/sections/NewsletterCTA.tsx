'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, CheckCircle } from 'lucide-react';

export function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <Container size="md">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-teal-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Informed on Ketamine Therapy
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Get the latest research, regulatory updates, and clinical insights delivered
            to your inbox. Join 10,000+ healthcare professionals.
          </p>

          {submitted ? (
            <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-6 max-w-md mx-auto">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                You're Subscribed!
              </h3>
              <p className="text-slate-300">
                Check your inbox to confirm your subscription and get your first newsletter.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/15"
                />
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={loading}
                  className="whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-slate-400 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}

          {/* Topics */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {['Research Updates', 'Clinical Guidelines', 'Regulatory News', 'Practice Tips', 'Industry Events'].map((topic) => (
              <span
                key={topic}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
