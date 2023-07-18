import useCurrentEntity from 'hooks/currentEntity'
import React, { useMemo } from 'react'
import ClaimDashboard from './ClaimDashboard'
import DAODashboard from './DAODashboard'

const DashboardPage: React.FC = (): JSX.Element | null => {
  const currentEntity = useCurrentEntity()
  const entityType = currentEntity.entityType.replace('protocol/', '')

  const Component = useMemo(() => {
    switch (entityType) {
      case 'dao':
        return DAODashboard
      case 'claim':
        return ClaimDashboard
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
