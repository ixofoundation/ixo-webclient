import useCurrentEntity from 'hooks/currentEntity'
import React, { useMemo } from 'react'
import { DAOTreasury } from './DAOTreasury'

const TreasuryPage: React.FC = (): JSX.Element | null => {
  const { entityType } = useCurrentEntity()

  const Component = useMemo(() => {
    switch (entityType) {
      case 'dao':
        return DAOTreasury
      default:
        return undefined
    }
  }, [entityType])

  if (!Component) {
    return null
  }
  return <Component />
}

export default TreasuryPage
