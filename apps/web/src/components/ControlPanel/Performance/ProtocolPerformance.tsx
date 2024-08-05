import React from 'react'
import { Card } from '../Card'
import { ReactComponent as ClockIcon } from '/public/assets/images/icon-clock-2.svg'
import { ReactComponent as ClaimIcon } from '/public/assets/images/icon-claim.svg'
import { ReactComponent as CopyIcon } from '/public/assets/images/icon-copy.svg'
import { toTitleCase } from 'utils/formatters'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'

const ProtocolPerformance: React.FC = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { type } = useAppSelector(getEntityById(entityId))
  const protocolType = type.replace('protocol/', '')

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
