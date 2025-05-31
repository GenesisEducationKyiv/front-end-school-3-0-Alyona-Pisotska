import { Input } from '@/Components/components.ts';
import { cn } from '@/lib/utils/utils.ts';

import type { LucideIcon } from 'lucide-react';

interface InputWithIconProps extends React.ComponentProps<typeof Input> {
  icon: LucideIcon;
  iconPosition?: 'left' | 'right';
}

const InputWithIcon = ({ icon: Icon, iconPosition = 'left', className, ...props }: InputWithIconProps) => {
  const iconClasses = 'absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground';

  return (
    <div className='relative w-full'>
      {iconPosition === 'left' && <Icon className={cn(iconClasses, 'left-3')} />}
      <Input className={cn(iconPosition === 'left' ? 'pl-9' : 'pr-9', className)} {...props} />
      {iconPosition === 'right' && <Icon className={cn(iconClasses, 'right-3')} />}
    </div>
  );
};

export { InputWithIcon };
