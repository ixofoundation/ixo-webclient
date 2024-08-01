import React from 'react'
import { Card } from '../Card'
import ClockIcon from 'assets/images/icon-clock-2.svg'
import ClaimIcon from 'assets/images/icon-claim.svg'
import ImpactTokenIcon from 'assets/images/icon-impact-token2.svg'
import CheckCircleIcon from 'assets/images/icon-check-circle.svg'
import { useCarbonOracleClaimAggregate } from 'hooks/oracle/useCarbonOracleClaimAggregate'
import { useParams } from 'react-router-dom'

const OraclePerformance: React.FC = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { minted, totalEvaluatedClaims, approvedPercentage } = useCarbonOracleClaimAggregate({
    entityIds: [entityId],
  })

  return (
    <Card
      icon={<ClockIcon />}
      title='Performance'
      columns={1}
      items={[
        {
          icon: <ClaimIcon />,
          content: `${(totalEvaluatedClaims).toLocaleString()} Claims processed`,
        },
        {
          icon: <ImpactTokenIcon />,
          content: `${(minted).toLocaleString()} Impact Tokens Issued`, 
        },
        {
          icon: <CheckCircleIcon />,
          content: `${approvedPercentage.toFixed(2)} Approval Rate`,
        },
      ]}
    />
  )
}

export default OraclePerformance
