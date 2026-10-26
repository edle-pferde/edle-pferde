// Turns Markdoc/Markdown source into plain text, cut on a word boundary
export function toExcerpt(source: string | undefined, maxLength = 160): string {
  const text = (source ?? '')
    .replace(/\{%[^%]*%\}/g, ' ')               // Markdoc tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')      // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')    // links -> link text
    .replace(/<[^>]+>/g, ' ')                   // HTML tags
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/^\s*(#+|[-*+]|\d+\.)\s+/gm, '')   // headings, list markers
    .replace(/(\*\*|__|\*|_|`)/g, '')           // emphasis, code
    .replace(/\\$/gm, '')                       // hard line breaks
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.–-]+$/, '') + '…';
}
