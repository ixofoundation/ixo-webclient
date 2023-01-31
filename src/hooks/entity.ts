import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { Bond } from '@ixo/impactxclient-sdk/types/codegen/ixo/bonds/v1beta1/bonds'
import {
  updateEntityAddressAction,
  updateEntityBondDetailAction,
  updateEntityTypeAction,
} from 'redux/selectedEntity/selectedEntity.actions'

import {
  selectEntityAddress,
  selectEntityBondDetail,
  selectEntityBondDid,
  selectEntityDid,
  selectEntityGoal,
  selectEntityStatus,
  selectEntityType,
} from 'redux/selectedEntity/selectedEntity.selectors'

export function useSelectedEntity(): {
  did: string
  address: string
  bondDid: string
  bondDetail: Bond | undefined
  status: string
  goal: string
  type: string
  updateEntityAddress: (address: string) => void
  updateEntityBondDetail: (bond: Bond) => void
  updateEntityType: (type: string) => void
} {
  const dispatch = useAppDispatch()
  const did: string = useAppSelector(selectEntityDid)
  const address: string = useAppSelector(selectEntityAddress)
  const bondDid: string = useAppSelector(selectEntityBondDid)
  const bondDetail: Bond | undefined = useAppSelector(selectEntityBondDetail)
  const status: string = useAppSelector(selectEntityStatus)
  const goal: string = useAppSelector(selectEntityGoal)
  const type: string = useAppSelector(selectEntityType)

  const updateEntityAddress = (address: string): void => {
    dispatch(updateEntityAddressAction(address))
  }
  const updateEntityBondDetail = (bond: Bond): void => {
    dispatch(updateEntityBondDetailAction(bond))
  }
  const updateEntityType = (type: string): void => {
    dispatch(updateEntityTypeAction(type))
  }

  return {
    did,
    address,
    bondDid,
    bondDetail,
    status,
    goal,
    type,
    updateEntityAddress,
    updateEntityBondDetail,
    updateEntityType,
  }
}
