Renders a Lucide line icon that inherits `currentColor`; use it anywhere a glyph is needed — never hand-draw SVGs.

```jsx
<Icon name="arrow-up-right" size={16} />
<Icon name="map-pin" label="Location" />
```

- Icons load from the Lucide static CDN (pinned) and are inlined as SVG, so stroke follows `currentColor`. Default stroke 1.75.
- Plain HTML (no React): `<span class="ln-icon-mask" style="--icon:url(https://unpkg.com/lucide-static@0.460.0/icons/map-pin.svg)"></span>`, or copy from `assets/icons/`.
- Default 18px; use 14 inside small controls, 16 in buttons, 20–24 standalone.
