/**
 * Remark plugin that converts ```mermaid code blocks into raw HTML
 * <div class="mermaid"> blocks, bypassing Starlight's expressive-code
 * processing so Mermaid.js can render them client-side.
 */
export function remarkMermaid() {
  return (tree) => {
    visit(tree);
  };

  function visit(node) {
    if (!node.children) return;
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (child.type === 'code' && child.lang === 'mermaid') {
        const escaped = child.value
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        node.children[i] = {
          type: 'html',
          value: `<div class="mermaid">\n${escaped}\n</div>`,
        };
      } else {
        visit(child);
      }
    }
  }
}
