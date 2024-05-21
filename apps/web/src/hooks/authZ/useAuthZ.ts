import { cosmos } from '@ixo/impactxclient-sdk'

export const useAuthZ = () => {
  const wrapInAuthZ = ({ address, msgs }: { address: string; msgs: any[] }) => {
    return [{
      typeUrl: '/cosmos.authz.v1beta1.MsgExec',
      value: cosmos.authz.v1beta1.MsgExec.fromPartial({
        grantee: address,
        msgs: msgs,
      }),
    }]
  }
  return { wrapInAuthZ }
}
