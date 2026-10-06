import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Tag({ selected, related, count, onRemove, onClick, href, className = '', children, ...rest }) {
  const live = !!onClick || !!href;
  const cls = ['ln-tag', selected && 'ln-tag--selected', related && !selected && 'ln-tag--related', !live && !onRemove && 'ln-tag--static', className].filter(Boolean).join(' ');
  const El = href ? 'a' : live ? 'button' : 'span';
  return (
    <El className={cls} href={href} onClick={onClick} type={El === 'button' ? 'button' : undefined} aria-pressed={El === 'button' ? !!selected : undefined} {...rest}>
      <span>{children}</span>
      {count != null && <span className="ln-tag__count">{count}</span>}
      {onRemove && (
        <span role="button" tabIndex={0} aria-label="Remove" className="ln-tag__remove" onClick={e => { e.stopPropagation(); onRemove(e); }}>
          <Icon name="x" size={12} />
        </span>
      )}
    </El>
  );
}
