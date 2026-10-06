import React from 'react';

export function Card({ variant = 'surface', interactive, href, onClick, eyebrow, index, title, meta, media, footer, className = '', children, ...rest }) {
  const live = interactive || !!href || !!onClick;
  const cls = ['ln-card', variant !== 'surface' && 'ln-card--' + variant, live && 'ln-card--interactive', className].filter(Boolean).join(' ');
  const Tag = href ? 'a' : 'div';
  return (
    <Tag className={cls} href={href} onClick={onClick} {...rest}>
      {media && <div className="ln-card__media">{media}</div>}
      {(eyebrow || index) && (
        <div className="ln-card__head">
          {eyebrow ? <span className="ln-card__eyebrow">{eyebrow}</span> : <span />}
          {index && <span className="ln-card__index">{index}</span>}
        </div>
      )}
      {title && <div className="ln-card__title">{title}</div>}
      {children && <div className="ln-card__body">{children}</div>}
      {meta && <div className="ln-card__meta">{meta}</div>}
      {footer && <div className="ln-card__footer">{footer}</div>}
    </Tag>
  );
}
