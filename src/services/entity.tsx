import { GetBondDetail } from 'lib/protocol'
import { useSelectedEntity } from 'hooks/entity'
import { useEffect } from 'react'
import { useValidators } from 'hooks/validator'
import useCurrentEntity from 'hooks/currentEntity'

const timer: { [key: string]: NodeJS.Timer } = {}

const EntityUpdateService = (): JSX.Element | null => {
  const { bondDid, updateEntityBondDetail } = useSelectedEntity()
  const { getValidators } = useValidators()
  const { linkedEntity } = useCurrentEntity()
  const { updateDAOGroup } = useCurrentEntity()

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
          updateDAOGroup(coreAddress)
          // timer[id] = setInterval(() => {
          //   updateDAOGroup(coreAddress)
          // }, 1000 * 60) //  1 min
        })
    }
    return () => {
      Object.values(timer).forEach((timerId) => {
        clearInterval(timerId)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkedEntity])

  return null
}

export default EntityUpdateService
