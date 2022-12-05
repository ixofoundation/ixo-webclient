import { Bond } from '@ixo/impactxclient-sdk/types/codegen/ixo/bonds/v1beta1/bonds'
import { useDispatch, useSelector } from 'react-redux'
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
  const dispatch = useDispatch()
  const did: string = useSelector(selectEntityDid)
  const address: string = useSelector(selectEntityAddress)
  const bondDid: string = useSelector(selectEntityBondDid)
  const bondDetail: Bond | undefined = useSelector(selectEntityBondDetail)
  const status: string = useSelector(selectEntityStatus)

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
