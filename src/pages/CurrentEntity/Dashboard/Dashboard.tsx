import useCurrentEntity from 'hooks/currentEntity'
import React, { useMemo } from 'react'
import ClaimDashboard from './ClaimDashboard'
import DAODashboard from './DAODashboard'
import InvestmentDashboard from './InvestmentDashboard'
import ProjectDashboard from './ProjectDashboard'
import AssetDashboard from './AssetDashboard'

const DashboardPage: React.FC = (): JSX.Element | null => {
  const currentEntity = useCurrentEntity()
  const entityType = currentEntity.entityType.replace('protocol/', '')

  console.log({ entityType, currentEntity })

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
      case 'asset/device':
      case 'asset/learnership':
        return AssetDashboard
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
