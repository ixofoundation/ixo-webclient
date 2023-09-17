import React from 'react'

import useCurrentEntity from 'hooks/currentEntity'
import DAOPerformance from './DAOPerformance'
import OraclePerformance from './OraclePerformance'
import InvestmentPerformance from './InvestmentPerformance'
import ProtocolPerformance from './ProtocolPerformance'
import ProjectPerformance from './ProjectPerformance'
import AssetPerformance from './AssetPerformance'

const Performance: React.FC = () => {
  const { entityType } = useCurrentEntity()

  switch (entityType) {
    case 'dao':
      return <DAOPerformance />
    case 'project':
      return <ProjectPerformance />
    case 'asset/device':
      return <AssetPerformance />
    case 'oracle':
      return <OraclePerformance />
    case 'investment':
      return <InvestmentPerformance />
    case 'protocol/claim':
      return <ProtocolPerformance />
    default:
      return null
  }
}

export default Performance
