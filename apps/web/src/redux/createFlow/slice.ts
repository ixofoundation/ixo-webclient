import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IData, InitialEntityFlowState, initialEntityFlowState } from './initialState'
import {
  AccordedRight,
  LinkedClaim,
  LinkedEntity,
  LinkedResource,
  Service,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'
import { Context } from '@apollo/client'

const createFlowSlice = createSlice({
  name: 'createFlow',
  initialState: initialEntityFlowState,
  reducers: {
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload
    },
    setEntityStatus: (state, action: PayloadAction<number>) => {
      state.entityStatus = action.payload
    },
    addLinkedResource: (state, action: PayloadAction<LinkedResource & IData>) => {
      state.linkedResource.push(action.payload)
    },
    addAccordedRight: (state, action: PayloadAction<AccordedRight>) => {
      state.accordedRight.push(action.payload)
    },
    addLinkedClaim: (state, action: PayloadAction<LinkedClaim>) => {
      state.linkedClaim.push(action.payload)
    },
    addLinkedEntity: (state, action: PayloadAction<LinkedEntity>) => {
      state.linkedEntity.push(action.payload)
    },
    addService: (state, action: PayloadAction<Service>) => {
      state.service.push(action.payload)
    },
    setRelayerNode: (state, action: PayloadAction<string>) => {
      state.relayerNode = action.payload
    },
    setOwnerAddress: (state, action: PayloadAction<string>) => {
      state.ownerAddress = action.payload
    },
    setOwnerDid: (state, action: PayloadAction<string>) => {
      state.ownerDid = action.payload
    },
    addController: (state, action: PayloadAction<string>) => {
      state.controller.push(action.payload)
    },
    addVerification: (state, action: PayloadAction<Verification>) => {
      state.verification.push(action.payload)
    },
    addContext: (state, action: PayloadAction<Context>) => {
      state.context.push(action.payload)
    },
    updateLinkedResource: (state, action: PayloadAction<LinkedResource & IData>) => {
      const { id, ...updatedFields } = action.payload
      if (id) {
        const index = state.linkedResource.findIndex((resource) => resource.id === id)
        if (index !== -1) {
          state.linkedResource[index] = {
            ...state.linkedResource[index],
            ...updatedFields,
          }
        }
      }
    },
    cloneProtocol: (state, action: PayloadAction<InitialEntityFlowState>) => {
      Object.assign(state, action.payload)
    },
  },
})

export const {
  setType,
  setStartDate,
  setEndDate,
  setEntityStatus,
  addLinkedResource,
  addAccordedRight,
  addLinkedClaim,
  addLinkedEntity,
  addService,
  setRelayerNode,
  setOwnerAddress,
  setOwnerDid,
  addController,
  addVerification,
  addContext,
  updateLinkedResource,
  cloneProtocol,
} = createFlowSlice.actions
export default createFlowSlice.reducer
