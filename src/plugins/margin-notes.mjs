// GFM footnotes → Sobar margin notes.
//
// remark-gfm renders references as <sup><a data-footnote-ref href="#user-content-fn-x">1</a></sup>
// and the notes as <section data-footnotes><ol><li id="user-content-fn-x">…</li></ol></section>.
// This turns the references into NoteRef markup and the section into a stack of Note asides that
// the post layout parks in a 240px right rail (and stacks after the article on narrow screens).

const el = (tagName, properties, children = []) => ({ type: 'element', tagName, properties, children });

function walk(node, parent, fn, preorder = false) {
  if (preorder) fn(node, parent);
  if (node.children) for (const child of [...node.children]) walk(child, node, fn, preorder);
  if (!preorder) fn(node, parent);
}

const has = (node, prop) => node.type === 'element' && node.properties && node.properties[prop] != null;

export function marginNotes() {
  return (tree) => {
    // 1. Lift the footnote section out of the flow and number the notes by list order,
    //    which remark-gfm already sets to order of first reference.
    let section = null;
    walk(tree, null, (node, parent) => {
      if (!section && has(node, 'dataFootnotes') && parent) {
        section = node;
        parent.children.splice(parent.children.indexOf(node), 1);
      }
    });
    if (!section) return;

    const list = [];
    walk(section, null, (node) => {
      if (node.type === 'element' && node.tagName === 'ol') list.push(...node.children.filter((c) => c.tagName === 'li'));
    });

    const numbers = new Map();
    const notes = list.map((li, i) => {
      const n = i + 1;
      numbers.set(String(li.properties?.id ?? ''), n);
      // Drop remark's "back to content" anchor; the NoteRef is the only link.
      const body = [];
      walk(li, null, (node) => {
        if (node.children) node.children = node.children.filter((c) => !has(c, 'dataFootnoteBackref'));
      });
      body.push(...li.children);
      return el('aside', { id: 'note-' + n, className: ['ln-note'], 'data-note': String(n) }, [
        el('span', { className: ['ln-note__n'] }, [{ type: 'text', value: String(n) }]),
        el('div', {}, body),
      ]);
    });

    // 2. Replace every reference (and the <sup> around it) with a NoteRef.
    walk(tree, null, (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        const ref =
          has(child, 'dataFootnoteRef') ? child
          : child.tagName === 'sup' && child.children?.length === 1 && has(child.children[0], 'dataFootnoteRef') ? child.children[0]
          : null;
        if (!ref) return child;
        const n = numbers.get(String(ref.properties.href ?? '').replace(/^#/, '')) ?? ref.children[0]?.value ?? '';
        return el(
          'a',
          { className: ['ln-noteref'], href: '#note-' + n, 'aria-label': 'Note ' + n, 'data-note-ref': String(n) },
          [{ type: 'text', value: String(n) }],
        );
      });
    }, true);

    tree.children.push(el('div', { className: ['notes'] }, notes));
  };
}
