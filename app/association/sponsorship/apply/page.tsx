'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Building2,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  Star,
  Zap,
  Crown,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

// Form step definitions
const steps = [
  { id: 1, name: 'Personal Info', icon: User },
  { id: 2, name: 'Practice Details', icon: Building2 },
  { id: 3, name: 'Select Tier', icon: CreditCard },
  { id: 4, name: 'Review & Submit', icon: CheckCircle },
];

// Credential options
const credentials = ['MD', 'DO', 'NP', 'PA', 'CRNA', 'PhD', 'PsyD', 'Other'];

// Specialty options
const specialties = [
  'Psychiatry',
  'Pain Medicine',
  'Anesthesiology',
  'Internal Medicine',
  'Emergency Medicine',
  'Family Medicine',
  'Neurology',
  'Other',
];

// US States
const usStates = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

// Membership tiers with features
const membershipTiers = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: '/month',
    description: 'Basic directory listing for new practitioners',
    icon: Sparkles,
    features: [
      'Basic directory listing',
      'Profile page',
      'Community forum access',
    ],
    color: 'slate',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 99,
    period: '/month',
    description: 'For growing practices seeking visibility',
    icon: Zap,
    features: [
      'Enhanced profile',
      '5 patient leads/month',
      'Priority listing',
      'Verified badge',
      'Basic analytics',
    ],
    color: 'teal',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 249,
    period: '/month',
    description: 'For established practices',
    icon: Star,
    popular: true,
    features: [
      'Everything in Professional',
      '20 patient leads/month',
      'Featured placement',
      'Advanced analytics',
      'CE credit discounts',
      'Event discounts',
    ],
    color: 'emerald',
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 449,
    period: '/month',
    description: 'For industry leaders',
    icon: Crown,
    features: [
      'Everything in Premium',
      'Unlimited leads',
      'Top placement',
      'Dedicated support',
      'Speaking opportunities',
      'Research collaboration',
      'Co-marketing',
    ],
    color: 'amber',
  },
];

// Form data interface
interface FormData {
  // Step 1: Personal Info
  fullName: string;
  email: string;
  phone: string;
  credentials: string[];

  // Step 2: Practice Details
  practiceName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  website: string;
  specialties: string[];

  // Step 3: Tier Selection
  selectedTier: string;

  // Step 4: Terms
  agreeToTerms: boolean;
}

// Validation errors interface
interface FormErrors {
  [key: string]: string;
}

