import React, { useMemo } from 'react'
import { Card } from '../Card'










import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'

const DAOPerformance: React.FC = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const entity = useAppSelector(getEntityById(entityId))
  const daoGroups = entity?.daoGroups

  const daoGroupsArr = useMemo(() => (daoGroups ? Object.values(daoGroups) : []), [daoGroups])

  const members = useMemo(
    () => daoGroupsArr.reduce((pre, cur) => pre + cur.votingModule.members.length, 0),
    [daoGroupsArr],
  )

  const proposals = useMemo(
    () => daoGroupsArr.reduce((pre, cur) => pre + cur.proposalModule.proposals.length, 0),
    [daoGroupsArr],
  )

  return (
    <Card
      icon={<img src="/assets/images/icon-clock-2.svg"  />}
      title='Performance'
      columns={2}
      items={[
        {
          icon: <img src="/assets/images/icon-user-circle.svg"  />,
          content: `${members} members`,
        },
        {
          icon: <img src="/assets/images/icon-proposals.svg"  />,
          content: `${proposals} proposals`,
        },
        {
          icon: <img src="/assets/images/icon-project.svg"  />,
          content: '0 projects', // TODO: number of Projects?
        },
        {
          icon: <img src="/assets/images/icon-funding.svg"  />,
          content: '$' + Number(0).toLocaleString(),
        },
      ]}
    />
  )
}

export default DAOPerformance
