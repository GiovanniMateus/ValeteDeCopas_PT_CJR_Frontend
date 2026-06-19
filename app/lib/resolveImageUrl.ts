
export function resolveImageUrl(
  url: string | null | undefined,
  fallback = '/placeholder.png'
): string {
  if (!url) return fallback;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
}