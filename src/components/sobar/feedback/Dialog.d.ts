export interface DialogProps {
  open: boolean;
  /** Called on ✕, Escape, or backdrop click. */
  onClose?: () => void;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  /** Buttons, right-aligned under a hairline. */
  actions?: React.ReactNode;
  /** Max width in px. Default 520. */
  width?: number;
  children?: React.ReactNode;
}
export declare function Dialog(props: DialogProps): JSX.Element | null;
