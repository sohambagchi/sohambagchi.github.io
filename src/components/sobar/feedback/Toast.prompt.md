Ink notification that rises in; use for brief confirmations ("Copied", "Message sent"). Position it yourself (e.g. fixed bottom-left).

```jsx
<Toast tone="success" title="Message sent" onClose={hide}>I'll write back soon.</Toast>
<Toast title="Link copied" action="Undo" onAction={undo} />
```
