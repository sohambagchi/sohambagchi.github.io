/**
 * Paper card with hairline border. Interactive cards lift 3px and draw a cinnabar thread across the top.
 */
export interface CardProps {
  variant?: 'surface' | 'outline' | 'inverse' | 'accent';
  /** Hover lift + thread. Implied by href/onClick. */
  interactive?: boolean;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  /** Mono uppercase label, top-left. */
  eyebrow?: React.ReactNode;
  /** Mono index, top-right (e.g. "№ 03"). */
  index?: React.ReactNode;
  title?: React.ReactNode;
  /** Mono metadata line (dates, roles). */
  meta?: React.ReactNode;
  /** Full-bleed media at top (img or placeholder). */
  media?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  /** Body copy, set in the serif. */
  children?: React.ReactNode;
}
export declare function Card(props: CardProps): JSX.Element;
