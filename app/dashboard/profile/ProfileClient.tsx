'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Save,
  Upload,
  User,
  Building2,
  Phone,
  Stethoscope,
  HeartPulse,
  BadgeCheck,
  X,
  Check,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';

// Validation schema
const profileSchema = z.object({
  title: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  credentials: z.string().optional(),
  specialty: z.string().optional(),
  bio: z.string().max(1000, 'Bio must be less than 1000 characters').optional(),
  practiceName: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  licenseNumber: z.string().optional(),
  licenseState: z.string().optional(),
  npiNumber: z.string().optional(),
  treatments: z.array(z.string()),
  conditions: z.array(z.string()),
  insurances: z.array(z.string()),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileClientProps {
  initialProfile: ProfileFormData & { id: string; profileImage?: string };
}

const treatmentOptions = [
  { value: 'IV_INFUSION', label: 'IV Infusion' },
  { value: 'IM_INJECTION', label: 'IM Injection' },
  { value: 'NASAL_SPRAY', label: 'Nasal Spray (Spravato)' },
  { value: 'ORAL_SUBLINGUAL', label: 'Oral/Sublingual' },
  { value: 'KETAMINE_ASSISTED_PSYCHOTHERAPY', label: 'Ketamine-Assisted Psychotherapy (KAP)' },
];

const conditionOptions = [
  { value: 'TREATMENT_RESISTANT_DEPRESSION', label: 'Treatment-Resistant Depression' },
  { value: 'CHRONIC_PAIN', label: 'Chronic Pain' },
  { value: 'PTSD', label: 'PTSD' },
  { value: 'ANXIETY', label: 'Anxiety Disorders' },
  { value: 'OCD', label: 'OCD' },
  { value: 'BIPOLAR_DEPRESSION', label: 'Bipolar Depression' },
  { value: 'FIBROMYALGIA', label: 'Fibromyalgia' },
  { value: 'CRPS', label: 'CRPS' },
  { value: 'SUICIDAL_IDEATION', label: 'Suicidal Ideation' },
];

const commonInsurances = [
  'Aetna',
  'Blue Cross Blue Shield',
  'Cigna',
  'UnitedHealthcare',
  'Medicare',
  'Medicaid',
  'Humana',
  'Kaiser Permanente',
  'Self-Pay',
  'Out-of-Network',
];

const usStates = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

function MultiSelect({
  options,
  selected,
  onChange,
  placeholder,
}: {
  options: { value: string; label: string }[] | string[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const normalizedOptions = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:border-slate-400 transition-colors"
      >
        {selected.length === 0 ? (
          <span className="text-slate-400">{placeholder}</span>
        ) : (
          <span className="text-slate-700">{selected.length} selected</span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 mt-2 w-full bg-white rounded-lg shadow-xl border border-slate-200 max-h-60 overflow-y-auto">
            {normalizedOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className={cn(
                  'w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors',
                  selected.includes(option.value) && 'bg-teal-50'
                )}
              >
                <span className="text-sm text-slate-700">{option.label}</span>
                {selected.includes(option.value) && (
                  <Check className="h-4 w-4 text-teal-600" />
                )}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Selected Tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map((value) => {
            const option = normalizedOptions.find((o) => o.value === value);
            return (
              <span
                key={value}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-100 text-teal-800 rounded-full text-sm"
              >
                {option?.label || value}
                <button
                  type="button"
                  onClick={() => toggleOption(value)}
                  className="hover:text-teal-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ProfileClient({ initialProfile }: ProfileClientProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialProfile,
  });

  const bio = watch('bio');

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      const response = await fetch(`/api/practitioners/${initialProfile.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      setSaveError('Failed to save profile. Please try again.');
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Edit Profile</h1>
          <p className="text-slate-500 mt-1">
            Update your professional information and practice details
          </p>
        </div>
        <div className="flex gap-3">
          {saveSuccess && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">Saved successfully</span>
            </div>
          )}
          {saveError && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg">
              <X className="h-4 w-4" />
              <span className="text-sm font-medium">{saveError}</span>
            </div>
          )}
          <Button
            variant="primary"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSaving}
            disabled={!isDirty}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Image Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-teal-600" />
              Profile Photo
            </CardTitle>
            <CardDescription>
              Upload a professional photo for your directory listing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <Avatar
                name={`${initialProfile.firstName} ${initialProfile.lastName}`}
                src={initialProfile.profileImage}
                size="xl"
              />
              <div>
                <Button variant="secondary" size="sm" type="button">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
                <p className="text-xs text-slate-500 mt-2">
                  JPG, PNG, or GIF. Max size 5MB. Recommended 400x400px.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-teal-600" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Title
                </label>
                <select
                  {...register('title')}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                </select>
              </div>
              <div>
                <Input
                  label="First Name"
                  {...register('firstName')}
                  error={errors.firstName?.message}
                />
              </div>
              <div>
                <Input
                  label="Last Name"
                  {...register('lastName')}
                  error={errors.lastName?.message}
                />
              </div>
              <div>
                <Input
                  label="Credentials"
                  placeholder="MD, DO, NP, PA..."
                  {...register('credentials')}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Input
                  label="Specialty"
                  placeholder="e.g., Psychiatry, Anesthesiology"
                  {...register('specialty')}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Bio
              </label>
              <textarea
                {...register('bio')}
                rows={4}
                placeholder="Tell patients about your background, experience, and approach to treatment..."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-between mt-1.5">
                {errors.bio && (
                  <p className="text-sm text-red-600">{errors.bio.message}</p>
                )}
                <p className="text-sm text-slate-500 ml-auto">
                  {bio?.length || 0} / 1000
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Practice Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-teal-600" />
              Practice Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Practice Name"
                  placeholder="Your clinic or practice name"
                  {...register('practiceName')}
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  label="Address"
                  placeholder="Street address"
                  {...register('address')}
                />
              </div>
              <div>
                <Input
                  label="City"
                  {...register('city')}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    State
                  </label>
                  <select
                    {...register('state')}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    {usStates.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Input
                    label="ZIP Code"
                    {...register('zipCode')}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-teal-600" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="(555) 123-4567"
                  {...register('phone')}
                />
              </div>
              <div>
                <Input
                  label="Website"
                  type="url"
                  placeholder="https://yourpractice.com"
                  {...register('website')}
                  error={errors.website?.message}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Treatment Types */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-teal-600" />
              Treatment Types Offered
            </CardTitle>
            <CardDescription>
              Select all ketamine treatment modalities you provide
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Controller
              name="treatments"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={treatmentOptions}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Select treatment types..."
                />
              )}
            />
          </CardContent>
        </Card>

        {/* Conditions Treated */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-teal-600" />
              Conditions Treated
            </CardTitle>
            <CardDescription>
              Select the conditions you specialize in treating with ketamine therapy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Controller
              name="conditions"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={conditionOptions}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Select conditions..."
                />
              )}
            />
          </CardContent>
        </Card>

        {/* Insurance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-teal-600" />
              Insurance Accepted
            </CardTitle>
            <CardDescription>
              Select the insurance plans you accept
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Controller
              name="insurances"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={commonInsurances}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Select insurance plans..."
                />
              )}
            />
          </CardContent>
        </Card>

        {/* Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-teal-600" />
              Verification Information
            </CardTitle>
            <CardDescription>
              License and NPI information for verification purposes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Input
                  label="License Number"
                  {...register('licenseNumber')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  License State
                </label>
                <select
                  {...register('licenseState')}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  {usStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div>
                <Input
                  label="NPI Number"
                  placeholder="10-digit NPI"
                  {...register('npiNumber')}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button (Mobile) */}
        <div className="lg:hidden">
          <Button
            variant="primary"
            fullWidth
            type="submit"
            isLoading={isSaving}
            disabled={!isDirty}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
