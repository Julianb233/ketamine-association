'use client';

import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  Send,
  MessageSquare,
  Building2,
  CheckCircle
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

const contactInfo = [
  {
    title: 'Email Us',
    description: 'For general inquiries and support',
    value: 'info@ketamineassociation.org',
    icon: Mail,
    color: 'teal',
    action: 'mailto:info@ketamineassociation.org',
  },
  {
    title: 'Call Us',
    description: 'Monday - Friday, 9am - 5pm EST',
    value: '(800) 555-KETA',
    icon: Phone,
    color: 'emerald',
    action: 'tel:+18005553582',
  },
  {
    title: 'Visit Us',
    description: 'By appointment only',
    value: '123 Medical Center Drive, Suite 400, Austin, TX 78701',
    icon: MapPin,
    color: 'amber',
    action: 'https://maps.google.com',
  },
];

const officeHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 5:00 PM EST' },
  { day: 'Saturday', hours: '10:00 AM - 2:00 PM EST' },
  { day: 'Sunday', hours: 'Closed' },
];

const departments = [
  { value: '', label: 'Select a department' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'membership', label: 'Membership & Billing' },
  { value: 'education', label: 'Education & Certification' },
  { value: 'provider-support', label: 'Provider Support' },
  { value: 'patient-resources', label: 'Patient Resources' },
  { value: 'media', label: 'Media & Press' },
  { value: 'partnership', label: 'Partnership Opportunities' },
];

const faqs = [
  {
    question: 'How do I find a ketamine therapy provider near me?',
    answer: 'Use our Provider Directory to search by location. All listed providers are verified and meet our rigorous credentialing standards. You can filter by specialty, treatment type, and insurance accepted.',
  },
  {
    question: 'How can I become a member of the Ketamine Association?',
    answer: 'Licensed healthcare providers can apply for membership through our website. Visit the Membership page to view our tiers and requirements. The application process includes credential verification and typically takes 5-7 business days.',
  },
  {
    question: 'What certifications does the Ketamine Association offer?',
    answer: 'We offer several certification programs including Foundational Ketamine Therapy, Advanced Infusion Protocols, and Ketamine-Assisted Psychotherapy (KAP). Each program includes didactic training, practical components, and continuing education credits.',
  },
  {
    question: 'Is ketamine therapy covered by insurance?',
    answer: 'Coverage varies by insurance provider and treatment indication. IV ketamine for depression is sometimes covered, while nasal esketamine (Spravato) has broader coverage. Our Patient Resources section provides guidance on insurance navigation and financing options.',
  },
  {
    question: 'How do I report a concern about a provider?',
    answer: 'Patient safety is our top priority. You can report concerns through our confidential reporting form or by emailing compliance@ketamineassociation.org. All reports are thoroughly investigated by our Standards Committee.',
  },
  {
    question: 'Do you offer resources for patients considering ketamine therapy?',
    answer: 'Yes, our Patient Education Center provides comprehensive information about ketamine therapy, including what to expect, preparation guides, and post-treatment resources. We also maintain a list of questions to ask potential providers.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    subject: '',
    message: '',
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', department: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <Container className="relative py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" size="lg" className="mb-6 bg-white/20 text-white border-0">
              Contact Us
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Get In Touch
            </h1>

            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Have questions about ketamine therapy, membership, or our services?
              We&apos;re here to help. Reach out to our team today.
            </p>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-24">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <Badge variant="primary" className="mb-4">Send a Message</Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                How Can We Help?
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Fill out the form below and a member of our team will get back to you
                within 1-2 business days.
              </p>

              {isSubmitted ? (
                <Card className="p-8 bg-emerald-50 border border-emerald-200">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-900 mb-2">Message Sent!</h3>
                    <p className="text-emerald-700 mb-4">
                      Thank you for reaching out. We&apos;ll get back to you within 1-2 business days.
                    </p>
                    <Button
                      variant="secondary"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="department" className="mb-2 block text-sm font-medium text-slate-700">
                      Department
                    </label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      className="flex w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-teal-500 focus:ring-teal-500/20"
                    >
                      {departments.map(dept => (
                        <option key={dept.value} value={dept.value}>
                          {dept.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please provide as much detail as possible..."
                      required
                      className="flex w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-teal-500 focus:ring-teal-500/20 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <div className="space-y-6 mb-12">
                {contactInfo.map((info) => {
                  const colorClasses = {
                    teal: 'bg-teal-100 text-teal-600',
                    emerald: 'bg-emerald-100 text-emerald-600',
                    amber: 'bg-amber-100 text-amber-600',
                  };
                  return (
                    <Card key={info.title} className="p-6" hover>
                      <a
                        href={info.action}
                        target={info.action.startsWith('http') ? '_blank' : undefined}
                        rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex gap-4 items-start"
                      >
                        <div className={`w-12 h-12 rounded-xl ${colorClasses[info.color as keyof typeof colorClasses]} flex items-center justify-center flex-shrink-0`}>
                          <info.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">{info.title}</h3>
                          <p className="text-slate-500 text-sm mb-2">{info.description}</p>
                          <p className="text-teal-600 font-medium">{info.value}</p>
                        </div>
                      </a>
                    </Card>
                  );
                })}
              </div>

              {/* Office Hours */}
              <Card className="p-6 bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  {officeHours.map((schedule) => (
                    <div key={schedule.day} className="flex justify-between text-sm">
                      <span className="text-slate-600">{schedule.day}</span>
                      <span className="font-medium text-slate-900">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Emergency provider support available 24/7 for active members.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <Container size="md">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">FAQ</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Find answers to common questions about our services and ketamine therapy.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="overflow-hidden"
                padding="none"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-slate-400 flex-shrink-0 transition-transform",
                      openFaq === index && "transform rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-200",
                    openFaq === index ? "max-h-96" : "max-h-0"
                  )}
                >
                  <div className="px-6 pb-6 text-slate-600 border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">Still have questions?</p>
            <Button variant="secondary" href="mailto:info@ketamineassociation.org">
              <MessageSquare className="w-5 h-5" />
              Contact Support
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
