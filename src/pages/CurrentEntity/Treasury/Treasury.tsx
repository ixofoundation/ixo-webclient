import { useAccount } from 'hooks/account'
import useCurrentEntity from 'hooks/currentEntity'
import React, { useEffect, useMemo } from 'react'
import { DAOTreasury } from './DAOTreasury'

const TreasuryPage: React.FC = (): JSX.Element | null => {
  const { entityType } = useCurrentEntity()
  const { address } = useAccount()

  const Component = useMemo(() => {
    switch (entityType) {
      case 'dao':
        return DAOTreasury
      default:
        return undefined
    }
  }, [entityType])

  useEffect(() => {
    if (!address) {
      console.error('Treasury', { address })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  if (!Component) {
    return null
  }
  return <Component />
}

export default TreasuryPage
