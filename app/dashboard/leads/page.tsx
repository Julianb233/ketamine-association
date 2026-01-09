'use client';

import { useState } from 'react';
import {
  Download,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MessageSquare,
  X,
  Check,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { cn, formatDate } from '@/lib/utils';

// Types
type LeadStatus = 'NEW' | 'CONTACTED' | 'SCHEDULED' | 'CONVERTED' | 'CLOSED';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  message: string;
  status: LeadStatus;
  condition: string;
  source: string;
  createdAt: Date;
}

// Mock data
const mockLeads: Lead[] = [
  {
    id: '1',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@email.com',
    phone: '(555) 123-4567',
    message: 'I have been struggling with treatment-resistant depression for several years and would like to learn more about ketamine therapy options.',
    status: 'NEW',
    condition: 'TREATMENT_RESISTANT_DEPRESSION',
    source: 'DIRECTORY',
    createdAt: new Date('2024-01-07T10:30:00'),
  },
  {
    id: '2',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.r@email.com',
    phone: '(555) 234-5678',
    message: 'Looking for anxiety treatment alternatives. Traditional medications have not been effective.',
    status: 'CONTACTED',
    condition: 'ANXIETY',
    source: 'ARTICLE',
    createdAt: new Date('2024-01-06T14:15:00'),
  },
  {
    id: '3',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'jwilson@email.com',
    phone: '(555) 345-6789',
    message: 'Chronic pain patient interested in IV infusion therapy.',
    status: 'SCHEDULED',
    condition: 'CHRONIC_PAIN',
    source: 'REFERRAL',
    createdAt: new Date('2024-01-05T09:45:00'),
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Thompson',
    email: 'sarah.t@email.com',
    phone: '(555) 456-7890',
    message: 'PTSD from military service. Looking for effective treatment options.',
    status: 'NEW',
    condition: 'PTSD',
    source: 'DIRECTORY',
    createdAt: new Date('2024-01-04T16:20:00'),
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Martinez',
    email: 'd.martinez@email.com',
    phone: '(555) 567-8901',
    message: 'Interested in ketamine-assisted psychotherapy for OCD.',
    status: 'CONVERTED',
    condition: 'OCD',
    source: 'EVENT',
    createdAt: new Date('2024-01-03T11:00:00'),
  },
  {
    id: '6',
    firstName: 'Jennifer',
    lastName: 'Lee',
    email: 'jennifer.lee@email.com',
    phone: null,
    message: 'Seeking information about treatment for bipolar depression.',
    status: 'CLOSED',
    condition: 'BIPOLAR_DEPRESSION',
    source: 'ADVERTISING',
    createdAt: new Date('2024-01-02T13:30:00'),
  },
];

const statusOptions = [
  { value: 'ALL', label: 'All Status' },
  { value: 'NEW', label: 'New' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'SCHEDULED', label: 'Scheduled' },
  { value: 'CONVERTED', label: 'Converted' },
  { value: 'CLOSED', label: 'Closed' },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  NEW: { bg: 'bg-blue-100', text: 'text-blue-700' },
  CONTACTED: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  SCHEDULED: { bg: 'bg-purple-100', text: 'text-purple-700' },
  CONVERTED: { bg: 'bg-green-100', text: 'text-green-700' },
  CLOSED: { bg: 'bg-slate-100', text: 'text-slate-700' },
};

const conditionLabels: Record<string, string> = {
  TREATMENT_RESISTANT_DEPRESSION: 'Treatment-Resistant Depression',
  CHRONIC_PAIN: 'Chronic Pain',
  PTSD: 'PTSD',
  ANXIETY: 'Anxiety',
  OCD: 'OCD',
  BIPOLAR_DEPRESSION: 'Bipolar Depression',
  FIBROMYALGIA: 'Fibromyalgia',
  CRPS: 'CRPS',
  SUICIDAL_IDEATION: 'Suicidal Ideation',
};

const sourceLabels: Record<string, string> = {
  DIRECTORY: 'Directory',
  ARTICLE: 'Article',
  REFERRAL: 'Referral',
  EVENT: 'Event',
  ADVERTISING: 'Advertising',
};

