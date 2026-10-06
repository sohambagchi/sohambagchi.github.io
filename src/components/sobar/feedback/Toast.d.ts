export interface ToastProps {
  /** Colors the leading mark only; the toast itself is always ink. */
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'info';
  title?: React.ReactNode;
  action?: string;
  onAction?: () => void;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}
export declare function Toast(props: ToastProps): JSX.Element;
