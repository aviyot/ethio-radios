export function getFaviconUrl(siteUrl: string): string {
  try {
    const normalizedUrl = siteUrl.startsWith("http")
      ? siteUrl
      : `https://${siteUrl}`;
    const { hostname } = new URL(normalizedUrl);

    // DuckDuckGo favicon endpoint works well for most public domains.
    return `https://icons.duckduckgo.com/ip3/${hostname}.ico`;
  } catch {
    return "";
  }
}

function getOrigin(siteUrl: string): string {
  try {
    const normalizedUrl = siteUrl.startsWith("http")
      ? siteUrl
      : `https://${siteUrl}`;
    return new URL(normalizedUrl).origin;
  } catch {
    return "";
  }
}

export function getStationIconCandidates(
  iconPath: string | undefined,
  siteUrl: string,
): string[] {
  const origin = getOrigin(siteUrl);
  const candidates = new Set<string>();

  if (iconPath) {
    // Explicit absolute URL from user input.
    if (iconPath.startsWith("http://") || iconPath.startsWith("https://")) {
      candidates.add(iconPath);
    } else {
      // Local explicit path in this app.
      candidates.add(iconPath);

      // If explicit path is root-relative, also try the station origin.
      if (iconPath.startsWith("/") && origin) {
        candidates.add(`${origin}${iconPath}`);
      }
    }
  }

  if (origin) {
    candidates.add(`${origin}/favicon.ico`);
    candidates.add(`${origin}/apple-touch-icon.png`);
  }

  const duckDuckGo = getFaviconUrl(siteUrl);
  if (duckDuckGo) {
    candidates.add(duckDuckGo);
  }

  try {
    const normalizedUrl = siteUrl.startsWith("http")
      ? siteUrl
      : `https://${siteUrl}`;
    const { hostname } = new URL(normalizedUrl);
    candidates.add(
      `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`,
    );
  } catch {
    // no-op
  }

  return Array.from(candidates);
}
