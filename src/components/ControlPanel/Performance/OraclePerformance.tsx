import React from 'react'
import { Card } from '../Card'
import { ReactComponent as ClockIcon } from 'assets/images/icon-clock-2.svg'
import { ReactComponent as ClaimIcon } from 'assets/images/icon-claim.svg'
import { ReactComponent as ImpactTokenIcon } from 'assets/images/icon-impact-token2.svg'
import { ReactComponent as CheckCircleIcon } from 'assets/images/icon-check-circle.svg'

const OraclePerformance: React.FC = () => {
  return (
    <Card
      icon={<ClockIcon />}
      title='Performance'
      columns={1}
      items={[
        {
          icon: <ClaimIcon />,
          content: `${(1290).toLocaleString()} Claims processed`, // TODO:
        },
        {
          icon: <ImpactTokenIcon />,
          content: `${(10250).toLocaleString()} Impact Tokens Issued`, // TODO:
        },
        {
          icon: <CheckCircleIcon />,
          content: '91.3% Approval Rate', // TODO:
        },
      ]}
    />
  )
}

export default OraclePerformance
