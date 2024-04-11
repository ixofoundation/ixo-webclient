import React, { useMemo } from 'react'
import DAOTreasury from './DAOTreasury'
import InvestmentFunding from './InvestmentFunding'
import ProjectFunding from './ProjectFunding'
import OracleFunding from './OracleFunding'
import { useParams } from 'react-router-dom'
import { useEntityTreasury } from 'hooks/entity/useEntityTreasury'

const TreasuryPage: React.FC = (): JSX.Element | null => {
  const { entityId = "" } = useParams<{ entityId: string }>()
  const entity = useEntityTreasury(entityId)

  const Component = useMemo(() => {
    switch (entity.type) {
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
  }, [entity.type])

  if (!Component) {
    return null
  }
  return <Component />
}

export default TreasuryPage
