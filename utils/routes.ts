export function isHomeHeroRoute(pathname: string) {
  return pathname === "/" || pathname.startsWith("/i/");
}
