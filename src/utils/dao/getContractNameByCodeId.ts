import { customQueries } from '@ixo/impactxclient-sdk'
import { chainNetwork } from 'hooks/configs'

export const getContractNameByCodeId = (codeId: number): string => {
  return customQueries.contract.getContractCodes(chainNetwork).find(({ code }) => code === codeId)?.name ?? ''
}