export default function SponsorshipApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    credentials: [],
    practiceName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    website: '',
    specialties: [],
    selectedTier: '',
    agreeToTerms: false,
  });

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  // Update form data
  const updateFormData = (field: keyof FormData, value: FormData[keyof FormData]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Toggle array fields (credentials, specialties)
  const toggleArrayField = (field: 'credentials' | 'specialties', value: string) => {
    setFormData((prev) => {
      const current = prev[field];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  // Validate current step
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      }
      if (formData.credentials.length === 0) {
        newErrors.credentials = 'Please select at least one credential';
      }
    }

    if (step === 2) {
      if (!formData.practiceName.trim()) {
        newErrors.practiceName = 'Practice name is required';
      }
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required';
      }
      if (!formData.city.trim()) {
        newErrors.city = 'City is required';
      }
      if (!formData.state) {
        newErrors.state = 'State is required';
      }
      if (!formData.zip.trim()) {
        newErrors.zip = 'ZIP code is required';
      } else if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) {
        newErrors.zip = 'Please enter a valid ZIP code';
      }
      if (formData.specialties.length === 0) {
        newErrors.specialties = 'Please select at least one specialty';
      }
    }

    if (step === 3) {
      if (!formData.selectedTier) {
        newErrors.selectedTier = 'Please select a membership tier';
      }
    }

    if (step === 4) {
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // Get selected tier details
  const selectedTierDetails = membershipTiers.find(
    (tier) => tier.id === formData.selectedTier
  );

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
                Application Submitted!
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                Thank you for applying to become a sponsor member of the Ketamine Association.
                We will review your application and get back to you within 2-3 business days.
              </p>
              <div className="bg-slate-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-slate-900 mb-2">Application Details</h3>
                <p className="text-slate-600">
                  <span className="font-medium">Name:</span> {formData.fullName}
                </p>
                <p className="text-slate-600">
                  <span className="font-medium">Practice:</span> {formData.practiceName}
                </p>
                <p className="text-slate-600">
                  <span className="font-medium">Selected Tier:</span>{' '}
                  {selectedTierDetails?.name}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/association/membership" variant="primary">
                  View Membership Benefits
                </Button>
                <Button href="/" variant="outline">
                  Return Home
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
              Sponsorship Application
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Apply for Sponsorship Membership
            </h1>
            <p className="text-lg text-teal-100">
              Join the Ketamine Association and grow your practice with our comprehensive
              sponsorship program.
            </p>
          </div>
        </Container>
      </section>

      {/* Progress Indicator */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <Container>
          <nav aria-label="Application progress" className="py-4">
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
                        {isCompleted ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
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
        <Container size="md">
          <Card className="p-6 sm:p-8 lg:p-12 overflow-hidden">
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
                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      Personal Information
                    </h2>
                    <p className="text-slate-600 mb-8">
                      Tell us about yourself and your professional credentials.
                    </p>

                    <div className="space-y-6">
                      <Input
                        label="Full Name"
                        placeholder="Dr. Jane Smith"
                        value={formData.fullName}
                        onChange={(e) => updateFormData('fullName', e.target.value)}
                        error={errors.fullName}
                      />

                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="jane.smith@practice.com"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        error={errors.email}
                      />

                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        error={errors.phone}
                      />

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                          Credentials (select all that apply)
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {credentials.map((credential) => (
                            <button
                              key={credential}
                              type="button"
                              onClick={() => toggleArrayField('credentials', credential)}
                              className={cn(
                                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                                formData.credentials.includes(credential)
                                  ? 'bg-teal-600 text-white shadow-md'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              )}
                            >
                              {credential}
                            </button>
                          ))}
                        </div>
                        {errors.credentials && (
                          <p className="mt-2 text-sm text-red-600">{errors.credentials}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Practice Details */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      Practice Details
                    </h2>
                    <p className="text-slate-600 mb-8">
                      Provide information about your practice location and specialties.
                    </p>

                    <div className="space-y-6">
                      <Input
                        label="Practice Name"
                        placeholder="Ketamine Wellness Center"
                        value={formData.practiceName}
                        onChange={(e) => updateFormData('practiceName', e.target.value)}
                        error={errors.practiceName}
                      />

                      <Input
                        label="Street Address"
                        placeholder="123 Medical Plaza, Suite 100"
                        value={formData.address}
                        onChange={(e) => updateFormData('address', e.target.value)}
                        error={errors.address}
                      />

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="col-span-2 sm:col-span-2">
                          <Input
                            label="City"
                            placeholder="Austin"
                            value={formData.city}
                            onChange={(e) => updateFormData('city', e.target.value)}
                            error={errors.city}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            State
                          </label>
                          <select
                            value={formData.state}
                            onChange={(e) => updateFormData('state', e.target.value)}
                            className={cn(
                              'w-full rounded-lg border bg-white px-4 py-3 text-base text-slate-900 transition-all duration-200',
                              'focus:outline-none focus:ring-2 focus:ring-offset-1',
                              errors.state
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                : 'border-slate-300 focus:border-teal-500 focus:ring-teal-500/20'
                            )}
                          >
                            <option value="">Select</option>
                            {usStates.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>
                          {errors.state && (
                            <p className="mt-2 text-sm text-red-600">{errors.state}</p>
                          )}
                        </div>

                        <div>
                          <Input
                            label="ZIP Code"
                            placeholder="78701"
                            value={formData.zip}
                            onChange={(e) => updateFormData('zip', e.target.value)}
                            error={errors.zip}
                          />
                        </div>
                      </div>

                      <Input
                        label="Website (optional)"
                        placeholder="https://www.yourpractice.com"
                        value={formData.website}
                        onChange={(e) => updateFormData('website', e.target.value)}
                      />

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                          Specialties (select all that apply)
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {specialties.map((specialty) => (
                            <button
                              key={specialty}
                              type="button"
                              onClick={() => toggleArrayField('specialties', specialty)}
                              className={cn(
                                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                                formData.specialties.includes(specialty)
                                  ? 'bg-teal-600 text-white shadow-md'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              )}
                            >
                              {specialty}
                            </button>
                          ))}
                        </div>
                        {errors.specialties && (
                          <p className="mt-2 text-sm text-red-600">{errors.specialties}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Tier Selection */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      Select Your Membership Tier
                    </h2>
                    <p className="text-slate-600 mb-8">
                      Choose the plan that best fits your practice needs.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {membershipTiers.map((tier) => {
                        const isSelected = formData.selectedTier === tier.id;
                        const Icon = tier.icon;
                        const colorClasses = {
                          slate: 'from-slate-500 to-slate-400',
                          teal: 'from-teal-600 to-teal-500',
                          emerald: 'from-emerald-600 to-emerald-500',
                          amber: 'from-amber-500 to-amber-400',
                        };

                        return (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => updateFormData('selectedTier', tier.id)}
                            className={cn(
                              'relative p-6 rounded-xl border-2 text-left transition-all duration-200',
                              isSelected
                                ? 'border-teal-500 bg-teal-50/50 shadow-lg'
                                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                            )}
                          >
                            {tier.popular && (
                              <Badge
                                variant="primary"
                                size="sm"
                                className="absolute -top-2 right-4"
                              >
                                Most Popular
                              </Badge>
                            )}

                            <div className="flex items-start gap-4">
                              <div
                                className={cn(
                                  'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shrink-0',
                                  colorClasses[tier.color as keyof typeof colorClasses]
                                )}
                              >
                                <Icon className="w-6 h-6" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-slate-900">
                                  {tier.name}
                                </h3>
                                <div className="flex items-baseline gap-1 mt-1">
                                  <span className="text-2xl font-bold text-slate-900">
                                    ${tier.price}
                                  </span>
                                  <span className="text-slate-500 text-sm">
                                    {tier.period}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-600 mt-2">
                                  {tier.description}
                                </p>

                                <ul className="mt-4 space-y-2">
                                  {tier.features.slice(0, 4).map((feature) => (
                                    <li
                                      key={feature}
                                      className="flex items-center gap-2 text-sm text-slate-700"
                                    >
                                      <Check className="w-4 h-4 text-teal-600 shrink-0" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                  {tier.features.length > 4 && (
                                    <li className="text-sm text-slate-500 pl-6">
                                      +{tier.features.length - 4} more features
                                    </li>
                                  )}
                                </ul>
                              </div>

                              <div
                                className={cn(
                                  'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0',
                                  isSelected
                                    ? 'border-teal-600 bg-teal-600'
                                    : 'border-slate-300'
                                )}
                              >
                                {isSelected && (
                                  <Check className="w-4 h-4 text-white" />
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {errors.selectedTier && (
                      <p className="mt-4 text-sm text-red-600">{errors.selectedTier}</p>
                    )}
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      Review Your Application
                    </h2>
                    <p className="text-slate-600 mb-8">
                      Please review your information before submitting.
                    </p>

                    <div className="space-y-6">
                      {/* Personal Info Summary */}
                      <div className="bg-slate-50 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-slate-900">Personal Information</h3>
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
                        <dl className="grid sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <dt className="text-slate-500">Full Name</dt>
                            <dd className="font-medium text-slate-900">{formData.fullName}</dd>
                          </div>
                          <div>
                            <dt className="text-slate-500">Email</dt>
                            <dd className="font-medium text-slate-900">{formData.email}</dd>
                          </div>
                          <div>
                            <dt className="text-slate-500">Phone</dt>
                            <dd className="font-medium text-slate-900">{formData.phone}</dd>
                          </div>
                          <div>
                            <dt className="text-slate-500">Credentials</dt>
                            <dd className="font-medium text-slate-900">
                              {formData.credentials.join(', ')}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {/* Practice Details Summary */}
                      <div className="bg-slate-50 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-slate-900">Practice Details</h3>
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
                        <dl className="grid sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <dt className="text-slate-500">Practice Name</dt>
                            <dd className="font-medium text-slate-900">{formData.practiceName}</dd>
                          </div>
                          <div>
                            <dt className="text-slate-500">Address</dt>
                            <dd className="font-medium text-slate-900">
                              {formData.address}, {formData.city}, {formData.state} {formData.zip}
                            </dd>
                          </div>
                          {formData.website && (
                            <div>
                              <dt className="text-slate-500">Website</dt>
                              <dd className="font-medium text-slate-900">{formData.website}</dd>
                            </div>
                          )}
                          <div>
                            <dt className="text-slate-500">Specialties</dt>
                            <dd className="font-medium text-slate-900">
                              {formData.specialties.join(', ')}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {/* Tier Summary */}
                      {selectedTierDetails && (
                        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 border border-teal-100">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-900">Selected Membership</h3>
                            <button
                              type="button"
                              onClick={() => {
                                setDirection(-1);
                                setCurrentStep(3);
                              }}
                              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                            >
                              Change
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-500 flex items-center justify-center">
                              <selectedTierDetails.icon className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <p className="text-lg font-bold text-slate-900">
                                {selectedTierDetails.name} Plan
                              </p>
                              <p className="text-slate-600">
                                ${selectedTierDetails.price}{selectedTierDetails.period}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Terms Agreement */}
                      <div className="border border-slate-200 rounded-xl p-6">
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
                            . I understand that my application will be reviewed and I will be
                            contacted regarding my membership status.
                          </span>
                        </label>
                        {errors.agreeToTerms && (
                          <p className="mt-2 text-sm text-red-600">{errors.agreeToTerms}</p>
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
                  Submit Application
                </Button>
              )}
            </div>
          </Card>
        </Container>
      </section>
    </main>
  );
}
