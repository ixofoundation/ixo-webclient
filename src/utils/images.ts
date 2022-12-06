export const requireCheckDefault = (mod: any) => {
  return typeof mod === 'object' ? mod.default : mod
}
