Modal panel that rises over a warm, lightly blurred scrim; use for confirmations and focused tasks (contact form, image detail).

```jsx
<Dialog open={open} onClose={() => setOpen(false)} eyebrow="Contact" title="Write to me"
  actions={<><Button variant="ghost" onClick={close}>Cancel</Button><Button arrow>Send</Button></>}>
  I read everything, slowly.
</Dialog>
```

- Renders `position: fixed`; to preview inline, place inside a parent with `transform` set.
