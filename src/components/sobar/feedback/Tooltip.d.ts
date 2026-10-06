export interface TooltipProps {
  content: React.ReactNode;
  placement?: 'top' | 'bottom';
  /** Force visible (for demos). Otherwise shows on hover/focus. */
  open?: boolean;
  className?: string;
  children: React.ReactNode;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
