import React from 'react';
import { IconButton } from '../core/IconButton.jsx';

export function Dialog({ open, onClose, eyebrow, title, actions, width = 520, children }) {
  React.useEffect(() => {
    if (!open) return;
    const k = e => { if (e.key === 'Escape' && onClose) onClose(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="ln-dialog" onMouseDown={e => { if (e.target === e.currentTarget && onClose) onClose(); }}>
      <div className="ln-dialog__panel" role="dialog" aria-modal="true" style={{ maxWidth: width }}>
        {onClose && <IconButton className="ln-dialog__close" icon="x" label="Close" size="sm" onClick={onClose} />}
        {eyebrow && <span className="ln-eyebrow">{eyebrow}</span>}
        {title && <h2 className="ln-dialog__title">{title}</h2>}
        {children && <div className="ln-dialog__body">{children}</div>}
        {actions && <div className="ln-dialog__actions">{actions}</div>}
      </div>
    </div>
  );
}
