Pill for topics, mediums and filters; use `related` to reveal connections between items.

```jsx
<Tag onClick={...} selected count={12}>Type</Tag>
<Tag related>Archives</Tag>
<Tag onRemove={...}>Maps</Tag>
```

- `selected` = active filter (ink fill). `related` = connected to what's hovered (cinnabar outline).
- Without onClick/href it renders as a static span.
