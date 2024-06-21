import React, { useEffect, useMemo } from 'react'
import ClaimDashboard from './ClaimDashboard'
import DAODashboard from './DAODashboard'
import InvestmentDashboard from './InvestmentDashboard'
import ProjectDashboard from './ProjectDashboard'
import AssetDashboard from './AssetDashboard'
import OracleDashboard from './OracleDashboard'
import AssetCollectionDashboard from './AssetCollectionDashboard'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useEntityDashboard } from 'hooks/entity/useEntityDashboard'

const DashboardPage: React.FC = (): JSX.Element | null => {
  const { entityId = "" } = useParams<{entityId: string}>()
  const entity = useAppSelector(getEntityById(entityId))
  const entityType = entity?.type

  const { refetch, type } = useEntityDashboard(entityId)

  useEffect(() => {
    if (refetch && !type) {
      refetch()
    }
  }, [refetch, type])

  const Component = useMemo(() => {
    switch (entityType) {
      case 'project':
        return ProjectDashboard
      case 'dao':
        return DAODashboard
      case 'protocol/deed':
      case 'protocol/claim':
      case 'protocol/impact':
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
