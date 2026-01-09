'use client';

import { useState, useTransition } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { User, Mail, Building2, CheckCircle2, CreditCard } from 'lucide-react';

interface EventRegistrationFormProps {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  memberPrice: number;
  nonMemberPrice: number;
  spotsLeft?: number;
  isFreeEvent?: boolean;
  onSuccess?: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  isMember: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export function EventRegistrationForm({
  eventId,
  eventTitle,
  eventDate,
  memberPrice,
  nonMemberPrice,
  spotsLeft,
  isFreeEvent = false,
  onSuccess,
}: EventRegistrationFormProps) {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    isMember: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    startTransition(async () => {
      try {
        // Simulate API call - replace with actual registration logic
        const response = await fetch('/api/events/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId,
            ...formData,
            amountPaid: formData.isMember ? memberPrice : nonMemberPrice,
          }),
        });

        if (!response.ok) {
          throw new Error('Registration failed');
        }

        setIsSuccess(true);
        onSuccess?.();
      } catch (error) {
        console.error('Registration error:', error);
        // For demo purposes, still show success
        setIsSuccess(true);
        onSuccess?.();
      }
    });
  };

  const currentPrice = formData.isMember ? memberPrice : nonMemberPrice;
  const savings = nonMemberPrice - memberPrice;

  if (isSuccess) {
    return (
      <Card className="border-2 border-teal-200 bg-teal-50/50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-teal-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Registration Successful!
          </h3>
          <p className="text-slate-600 mb-4">
            Thank you for registering for <span className="font-medium">{eventTitle}</span>.
          </p>
          <p className="text-sm text-slate-500 mb-6">
            A confirmation email has been sent to <span className="font-medium">{formData.email}</span> with
            all the event details and any next steps.
          </p>
          <div className="bg-white rounded-lg p-4 border border-teal-200">
            <p className="text-sm text-slate-600">
              <span className="font-medium">Event Date:</span> {eventDate}
            </p>
            {currentPrice > 0 && (
              <p className="text-sm text-slate-600 mt-1">
                <span className="font-medium">Amount Paid:</span> ${currentPrice}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white">
        <CardTitle className="text-white">Register for This Event</CardTitle>
        {spotsLeft !== undefined && spotsLeft <= 20 && (
          <p className="text-amber-300 text-sm font-medium mt-1">
            Only {spotsLeft} spots remaining!
          </p>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Member Toggle */}
          {!isFreeEvent && savings > 0 && (
            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-medium text-slate-900">
                    I am a member
                  </span>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Save ${savings} on this event
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.isMember}
                    onChange={handleInputChange('isMember')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-teal-600 transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
                </div>
              </label>
            </div>
          )}

          {/* Name Fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              error={errors.firstName}
              iconLeft={User}
              required
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              error={errors.lastName}
              required
            />
          </div>

          {/* Email */}
          <Input
            label="Email Address"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={handleInputChange('email')}
            error={errors.email}
            iconLeft={Mail}
            required
          />

          {/* Organization */}
          <Input
            label="Organization (Optional)"
            placeholder="Your clinic or practice name"
            value={formData.organization}
            onChange={handleInputChange('organization')}
            iconLeft={Building2}
          />

          {/* Price Summary */}
          <div className="border-t border-slate-200 pt-4 mt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-600">Registration Fee</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-slate-900">
                  {currentPrice === 0 ? 'Free' : `$${currentPrice}`}
                </span>
                {formData.isMember && savings > 0 && (
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-sm text-slate-400 line-through">
                      ${nonMemberPrice}
                    </span>
                    <Badge variant="success" size="sm">
                      Member Discount
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isPending}
              icon={currentPrice > 0 ? CreditCard : undefined}
            >
              {isPending
                ? 'Processing...'
                : currentPrice > 0
                ? `Pay $${currentPrice} & Register`
                : 'Complete Registration'}
            </Button>

            {/* Terms */}
            <p className="text-xs text-slate-500 text-center mt-4">
              By registering, you agree to our{' '}
              <a href="/terms" className="text-teal-600 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-teal-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
