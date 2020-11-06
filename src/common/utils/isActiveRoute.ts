export const isActiveRoute = (
  match: any,
  location: any,
  paths: string[],
): boolean => {
  return paths.reduce((active: boolean, path: string) => {
    return active || match !== undefined || location.pathname.indexOf(path) !== -1
  }, false)
}
