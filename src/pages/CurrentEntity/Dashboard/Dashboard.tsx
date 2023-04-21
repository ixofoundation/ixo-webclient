import { useAccount } from 'hooks/account'
import useCurrentEntity from 'hooks/currentEntity'
import React, { useEffect, useMemo } from 'react'
import { DAODashboard } from './DAODashboard'

const DashboardPage: React.FC = (): JSX.Element | null => {
  const { entityType } = useCurrentEntity()
  const { address } = useAccount()

  const Component = useMemo(() => {
    switch (entityType) {
      case 'dao':
        return DAODashboard
      default:
        return undefined
    }
  }, [entityType])

  useEffect(() => {
    if (!address) {
      console.error('Dashboard', { address })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  if (!Component) {
    return null
  }
  return <Component />
}

export default DashboardPage
