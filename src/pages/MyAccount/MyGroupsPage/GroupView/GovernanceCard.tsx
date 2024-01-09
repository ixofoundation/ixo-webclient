import { Card } from 'pages/CurrentEntity/Components'
import React, { useMemo } from 'react'
import { TDAOGroupModel } from 'types/entities'
import { Flex } from '@mantine/core'
import { SvgBox } from 'components/App/App.styles'
import PieChart from 'components/Widgets/PieChart/PieChart'
import { Typography } from 'components/Typography'

import { ReactComponent as AgentIcon } from 'assets/img/sidebar/agents.svg'
import { ReactComponent as CoinsIcon } from 'assets/images/icon-coins-solid.svg'
import { useTheme } from 'styled-components'
import { useAccount } from 'hooks/account'

interface Props {
  daoGroup: TDAOGroupModel
}
const GovernanceCard: React.FC<Props> = ({ daoGroup }) => {
  const theme: any = useTheme()
  const { address } = useAccount()
  const userVotingPower = useMemo(() => {
    const totalWeight = daoGroup.votingModule.totalWeight
    const userWeight = daoGroup.votingModule.members.find((member) => member.addr === address)?.weight ?? 0

    const userVotingPower = userWeight / totalWeight
    return userVotingPower
  }, [address, daoGroup])

  return (
    <Card label='Governance' icon={<AgentIcon />}>
      <Flex w='100%' direction={'column'} gap={24} align={'center'} justify={'center'}>
        <Flex align={'center'} gap={4}>
          <SvgBox svgWidth={5} svgHeight={5}>
            {daoGroup.type === 'membership' && <CoinsIcon />}
            {daoGroup.type === 'staking' && <CoinsIcon />}
          </SvgBox>
          <Typography size='sm' transform='capitalize'>
            {daoGroup.type} based
          </Typography>
        </Flex>

        <PieChart
          data={[
            { name: 'Rest Voting Power', value: 1 - userVotingPower, color: theme.ixoDarkBlue },
            { name: 'My Voting Power', value: userVotingPower, color: theme.ixoNewBlue },
          ]}
          descriptor={
            <Flex direction='column' align='center'>
              <Typography variant='secondary' size='3xl' weight='bold'>
                {new Intl.NumberFormat('en-us', {
                  style: 'percent',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                }).format(userVotingPower)}
              </Typography>
              <Typography size='md' transform='capitalize'>
                voting power
              </Typography>
            </Flex>
          }
        />
      </Flex>
    </Card>
  )
}

export default GovernanceCard