// Mock membership tier - in production, get from auth context
const membershipTier = 'PREMIUM';
const canExport = ['PREMIUM', 'ELITE', 'ENTERPRISE'].includes(membershipTier);

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [leads, setLeads] = useState(mockLeads);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    setLeads(leads.map((lead) =>
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
  };

  const handleExport = () => {
    if (!canExport) {
      alert('Export is available for Premium members and above. Please upgrade your membership.');
      return;
    }
    // In production, call the server action
    const csv = [
      'Date,First Name,Last Name,Email,Phone,Condition,Status,Source,Message',
      ...filteredLeads.map((lead) =>
        `${lead.createdAt.toISOString()},${lead.firstName},${lead.lastName},${lead.email},${lead.phone || ''},${lead.condition},${lead.status},${lead.source},"${lead.message?.replace(/"/g, '""') || ''}"`
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Leads</h1>
          <p className="text-slate-500 mt-1">
            Manage and track your patient inquiries
          </p>
        </div>
        <Button
          variant={canExport ? 'secondary' : 'outline'}
          size="sm"
          onClick={handleExport}
          disabled={!canExport}
          className="relative"
        >
          {canExport ? (
            <>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Export (Premium+)
            </>
          )}
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-slate-700 font-medium cursor-pointer"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statusOptions.slice(1).map((status) => {
          const count = leads.filter((l) => l.status === status.value).length;
          const colors = statusColors[status.value];
          return (
            <button
              key={status.value}
              onClick={() => setStatusFilter(statusFilter === status.value ? 'ALL' : status.value)}
              className={cn(
                'p-4 rounded-xl border-2 transition-all text-left',
                statusFilter === status.value
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-transparent bg-white hover:border-slate-200'
              )}
            >
              <span className={cn(
                'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mb-2',
                colors.bg,
                colors.text
              )}>
                {status.label}
              </span>
              <p className="text-2xl font-bold text-slate-900">{count}</p>
            </button>
          );
        })}
      </div>

      {/* Leads Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6">
                    Lead
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6 hidden md:table-cell">
                    Condition
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6 hidden lg:table-cell">
                    Source
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6">
                    Status
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6 hidden sm:table-cell">
                    Date
                  </th>
                  <th className="py-4 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No leads found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <>
                      <tr
                        key={lead.id}
                        className={cn(
                          'border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer',
                          expandedLeadId === lead.id && 'bg-slate-50'
                        )}
                        onClick={() => setExpandedLeadId(expandedLeadId === lead.id ? null : lead.id)}
                      >
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-semibold text-slate-900">
                              {lead.firstName} {lead.lastName}
                            </p>
                            <p className="text-sm text-slate-500">{lead.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6 hidden md:table-cell">
                          <span className="text-sm text-slate-600">
                            {conditionLabels[lead.condition] || lead.condition}
                          </span>
                        </td>
                        <td className="py-4 px-6 hidden lg:table-cell">
                          <Badge variant="outline" size="sm">
                            {sourceLabels[lead.source] || lead.source}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <span className={cn(
                            'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                            statusColors[lead.status].bg,
                            statusColors[lead.status].text
                          )}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 hidden sm:table-cell">
                          <span className="text-sm text-slate-500">
                            {formatDate(lead.createdAt)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button className="p-2 hover:bg-slate-100 rounded-lg">
                            {expandedLeadId === lead.id ? (
                              <ChevronUp className="h-5 w-5 text-slate-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-slate-400" />
                            )}
                          </button>
                        </td>
                      </tr>
                      {/* Expanded Details */}
                      {expandedLeadId === lead.id && (
                        <tr className="bg-slate-50">
                          <td colSpan={6} className="px-6 py-4">
                            <div className="grid md:grid-cols-2 gap-6">
                              {/* Contact Info */}
                              <div className="space-y-4">
                                <h4 className="font-semibold text-slate-900">Contact Information</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                    <a
                                      href={`mailto:${lead.email}`}
                                      className="text-teal-600 hover:text-teal-700"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {lead.email}
                                    </a>
                                  </div>
                                  {lead.phone && (
                                    <div className="flex items-center gap-3 text-sm">
                                      <Phone className="h-4 w-4 text-slate-400" />
                                      <a
                                        href={`tel:${lead.phone}`}
                                        className="text-teal-600 hover:text-teal-700"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        {lead.phone}
                                      </a>
                                    </div>
                                  )}
                                </div>
                                {lead.message && (
                                  <div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                                      <MessageSquare className="h-4 w-4 text-slate-400" />
                                      Message
                                    </div>
                                    <p className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                                      {lead.message}
                                    </p>
                                  </div>
                                )}
                              </div>
                              {/* Actions */}
                              <div className="space-y-4">
                                <h4 className="font-semibold text-slate-900">Update Status</h4>
                                <div className="flex flex-wrap gap-2">
                                  {statusOptions.slice(1).map((status) => (
                                    <button
                                      key={status.value}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleStatusChange(lead.id, status.value as LeadStatus);
                                      }}
                                      className={cn(
                                        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                                        lead.status === status.value
                                          ? `${statusColors[status.value].bg} ${statusColors[status.value].text}`
                                          : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                                      )}
                                    >
                                      {lead.status === status.value && (
                                        <Check className="h-3.5 w-3.5" />
                                      )}
                                      {status.label}
                                    </button>
                                  ))}
                                </div>
                                <div className="pt-4 border-t border-slate-200">
                                  <div className="flex gap-2">
                                    <Button
                                      variant="primary"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        window.location.href = `mailto:${lead.email}`;
                                      }}
                                    >
                                      <Mail className="h-4 w-4 mr-1.5" />
                                      Send Email
                                    </Button>
                                    {lead.phone && (
                                      <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          window.location.href = `tel:${lead.phone}`;
                                        }}
                                      >
                                        <Phone className="h-4 w-4 mr-1.5" />
                                        Call
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing {filteredLeads.length} of {leads.length} leads
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
