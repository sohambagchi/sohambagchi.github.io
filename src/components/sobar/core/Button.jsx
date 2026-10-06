import React from 'react';
import { Icon } from './Icon.jsx';

export function Button({ variant = 'primary', size = 'md', icon, iconRight, arrow = false, href, disabled, full, type = 'button', className = '', children, ...rest }) {
  const cls = ['ln-btn', 'ln-btn--' + variant, size !== 'md' && 'ln-btn--' + size, full && 'ln-btn--full', className].filter(Boolean).join(' ');
  const is = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;
  const inner = (
    <>
      {icon && <Icon name={icon} size={is} />}
      {children != null && <span>{children}</span>}
      {iconRight && <Icon name={iconRight} size={is} />}
      {arrow && <span className="ln-btn__arrow"><Icon name="arrow-right" size={is} /></span>}
    </>
  );
  if (href) return <a className={cls} href={disabled ? undefined : href} aria-disabled={disabled || undefined} {...rest}>{inner}</a>;
  return <button type={type} className={cls} disabled={disabled} {...rest}>{inner}</button>;
}
