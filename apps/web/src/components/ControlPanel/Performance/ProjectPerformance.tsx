import React from 'react'
import { Card } from '../Card'
import { ReactComponent as ClockIcon } from 'assets/images/icon-clock-2.svg'
import { ReactComponent as ProjectIcon } from 'assets/images/icon-project.svg'
import { ReactComponent as ChartPieIcon } from 'assets/images/icon-chart-pie-solid.svg'
import useCurrentEntity, { useCurrentEntityClaims } from 'hooks/currentEntity'
import { toTitleCase } from 'utils/formatters'
import { EntityStatusMap } from 'constants/entity'

const ProjectPerformance: React.FC = () => {
  const { entityStatus } = useCurrentEntity()
  const { headlineClaim } = useCurrentEntityClaims()

  return (
    <Card
      icon={<ClockIcon />}
      title='Performance'
      columns={1}
      items={[
        {
          icon: <ProjectIcon />,
          content: `Status: ${toTitleCase(EntityStatusMap[entityStatus])}`,
        },
        {
          icon: <ChartPieIcon />,
          content: `${(0).toLocaleString()}/${(headlineClaim?.submissions?.maximum || 0).toLocaleString()} distributed`,
        },
      ]}
    />
  )
}

export default ProjectPerformance
