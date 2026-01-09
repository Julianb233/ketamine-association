'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Edit3,
  User,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  Upload,
  X,
  BookOpen,
  TrendingUp,
  Users,
  Award,
  Globe,
  Lightbulb,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

// Form step definitions
const steps = [
  { id: 1, name: 'Article Basics', icon: FileText },
  { id: 2, name: 'Content & Tags', icon: Edit3 },
  { id: 3, name: 'Author Info', icon: User },
  { id: 4, name: 'Review & Submit', icon: CheckCircle },
];

// Article categories
const categories = [
  { id: 'clinical-research', name: 'Clinical Research', icon: BookOpen },
  { id: 'practice-management', name: 'Practice Management', icon: TrendingUp },
  { id: 'patient-stories', name: 'Patient Stories', icon: Users },
  { id: 'regulatory-updates', name: 'Regulatory Updates', icon: Award },
  { id: 'treatment-innovations', name: 'Treatment Innovations', icon: Lightbulb },
  { id: 'industry-news', name: 'Industry News', icon: Globe },
];

// Suggested tags
const suggestedTags = [
  'Ketamine Therapy',
  'Depression Treatment',
  'Mental Health',
  'Pain Management',
  'IV Infusion',
  'Nasal Spray',
  'PTSD',
  'Anxiety',
  'Research',
  'Case Study',
  'Best Practices',
  'Patient Care',
];

// Benefits of publishing
const benefits = [
  {
    icon: Globe,
    title: 'Reach Thousands',
    description: 'Your article reaches our growing community of practitioners and patients.',
  },
  {
    icon: Award,
    title: 'Establish Authority',
    description: 'Position yourself as a thought leader in ketamine therapy.',
  },
  {
    icon: Users,
    title: 'Connect with Peers',
    description: 'Network with other practitioners and researchers in the field.',
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Practice',
    description: 'Increase visibility and attract new patients to your practice.',
  },
];

// Form data interface
interface FormData {
  // Step 1: Article Basics
  title: string;
  category: string;
  excerpt: string;

  // Step 2: Content & Tags
  content: string;
  tags: string[];

  // Step 3: Author Info
  authorBio: string;
  credentials: string;
  headshotFile: File | null;
  headshotPreview: string;

  // Step 4: Terms
  agreeToTerms: boolean;
  agreeToGuidelines: boolean;
}

// Validation errors interface
interface FormErrors {
  [key: string]: string;
}

