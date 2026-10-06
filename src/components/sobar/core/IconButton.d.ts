export interface IconButtonProps {
  /** Lucide icon name. */
  icon: string;
  /** Required accessible label (also used as title). */
  label: string;
  variant?: 'ghost' | 'outline' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
