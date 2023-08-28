// @ts-ignore
import sov from 'sovrin-did'

export const generateBondDid = () => {
  const { did } = sov.gen()
  return 'did:ixo:' + did
}
