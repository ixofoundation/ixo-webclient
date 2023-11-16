import React from 'react'
import { Card } from '../Card'
import { ReactComponent as ClockIcon } from 'assets/images/icon-clock-2.svg'
import { ReactComponent as ClaimIcon } from 'assets/images/icon-claim.svg'
import { ReactComponent as CopyIcon } from 'assets/images/icon-copy.svg'
import useCurrentEntity from 'hooks/currentEntity'
import { toTitleCase } from 'utils/formatters'

const ProtocolPerformance: React.FC = () => {
  const { entityType } = useCurrentEntity()

  const protocolType = entityType.replace('protocol/', '')

  return (
    <Card
      icon={<ClockIcon />}
      title='Performance'
      columns={1}
      items={[
        {
          icon: <ClaimIcon />,
          content: `Type: ${toTitleCase(protocolType)}`,
        },
        {
          icon: <CopyIcon />,
          content: `Usage: ${(0).toLocaleString()} Entities`, // TODO:
        },
      ]}
    />
  )
}

export default ProtocolPerformance
