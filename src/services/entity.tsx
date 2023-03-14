import { GetBondDetail, GetProjectAccounts } from 'lib/protocol'
import { useSelectedEntity } from 'hooks/entity'
import { useEffect } from 'react'
import { useValidators } from 'hooks/validator'

const EntityUpdateService = (): null => {
  const { did, bondDid, updateEntityAddress, updateEntityBondDetail } = useSelectedEntity()
  const { getValidators } = useValidators()

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

  useEffect(() => {
    const fetch = async (bondDid: string) => {
      const res = await GetBondDetail(bondDid)
      if (res?.bond) {
        // update bond detail in redux
        updateEntityBondDetail(res.bond)
      }
    }
    if (bondDid) {
      fetch(bondDid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bondDid])

  useEffect(() => {
    getValidators()
  }, [getValidators])

  return null
}

export default EntityUpdateService
