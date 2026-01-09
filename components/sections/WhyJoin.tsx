import { Container } from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import {
  Shield,
  GraduationCap,
  Users,
  TrendingUp,
  FileText,
  Headphones,
  Award,
  Globe
} from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Credibility & Trust',
    description: 'Join the most recognized ketamine therapy association. Display our verified badge to build patient trust.',
  },
  {
    icon: GraduationCap,
    title: 'Continuing Education',
    description: 'Access exclusive courses, webinars, and certification programs to stay current with best practices.',
  },
  {
    icon: Users,
    title: 'Provider Directory',
    description: 'Get listed in our searchable directory. Patients find you through our trusted platform.',
  },
  {
    icon: TrendingUp,
    title: 'Practice Growth',
    description: 'Marketing resources, referral network, and tools to grow your ketamine therapy practice.',
  },
  {
    icon: FileText,
    title: 'Clinical Resources',
    description: 'Protocols, consent forms, screening tools, and documentation templates at your fingertips.',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Connect with experienced practitioners. Get answers to clinical and operational questions.',
  },
  {
    icon: Award,
    title: 'Recognition',
    description: 'Earn certifications and badges that demonstrate your expertise and commitment to excellence.',
  },
  {
    icon: Globe,
    title: 'Industry Voice',
    description: 'Shape the future of ketamine therapy. Participate in advocacy and standards development.',
  },
];

export function WhyJoin() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Join the Ketamine Association?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to build a successful ketamine therapy practice
            and deliver exceptional patient care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <Card key={benefit.title} variant="bordered" className="text-center">
              <CardContent className="pt-6">
                <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
