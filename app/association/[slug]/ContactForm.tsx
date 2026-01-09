"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface ContactFormProps {
  practitionerId: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  condition: string;
  message: string;
}

const CONDITION_OPTIONS = [
  { value: "", label: "Select a condition (optional)" },
  { value: "TREATMENT_RESISTANT_DEPRESSION", label: "Treatment-Resistant Depression" },
  { value: "CHRONIC_PAIN", label: "Chronic Pain" },
  { value: "PTSD", label: "PTSD" },
  { value: "ANXIETY", label: "Anxiety" },
  { value: "OCD", label: "OCD" },
  { value: "BIPOLAR_DEPRESSION", label: "Bipolar Depression" },
  { value: "FIBROMYALGIA", label: "Fibromyalgia" },
  { value: "CRPS", label: "CRPS" },
  { value: "SUICIDAL_IDEATION", label: "Suicidal Ideation" },
];

export function ContactForm({ practitionerId }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    condition: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          practitionerId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message,
          condition: formData.condition || null,
          source: "DIRECTORY",
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setIsSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        condition: "",
        message: "",
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h4 className="text-lg font-semibold text-slate-900 mb-2">
          Message Sent!
        </h4>
        <p className="text-slate-600 mb-4">
          Thank you for your inquiry. The provider will contact you soon.
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          variant="secondary"
          size="sm"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Input
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          placeholder="John"
          required
        />
        <Input
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          placeholder="Doe"
          required
        />
      </div>

      <Input
        name="email"
        type="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="john@example.com"
        required
      />

      <Input
        name="phone"
        type="tel"
        label="Phone (optional)"
        value={formData.phone}
        onChange={handleChange}
        placeholder="(555) 123-4567"
      />

      <div>
        <label
          htmlFor="condition"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Condition
        </label>
        <select
          id="condition"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          {CONDITION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell the provider about your situation and what you're looking for..."
          className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-slate-400 ${
            errors.message
              ? "border-red-500 bg-red-50"
              : "border-slate-300 bg-white hover:border-slate-400"
          }`}
          required
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Inquiry"}
      </Button>

      <p className="text-xs text-slate-500 text-center">
        By submitting this form, you agree to our{" "}
        <a href="/privacy" className="text-teal-600 hover:underline">
          Privacy Policy
        </a>
        . Your information will be shared with this provider.
      </p>
    </form>
  );
}
