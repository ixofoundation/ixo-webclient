import {
  GetBondDetail,
  // GetProjectAccounts
} from 'lib/protocol'
import { useSelectedEntity } from 'hooks/entity'
import { useEffect, useState } from 'react'
import { useValidators } from 'hooks/validator'
import { matchPath, useHistory } from 'react-router-dom'
import useCurrentEntity from 'hooks/currentEntity'
import { useAccount } from 'hooks/account'
import useCurrentDao from 'hooks/currentDao'
import { Spinner } from 'components/Spinner/Spinner'

const EntityUpdateService = (): JSX.Element | null => {
  const history = useHistory()
  const match =
    matchPath(history.location.pathname, {
      path: '/create/entity/:entityId/proposal/:coreAddress',
    }) ??
    matchPath(history.location.pathname, {
      path: '/entity/:entityId/dashboard',
    })
  const entityId = match?.params['entityId']
  const {
    did,
    bondDid,
    // updateEntityAddress,
    updateEntityBondDetail,
  } = useSelectedEntity()
  const { getValidators } = useValidators()
  const { cosmWasmClient } = useAccount()
  const { linkedEntity, getEntityByDid } = useCurrentEntity()
  const { setDaoGroup } = useCurrentDao()
  const [entityLoading, setEntityLoading] = useState(false)
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
    if (entityId) {
      console.log('getEntityByDid is being called')
      setEntityLoading(true)
      getEntityByDid(entityId)
        .then(() => setEntityLoading(false))
        .catch(() => setEntityLoading(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityId])

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

  if (entityLoading) {
    return <Spinner info='Loading Entity...' />
  }

  if (daoGroupLoading) {
    return <Spinner info='Loading DAO Group...' />
  }

  return null
}

export default EntityUpdateService
