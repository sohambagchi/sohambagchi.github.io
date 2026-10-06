import React from 'react';
import { Icon } from './Icon.jsx';

export function IconButton({ icon, label, variant = 'ghost', size = 'md', type = 'button', className = '', ...rest }) {
  const cls = ['ln-iconbtn', variant !== 'ghost' && 'ln-iconbtn--' + variant, size !== 'md' && 'ln-iconbtn--' + size, className].filter(Boolean).join(' ');
  const is = size === 'sm' ? 15 : size === 'lg' ? 22 : 18;
  return (
    <button type={type} className={cls} aria-label={label} title={label} {...rest}>
      <Icon name={icon} size={is} />
    </button>
  );
}
