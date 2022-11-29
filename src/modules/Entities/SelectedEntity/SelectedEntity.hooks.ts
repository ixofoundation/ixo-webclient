import { useDispatch, useSelector } from 'react-redux'
import { updateEntityAddressAction } from './SelectedEntity.actions'
import { selectEntityAddress, selectEntityBondDid, selectEntityDid } from './SelectedEntity.selectors'

export function useSelectedEntity(): {
  did: string
  address: string
  bondDid: string
  updateEntityAddress: (address: string) => void
} {
  const dispatch = useDispatch()
  const did: string = useSelector(selectEntityDid)
  const address: string = useSelector(selectEntityAddress)
  const bondDid: string = useSelector(selectEntityBondDid)

  const updateEntityAddress = (address: string): void => {
    dispatch(updateEntityAddressAction(address))
  }

  return {
    did,
    address,
    bondDid,
    updateEntityAddress,
  }
}
