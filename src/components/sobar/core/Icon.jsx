import React from 'react';
import { iconSvg } from '../../../lib/icons';

// Build-time inline: the SVG comes from src/icons/ through Vite, so icons render in static HTML.
export function Icon({ name, size = 18, strokeWidth = 1.75, label, className = '', style, ...rest }) {
  return (
    <span
      className={'ln-icon ' + className}
      style={Object.assign({ width: size, height: size }, style)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
      dangerouslySetInnerHTML={{ __html: iconSvg(name, strokeWidth) }}
      {...rest}
    />
  );
}
