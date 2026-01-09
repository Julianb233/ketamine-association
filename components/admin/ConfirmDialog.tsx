'use client';

import * as React from 'react';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'info' | 'warning' | 'danger' | 'success';
  isLoading?: boolean;
}

const variantConfig = {
  info: {
    icon: Info,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    buttonVariant: 'primary' as const,
  },
  warning: {
    icon: AlertTriangle,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    buttonVariant: 'amber' as const,
  },
  danger: {
    icon: XCircle,
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-400',
    buttonVariant: 'danger' as const,
  },
  success: {
    icon: CheckCircle,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    buttonVariant: 'emerald' as const,
  },
};

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'info',
  isLoading = false,
}: ConfirmDialogProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  const handleConfirm = () => {
    onConfirm();
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      size="sm"
      className="bg-slate-900 border border-slate-800"
    >
      <div className="flex flex-col items-center text-center p-2">
        <div
          className={cn(
            'w-14 h-14 rounded-full flex items-center justify-center mb-4',
            config.iconBg
          )}
        >
          <Icon className={cn('w-7 h-7', config.iconColor)} />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        {description && (
          <p className="text-slate-400 text-sm">{description}</p>
        )}
      </div>
      <ModalFooter className="border-slate-800 justify-center gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
          className="border-slate-700 text-slate-300 hover:bg-slate-800 min-w-[100px]"
        >
          {cancelLabel}
        </Button>
        <Button
          variant={config.buttonVariant}
          onClick={handleConfirm}
          isLoading={isLoading}
          className="min-w-[100px]"
        >
          {confirmLabel}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

// Quick delete confirmation dialog
export interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  isLoading?: boolean;
}

export function DeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  isLoading = false,
}: DeleteDialogProps) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={`Delete ${itemName || 'item'}?`}
      description="This action cannot be undone. Are you sure you want to proceed?"
      confirmLabel="Delete"
      cancelLabel="Cancel"
      variant="danger"
      isLoading={isLoading}
    />
  );
}

// Suspend user confirmation dialog
export interface SuspendDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
  isLoading?: boolean;
}

export function SuspendDialog({
  isOpen,
  onClose,
  onConfirm,
  userName,
  isLoading = false,
}: SuspendDialogProps) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={`Suspend ${userName || 'user'}?`}
      description="This will prevent the user from accessing their account until reactivated."
      confirmLabel="Suspend"
      cancelLabel="Cancel"
      variant="warning"
      isLoading={isLoading}
    />
  );
}
