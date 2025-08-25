import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardProps } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SMECardProps extends CardProps {
  variant?: 'default' | 'elevated' | 'bordered' | 'product';
  hoverable?: boolean;
}

export const SMECard = React.forwardRef<HTMLDivElement, SMECardProps>(
  ({ className, variant = 'default', hoverable = false, children, ...props }, ref) => {
    const variants = {
      default: 'bg-white border border-sme-neutral-200 shadow-sm',
      elevated: 'bg-white border border-sme-neutral-200 shadow-lg',
      bordered: 'bg-white border-2 border-sme-primary/20',
      product: 'bg-white border border-sme-neutral-200 shadow-sm overflow-hidden',
    };

    const hoverEffects = hoverable
      ? 'hover:shadow-xl hover:shadow-sme-primary/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer'
      : '';

    return (
      <Card
        ref={ref}
        className={cn(
          'rounded-xl',
          variants[variant],
          hoverEffects,
          className
        )}
        {...props}
      >
        {children}
      </Card>
    );
  }
);

SMECard.displayName = 'SMECard';

// Export card components with SME styling
export const SMECardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <CardHeader
      ref={ref}
      className={cn('p-6 pb-4', className)}
      {...props}
    />
  )
);

export const SMECardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <CardContent
      ref={ref}
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  )
);

export const SMECardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <CardFooter
      ref={ref}
      className={cn('p-6 pt-4 gap-3', className)}
      {...props}
    />
  )
);

SMECardHeader.displayName = 'SMECardHeader';
SMECardContent.displayName = 'SMECardContent';
SMECardFooter.displayName = 'SMECardFooter';
