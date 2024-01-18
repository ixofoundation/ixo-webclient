import useCurrentEntity from 'hooks/currentEntity'
import React, { useMemo } from 'react'
import DAOTreasury from './DAOTreasury'
import InvestmentFunding from './InvestmentFunding'
import ProjectFunding from './ProjectFunding'
import OracleFunding from './OracleFunding'

const TreasuryPage: React.FC = (): JSX.Element | null => {
  const { entityType } = useCurrentEntity()

  const Component = useMemo(() => {
    switch (entityType) {
      case 'dao':
        return DAOTreasury
      case 'investment':
        return InvestmentFunding
      case 'project':
        return ProjectFunding
      case 'oracle':
        return OracleFunding
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
