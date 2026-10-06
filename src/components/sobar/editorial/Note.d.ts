export interface NoteProps {
  /** Note number; matches a NoteRef. */
  n: number | string;
  /** Highlighted — set while its NoteRef is hovered. */
  active?: boolean;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  className?: string;
  children?: React.ReactNode;
}
export interface NoteRefProps {
  n: number | string;
  active?: boolean;
  /** Defaults to #note-{n}. */
  href?: string;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  className?: string;
}
export declare function Note(props: NoteProps): JSX.Element;
export declare function NoteRef(props: NoteRefProps): JSX.Element;
