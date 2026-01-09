'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '@/components/ui';

// Placeholder data
const initialProfile = {
  // Personal Info
  firstName: 'Sarah',
  lastName: 'Mitchell',
  email: 'sarah.mitchell@example.com',
  phone: '(555) 123-4567',
  bio: 'Board-certified psychiatrist with over 15 years of experience in ketamine-assisted therapy. Passionate about helping patients find relief from treatment-resistant depression and anxiety.',

  // Practice Info
  practiceName: 'Mindful Healing Center',
  practiceAddress: '123 Wellness Street',
  practiceCity: 'San Francisco',
  practiceState: 'CA',
  practiceZip: '94102',
  practicePhone: '(555) 987-6543',
  website: 'https://mindfulhealingcenter.com',

  // Treatments
  treatments: ['IV Infusion', 'IM Injection', 'Nasal Spray', 'At-Home Treatment', 'Telehealth Consultation'],
  conditions: ['Depression', 'Anxiety', 'PTSD', 'Chronic Pain', 'OCD'],

  // Credentials
  medicalDegree: 'MD',
  medicalSchool: 'Stanford University School of Medicine',
  boardCertifications: ['Psychiatry', 'Addiction Medicine'],
  licenseNumber: 'CA-PSY-12345',
  licenseState: 'CA',
  deaNumber: 'DEA-12345678',
  npi: '1234567890',
};

const allTreatments = [
  'IV Infusion',
  'IM Injection',
  'Nasal Spray',
  'Sublingual',
  'At-Home Treatment',
  'Telehealth Consultation',
  'In-Person Consultation',
];

const allConditions = [
  'Depression',
  'Anxiety',
  'PTSD',
  'Chronic Pain',
  'OCD',
  'Bipolar Depression',
  'Suicidal Ideation',
  'Fibromyalgia',
  'Neuropathic Pain',
];

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'treatments' | 'conditions', item: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Show success message (in real app, use toast)
    alert('Profile saved successfully!');
  };

  const sections = [
    { id: 'personal', name: 'Personal Info' },
    { id: 'practice', name: 'Practice Info' },
    { id: 'treatments', name: 'Treatments' },
    { id: 'credentials', name: 'Credentials' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Edit Profile</h1>
          <p className="mt-2 text-slate-600">Manage your public profile and practice information.</p>
        </div>
        <Button onClick={handleSave} isLoading={isLoading}>
          Save Changes
        </Button>
      </div>

      {/* Section Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeSection === section.id
                ? 'bg-teal-100 text-teal-700'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* Personal Info Section */}
      {activeSection === 'personal' && (
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Profile Image */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center">
                  <span className="text-teal-700 font-bold text-2xl">SM</span>
                </div>
                <div>
                  <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Upload Photo
                  </button>
                  <p className="mt-2 text-xs text-slate-500">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  label="First Name"
                  value={profile.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
                <Input
                  label="Last Name"
                  value={profile.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  label="Email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
                <Input
                  label="Phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Professional Bio
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell patients about your experience and approach..."
                />
                <p className="mt-1.5 text-sm text-slate-500">{profile.bio.length}/500 characters</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Practice Info Section */}
      {activeSection === 'practice' && (
        <Card>
          <CardHeader>
            <CardTitle>Practice Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Input
                label="Practice Name"
                value={profile.practiceName}
                onChange={(e) => handleInputChange('practiceName', e.target.value)}
              />

              <Input
                label="Street Address"
                value={profile.practiceAddress}
                onChange={(e) => handleInputChange('practiceAddress', e.target.value)}
              />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <Input
                  label="City"
                  value={profile.practiceCity}
                  onChange={(e) => handleInputChange('practiceCity', e.target.value)}
                />
                <Input
                  label="State"
                  value={profile.practiceState}
                  onChange={(e) => handleInputChange('practiceState', e.target.value)}
                />
                <Input
                  label="ZIP Code"
                  value={profile.practiceZip}
                  onChange={(e) => handleInputChange('practiceZip', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  label="Practice Phone"
                  type="tel"
                  value={profile.practicePhone}
                  onChange={(e) => handleInputChange('practicePhone', e.target.value)}
                />
                <Input
                  label="Website"
                  type="url"
                  value={profile.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Treatments Section */}
      {activeSection === 'treatments' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Treatment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">Select the ketamine treatment methods you offer.</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {allTreatments.map((treatment) => (
                  <label
                    key={treatment}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                      profile.treatments.includes(treatment)
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={profile.treatments.includes(treatment)}
                      onChange={() => toggleArrayItem('treatments', treatment)}
                      className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
                    />
                    <span className="text-sm font-medium text-slate-700">{treatment}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conditions Treated</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">Select the conditions you treat with ketamine therapy.</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {allConditions.map((condition) => (
                  <label
                    key={condition}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                      profile.conditions.includes(condition)
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={profile.conditions.includes(condition)}
                      onChange={() => toggleArrayItem('conditions', condition)}
                      className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
                    />
                    <span className="text-sm font-medium text-slate-700">{condition}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Credentials Section */}
      {activeSection === 'credentials' && (
        <Card>
          <CardHeader>
            <CardTitle>Credentials & Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  label="Medical Degree"
                  value={profile.medicalDegree}
                  onChange={(e) => handleInputChange('medicalDegree', e.target.value)}
                />
                <Input
                  label="Medical School"
                  value={profile.medicalSchool}
                  onChange={(e) => handleInputChange('medicalSchool', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Board Certifications
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {profile.boardCertifications.map((cert, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm"
                    >
                      {cert}
                      <button className="hover:text-teal-900">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
                <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                  + Add Certification
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  label="License Number"
                  value={profile.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                />
                <Input
                  label="License State"
                  value={profile.licenseState}
                  onChange={(e) => handleInputChange('licenseState', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  label="DEA Number"
                  value={profile.deaNumber}
                  onChange={(e) => handleInputChange('deaNumber', e.target.value)}
                  helperText="Required for prescribing controlled substances"
                />
                <Input
                  label="NPI Number"
                  value={profile.npi}
                  onChange={(e) => handleInputChange('npi', e.target.value)}
                />
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-amber-800">Verification Required</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Your credentials will be verified by our team before your profile goes live. This typically takes 2-3 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bottom Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={isLoading} size="lg">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
