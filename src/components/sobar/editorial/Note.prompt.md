Footnote / marginal note pair — `NoteRef` is the inline cinnabar marker, `Note` the annotation; share hover state so a reference visibly lights up its note.

```jsx
const [hot, setHot] = useState(null);
<p>Every map is an argument<NoteRef n={1} active={hot===1} onMouseEnter={()=>setHot(1)} onMouseLeave={()=>setHot(null)} />.</p>
<Note n={1} active={hot===1}>Denis Wood said it better, and earlier.</Note>
```

- Place Notes in a right margin column on wide screens, under the paragraph on narrow ones.
