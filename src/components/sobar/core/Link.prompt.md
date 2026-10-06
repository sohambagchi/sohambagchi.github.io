Inline text link whose underline draws in from the left on hover (wraps across lines); use in prose, nav, and footers.

```jsx
<p>I grew up near <Link href="#">the old harbour</Link>.</p>
<Link href="https://example.com" external>Elsewhere</Link>
<Link href="#" quiet strong>Work</Link>
```

- Resting state shows a faint hairline; hover draws a solid one and shifts to cinnabar.
- `quiet` for navigation where a resting underline is noise.
