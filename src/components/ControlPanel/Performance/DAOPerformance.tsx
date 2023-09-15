import React, { useMemo } from 'react'
import { Card } from '../Card'
import { ReactComponent as ClockIcon } from 'assets/images/icon-clock-2.svg'
import { ReactComponent as UserCircleIcon } from 'assets/images/icon-user-circle.svg'
import { ReactComponent as ProposalsIcon } from 'assets/images/icon-proposals.svg'
import { ReactComponent as ProjectIcon } from 'assets/images/icon-project.svg'
import { ReactComponent as FundingIcon } from 'assets/images/icon-funding.svg'
import useCurrentEntity from 'hooks/currentEntity'

const DAOPerformance: React.FC = () => {
  const { daoGroups } = useCurrentEntity()
  const daoGroupsArr = useMemo(() => Object.values(daoGroups), [daoGroups])

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
