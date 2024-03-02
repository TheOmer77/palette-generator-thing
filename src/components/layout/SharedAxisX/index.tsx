import {
  TransitionSwitch,
  type TransitionSwitchProps,
} from '@theomer77/react-transition-switch';

import { cn } from '@/lib/utils';
import { sharedAxis } from './index.module.css';

export type SharedAxisXProps = Omit<TransitionSwitchProps, 'directional'>;

const SharedAxisX = ({ className, children, ...props }: SharedAxisXProps) => (
  <TransitionSwitch
    {...props}
    directional
    className={cn(sharedAxis, className)}
  >
    {children}
  </TransitionSwitch>
);

export default SharedAxisX;
