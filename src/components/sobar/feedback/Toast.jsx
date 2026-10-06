import React from 'react';
import { IconButton } from '../core/IconButton.jsx';

export function Toast({ tone = 'neutral', title, action, onAction, onClose, className = '', children }) {
  return (
    <div className={'ln-toast' + (tone !== 'neutral' ? ' ln-toast--' + tone : '') + ' ' + className} role="status">
      <span className="ln-toast__mark" />
      <div className="ln-toast__text">
        {title && <span className="ln-toast__title">{title}</span>}
        {children && <span className="ln-toast__msg">{children}</span>}
      </div>
      {action && <button type="button" className="ln-toast__action" onClick={onAction}>{action}</button>}
      {onClose && <IconButton icon="x" label="Dismiss" size="sm" onClick={onClose} />}
    </div>
  );
}
