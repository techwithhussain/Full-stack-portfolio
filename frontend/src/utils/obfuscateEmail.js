// Built from parts at render time instead of a literal string, so the
// address isn't sitting as one contiguous token in the source/bundle for
// basic scraper bots to regex-match.
const EMAIL_PARTS = ['lonezakir124', 'gmail.com']

export function getEmail() {
  return EMAIL_PARTS.join('@')
}
