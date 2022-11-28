import { useDispatch, useSelector } from 'react-redux'
import { updateEntityAddressAction } from './SelectedEntity.actions'
import { selectEntityAddress, selectEntityDid } from './SelectedEntity.selectors'

function useSelectedEntity(): any {
  const dispatch = useDispatch()
  const did: string = useSelector(selectEntityDid)
  const address: string | undefined = useSelector(selectEntityAddress)

  const updateEntityAddress = (address: string): void => {
    dispatch(updateEntityAddressAction(address))
  }

  return {
    did,
    address,
    updateEntityAddress,
  }
}

export default useSelectedEntity
