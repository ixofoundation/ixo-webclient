import { RootState } from 'redux/store'
import { Dispatch } from 'redux'
import { ProjectStatus } from '../../types/entities'
import {
  ClearEntityAction,
  SelectedEntityActions,
  UpdateEntityBondDetailAction,
  UpdateEntityAddressAction,
  UpdateEntityTypeAction,
  UpdateProjectStatusAction,
} from './selectedEntity.types'
import { Bond } from '@ixo/impactxclient-sdk/types/codegen/ixo/bonds/v1beta1/bonds'

export const clearEntity = (): ClearEntityAction => ({
  type: SelectedEntityActions.ClearEntity,
})

export const updateEntityAddressAction = (address: string): UpdateEntityAddressAction => ({
  type: SelectedEntityActions.UpdateEntityAddress,
  payload: address,
})

export const updateEntityBondDetailAction = (bond: Bond): UpdateEntityBondDetailAction => ({
  type: SelectedEntityActions.UpdateEntityBondDetail,
  payload: bond,
})

export const updateEntityTypeAction = (type: string): UpdateEntityTypeAction => ({
  type: SelectedEntityActions.UpdateEntityType,
  payload: type,
})
