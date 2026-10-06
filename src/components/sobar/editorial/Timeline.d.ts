export interface TimelineItem {
  /** "2019", "2019–22", "Now". */
  year: React.ReactNode;
  title: React.ReactNode;
  /** Mono line: place, role, institution. */
  place?: React.ReactNode;
  /** Serif description. */
  body?: React.ReactNode;
  /** Marks the present — filled cinnabar node with halo. */
  current?: boolean;
}
/**
 * A single thread through time; nodes light up on hover.
 */
export interface TimelineProps {
  items: TimelineItem[];
  /** Externally highlighted item (e.g. linked to a hovered project). */
  activeIndex?: number | null;
  onHover?: (index: number | null) => void;
  className?: string;
}
export declare function Timeline(props: TimelineProps): JSX.Element;
