import useCurrentEntity from 'hooks/useCurrentEntity'
import React, { useMemo } from 'react'
import { DAODashboard } from './DAODashboard'

const DashboardPage: React.FC = (): JSX.Element | null => {
  const { entityType } = useCurrentEntity()

  const Component = useMemo(() => {
    switch (entityType) {
      case 'dao':
        return DAODashboard
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
