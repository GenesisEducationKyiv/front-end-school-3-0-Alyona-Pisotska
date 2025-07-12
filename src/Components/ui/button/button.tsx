import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/Components/components';
import { cn } from '@/lib/utils/utils';

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  variant = 'default',
  size = 'default',
  disabled = false,
  asChild = false,
  className,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
      {...(asChild ? { 'aria-disabled': disabled } : { disabled })}
    />
  );
}

export { Button };
