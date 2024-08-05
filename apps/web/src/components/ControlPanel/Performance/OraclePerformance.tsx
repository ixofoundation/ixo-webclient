import React from 'react'
import { Card } from '../Card'
import { ReactComponent as ClockIcon } from '/public/assets/images/icon-clock-2.svg'
import { ReactComponent as ClaimIcon } from '/public/assets/images/icon-claim.svg'
import { ReactComponent as ImpactTokenIcon } from '/public/assets/images/icon-impact-token2.svg'
import { ReactComponent as CheckCircleIcon } from '/public/assets/images/icon-check-circle.svg'
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
          content: `${totalEvaluatedClaims.toLocaleString()} Claims processed`,
        },
        {
          icon: <ImpactTokenIcon />,
          content: `${minted.toLocaleString()} Impact Tokens Issued`,
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
