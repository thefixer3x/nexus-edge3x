import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SMEButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SMEButton = React.forwardRef<HTMLButtonElement, SMEButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-sme-primary hover:bg-sme-primary-dark text-white shadow-md hover:shadow-lg transition-all duration-200 border-0',
      secondary: 'bg-sme-secondary hover:bg-sme-secondary-light text-white shadow-md hover:shadow-lg transition-all duration-200 border-0',
      accent: 'bg-sme-accent hover:bg-sme-accent/90 text-sme-neutral-900 shadow-md hover:shadow-lg transition-all duration-200 border-0',
      outline: 'border-2 border-sme-primary text-sme-primary hover:bg-sme-primary hover:text-white bg-transparent transition-all duration-200',
      ghost: 'text-sme-primary hover:bg-sme-primary/10 hover:text-sme-primary-dark bg-transparent border-0 transition-all duration-200',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm font-medium',
      md: 'px-6 py-3 text-base font-medium',
      lg: 'px-8 py-4 text-lg font-semibold',
      xl: 'px-10 py-5 text-xl font-semibold',
    };

    return (
      <Button
        ref={ref}
        className={cn(
          'rounded-lg font-inter',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

SMEButton.displayName = 'SMEButton';
