'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  status: 'new' | 'contacted' | 'scheduled' | 'converted';
  interest: string;
  message: string;
  source: string;
}

// Placeholder data
const initialLeads: Lead[] = [
  {
    id: 1,
    name: 'John Davidson',
    email: 'john.davidson@email.com',
    phone: '(555) 123-4567',
    date: 'Jan 8, 2026',
    status: 'new',
    interest: 'IV Infusion',
    message: 'I have been struggling with treatment-resistant depression for years and would like to learn more about ketamine therapy options.',
    source: 'Directory Listing',
  },
  {
    id: 2,
    name: 'Sarah Martinez',
    email: 'sarah.m@email.com',
    phone: '(555) 234-5678',
    date: 'Jan 7, 2026',
    status: 'contacted',
    interest: 'Consultation',
    message: 'Looking for a consultation to discuss if ketamine therapy might be right for my chronic anxiety.',
    source: 'Google Search',
  },
  {
    id: 3,
    name: 'Michael Roberts',
    email: 'michael.r@email.com',
    phone: '(555) 345-6789',
    date: 'Jan 6, 2026',
    status: 'scheduled',
    interest: 'At-Home Treatment',
    message: 'Interested in at-home ketamine treatment for PTSD. I live about 2 hours from your clinic.',
    source: 'Referral',
  },
  {
    id: 4,
    name: 'Emily Watson',
    email: 'emily.watson@email.com',
    phone: '(555) 456-7890',
    date: 'Jan 5, 2026',
    status: 'new',
    interest: 'IV Infusion',
    message: 'My psychiatrist recommended ketamine therapy. Would like to schedule a consultation.',
    source: 'Directory Listing',
  },
  {
    id: 5,
    name: 'David Chen',
    email: 'david.chen@email.com',
    phone: '(555) 567-8901',
    date: 'Jan 4, 2026',
    status: 'converted',
    interest: 'IM Injection',
    message: 'Interested in IM injection therapy for chronic pain management.',
    source: 'Website',
  },
  {
    id: 6,
    name: 'Jennifer Brown',
    email: 'j.brown@email.com',
    phone: '(555) 678-9012',
    date: 'Jan 3, 2026',
    status: 'contacted',
    interest: 'Consultation',
    message: 'Would like more information about your ketamine therapy programs.',
    source: 'Google Search',
  },
];

const statusTabs = [
  { key: 'all', label: 'All Leads', count: 6 },
  { key: 'new', label: 'New', count: 2 },
  { key: 'contacted', label: 'Contacted', count: 2 },
  { key: 'scheduled', label: 'Scheduled', count: 1 },
  { key: 'converted', label: 'Converted', count: 1 },
];

const statusColors = {
  new: 'primary',
  contacted: 'secondary',
  scheduled: 'accent',
  converted: 'success',
} as const;

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  const filteredLeads = activeTab === 'all'
    ? leads
    : leads.filter(lead => lead.status === activeTab);

  const updateLeadStatus = (leadId: number, newStatus: Lead['status']) => {
    setLeads(leads.map(lead =>
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
    if (selectedLead?.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const openLeadDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setIsSlideOverOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Leads</h1>
          <p className="mt-2 text-slate-600">Manage and track patient inquiries.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? 'bg-teal-100 text-teal-700'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.key
                ? 'bg-teal-200 text-teal-800'
                : 'bg-slate-200 text-slate-600'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider hidden md:table-cell">Email</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider hidden lg:table-cell">Interest</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-slate-50 cursor-pointer"
                    onClick={() => openLeadDetail(lead)}
                  >
                    <td className="py-4 px-6">
                      <p className="font-medium text-slate-900">{lead.name}</p>
                      <p className="text-sm text-slate-500 md:hidden">{lead.email}</p>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <span className="text-sm text-slate-600">{lead.email}</span>
                    </td>
                    <td className="py-4 px-6 hidden lg:table-cell">
                      <span className="text-sm text-slate-600">{lead.interest}</span>
                    </td>
                    <td className="py-4 px-6 hidden sm:table-cell">
                      <span className="text-sm text-slate-500">{lead.date}</span>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={statusColors[lead.status]} size="sm">
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        {lead.status === 'new' && (
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'contacted')}
                            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                          >
                            Mark Contacted
                          </button>
                        )}
                        {lead.status === 'contacted' && (
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'scheduled')}
                            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                          >
                            Schedule
                          </button>
                        )}
                        {lead.status === 'scheduled' && (
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'converted')}
                            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                          >
                            Convert
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Lead Detail Slide-over */}
      {isSlideOverOpen && selectedLead && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-slate-900/50"
            onClick={() => setIsSlideOverOpen(false)}
          />

          {/* Slide-over Panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Lead Details</h2>
                <button
                  onClick={() => setIsSlideOverOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Contact Info */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
                        <span className="text-teal-700 font-bold text-xl">
                          {selectedLead.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{selectedLead.name}</h3>
                        <Badge variant={statusColors[selectedLead.status]} size="sm">
                          {selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href={`mailto:${selectedLead.email}`} className="text-teal-600 hover:text-teal-700">
                          {selectedLead.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`tel:${selectedLead.phone}`} className="text-teal-600 hover:text-teal-700">
                          {selectedLead.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="pt-6 border-t border-slate-200">
                    <h4 className="text-sm font-semibold text-slate-900 mb-4">Details</h4>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-xs text-slate-500 uppercase tracking-wider">Interest</dt>
                        <dd className="mt-1 text-sm text-slate-900">{selectedLead.interest}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-500 uppercase tracking-wider">Source</dt>
                        <dd className="mt-1 text-sm text-slate-900">{selectedLead.source}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-500 uppercase tracking-wider">Date Received</dt>
                        <dd className="mt-1 text-sm text-slate-900">{selectedLead.date}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Message */}
                  <div className="pt-6 border-t border-slate-200">
                    <h4 className="text-sm font-semibold text-slate-900 mb-4">Message</h4>
                    <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
                      {selectedLead.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-slate-200 space-y-3">
                {selectedLead.status === 'new' && (
                  <Button
                    fullWidth
                    onClick={() => updateLeadStatus(selectedLead.id, 'contacted')}
                  >
                    Mark as Contacted
                  </Button>
                )}
                {selectedLead.status === 'contacted' && (
                  <Button
                    fullWidth
                    onClick={() => updateLeadStatus(selectedLead.id, 'scheduled')}
                  >
                    Mark as Scheduled
                  </Button>
                )}
                {selectedLead.status === 'scheduled' && (
                  <Button
                    fullWidth
                    variant="emerald"
                    onClick={() => updateLeadStatus(selectedLead.id, 'converted')}
                  >
                    Mark as Converted
                  </Button>
                )}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => window.location.href = `mailto:${selectedLead.email}`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => window.location.href = `tel:${selectedLead.phone}`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
