import { useEffect } from 'react'
import { useValidators } from 'hooks/validator'
import useCurrentEntity from 'hooks/currentEntity'

const timer: { [key: string]: NodeJS.Timer } = {}

const EntityUpdateService = (): JSX.Element | null => {
  const { getValidators } = useValidators()
  const { linkedEntity } = useCurrentEntity()
  const { updateDAOGroup } = useCurrentEntity()

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
