export interface TagProps {
  /** Filled ink — the active filter. */
  selected?: boolean;
  /** Cinnabar outline — marks a tag connected to the item under focus. */
  related?: boolean;
  /** Mono count after the label. */
  count?: number;
  onRemove?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}
export declare function Tag(props: TagProps): JSX.Element;
