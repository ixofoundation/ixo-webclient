import { useAppDispatch, useAppSelector } from 'redux/hooks'
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
  const dispatch = useAppDispatch()
  const did: string = useAppSelector(selectEntityDid)
  const address: string = useAppSelector(selectEntityAddress)
  const bondDid: string = useAppSelector(selectEntityBondDid)
  const status: string = useAppSelector(selectEntityStatus)

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
