import React from 'react';

export function NoteRef({ n, active, href, className = '', ...rest }) {
  return (
    <a className={'ln-noteref' + (active ? ' ln-noteref--active' : '') + ' ' + className} href={href || '#note-' + n} aria-label={'Note ' + n} {...rest}>{n}</a>
  );
}

export function Note({ n, active, className = '', children, ...rest }) {
  return (
    <aside id={'note-' + n} className={'ln-note' + (active ? ' ln-note--active' : '') + ' ' + className} {...rest}>
      <span className="ln-note__n">{n}</span>
      <div>{children}</div>
    </aside>
  );
}
