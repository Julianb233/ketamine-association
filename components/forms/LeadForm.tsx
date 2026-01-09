'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  condition: string;
  message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface LeadFormProps {
  onSubmit?: (data: LeadFormData) => Promise<void>;
  className?: string;
  conditions?: string[];
}

const defaultConditions = [
  'Treatment-Resistant Depression',
  'Major Depressive Disorder',
  'Anxiety Disorders',
  'PTSD',
  'Chronic Pain',
  'Bipolar Depression',
  'OCD',
  'Other',
];

export function LeadForm({
  onSubmit,
  className,
  conditions = defaultConditions,
}: LeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    condition: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LeadFormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[\d\s\-()+ ]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.condition) {
      newErrors.condition = 'Please select a condition';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof LeadFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        condition: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  if (status === 'success') {
    return (
      <div
        className={cn(
          'bg-white rounded-2xl border border-slate-200 p-8 text-center',
          className
        )}
      >
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Thank You!
        </h3>
        <p className="text-slate-600 mb-6">
          Your request has been submitted successfully. A member of our team
          will contact you within 24-48 hours.
        </p>
        <Button variant="outline" size="sm" onClick={resetForm}>
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'bg-white rounded-2xl border border-slate-200 p-8',
        className
      )}
    >
      {/* Error message */}
      {status === 'error' && errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800">
              Submission Failed
            </p>
            <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Name fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          placeholder="John"
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          placeholder="Smith"
          required
        />
      </div>

      {/* Contact fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="john@example.com"
          required
        />
        <Input
          label="Phone (optional)"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Condition dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Condition <span className="text-red-500">*</span>
        </label>
        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className={cn(
            'w-full px-4 py-3 rounded-lg border transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent',
            errors.condition
              ? 'border-red-500 bg-red-50'
              : 'border-slate-300 bg-white hover:border-slate-400'
          )}
          required
        >
          <option value="">Select a condition</option>
          {conditions.map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </select>
        {errors.condition && (
          <p className="mt-1.5 text-sm text-red-600">{errors.condition}</p>
        )}
      </div>

      {/* Message textarea */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Message (optional)
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us more about your situation or any questions you have..."
          rows={4}
          className={cn(
            'w-full px-4 py-3 rounded-lg border transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent',
            'placeholder:text-slate-400 resize-none',
            'border-slate-300 bg-white hover:border-slate-400'
          )}
        />
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={status === 'submitting'}
        isLoading={status === 'submitting'}
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
      </Button>

      {/* Privacy note */}
      <p className="text-xs text-slate-500 text-center mt-4">
        By submitting this form, you agree to our{' '}
        <a href="/privacy" className="text-teal-600 hover:underline">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="/terms" className="text-teal-600 hover:underline">
          Terms of Service
        </a>
        .
      </p>
    </form>
  );
}
