import React from 'react'

import DAOPerformance from './DAOPerformance'
import OraclePerformance from './OraclePerformance'
import InvestmentPerformance from './InvestmentPerformance'
import ProtocolPerformance from './ProtocolPerformance'
import ProjectPerformance from './ProjectPerformance'
import AssetPerformance from './AssetPerformance'

const PerformanceCard = ({ entityType }: { entityType: string}) => {
  switch (entityType) {
    case 'dao':
      return <DAOPerformance />
    case 'project':
      return <ProjectPerformance />
    case 'asset/device':
      return <AssetPerformance />
    case 'oracle':
    case 'oracle/evaluation':
      return <OraclePerformance />
    case 'investment':
      return <InvestmentPerformance />
    case 'protocol/claim':
      return <ProtocolPerformance />
    default:
      return null
  }
}

export default PerformanceCard
