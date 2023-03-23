import {
  GetBondDetail,
  // GetProjectAccounts
} from 'lib/protocol'
import { useSelectedEntity } from 'hooks/entity'
import { useEffect, useState } from 'react'
import { useValidators } from 'hooks/validator'
import useCurrentEntity from 'hooks/currentEntity'
import { useAccount } from 'hooks/account'
import useCurrentDao from 'hooks/currentDao'
import { Spinner } from 'components/Spinner/Spinner'

const EntityUpdateService = (): JSX.Element | null => {
  const {
    did,
    bondDid,
    // updateEntityAddress,
    updateEntityBondDetail,
  } = useSelectedEntity()
  const { getValidators } = useValidators()
  const { cosmWasmClient } = useAccount()
  const { linkedEntity } = useCurrentEntity()
  const { setDaoGroup } = useCurrentDao()
  const [daoGroupLoading, setDaoGroupLoading] = useState(false)

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
    if (linkedEntity.length > 0 && !!cosmWasmClient) {
      linkedEntity
        .filter(({ type }) => type === 'Group')
        .forEach(({ id }) => {
          const [, coreAddress] = id.split('#')

          ;(async () => {
            setDaoGroupLoading(true)
            await setDaoGroup(coreAddress)
            setDaoGroupLoading(false)
          })()
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkedEntity, cosmWasmClient])

  if (daoGroupLoading) {
    return <Spinner info='Loading DAO Group...' />
  }

  return null
}

export default EntityUpdateService
