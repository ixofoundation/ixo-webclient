import { GetProjectAccounts } from 'lib/protocol'
import { useSelectedEntity } from 'hooks/entity'
import { useEffect } from 'react'

const EntityUpdateService = (): null => {
  const { did, updateEntityAddress } = useSelectedEntity()

  useEffect(() => {
    const init = async (did: string): Promise<void> => {
      const res = await GetProjectAccounts(did)
      if (res![did]) {
        updateEntityAddress(res![did])
      }
    }
    if (did) {
      init(did)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [did])

  return null
}

export default EntityUpdateService
