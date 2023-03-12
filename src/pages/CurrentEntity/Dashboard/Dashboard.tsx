import { useAccount } from 'hooks/account'
import useCurrentEntity from 'hooks/useCurrentEntity'
import React, { useEffect, useMemo } from 'react'
import { DAODashboard } from './DAODashboard'

const DashboardPage: React.FC = (): JSX.Element | null => {
  const { entityType } = useCurrentEntity()
  const { address, updateChooseWalletOpen } = useAccount()

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
      updateChooseWalletOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  if (!Component) {
    return null
  }
  return <Component />
}

export default DashboardPage
