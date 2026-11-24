'use client';

import { useEffect, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  maxWidthClassName?: string;
  backdropClassName?: string;
  panelClassName?: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  ariaLabel,
  ariaLabelledBy,
  maxWidthClassName = 'max-w-2xl',
  backdropClassName,
  panelClassName,
  children,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm',
        backdropClassName
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-2xl border border-zinc-800 bg-[#121215]',
          maxWidthClassName,
          panelClassName
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
