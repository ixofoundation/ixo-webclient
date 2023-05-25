import {
  GetBondDetail,
  // GetProjectAccounts
} from 'lib/protocol'
import { useSelectedEntity } from 'hooks/entity'
import { useEffect } from 'react'
import { useValidators } from 'hooks/validator'
import useCurrentEntity from 'hooks/currentEntity'
import useCurrentDao from 'hooks/currentDao'

const EntityUpdateService = (): JSX.Element | null => {
  const {
    did,
    bondDid,
    // updateEntityAddress,
    updateEntityBondDetail,
  } = useSelectedEntity()
  const { getValidators } = useValidators()
  const { linkedEntity } = useCurrentEntity()
  const { setDaoGroup } = useCurrentDao()

  useEffect(() => {
    const init = async (did: string): Promise<void> => {
      // const res = await GetProjectAccounts(did)
      // if (res![did]) {
      //   updateEntityAddress(res![did])
      // }
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

  useEffect(() => {
    if (linkedEntity.length > 0) {
      linkedEntity
        .filter(({ type }) => type === 'Group')
        .forEach(({ id }) => {
          const [, coreAddress] = id.split('#')
          setDaoGroup(coreAddress)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkedEntity])

  return null
}

export default EntityUpdateService
