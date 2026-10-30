/** Repeat a token or group of tokens `n` times. */
export function rep(tokens: string, n: number): string {
  return Array.from({ length: n }, () => tokens).join(' ');
}

/** Join bars with bar lines. */
export function bars(...b: string[]): string {
  return b.join(' | ');
}
