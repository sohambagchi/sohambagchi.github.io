import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Tag } from '../display/Tag.jsx';

export function IndexRow({ index, title, subtitle, year, tags = [], href, onClick, active, dim, className = '', ...rest }) {
  const El = href ? 'a' : 'div';
  const cls = ['ln-index', active && 'ln-index--active', dim && 'ln-index--dim', className].filter(Boolean).join(' ');
  return (
    <El className={cls} href={href} onClick={onClick} role={!href && onClick ? 'button' : undefined} tabIndex={!href && onClick ? 0 : undefined} {...rest}>
      <span className="ln-index__n">{index}</span>
      <span className="ln-index__main">
        <span className="ln-index__title">{title}</span>
        {subtitle && <span className="ln-index__sub">{subtitle}</span>}
      </span>
      <span className="ln-index__aside">
        {tags.length > 0 && <span className="ln-index__tags">{tags.map(t => <Tag key={t}>{t}</Tag>)}</span>}
        {year && <span className="ln-index__year">{year}</span>}
      </span>
      <span className="ln-index__arrow"><Icon name="arrow-right" size={20} /></span>
    </El>
  );
}
