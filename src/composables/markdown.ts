/**
 * Strips Markdown/MDoc syntax from raw content to produce plain text
 * for card previews. Only intended for short excerpts; the full content
 * should still be rendered through `render()` on detail pages.
 */
export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/<!--[\s\S]*?-->/g, "") // HTML comments
    .replace(/<[^>]+>/g, "") // HTML tags
    .replace(/\{%[\s\S]*?%\}/g, "") // MDoc tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links
    .replace(/`{1,3}([^`]*)`{1,3}/g, "$1") // inline code
    .replace(/^```[\s\S]*?^```/gm, "") // code blocks
    .replace(/\*\*([^*]+)\*\*/g, "$1") // bold
    .replace(/\*([^*]+)\*/g, "$1") // italic
    .replace(/__([^_]+)__/g, "$1") // bold (alt)
    .replace(/_([^_]+)_/g, "$1") // italic (alt)
    .replace(/^#{1,6}\s+/gm, "") // headings
    .replace(/^\s*[-*+]\s+/gm, "") // unordered list markers
    .replace(/^\s*\d+\.\s+/gm, "") // ordered list markers
    .replace(/^\s*>\s?/gm, "") // blockquote markers
    .replace(/^\s*(?:---|\*\*\*|___)\s*$/gm, "") // horizontal rules
    .replace(/\s+/g, " ")
    .trim()
}
