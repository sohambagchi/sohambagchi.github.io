import React from 'react';
import { Icon } from './Icon.jsx';

export function Link({ href, external, quiet, strong, className = '', children, ...rest }) {
  const cls = ['ln-link', quiet && 'ln-link--quiet', strong && 'ln-link--strong', className].filter(Boolean).join(' ');
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a className={cls} href={href} {...ext} {...rest}>
      {children}
      {external && <span className="ln-link__ext"><Icon name="arrow-up-right" size="0.9em" /></span>}
    </a>
  );
}
