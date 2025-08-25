import React from 'react';
import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface SMEInputProps extends InputProps {
  label?: string;
  error?: string;
  helper?: string;
}

export const SMEInput = React.forwardRef<HTMLInputElement, SMEInputProps>(
  ({ className, label, error, helper, id, ...props }, ref) => {
    const inputId = id || `sme-input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={inputId} className="text-sme-neutral-700 font-medium">
            {label}
          </Label>
        )}
        <Input
          ref={ref}
          id={inputId}
          className={cn(
            'border-sme-neutral-200 focus:border-sme-primary focus:ring-sme-primary/20',
            'hover:border-sme-neutral-300 transition-colors duration-200',
            'placeholder:text-sme-neutral-400',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 font-medium">{error}</p>
        )}
        {helper && !error && (
          <p className="text-sm text-sme-neutral-500">{helper}</p>
        )}
      </div>
    );
  }
);

SMEInput.displayName = 'SMEInput';

// Search Input Component
interface SMESearchInputProps extends InputProps {
  onSearch?: (value: string) => void;
}

export const SMESearchInput = React.forwardRef<HTMLInputElement, SMESearchInputProps>(
  ({ className, onSearch, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(e.currentTarget.value);
      }
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          className={cn(
            'pl-10 border-sme-neutral-200 focus:border-sme-primary focus:ring-sme-primary/20',
            'hover:border-sme-neutral-300 transition-colors duration-200',
            'placeholder:text-sme-neutral-400',
            className
          )}
          placeholder="Search products..."
          onKeyDown={handleKeyDown}
          {...props}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-sme-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    );
  }
);

SMESearchInput.displayName = 'SMESearchInput';
