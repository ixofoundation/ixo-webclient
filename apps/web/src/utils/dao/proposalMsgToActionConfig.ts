import { CosmosMsgForEmpty } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { ProposalActionConfigMap } from 'constants/entity'
import { decodeProtobufValue, parseEncodedMessage } from 'utils/messages'

export const proposalMsgToActionConfig = (msg: CosmosMsgForEmpty) => {
  try {
    if ('wasm' in msg && 'execute' in msg.wasm && 'msg' in msg.wasm.execute) {
      const encodedMessage = parseEncodedMessage(msg.wasm.execute.msg)

      let key: string = Object.keys(encodedMessage)[0]
      const value: any = Object.values(encodedMessage)[0]

      if (key === 'update_config') {
        if ('config' in value) {
          key += '.config'
        } else if ('deposit_info' in value) {
          key += '.proposal'
        } else if ('threshold' in value) {
          key += '.voting'
        }
      }

      const proposalActionDetail = ProposalActionConfigMap[`wasm.execute.${key}`] ?? {}
      return {
        ...proposalActionDetail,
        data: value,
        type: `wasm.execute.${key}`,
      }
    } else if ('stargate' in msg && 'type_url' in msg.stargate && msg.stargate.type_url) {
      const typeUrl: string = msg.stargate.type_url
      const value = decodeProtobufValue(typeUrl, msg.stargate.value)

      const proposalActionDetail = ProposalActionConfigMap[typeUrl] ?? {}
      return {
        ...proposalActionDetail,
        data: value,
        type: typeUrl,
      }
    } else if ('bank' in msg) {
      const key: string = Object.keys(msg.bank)[0]
      const value: any = Object.values(msg.bank)[0]

      const proposalActionDetail = ProposalActionConfigMap[`bank.${key}`] ?? {}
      return {
        ...proposalActionDetail,
        data: value,
        type: `bank.${key}`,
      }
    }
  } catch (e) {
    console.error('proposalMsgToActionConfig', e)
    return undefined
  }
}