export default function ArticleSubmitPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [tagInput, setTagInput] = useState('');
  const [direction, setDirection] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    tags: [],
    authorBio: '',
    credentials: '',
    headshotFile: null,
    headshotPreview: '',
    agreeToTerms: false,
    agreeToGuidelines: false,
  });

  // Animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  // Update form data
  const updateFormData = (field: keyof FormData, value: FormData[keyof FormData]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle tag addition
  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag) && formData.tags.length < 10) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, trimmedTag] }));
      setTagInput('');
    }
  };

  // Handle tag removal
  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, headshotFile: 'File size must be less than 5MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          headshotFile: file,
          headshotPreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate current step
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.title.trim()) {
        newErrors.title = 'Article title is required';
      } else if (formData.title.length < 10) {
        newErrors.title = 'Title must be at least 10 characters';
      }
      if (!formData.category) {
        newErrors.category = 'Please select a category';
      }
      if (!formData.excerpt.trim()) {
        newErrors.excerpt = 'Article excerpt is required';
      } else if (formData.excerpt.length < 50) {
        newErrors.excerpt = 'Excerpt must be at least 50 characters';
      } else if (formData.excerpt.length > 300) {
        newErrors.excerpt = 'Excerpt must be less than 300 characters';
      }
    }

    if (step === 2) {
      if (!formData.content.trim()) {
        newErrors.content = 'Article content is required';
      } else if (formData.content.length < 500) {
        newErrors.content = 'Content must be at least 500 characters';
      }
      if (formData.tags.length < 2) {
        newErrors.tags = 'Please add at least 2 tags';
      }
    }

    if (step === 3) {
      if (!formData.authorBio.trim()) {
        newErrors.authorBio = 'Author bio is required';
      } else if (formData.authorBio.length < 50) {
        newErrors.authorBio = 'Bio must be at least 50 characters';
      }
      if (!formData.credentials.trim()) {
        newErrors.credentials = 'Credentials are required';
      }
    }

    if (step === 4) {
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms';
      }
      if (!formData.agreeToGuidelines) {
        newErrors.agreeToGuidelines = 'You must agree to the editorial guidelines';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigate between steps
  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      setDirection(1);
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const goToPreviousStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // Get selected category details
  const selectedCategory = categories.find((cat) => cat.id === formData.category);

  // Render success state
  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16">
        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">
                Article Submitted!
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                Thank you for your submission. Our editorial team will review your article
                and get back to you within 3-5 business days.
              </p>
              <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-slate-900 mb-4">Submission Details</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Title:</dt>
                    <dd className="font-medium text-slate-900">{formData.title}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Category:</dt>
                    <dd className="font-medium text-slate-900">{selectedCategory?.name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Word Count:</dt>
                    <dd className="font-medium text-slate-900">
                      ~{Math.round(formData.content.split(/\s+/).length)} words
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/articles" variant="primary">
                  Browse Articles
                </Button>
                <Button href="/publish/submit" variant="outline" onClick={() => window.location.reload()}>
                  Submit Another
                </Button>
              </div>
            </Card>
          </motion.div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">
              Share Your Expertise
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Submit Your Article
            </h1>
            <p className="text-lg text-teal-100">
              Share your knowledge and insights with the ketamine therapy community.
              Help shape the future of mental health treatment.
            </p>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
                  <benefit.icon className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
                  <p className="text-sm text-slate-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Progress Indicator */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <Container>
          <nav aria-label="Submission progress" className="py-4">
            <ol className="flex items-center justify-between max-w-3xl mx-auto">
              {steps.map((step, index) => {
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                const Icon = step.icon;

                return (
                  <li key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                          isCompleted
                            ? 'bg-teal-600 text-white'
                            : isCurrent
                            ? 'bg-teal-600 text-white ring-4 ring-teal-100'
                            : 'bg-slate-200 text-slate-500'
                        )}
                      >
                        {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <span
                        className={cn(
                          'mt-2 text-xs font-medium hidden sm:block',
                          isCurrent ? 'text-teal-600' : 'text-slate-500'
                        )}
                      >
                        {step.name}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          'w-12 sm:w-20 lg:w-32 h-0.5 mx-2 sm:mx-4',
                          currentStep > step.id ? 'bg-teal-600' : 'bg-slate-200'
                        )}
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </Container>
      </section>

      {/* Form Content */}
      <section className="py-12">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="p-6 sm:p-8 overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {/* Step 1: Article Basics */}
                    {currentStep === 1 && (
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Article Basics</h2>
                        <p className="text-slate-600 mb-8">
                          Start with the fundamentals of your article.
                        </p>

                        <div className="space-y-6">
                          <Input
                            label="Article Title"
                            placeholder="Enter a compelling title for your article"
                            value={formData.title}
                            onChange={(e) => updateFormData('title', e.target.value)}
                            error={errors.title}
                          />

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-3">
                              Category
                            </label>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {categories.map((cat) => {
                                const isSelected = formData.category === cat.id;
                                const CatIcon = cat.icon;
                                return (
                                  <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => updateFormData('category', cat.id)}
                                    className={cn(
                                      'flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200',
                                      isSelected
                                        ? 'border-teal-500 bg-teal-50'
                                        : 'border-slate-200 hover:border-slate-300'
                                    )}
                                  >
                                    <CatIcon
                                      className={cn(
                                        'w-5 h-5',
                                        isSelected ? 'text-teal-600' : 'text-slate-400'
                                      )}
                                    />
                                    <span
                                      className={cn(
                                        'font-medium',
                                        isSelected ? 'text-teal-700' : 'text-slate-700'
                                      )}
                                    >
                                      {cat.name}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                            {errors.category && (
                              <p className="mt-2 text-sm text-red-600">{errors.category}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Article Excerpt
                            </label>
                            <textarea
                              placeholder="Write a brief summary that will appear in article previews (50-300 characters)"
                              value={formData.excerpt}
                              onChange={(e) => updateFormData('excerpt', e.target.value)}
                              rows={3}
                              className={cn(
                                'w-full rounded-lg border bg-white px-4 py-3 text-base text-slate-900 transition-all duration-200',
                                'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1',
                                errors.excerpt
                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                  : 'border-slate-300 focus:border-teal-500 focus:ring-teal-500/20'
                              )}
                            />
                            <div className="flex justify-between mt-2">
                              {errors.excerpt ? (
                                <p className="text-sm text-red-600">{errors.excerpt}</p>
                              ) : (
                                <span />
                              )}
                              <span className="text-sm text-slate-500">
                                {formData.excerpt.length}/300
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Content & Tags */}
                    {currentStep === 2 && (
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Content & Tags</h2>
                        <p className="text-slate-600 mb-8">
                          Write your article content and add relevant tags.
                        </p>

                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Article Content
                            </label>
                            <textarea
                              placeholder="Write your full article content here. You can use markdown formatting..."
                              value={formData.content}
                              onChange={(e) => updateFormData('content', e.target.value)}
                              rows={15}
                              className={cn(
                                'w-full rounded-lg border bg-white px-4 py-3 text-base text-slate-900 transition-all duration-200',
                                'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 font-mono text-sm',
                                errors.content
                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                  : 'border-slate-300 focus:border-teal-500 focus:ring-teal-500/20'
                              )}
                            />
                            <div className="flex justify-between mt-2">
                              {errors.content ? (
                                <p className="text-sm text-red-600">{errors.content}</p>
                              ) : (
                                <span className="text-sm text-slate-500">
                                  Minimum 500 characters. Markdown supported.
                                </span>
                              )}
                              <span className="text-sm text-slate-500">
                                {formData.content.length} characters
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Tags
                            </label>
                            <div className="flex gap-2 mb-3">
                              <input
                                type="text"
                                placeholder="Add a tag and press Enter"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addTag(tagInput);
                                  }
                                }}
                                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addTag(tagInput)}
                              >
                                Add
                              </Button>
                            </div>

                            {formData.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {formData.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm"
                                  >
                                    {tag}
                                    <button
                                      type="button"
                                      onClick={() => removeTag(tag)}
                                      className="ml-1 hover:text-teal-600"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </span>
                                ))}
                              </div>
                            )}

                            <div>
                              <p className="text-sm text-slate-500 mb-2">Suggested tags:</p>
                              <div className="flex flex-wrap gap-2">
                                {suggestedTags
                                  .filter((tag) => !formData.tags.includes(tag))
                                  .slice(0, 8)
                                  .map((tag) => (
                                    <button
                                      key={tag}
                                      type="button"
                                      onClick={() => addTag(tag)}
                                      className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm hover:bg-slate-200 transition-colors"
                                    >
                                      + {tag}
                                    </button>
                                  ))}
                              </div>
                            </div>
                            {errors.tags && (
                              <p className="mt-2 text-sm text-red-600">{errors.tags}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Author Info */}
                    {currentStep === 3 && (
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Author Information</h2>
                        <p className="text-slate-600 mb-8">
                          Tell readers about yourself and your qualifications.
                        </p>

                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Headshot Photo
                            </label>
                            <div className="flex items-center gap-6">
                              {formData.headshotPreview ? (
                                <div className="relative">
                                  <img
                                    src={formData.headshotPreview}
                                    alt="Headshot preview"
                                    className="w-24 h-24 rounded-full object-cover border-2 border-slate-200"
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        headshotFile: null,
                                        headshotPreview: '',
                                      }))
                                    }
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <label className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:bg-teal-50 transition-colors">
                                  <Upload className="w-6 h-6 text-slate-400" />
                                  <span className="text-xs text-slate-500 mt-1">Upload</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                  />
                                </label>
                              )}
                              <div className="text-sm text-slate-500">
                                <p>Upload a professional headshot.</p>
                                <p>JPG, PNG up to 5MB. Square format recommended.</p>
                              </div>
                            </div>
                            {errors.headshotFile && (
                              <p className="mt-2 text-sm text-red-600">{errors.headshotFile}</p>
                            )}
                          </div>

                          <Input
                            label="Credentials"
                            placeholder="e.g., MD, PhD, APRN, Board Certified Psychiatrist"
                            value={formData.credentials}
                            onChange={(e) => updateFormData('credentials', e.target.value)}
                            error={errors.credentials}
                          />

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Author Bio
                            </label>
                            <textarea
                              placeholder="Write a brief bio about yourself, your practice, and your experience with ketamine therapy..."
                              value={formData.authorBio}
                              onChange={(e) => updateFormData('authorBio', e.target.value)}
                              rows={5}
                              className={cn(
                                'w-full rounded-lg border bg-white px-4 py-3 text-base text-slate-900 transition-all duration-200',
                                'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1',
                                errors.authorBio
                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                  : 'border-slate-300 focus:border-teal-500 focus:ring-teal-500/20'
                              )}
                            />
                            {errors.authorBio && (
                              <p className="mt-2 text-sm text-red-600">{errors.authorBio}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Review & Submit */}
                    {currentStep === 4 && (
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Review & Submit</h2>
                        <p className="text-slate-600 mb-8">
                          Review your submission before sending it to our editorial team.
                        </p>

                        <div className="space-y-6">
                          {/* Article Summary */}
                          <div className="bg-slate-50 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-semibold text-slate-900">Article Details</h3>
                              <button
                                type="button"
                                onClick={() => {
                                  setDirection(-1);
                                  setCurrentStep(1);
                                }}
                                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                              >
                                Edit
                              </button>
                            </div>
                            <dl className="space-y-3 text-sm">
                              <div>
                                <dt className="text-slate-500">Title</dt>
                                <dd className="font-medium text-slate-900">{formData.title}</dd>
                              </div>
                              <div>
                                <dt className="text-slate-500">Category</dt>
                                <dd className="font-medium text-slate-900">
                                  {selectedCategory?.name}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-slate-500">Excerpt</dt>
                                <dd className="text-slate-700">{formData.excerpt}</dd>
                              </div>
                            </dl>
                          </div>

                          {/* Content Summary */}
                          <div className="bg-slate-50 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-semibold text-slate-900">Content</h3>
                              <button
                                type="button"
                                onClick={() => {
                                  setDirection(-1);
                                  setCurrentStep(2);
                                }}
                                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                              >
                                Edit
                              </button>
                            </div>
                            <dl className="space-y-3 text-sm">
                              <div>
                                <dt className="text-slate-500">Word Count</dt>
                                <dd className="font-medium text-slate-900">
                                  ~{Math.round(formData.content.split(/\s+/).length)} words
                                </dd>
                              </div>
                              <div>
                                <dt className="text-slate-500 mb-2">Tags</dt>
                                <dd className="flex flex-wrap gap-2">
                                  {formData.tags.map((tag) => (
                                    <Badge key={tag} variant="primary" size="sm">
                                      {tag}
                                    </Badge>
                                  ))}
                                </dd>
                              </div>
                            </dl>
                          </div>

                          {/* Author Summary */}
                          <div className="bg-slate-50 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-semibold text-slate-900">Author Information</h3>
                              <button
                                type="button"
                                onClick={() => {
                                  setDirection(-1);
                                  setCurrentStep(3);
                                }}
                                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                              >
                                Edit
                              </button>
                            </div>
                            <div className="flex items-start gap-4">
                              {formData.headshotPreview && (
                                <img
                                  src={formData.headshotPreview}
                                  alt="Author"
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                              )}
                              <div className="text-sm">
                                <p className="font-medium text-slate-900">{formData.credentials}</p>
                                <p className="text-slate-600 mt-1">{formData.authorBio}</p>
                              </div>
                            </div>
                          </div>

                          {/* Agreements */}
                          <div className="space-y-4">
                            <label className="flex items-start gap-4 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.agreeToTerms}
                                onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                                className={cn(
                                  'mt-1 w-5 h-5 rounded border-2 text-teal-600',
                                  'focus:ring-2 focus:ring-teal-500 focus:ring-offset-2',
                                  errors.agreeToTerms ? 'border-red-500' : 'border-slate-300'
                                )}
                              />
                              <span className="text-sm text-slate-700">
                                I agree to the{' '}
                                <a href="#" className="text-teal-600 hover:text-teal-700 underline">
                                  Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-teal-600 hover:text-teal-700 underline">
                                  Privacy Policy
                                </a>
                                .
                              </span>
                            </label>
                            {errors.agreeToTerms && (
                              <p className="text-sm text-red-600 ml-9">{errors.agreeToTerms}</p>
                            )}

                            <label className="flex items-start gap-4 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.agreeToGuidelines}
                                onChange={(e) =>
                                  updateFormData('agreeToGuidelines', e.target.checked)
                                }
                                className={cn(
                                  'mt-1 w-5 h-5 rounded border-2 text-teal-600',
                                  'focus:ring-2 focus:ring-teal-500 focus:ring-offset-2',
                                  errors.agreeToGuidelines ? 'border-red-500' : 'border-slate-300'
                                )}
                              />
                              <span className="text-sm text-slate-700">
                                I confirm that this is original content and I have the right to
                                publish it. I agree to the{' '}
                                <a href="#" className="text-teal-600 hover:text-teal-700 underline">
                                  Editorial Guidelines
                                </a>
                                .
                              </span>
                            </label>
                            {errors.agreeToGuidelines && (
                              <p className="text-sm text-red-600 ml-9">{errors.agreeToGuidelines}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToPreviousStep}
                    disabled={currentStep === 1}
                    className={cn(currentStep === 1 && 'invisible')}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>

                  <div className="text-sm text-slate-500">
                    Step {currentStep} of {steps.length}
                  </div>

                  {currentStep < 4 ? (
                    <Button type="button" variant="primary" onClick={goToNextStep}>
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handleSubmit}
                      isLoading={isSubmitting}
                    >
                      Submit Article
                    </Button>
                  )}
                </div>
              </Card>
            </div>

            {/* Sidebar - Submission Guidelines */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Submission Guidelines</h3>

                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Content Requirements</h4>
                    <ul className="text-slate-600 space-y-1">
                      <li>- Minimum 500 words</li>
                      <li>- Original, unpublished content</li>
                      <li>- Evidence-based information</li>
                      <li>- No promotional content</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Formatting</h4>
                    <ul className="text-slate-600 space-y-1">
                      <li>- Use clear headings</li>
                      <li>- Include relevant citations</li>
                      <li>- Markdown formatting accepted</li>
                      <li>- Break up long paragraphs</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Review Process</h4>
                    <ul className="text-slate-600 space-y-1">
                      <li>- Editorial review: 3-5 days</li>
                      <li>- You may be asked for revisions</li>
                      <li>- Final approval by editor</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="font-semibold text-slate-800 mb-2">Need Help?</h4>
                    <p className="text-slate-600 mb-3">
                      Contact our editorial team for questions about your submission.
                    </p>
                    <Button
                      href="/contact"
                      variant="outline"
                      size="sm"
                      fullWidth
                    >
                      Contact Editorial Team
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
