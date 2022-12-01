import { useDispatch, useSelector } from 'react-redux'
import { updateEntityAddressAction } from 'redux/selectedEntity/selectedEntity.actions'
import {
  selectEntityAddress,
  selectEntityBondDid,
  selectEntityDid,
  selectEntityStatus,
} from 'redux/selectedEntity/selectedEntity.selectors'

export function useSelectedEntity(): {
  did: string
  address: string
  bondDid: string
  status: string
  updateEntityAddress: (address: string) => void
} {
  const dispatch = useDispatch()
  const did: string = useSelector(selectEntityDid)
  const address: string = useSelector(selectEntityAddress)
  const bondDid: string = useSelector(selectEntityBondDid)
  const status: string = useSelector(selectEntityStatus)

  const updateEntityAddress = (address: string): void => {
    dispatch(updateEntityAddressAction(address))
  }

  return {
    did,
    address,
    bondDid,
    status,
    updateEntityAddress,
  }
}
