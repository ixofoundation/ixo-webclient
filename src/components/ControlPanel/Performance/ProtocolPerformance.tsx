import React from 'react'
import { Card } from '../Card'






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
      icon={<img src="/assets/images/icon-clock-2.svg"  />}
      title='Performance'
      columns={1}
      items={[
        {
          icon: <img src="/assets/images/icon-claim.svg"  />,
          content: `Type: ${toTitleCase(protocolType)}`,
        },
        {
          icon: <img src="/assets/images/icon-copy.svg"  />,
          content: `Usage: ${(0).toLocaleString()} Entities`, // TODO:
        },
      ]}
    />
  )
}

export default ProtocolPerformance
