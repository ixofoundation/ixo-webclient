import { cosmos } from '@ixo/impactxclient-sdk'

type MsgExecAuthZProps = {
  grantee: string
  msgs: any[]
}

export const MsgExecAuthZ = ({ grantee, msgs }: MsgExecAuthZProps) => {
  return {
    typeUrl: '/cosmos.authz.v1beta1.MsgExec',
    value: cosmos.authz.v1beta1.MsgExec.fromPartial({
      grantee,
      msgs,
    }),
  }
}
