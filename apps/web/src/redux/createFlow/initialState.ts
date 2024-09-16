import { Context } from '@apollo/client'
import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'
import {
  AccordedRight,
  LinkedClaim,
  LinkedEntity,
  LinkedResource,
  Service,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { currentRelayerNode } from 'constants/common'

export interface IData {
  data: any
}

export interface InitialEntityFlowState {
  type: string
  accordedRight: AccordedRight[]
  linkedResource: (LinkedResource & IData)[]
  linkedClaim: LinkedClaim[]
  linkedEntity: LinkedEntity[]
  service: Service[]
  relayerNode: string
  ownerAddress: string
  ownerDid: string
  controller: string[]
  verification: Verification[]
  context: Context[]
  startDate: string
  endDate: string
  entityStatus: number
  daoController: string
}

export const initialEntityFlowState: InitialEntityFlowState = {
  type: '',
  linkedResource: [],
  startDate: '',
  endDate: '',
  entityStatus: 0,
  linkedClaim: [],
  linkedEntity: [],
  accordedRight: [],
  service: [],
  relayerNode: currentRelayerNode ?? '',
  ownerAddress: '',
  ownerDid: '',
  controller: [],
  verification: [],
  context: [],
  daoController: '',
}
