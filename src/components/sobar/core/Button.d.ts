/**
 * Pill-shaped action. On hover, a fill wipes across from the left (fluid, never a flat color swap).
 */
export interface ButtonProps {
  /** primary = ink fill → cinnabar wipe; accent = cinnabar fill → ink wipe; secondary = ink outline; ghost = text only. */
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Leading Lucide icon name. */
  icon?: string;
  /** Trailing Lucide icon name. */
  iconRight?: string;
  /** Adds a trailing → that nudges forward on hover. Use for "go somewhere" actions. */
  arrow?: boolean;
  /** Renders as <a>. */
  href?: string;
  disabled?: boolean;
  /** Full width. */
  full?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
