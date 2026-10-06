import React from 'react';

export function Tooltip({ content, placement = 'top', open, className = '', children }) {
  const cls = ['ln-tip', placement === 'bottom' && 'ln-tip--bottom', open && 'ln-tip--open', className].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      {children}
      <span className="ln-tip__bubble" role="tooltip">{content}</span>
    </span>
  );
}
