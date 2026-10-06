import React from 'react';

export function Badge({ tone = 'neutral', dot, pulse, className = '', children, ...rest }) {
  const cls = ['ln-badge', tone !== 'neutral' && 'ln-badge--' + tone, className].filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      {(dot || pulse) && <span className={'ln-badge__dot' + (pulse ? ' ln-badge__dot--pulse' : '')} />}
      {children}
    </span>
  );
}
