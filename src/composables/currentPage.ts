// aria-current value for a nav link: "page" on exact match, "true" when inside its section
export function ariaCurrent(pathname: string, href: string): "page" | "true" | undefined {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === href) return 'page';
  if (href !== '/' && path.startsWith(href + '/')) return 'true';
  return undefined;
}

// Whether the current page belongs to any of the given sections
export function inSection(pathname: string, hrefs: string[]): boolean {
  return hrefs.some((href) => ariaCurrent(pathname, href) !== undefined);
}
