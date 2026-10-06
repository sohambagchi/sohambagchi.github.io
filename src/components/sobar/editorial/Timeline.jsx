import React from 'react';

export function Timeline({ items = [], activeIndex, onHover, className = '' }) {
  return (
    <ol className={'ln-timeline ' + className}>
      {items.map((it, i) => (
        <li
          key={i}
          className={'ln-timeline__item' + (it.current ? ' ln-timeline__item--current' : '') + (activeIndex === i ? ' ln-timeline__item--active' : '')}
          onMouseEnter={onHover ? () => onHover(i) : undefined}
          onMouseLeave={onHover ? () => onHover(null) : undefined}
        >
          <span className="ln-timeline__year">{it.year}</span>
          <span className="ln-timeline__node" />
          <div className="ln-timeline__body">
            <span className="ln-timeline__title">{it.title}</span>
            {it.place && <span className="ln-timeline__place">{it.place}</span>}
            {it.body && <p className="ln-timeline__text">{it.body}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
