import useCurrentEntity from 'hooks/currentEntity'
import React, { useMemo } from 'react'
import ClaimDashboard from './ClaimDashboard'
import DAODashboard from './DAODashboard'
import InvestmentDashboard from './InvestmentDashboard'
import ProjectDashboard from './ProjectDashboard'
import AssetDashboard from './AssetDashboard'
import OracleDashboard from './OracleDashboard'
import AssetCollectionDashboard from './AssetCollectionDashboard'

const DashboardPage: React.FC = (): JSX.Element | null => {
  const currentEntity = useCurrentEntity()
  const entityType = currentEntity.entityType

  const Component = useMemo(() => {
    switch (entityType) {
      case 'project':
        return ProjectDashboard
      case 'dao':
        return DAODashboard
      case 'protocol/deed':
      case 'protocol/claim':
        return ClaimDashboard
      case 'investment':
        return InvestmentDashboard
      case 'asset/collection':
        return AssetCollectionDashboard
      case 'asset/device':
      case 'asset/learnership':
        return AssetDashboard
      case 'oracle/evaluation':
      case 'oracle':
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
