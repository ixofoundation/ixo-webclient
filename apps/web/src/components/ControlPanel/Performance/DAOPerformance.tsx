import React, { useMemo } from 'react'
import { Card } from '../Card'
import { ReactComponent as ClockIcon } from '/public/assets/images/icon-clock-2.svg'
import { ReactComponent as UserCircleIcon } from '/public/assets/images/icon-user-circle.svg'
import { ReactComponent as ProposalsIcon } from '/public/assets/images/icon-proposals.svg'
import { ReactComponent as ProjectIcon } from '/public/assets/images/icon-project.svg'
import { ReactComponent as FundingIcon } from '/public/assets/images/icon-funding.svg'
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
      icon={<ClockIcon />}
      title='Performance'
      columns={2}
      items={[
        {
          icon: <UserCircleIcon />,
          content: `${members} members`,
        },
        {
          icon: <ProposalsIcon />,
          content: `${proposals} proposals`,
        },
        {
          icon: <ProjectIcon />,
          content: '0 projects', // TODO: number of Projects?
        },
        {
          icon: <FundingIcon />,
          content: '$' + Number(0).toLocaleString(),
        },
      ]}
    />
  )
}

export default DAOPerformance
