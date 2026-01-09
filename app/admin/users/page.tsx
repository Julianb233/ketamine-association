'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  MoreVertical,
  Eye,
  Edit,
  Ban,
  Trash2,
  UserPlus,
  Download,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

// User role types matching Prisma schema
type UserRole = 'PATIENT' | 'PRACTITIONER' | 'ADMIN' | 'MODERATOR';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'suspended';
  joinedAt: string;
  lastActive: string;
  avatar?: string;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    email: 'emily.johnson@email.com',
    role: 'PATIENT',
    status: 'active',
    joinedAt: '2024-01-15',
    lastActive: '2 hours ago',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@clinic.com',
    role: 'PRACTITIONER',
    status: 'active',
    joinedAt: '2023-11-20',
    lastActive: '30 minutes ago',
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah.w@email.com',
    role: 'PATIENT',
    status: 'active',
    joinedAt: '2024-02-01',
    lastActive: '1 day ago',
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@ketamineassoc.org',
    role: 'ADMIN',
    status: 'active',
    joinedAt: '2023-01-01',
    lastActive: 'Just now',
  },
  {
    id: '5',
    name: 'Dr. Lisa Park',
    email: 'lisa.park@wellness.com',
    role: 'PRACTITIONER',
    status: 'active',
    joinedAt: '2023-09-15',
    lastActive: '3 hours ago',
  },
  {
    id: '6',
    name: 'James Thompson',
    email: 'james.t@email.com',
    role: 'PATIENT',
    status: 'inactive',
    joinedAt: '2023-12-10',
    lastActive: '2 weeks ago',
  },
  {
    id: '7',
    name: 'Community Moderator',
    email: 'mod@ketamineassoc.org',
    role: 'MODERATOR',
    status: 'active',
    joinedAt: '2023-06-01',
    lastActive: '1 hour ago',
  },
  {
    id: '8',
    name: 'Robert Davis',
    email: 'robert.d@email.com',
    role: 'PATIENT',
    status: 'suspended',
    joinedAt: '2023-08-20',
    lastActive: '1 month ago',
  },
];

const roleColors: Record<UserRole, string> = {
  PATIENT: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  PRACTITIONER: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  ADMIN: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  MODERATOR: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

const statusColors = {
  active: 'bg-emerald-500/10 text-emerald-400',
  inactive: 'bg-slate-500/10 text-slate-400',
  suspended: 'bg-red-500/10 text-red-400',
};

const statusIcons = {
  active: CheckCircle2,
  inactive: Clock,
  suspended: XCircle,
};

export default function UsersManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Filter users
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  };

  const toggleSelectUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="mt-1 text-slate-400">
            Manage all platform users and their permissions
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" icon={UserPlus}>
            Add User
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
            />
          </div>

          {/* Filter dropdowns */}
          <div className="flex flex-wrap gap-3">
            {/* Role filter */}
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
                className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 pr-10 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                <option value="all">All Roles</option>
                <option value="PATIENT">Patient</option>
                <option value="PRACTITIONER">Practitioner</option>
                <option value="ADMIN">Admin</option>
                <option value="MODERATOR">Moderator</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            {/* Status filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive' | 'suspended')}
                className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 pr-10 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-700 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-teal-500 focus:ring-teal-500/50"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredUsers.map((user) => {
                const StatusIcon = statusIcons[user.status];
                return (
                  <tr
                    key={user.id}
                    className={cn(
                      'hover:bg-slate-800/50 transition-colors',
                      selectedUsers.includes(user.id) && 'bg-teal-500/5'
                    )}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleSelectUser(user.id)}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-teal-500 focus:ring-teal-500/50"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                          <span className="text-sm font-medium text-slate-300">
                            {user.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative inline-block">
                        <select
                          defaultValue={user.role}
                          className={cn(
                            'appearance-none px-3 py-1.5 pr-8 rounded-lg text-xs font-medium border bg-transparent cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500/50',
                            roleColors[user.role]
                          )}
                        >
                          <option value="PATIENT" className="bg-slate-800 text-white">Patient</option>
                          <option value="PRACTITIONER" className="bg-slate-800 text-white">Practitioner</option>
                          <option value="ADMIN" className="bg-slate-800 text-white">Admin</option>
                          <option value="MODERATOR" className="bg-slate-800 text-white">Moderator</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium',
                          statusColors[user.status]
                        )}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-400">
                        {new Date(user.joinedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-400">{user.lastActive}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {openDropdown === user.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenDropdown(null)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 py-1">
                              <button className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                View Details
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-2">
                                <Edit className="w-4 h-4" />
                                Edit User
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-amber-400 hover:bg-slate-700 flex items-center gap-2">
                                <Ban className="w-4 h-4" />
                                Suspend User
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-slate-700 flex items-center gap-2">
                                <Trash2 className="w-4 h-4" />
                                Delete User
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800">
          <p className="text-sm text-slate-400">
            Showing <span className="font-medium text-white">{filteredUsers.length}</span> of{' '}
            <span className="font-medium text-white">{mockUsers.length}</span> users
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm bg-teal-500/10 text-teal-400 rounded-lg">
              1
            </button>
            <button className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              2
            </button>
            <button className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              3
            </button>
            <button className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Bulk actions bar */}
      {selectedUsers.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-8 bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-4 flex items-center gap-4">
          <span className="text-sm text-slate-300">
            <span className="font-medium text-white">{selectedUsers.length}</span> selected
          </span>
          <div className="h-6 w-px bg-slate-700" />
          <button className="text-sm text-slate-300 hover:text-white transition-colors">
            Change Role
          </button>
          <button className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
            Suspend
          </button>
          <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
            Delete
          </button>
          <button
            onClick={() => setSelectedUsers([])}
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
