/**
 * Truncate text to a max character length on a word boundary, appending an
 * ellipsis when cut. Used to keep DB-driven titles/descriptions (services,
 * projects) within SEO-safe budgets regardless of what's entered in the
 * admin panel.
 */
export function truncateForSEO(text, maxLen) {
  if (!text || text.length <= maxLen) return text
  const cut = text.slice(0, maxLen - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
}
