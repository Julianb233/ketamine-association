import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GraduationCap, Clock, Award, CheckCircle } from 'lucide-react';

const certifications = [
  {
    title: 'Ketamine Therapy Fundamentals',
    level: 'Foundation',
    duration: '8 hours',
    credits: '8 CME',
    topics: ['Pharmacology', 'Patient Selection', 'Safety Protocols', 'Legal Considerations'],
  },
  {
    title: 'Advanced IV Ketamine Protocols',
    level: 'Advanced',
    duration: '16 hours',
    credits: '16 CME',
    topics: ['Dosing Strategies', 'Monitoring', 'Side Effect Management', 'Integration'],
  },
  {
    title: 'Ketamine-Assisted Psychotherapy',
    level: 'Specialty',
    duration: '24 hours',
    credits: '24 CME',
    topics: ['Therapeutic Framework', 'Session Facilitation', 'Integration Techniques', 'Ethics'],
  },
];

export function CertificationTeaser() {
  return (
    <section className="py-20 bg-gradient-to-br from-teal-700 to-teal-900 text-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <Badge variant="warning" size="md" className="mb-6">
              Ketamine Academy
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Become a Certified Ketamine Therapy Provider
            </h2>
            <p className="text-xl text-teal-100 mb-8 leading-relaxed">
              Our comprehensive certification programs equip healthcare professionals
              with the knowledge and skills to deliver safe, effective ketamine therapy.
            </p>

            <ul className="space-y-4 mb-8">
              {['Evidence-based curriculum', 'Expert faculty', 'CME accredited', 'Flexible online learning'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-teal-100">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" href="/academy" icon={GraduationCap}>
                Explore Programs
              </Button>
              <Button variant="outline" size="lg" href="/academy/catalog" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                View Catalog
              </Button>
            </div>
          </div>

          {/* Right Content - Certification Cards */}
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Badge
                      variant={cert.level === 'Foundation' ? 'success' : cert.level === 'Advanced' ? 'warning' : 'premium'}
                      size="sm"
                      className="mb-2"
                    >
                      {cert.level}
                    </Badge>
                    <h3 className="text-lg font-semibold">{cert.title}</h3>
                  </div>
                  <Award className="w-8 h-8 text-amber-400" />
                </div>

                <div className="flex items-center gap-4 text-sm text-teal-200 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {cert.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    {cert.credits}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cert.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs px-2 py-1 rounded-full bg-white/10 text-teal-100"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
