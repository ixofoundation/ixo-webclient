import useCurrentEntity from 'hooks/currentEntity'
import React, { useMemo } from 'react'
import ClaimDashboard from './ClaimDashboard'
import DAODashboard from './DAODashboard'
import InvestmentDashboard from './InvestmentDashboard'
import ProjectDashboard from './ProjectDashboard'
import AssetDashboard from './AssetDashboard'
import OracleDashboard from './OracleDashboard'

const DashboardPage: React.FC = (): JSX.Element | null => {
  const currentEntity = useCurrentEntity()
  const entityType = currentEntity.entityType.replace('protocol/', '')

  const Component = useMemo(() => {
    switch (entityType) {
      case 'project':
        return ProjectDashboard
      case 'dao':
        return DAODashboard
      case 'deed':
        return ClaimDashboard
      case 'investment':
        return InvestmentDashboard
      case 'asset/device':
      case 'asset/learnership':
        return AssetDashboard
      case 'oracle/evaluation':
        return OracleDashboard
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
