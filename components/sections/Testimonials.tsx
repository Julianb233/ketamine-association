'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Joining the Ketamine Association was the best decision for my practice. The credibility, resources, and network have been invaluable. My patient referrals increased 40% within the first year.",
    author: 'Dr. Jennifer Walsh',
    role: 'Psychiatrist, Ketamine Healing Center',
    location: 'Portland, OR',
    type: 'provider',
  },
  {
    id: 2,
    quote: "After years of treatment-resistant depression, I found hope through a KA-certified provider. The verification process gave me confidence I was in safe hands. I'm finally living again.",
    author: 'Michael T.',
    role: 'Patient',
    location: 'Chicago, IL',
    type: 'patient',
  },
  {
    id: 3,
    quote: "The certification program exceeded my expectations. The curriculum is comprehensive, evidence-based, and immediately applicable. I feel confident treating even complex cases now.",
    author: 'Dr. Amanda Foster',
    role: 'Anesthesiologist, Renewal IV Therapy',
    location: 'Dallas, TX',
    type: 'provider',
  },
  {
    id: 4,
    quote: "Finding a trusted provider was so easy through the directory. The detailed profiles helped me choose someone who specialized in my condition. The whole experience was professional and healing.",
    author: 'Sarah K.',
    role: 'Patient',
    location: 'Denver, CO',
    type: 'patient',
  },
  {
    id: 5,
    quote: "The clinical resources alone are worth the membership. From consent forms to treatment protocols, everything is professionally prepared and regularly updated with the latest research.",
    author: 'Dr. Robert Chen',
    role: 'Pain Medicine Specialist',
    location: 'San Diego, CA',
    type: 'provider',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const testimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-slate-50">
      <Container size="md">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-xl text-slate-600">
            Hear from providers and patients who have benefited from our association.
          </p>
        </div>

        <div className="relative">
          {/* Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-200">
            <Quote className="w-12 h-12 text-teal-200 mb-6" />

            <blockquote className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-8">
              "{testimonial.quote}"
            </blockquote>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">{testimonial.author}</p>
                <p className="text-slate-600">{testimonial.role}</p>
                <p className="text-sm text-slate-500">{testimonial.location}</p>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                testimonial.type === 'provider'
                  ? 'bg-teal-100 text-teal-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {testimonial.type === 'provider' ? 'Provider' : 'Patient'}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex
                      ? 'bg-teal-600'
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
