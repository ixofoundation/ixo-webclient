export const requireCheckDefault = (mod: any) => {
  // console.log({ mod })
  return typeof mod === 'object' ? mod.default : mod
}
