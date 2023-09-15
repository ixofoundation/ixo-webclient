import useCurrentEntity from 'hooks/currentEntity'
import React, { useMemo } from 'react'
import ClaimDashboard from './ClaimDashboard'
import DAODashboard from './DAODashboard'
import InvestmentDashboard from './InvestmentDashboard'
import ProjectDashboard from './ProjectDashboard'

const DashboardPage: React.FC = (): JSX.Element | null => {
  const currentEntity = useCurrentEntity()
  const entityType = currentEntity.entityType.replace('protocol/', '')

  const Component = useMemo(() => {
    switch (entityType) {
      case 'project':
        return ProjectDashboard
      case 'dao':
        return DAODashboard
      case 'claim':
        return ClaimDashboard
      case 'investment':
        return InvestmentDashboard
      default:
        return undefined
    }
  }, [entityType])

  if (!Component) {
    return null
  }
  return <Component />
}

export default DashboardPage
