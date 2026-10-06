export interface IconProps {
  /** Lucide icon name, kebab-case (e.g. "arrow-up-right", "map-pin"). See lucide.dev/icons. */
  name: string;
  /** Pixel size (square). Default 18. */
  size?: number;
  /** Stroke width. Default 1.75 (a touch finer than Lucide's 2). */
  strokeWidth?: number;
  /** Accessible label. Omit for decorative icons. */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
