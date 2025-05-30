import React from 'react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';
import { isValidToasterTheme } from '@/lib/utils/utils.ts';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  const sonnerTheme: ToasterProps['theme'] = isValidToasterTheme(theme) ? theme : 'system';

  return (
    <Sonner
      theme={sonnerTheme}
      className='toaster group'
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
