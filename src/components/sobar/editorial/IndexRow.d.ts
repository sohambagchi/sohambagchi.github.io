/**
 * One line of a work index: number, big title, italic subtitle, tags, year, arrow.
 * On hover the title drifts right, the arrow straightens, and a cinnabar thread draws under the row.
 */
export interface IndexRowProps {
  /** Mono index, e.g. "01". */
  index?: React.ReactNode;
  title: React.ReactNode;
  /** Serif italic, one line. */
  subtitle?: React.ReactNode;
  year?: React.ReactNode;
  tags?: string[];
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  /** Forced hover state (e.g. linked from elsewhere on the page). */
  active?: boolean;
  /** Fade back — when another row or filter is in focus. */
  dim?: boolean;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  className?: string;
}
export declare function IndexRow(props: IndexRowProps): JSX.Element;
