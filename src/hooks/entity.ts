import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { Bond } from '@ixo/impactxclient-sdk/types/codegen/ixo/bonds/v1beta1/bonds'
import { updateEntityAddressAction, updateEntityBondDetailAction } from 'redux/selectedEntity/selectedEntity.actions'

import {
  selectEntityAddress,
  selectEntityBondDetail,
  selectEntityBondDid,
  selectEntityDid,
  selectEntityStatus,
} from 'redux/selectedEntity/selectedEntity.selectors'

export function useSelectedEntity(): {
  did: string
  address: string
  bondDid: string
  bondDetail: Bond | undefined
  status: string
  updateEntityAddress: (address: string) => void
  updateEntityBondDetail: (bond: Bond) => void
} {
  const dispatch = useAppDispatch()
  const did: string = useAppSelector(selectEntityDid)
  const address: string = useAppSelector(selectEntityAddress)
  const bondDid: string = useAppSelector(selectEntityBondDid)
  const status: string = useAppSelector(selectEntityStatus)

  const bondDetail: Bond | undefined = useAppSelector(selectEntityBondDetail)

  const updateEntityAddress = (address: string): void => {
    dispatch(updateEntityAddressAction(address))
  }

  const updateEntityBondDetail = (bond: Bond): void => {
    dispatch(updateEntityBondDetailAction(bond))
  }

  return {
    did,
    address,
    bondDid,
    bondDetail,
    status,
    updateEntityAddress,
    updateEntityBondDetail,
  }
}
