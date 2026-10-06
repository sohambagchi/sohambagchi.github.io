export interface BadgeProps {
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'info' | 'solid' | 'outline';
  /** Leading status dot. */
  dot?: boolean;
  /** Dot that breathes — for "now" / live states. */
  pulse?: boolean;
  className?: string;
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): JSX.Element;
