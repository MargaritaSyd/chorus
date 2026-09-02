export function postEngagement(likes: number, comments: number, shares: number, impressions: number): number {
  if (impressions === 0) {
    return 0;
  }
  return (likes + comments + shares) / impressions;
}
