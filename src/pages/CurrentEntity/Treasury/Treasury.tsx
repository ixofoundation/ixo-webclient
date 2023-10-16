import useCurrentEntity from 'hooks/currentEntity'
import React, { useMemo } from 'react'
import DAOTreasury from './DAOTreasury'
import InvestmentFunding from './InvestmentFunding'

const TreasuryPage: React.FC = (): JSX.Element | null => {
  const { entityType } = useCurrentEntity()

  const Component = useMemo(() => {
    switch (entityType) {
      case 'dao':
        return DAOTreasury
      case 'investment':
        return InvestmentFunding
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
