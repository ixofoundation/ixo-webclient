import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initialEntitiesState } from './initialState'
import {
  AccordedRight,
  LinkedClaim,
  LinkedEntity,
  LinkedResource,
  Service,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'
import { Context } from '@apollo/client'

export interface IData {
  data: any
}

export interface EntityInterface {
  id: string
  type: string
  accordedRight: AccordedRight[]
  linkedResource: (LinkedResource & IData)[]
  linkedClaim: LinkedClaim[]
  linkedEntity: LinkedEntity[]
  service: Service[]
  relayerNode: string
  controller: string[]
  verification: Verification[]
  context: Context[]
  startDate: string
  endDate: string
  entityStatus: number
  owner: string
  alsoKnownAs: string
  status: number
  entityVerified: boolean
  settings: Record<'Profile' | 'Page' | 'Tags', LinkedResource & IData>
}

const entitiesStateSlice = createSlice({
  name: 'entitiesState',
  initialState: initialEntitiesState,
  reducers: {
    setEntitiesStore: (state, action: PayloadAction<EntityInterface[]>) => {
      state.entitiesStore = action.payload
    },
    clearEntitiesStore: (state) => {
      state.entitiesStore = []
    },
    setEntitiesState: (state, action: PayloadAction<EntityInterface[]>) => {
      state.entities = action.payload
    },
    addEntity: (state, action: PayloadAction<EntityInterface>) => {
      state.entities.push(action.payload)
    },
    addEntities: (state, action: PayloadAction<EntityInterface[]>) => {
      state.entities.push(...action.payload)
    },
    removeEntity: (state, action: PayloadAction<string>) => {
      state.entities = state.entities.filter((entity) => entity.id !== action.payload)
    },
    setEntitiesLoading: (state, action: PayloadAction<boolean>) => {
      state.entitiesLoading = action.payload
    },
  },
})

export const {
  setEntitiesStore,
  clearEntitiesStore,
  setEntitiesState,
  addEntity,
  addEntities,
  removeEntity,
  setEntitiesLoading,
} = entitiesStateSlice.actions
export default entitiesStateSlice.reducer
