import { LinkedEntity } from "@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types"
import { TSigner, fee } from "./common"
import { ixo } from "@ixo/impactxclient-sdk"

export const AddLinkedEntityMessage = (
    signer: TSigner,
    payload: {
      did: string
      linkedEntity: LinkedEntity
    },
  ) => {
    const { did, linkedEntity } = payload

    const message = {
      typeUrl: '/ixo.iid.v1beta1.MsgAddLinkedEntity',
      value: ixo.iid.v1beta1.MsgAddLinkedEntity.fromPartial({
        id: did,
        linkedEntity: ixo.iid.v1beta1.LinkedEntity.fromPartial(linkedEntity),
        signer: signer.address,
      }),
    }
    return { messages: [message], fee: fee}
  }