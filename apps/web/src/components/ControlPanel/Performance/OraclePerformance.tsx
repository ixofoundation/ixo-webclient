import React from 'react'
import { Card } from '../Card'








import { useCarbonOracleClaimAggregate } from 'hooks/oracle/useCarbonOracleClaimAggregate'
import { useParams } from 'react-router-dom'

const OraclePerformance: React.FC = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { minted, totalEvaluatedClaims, approvedPercentage } = useCarbonOracleClaimAggregate({
    entityIds: [entityId],
  })

  return (
    <Card
      icon={<img src="/assets/images/icon-clock-2.svg"  />}
      title='Performance'
      columns={1}
      items={[
        {
          icon: <img src="/assets/images/icon-claim.svg"  />,
          content: `${totalEvaluatedClaims.toLocaleString()} Claims processed`,
        },
        {
          icon: <img src="/assets/images/icon-impact-token2.svg"  />,
          content: `${minted.toLocaleString()} Impact Tokens Issued`,
        },
        {
          icon: <img src="/assets/images/icon-check-circle.svg"  />,
          content: `${approvedPercentage.toFixed(2)} Approval Rate`,
        },
      ]}
    />
  )
}

export default OraclePerformance
