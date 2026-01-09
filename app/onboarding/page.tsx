'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

type UserRole = 'practitioner' | 'patient';

interface StepProps {
  currentStep: number;
  totalSteps: number;
}

function StepIndicator({ currentStep, totalSteps }: StepProps) {
  const steps = [
    { number: 1, label: 'Role' },
    { number: 2, label: 'Profile' },
    { number: 3, label: 'Preferences' },
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.slice(0, totalSteps).map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                step.number < currentStep
                  ? 'bg-teal-600 text-white'
                  : step.number === currentStep
                  ? 'bg-teal-600 text-white ring-4 ring-teal-100'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {step.number < currentStep ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <span
              className={`mt-2 text-xs font-medium ${
                step.number <= currentStep ? 'text-teal-600' : 'text-slate-400'
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`w-16 h-0.5 mx-2 ${
                step.number < currentStep ? 'bg-teal-600' : 'bg-slate-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  // Get user on mount
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoaded(true);
    };
    getUser();
  }, [supabase.auth]);

  // Form state
  const [role, setRole] = useState<UserRole | null>(null);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    // Practitioner-specific
    licenseNumber: '',
    specialty: '',
    clinicName: '',
    clinicAddress: '',
    // Patient-specific
    dateOfBirth: '',
    emergencyContact: '',
    currentProvider: '',
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    // Practitioner-specific
    acceptNewPatients: true,
    telehealth: false,
    // Patient-specific
    appointmentReminders: true,
  });

  const totalSteps = 3;

  // Pre-fill from user metadata if available
  useEffect(() => {
    if (isLoaded && user) {
      // Check if role was set during signup
      const userRole = user.user_metadata?.role as UserRole | undefined;
      if (userRole) {
        setRole(userRole);
      }

      // Pre-fill name if available
      const fullName = user.user_metadata?.full_name || '';
      const nameParts = fullName.split(' ');
      if (nameParts[0]) {
        setProfile(prev => ({ ...prev, firstName: nameParts[0] || '' }));
      }
      if (nameParts.length > 1) {
        setProfile(prev => ({ ...prev, lastName: nameParts.slice(1).join(' ') || '' }));
      }
    }
  }, [isLoaded, user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [isLoaded, user, router]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (!user) return;

    setIsLoading(true);

    try {
      // Save onboarding data via API
      const response = await fetch('/api/users/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userType: role,
          profile,
          preferences,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save onboarding data');
      }

      // Redirect to appropriate dashboard
      if (role === 'practitioner') {
        router.push('/dashboard/practitioner');
      } else {
        router.push('/dashboard/patient');
      }
    } catch (error) {
      console.error('Error completing onboarding:', error);
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return role !== null;
      case 2:
        if (!profile.firstName || !profile.lastName || !profile.phone) return false;
        if (role === 'practitioner' && (!profile.licenseNumber || !profile.specialty)) return false;
        return true;
      case 3:
        return true;
      default:
        return false;
    }
  };

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L3 7L12 12L21 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 17L12 22L21 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 12L12 17L21 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900">Ketamine Association</span>
          </Link>
          <button className="text-sm text-slate-500 hover:text-slate-700">
            Save & Exit
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {/* Step 1: Role Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900">Choose your role</h2>
                <p className="mt-2 text-slate-600">
                  This helps us personalize your experience
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('practitioner')}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    role === 'practitioner'
                      ? 'border-teal-600 bg-teal-50 ring-2 ring-teal-100'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    role === 'practitioner' ? 'bg-teal-100' : 'bg-slate-100'
                  }`}>
                    <svg
                      className={`w-7 h-7 ${role === 'practitioner' ? 'text-teal-600' : 'text-slate-500'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className={`text-lg font-semibold ${role === 'practitioner' ? 'text-teal-700' : 'text-slate-900'}`}>
                    Healthcare Practitioner
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Psychiatrists, physicians, nurse practitioners, and other licensed providers
                  </p>
                  <ul className="mt-4 space-y-2">
                    {['List your practice', 'Connect with patients', 'Access clinical resources', 'Join the provider network'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                        <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('patient')}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    role === 'patient'
                      ? 'border-teal-600 bg-teal-50 ring-2 ring-teal-100'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    role === 'patient' ? 'bg-teal-100' : 'bg-slate-100'
                  }`}>
                    <svg
                      className={`w-7 h-7 ${role === 'patient' ? 'text-teal-600' : 'text-slate-500'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3 className={`text-lg font-semibold ${role === 'patient' ? 'text-teal-700' : 'text-slate-900'}`}>
                    Patient
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Individuals seeking ketamine therapy for mental health treatment
                  </p>
                  <ul className="mt-4 space-y-2">
                    {['Find verified providers', 'Access educational resources', 'Track your journey', 'Join the community'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                        <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Profile Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900">Complete your profile</h2>
                <p className="mt-2 text-slate-600">
                  {role === 'practitioner'
                    ? 'Tell us about your practice'
                    : 'Help us personalize your experience'}
                </p>
              </div>

              <div className="space-y-4">
                {/* Common Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Practitioner-specific fields */}
                {role === 'practitioner' && (
                  <>
                    <div className="pt-4 border-t border-slate-200">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Professional Information</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          License Number *
                        </label>
                        <input
                          type="text"
                          value={profile.licenseNumber}
                          onChange={(e) => setProfile({ ...profile, licenseNumber: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="MD-12345"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Specialty *
                        </label>
                        <select
                          value={profile.specialty}
                          onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        >
                          <option value="">Select specialty</option>
                          <option value="psychiatry">Psychiatry</option>
                          <option value="anesthesiology">Anesthesiology</option>
                          <option value="emergency">Emergency Medicine</option>
                          <option value="internal">Internal Medicine</option>
                          <option value="family">Family Medicine</option>
                          <option value="nurse-practitioner">Nurse Practitioner</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Clinic/Practice Name
                      </label>
                      <input
                        type="text"
                        value={profile.clinicName}
                        onChange={(e) => setProfile({ ...profile, clinicName: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Wellness Psychiatric Clinic"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Clinic Address
                      </label>
                      <input
                        type="text"
                        value={profile.clinicAddress}
                        onChange={(e) => setProfile({ ...profile, clinicAddress: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="123 Medical Center Dr, Suite 100"
                      />
                    </div>
                  </>
                )}

                {/* Patient-specific fields */}
                {role === 'patient' && (
                  <>
                    <div className="pt-4 border-t border-slate-200">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Additional Information</h3>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Emergency Contact
                      </label>
                      <input
                        type="text"
                        value={profile.emergencyContact}
                        onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Name - (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Current Healthcare Provider (optional)
                      </label>
                      <input
                        type="text"
                        value={profile.currentProvider}
                        onChange={(e) => setProfile({ ...profile, currentProvider: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Dr. Jane Smith"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900">Set your preferences</h2>
                <p className="mt-2 text-slate-600">
                  Customize how you receive updates and notifications
                </p>
              </div>

              <div className="space-y-4">
                {/* Notification Preferences */}
                <div className="p-4 bg-slate-50 rounded-xl">
                  <h3 className="font-semibold text-slate-900 mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-slate-700">Email notifications</span>
                      <input
                        type="checkbox"
                        checked={preferences.emailNotifications}
                        onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
                        className="w-5 h-5 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-slate-700">SMS notifications</span>
                      <input
                        type="checkbox"
                        checked={preferences.smsNotifications}
                        onChange={(e) => setPreferences({ ...preferences, smsNotifications: e.target.checked })}
                        className="w-5 h-5 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-slate-700">Marketing emails</span>
                      <input
                        type="checkbox"
                        checked={preferences.marketingEmails}
                        onChange={(e) => setPreferences({ ...preferences, marketingEmails: e.target.checked })}
                        className="w-5 h-5 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
                      />
                    </label>
                  </div>
                </div>

                {/* Role-specific preferences */}
                {role === 'practitioner' && (
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-4">Practice Settings</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <span className="text-slate-700 block">Accept new patients</span>
                          <span className="text-sm text-slate-500">Show your practice as accepting new patients</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={preferences.acceptNewPatients}
                          onChange={(e) => setPreferences({ ...preferences, acceptNewPatients: e.target.checked })}
                          className="w-5 h-5 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
                        />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <span className="text-slate-700 block">Telehealth available</span>
                          <span className="text-sm text-slate-500">Offer virtual consultations</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={preferences.telehealth}
                          onChange={(e) => setPreferences({ ...preferences, telehealth: e.target.checked })}
                          className="w-5 h-5 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {role === 'patient' && (
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-4">Appointment Settings</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <span className="text-slate-700 block">Appointment reminders</span>
                          <span className="text-sm text-slate-500">Get reminders before appointments</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={preferences.appointmentReminders}
                          onChange={(e) => setPreferences({ ...preferences, appointmentReminders: e.target.checked })}
                          className="w-5 h-5 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {/* Privacy note */}
                <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-teal-800">
                        Your privacy is important to us. You can change these preferences at any time from your account settings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 text-slate-600 font-medium hover:text-slate-800 transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                disabled={isLoading}
                className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Completing...
                  </span>
                ) : (
                  'Complete Setup'
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
