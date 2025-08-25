import React from 'react';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SMEBadgeProps extends BadgeProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'price';
  size?: 'sm' | 'md' | 'lg';
}

export const SMEBadge = React.forwardRef<HTMLDivElement, SMEBadgeProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-sme-primary text-white border-sme-primary',
      secondary: 'bg-sme-secondary text-white border-sme-secondary',
      accent: 'bg-sme-accent text-sme-neutral-900 border-sme-accent',
      success: 'bg-green-100 text-green-800 border-green-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      info: 'bg-blue-100 text-blue-800 border-blue-200',
      price: 'bg-sme-accent/20 text-sme-neutral-900 border-sme-accent/30 font-bold',
    };

    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-2 text-base',
    };

    return (
      <Badge
        ref={ref}
        className={cn(
          'font-medium border',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </Badge>
    );
  }
);

SMEBadge.displayName = 'SMEBadge';
