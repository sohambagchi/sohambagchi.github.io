export interface LinkProps {
  href?: string;
  /** Opens in a new tab and shows a ↗ that lifts on hover. */
  external?: boolean;
  /** No resting underline; it only draws in on hover. */
  quiet?: boolean;
  /** Semibold. */
  strong?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children?: React.ReactNode;
}
export declare function Link(props: LinkProps): JSX.Element;
