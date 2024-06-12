import { useEffect } from 'react'
import { useValidators } from 'hooks/validator'

const EntityUpdateService = (): JSX.Element | null => {
  const { getValidators } = useValidators()

  useEffect(() => {
    getValidators()
  }, [getValidators])

  return null
}

export default EntityUpdateService
