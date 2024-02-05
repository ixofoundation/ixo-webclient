import { Card } from 'pages/CurrentEntity/Components'
import React, { useMemo } from 'react'
import { ReactComponent as AgentIcon } from 'assets/img/sidebar/agents.svg'
import { Button, Flex } from '@mantine/core'
import { Typography } from 'components/Typography'
import { TDAOGroupModel } from 'types/entities'
import { useAccount } from 'hooks/account'

interface Props {
  daoGroup: TDAOGroupModel
}
const VotingPowerCard: React.FC<Props> = ({ daoGroup }) => {
  const { address } = useAccount()
  const totalWeight = daoGroup.votingModule.totalWeight
  const userVotingPower = useMemo(() => {
    const userWeight = daoGroup.votingModule.members.find((member) => member.addr === address)?.weight ?? 0

    const userVotingPower = userWeight / totalWeight
    return userVotingPower
  }, [address, daoGroup, totalWeight])

  return (
    <Card label='My Voting Power' icon={<AgentIcon />}>
      <Flex w={'100%'} h={'100%'} direction={'column'} justify={'space-between'}>
        <Flex direction={'column'} gap={16}>
          <Flex align={'center'} justify={'space-between'}>
            <Typography>Total Votes</Typography>
            <Typography>{totalWeight}</Typography>
          </Flex>
          <Flex align={'center'} justify={'space-between'}>
            <Typography>My Voting Power</Typography>
            <Typography>{userVotingPower}</Typography>
          </Flex>
        </Flex>

        <Button w={'100%'} variant='outline' style={{ color: 'white' }}>
          Propose Voting Power Change
        </Button>
      </Flex>
    </Card>
  )
}

export default VotingPowerCard
