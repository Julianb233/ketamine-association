'use client';

import * as React from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  RefreshCw,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

// Types
export type SortDirection = 'asc' | 'desc' | null;

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (item: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;

  // Search
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;

  // Sorting
  sortColumn?: string;
  sortDirection?: SortDirection;
  onSort?: (column: string, direction: SortDirection) => void;

  // Selection
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;

  // Pagination
  pagination?: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
  };

  // Actions
  onRefresh?: () => void;
  onExport?: () => void;

  // Styling
  className?: string;
  emptyMessage?: string;
  isLoading?: boolean;

  // Custom filters slot
  filters?: React.ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  searchable = false,
  searchPlaceholder = 'Search...',
  searchValue = '',
  onSearchChange,
  sortColumn,
  sortDirection,
  onSort,
  selectable = false,
  selectedKeys = [],
  onSelectionChange,
  pagination,
  onRefresh,
  onExport,
  className,
  emptyMessage = 'No data found',
  isLoading = false,
  filters,
}: DataTableProps<T>) {
  // Handle sort click
  const handleSort = (column: Column<T>) => {
    if (!column.sortable || !onSort) return;

    let newDirection: SortDirection = 'asc';
    if (sortColumn === column.key) {
      if (sortDirection === 'asc') newDirection = 'desc';
      else if (sortDirection === 'desc') newDirection = null;
    }

    onSort(column.key, newDirection);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (!onSelectionChange) return;

    const allKeys = data.map(keyExtractor);
    if (selectedKeys.length === data.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(allKeys);
    }
  };

  // Handle individual selection
  const handleSelect = (key: string) => {
    if (!onSelectionChange) return;

    if (selectedKeys.includes(key)) {
      onSelectionChange(selectedKeys.filter((k) => k !== key));
    } else {
      onSelectionChange([...selectedKeys, key]);
    }
  };

  // Calculate pagination
  const totalPages = pagination
    ? Math.ceil(pagination.totalItems / pagination.pageSize)
    : 0;
  const startIndex = pagination
    ? (pagination.currentPage - 1) * pagination.pageSize + 1
    : 1;
  const endIndex = pagination
    ? Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)
    : data.length;

  // Render sort icon
  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;

    if (sortColumn === column.key) {
      if (sortDirection === 'asc') {
        return <ChevronUp className="w-4 h-4 text-teal-400" />;
      }
      if (sortDirection === 'desc') {
        return <ChevronDown className="w-4 h-4 text-teal-400" />;
      }
    }

    return <ChevronsUpDown className="w-4 h-4 text-slate-500" />;
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Toolbar */}
      {(searchable || filters || onRefresh || onExport) && (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            {searchable && (
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
                />
              </div>
            )}

            {/* Filters and actions */}
            <div className="flex flex-wrap items-center gap-3">
              {filters}

              {onRefresh && (
                <button
                  onClick={onRefresh}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  <RefreshCw className={cn('w-4 h-4', isLoading && 'animate-spin')} />
                  Refresh
                </button>
              )}

              {onExport && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onExport}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                {selectable && (
                  <th className="px-6 py-4 text-left w-12">
                    <input
                      type="checkbox"
                      checked={selectedKeys.length === data.length && data.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-teal-500 focus:ring-teal-500/50"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      'px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider',
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right',
                      column.align !== 'center' && column.align !== 'right' && 'text-left',
                      column.sortable && 'cursor-pointer select-none hover:text-slate-300'
                    )}
                    style={{ width: column.width }}
                    onClick={() => handleSort(column)}
                  >
                    <div
                      className={cn(
                        'flex items-center gap-2',
                        column.align === 'center' && 'justify-center',
                        column.align === 'right' && 'justify-end'
                      )}
                    >
                      {column.header}
                      {renderSortIcon(column)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="px-6 py-12 text-center"
                  >
                    <p className="text-slate-400">{emptyMessage}</p>
                  </td>
                </tr>
              ) : (
                data.map((item, index) => {
                  const key = keyExtractor(item);
                  const isSelected = selectedKeys.includes(key);

                  return (
                    <tr
                      key={key}
                      className={cn(
                        'hover:bg-slate-800/50 transition-colors',
                        isSelected && 'bg-teal-500/5'
                      )}
                    >
                      {selectable && (
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelect(key)}
                            className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-teal-500 focus:ring-teal-500/50"
                          />
                        </td>
                      )}
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className={cn(
                            'px-6 py-4',
                            column.align === 'center' && 'text-center',
                            column.align === 'right' && 'text-right'
                          )}
                        >
                          {column.render
                            ? column.render(item, index)
                            : String((item as Record<string, unknown>)[column.key] ?? '')}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-800">
            <p className="text-sm text-slate-400">
              Showing{' '}
              <span className="font-medium text-white">{startIndex}</span>
              {' - '}
              <span className="font-medium text-white">{endIndex}</span>
              {' of '}
              <span className="font-medium text-white">{pagination.totalItems}</span>
              {' items'}
            </p>

            <div className="flex items-center gap-2">
              {/* Page size selector */}
              {pagination.onPageSizeChange && (
                <div className="flex items-center gap-2 mr-4">
                  <span className="text-sm text-slate-400">Show:</span>
                  <select
                    value={pagination.pageSize}
                    onChange={(e) => pagination.onPageSizeChange?.(Number(e.target.value))}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              )}

              {/* Page navigation */}
              <button
                onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.currentPage <= 3) {
                  pageNum = i + 1;
                } else if (pagination.currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = pagination.currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => pagination.onPageChange(pageNum)}
                    className={cn(
                      'px-3 py-1.5 text-sm rounded-lg transition-colors',
                      pagination.currentPage === pageNum
                        ? 'bg-teal-500/10 text-teal-400'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    )}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === totalPages}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bulk actions bar */}
      {selectable && selectedKeys.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-8 bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-4 flex items-center gap-4 z-50">
          <span className="text-sm text-slate-300">
            <span className="font-medium text-white">{selectedKeys.length}</span> selected
          </span>
          <div className="h-6 w-px bg-slate-700" />
          <button
            onClick={() => onSelectionChange?.([])}
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

// Filter select component for use with DataTable
export interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}

export function FilterSelect({
  label,
  value,
  onChange,
  options,
  className,
}: FilterSelectProps) {
  return (
    <div className={cn('relative', className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 pr-10 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
      >
        <option value="all">{label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
    </div>
  );
}
