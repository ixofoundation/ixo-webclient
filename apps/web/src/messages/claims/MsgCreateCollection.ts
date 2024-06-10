import { cosmos, ixo, utils } from '@ixo/impactxclient-sdk'
import { Payments } from '@ixo/impactxclient-sdk/types/codegen/ixo/claims/v1beta1/claims'
import Long from 'long'

export type MsgCreateCollectionProps = {
  signer: string
  entity: string
  protocol: string
  startDate: string
  endDate: string
  quota: string
  payments: Payments | undefined
}

export type MsgCreateCollectionWithAuthZProps = MsgCreateCollectionProps & {
  grantee: string
}
export const MsgCreateCollection = ({
  signer,
  entity,
  protocol,
  startDate,
  endDate,
  quota,
  payments,
}: MsgCreateCollectionProps) => {
  return {
    typeUrl: '/ixo.claims.v1beta1.MsgCreateCollection',
    value: ixo.claims.v1beta1.MsgCreateCollection.fromPartial({
      signer,
      entity,
      protocol,
      startDate: utils.proto.toTimestamp(new Date(startDate)),
      endDate: endDate ? utils.proto.toTimestamp(new Date(endDate)) : undefined,
      quota: Long.fromNumber(Number(quota)),
      state: ixo.claims.v1beta1.CollectionState.OPEN,
      payments,
    }),
  }
}

export const MsgCreateCollectionWithAuthZ = ({
  signer,
  entity,
  protocol,
  startDate,
  endDate,
  quota,
  payments,
  grantee,
}: MsgCreateCollectionWithAuthZProps) => {
  console.log({ signer, entity, protocol, startDate, endDate, quota, payments, grantee })
  return {
    typeUrl: '/cosmos.authz.v1beta1.MsgExec',
    value: cosmos.authz.v1beta1.MsgExec.fromPartial({
      grantee,
      msgs: [
        {
          typeUrl: '/ixo.claims.v1beta1.MsgCreateCollection',
          value: ixo.claims.v1beta1.MsgCreateCollection.encode(
            ixo.claims.v1beta1.MsgCreateCollection.fromPartial({
              signer,
              entity,
              protocol,
              startDate: utils.proto.toTimestamp(new Date(startDate)),
              endDate: endDate ? utils.proto.toTimestamp(new Date(endDate)) : undefined,
              quota: Long.fromNumber(Number(quota)),
              state: ixo.claims.v1beta1.CollectionState.OPEN,
              payments,
            }),
          ).finish(),
        },
      ],
    }),
  }
}
