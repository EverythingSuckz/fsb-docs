/**
 * Format a star count for display (e.g. 1500 → "1.5k+").
 */
export function formatStars(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k+";
  }
  return count.toString();
}
