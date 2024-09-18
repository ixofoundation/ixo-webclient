import React from 'react'
import { Card } from '../Card'






import { toTitleCase } from 'utils/formatters'
import { EntityStatusMap } from 'constants/entity'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'

const ProjectPerformance: React.FC = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { status } = useAppSelector(getEntityById(entityId))

  return (
    <Card
      icon={<img src="/assets/images/icon-clock-2.svg"  />}
      title='Performance'
      columns={1}
      items={[
        {
          icon: <img src="/assets/images/icon-project.svg"  />,
          content: `Status: ${toTitleCase(EntityStatusMap[status])}`,
        },
        {
          icon: <img src="/assets/images/icon-chart-pie-solid.svg"  />,
          content: `${(0).toLocaleString()}/${(0).toLocaleString()} distributed`,
        },
      ]}
    />
  )
}

export default ProjectPerformance
