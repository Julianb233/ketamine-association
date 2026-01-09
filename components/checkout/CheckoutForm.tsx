'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export interface BillingFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

interface CheckoutFormProps {
  formData: BillingFormData;
  onChange: (data: BillingFormData) => void;
  onSubmit: () => Promise<void>;
  isProcessing: boolean;
  error?: string;
  validateOnSubmit?: boolean;
}

export function CheckoutForm({
  formData,
  onChange,
  onSubmit,
  isProcessing,
  error,
  validateOnSubmit = true,
}: CheckoutFormProps) {
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof BillingFormData]);
  };

  const validateField = (name: string, value: string) => {
    let error: string | undefined;

    switch (name) {
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'firstName':
        if (!value.trim()) {
          error = 'First name is required';
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          error = 'Last name is required';
        }
        break;
      case 'address':
        if (!value.trim()) {
          error = 'Address is required';
        }
        break;
      case 'city':
        if (!value.trim()) {
          error = 'City is required';
        }
        break;
      case 'state':
        if (!value.trim()) {
          error = 'State is required';
        } else if (value.length > 2) {
          error = 'Please use state abbreviation (e.g., NY)';
        }
        break;
      case 'zipCode':
        if (!value.trim()) {
          error = 'ZIP code is required';
        } else if (!/^\d{5}(-\d{4})?$/.test(value)) {
          error = 'Please enter a valid ZIP code';
        }
        break;
    }

    if (error) {
      setFormErrors((prev) => ({ ...prev, [name]: error }));
    }

    return !error;
  };

  const validateAllFields = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateOnSubmit && !validateAllFields()) {
      return;
    }

    await onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Contact Information */}
      <Card padding="lg" className="border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Contact Information
        </h2>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={touched.email ? formErrors.email : undefined}
          helperText="Order confirmation will be sent to this email"
          required
        />
      </Card>

      {/* Shipping Address */}
      <Card padding="lg" className="border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Shipping Address
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          You can enter your shipping details here, or complete them on the Stripe checkout page.
        </p>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={touched.firstName ? formErrors.firstName : undefined}
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={touched.lastName ? formErrors.lastName : undefined}
            />
          </div>
          <Input
            label="Address"
            name="address"
            placeholder="123 Main Street"
            value={formData.address}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={touched.address ? formErrors.address : undefined}
          />
          <Input
            label="Apartment, suite, etc. (optional)"
            name="apartment"
            placeholder="Apt 4B"
            value={formData.apartment}
            onChange={handleInputChange}
          />
          <div className="grid sm:grid-cols-3 gap-4">
            <Input
              label="City"
              name="city"
              placeholder="New York"
              value={formData.city}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={touched.city ? formErrors.city : undefined}
            />
            <Input
              label="State"
              name="state"
              placeholder="NY"
              value={formData.state}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={touched.state ? formErrors.state : undefined}
            />
            <Input
              label="ZIP Code"
              name="zipCode"
              placeholder="10001"
              value={formData.zipCode}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={touched.zipCode ? formErrors.zipCode : undefined}
            />
          </div>
          <Input
            label="Phone (optional)"
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={handleInputChange}
            helperText="For delivery updates"
          />
        </div>
      </Card>

      {/* Payment Section */}
      <Card padding="lg" className="border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Payment
        </h2>

        <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-xl mb-6">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-teal-900">Secure Stripe Checkout</h3>
            <p className="text-sm text-teal-700">
              You will be redirected to Stripe to complete your payment securely.
            </p>
          </div>
        </div>

        {/* Security Badges */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-lg">
            <svg className="w-6 h-6 text-slate-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-xs text-slate-600">SSL Secure</span>
          </div>
          <div className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-lg">
            <svg className="w-6 h-6 text-slate-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span className="text-xs text-slate-600">PCI Compliant</span>
          </div>
          <div className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-lg">
            <svg className="w-6 h-6 text-slate-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs text-slate-600">256-bit Encryption</span>
          </div>
        </div>

        {/* Accepted Payment Methods */}
        <div className="pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-3">Accepted payment methods:</p>
          <div className="flex gap-3">
            <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-medium text-slate-600">
              Visa
            </div>
            <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-medium text-slate-600">
              MC
            </div>
            <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-medium text-slate-600">
              Amex
            </div>
            <div className="w-16 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-medium text-slate-600">
              Apple Pay
            </div>
            <div className="w-16 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-medium text-slate-600">
              Google Pay
            </div>
          </div>
        </div>
      </Card>

      {/* Hidden submit button - form is typically submitted via external button */}
      <button type="submit" className="hidden" />
    </form>
  );
}
