import { Flex } from '@mantine/core'
import { GridContainer, GridItem } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useGetDAOByGroupAddress } from 'hooks/dao'
import React from 'react'
import { TEntityModel } from 'types/entities'
import GovernanceCard from './GovernanceCard'
import VotingPowerCard from './VotingPowerCard'
import RolesCard from './RolesCard'
import TokensCard from './TokensCard'
import ProposalsCard from './ProposalsCard'

interface Props {
  selectedGroup: string
}

const GroupView: React.FC<Props> = ({ selectedGroup }) => {
  const dao: TEntityModel | undefined = useGetDAOByGroupAddress(selectedGroup)
  const daoGroup = (dao?.daoGroups ?? {})[selectedGroup]

  return (
    <Flex direction={'column'} gap={16}>
      <Typography variant='secondary' size='md'>
        {dao?.profile?.name}
      </Typography>

      <Typography variant='secondary' size='5xl'>
        {daoGroup.config?.name}
      </Typography>

      <GridContainer
        $gridTemplateAreas={`"a b""c d"`}
        $gridTemplateColumns={'1fr 1fr'}
        $gridTemplateRows={'repeat(2, minmax(340px, auto))'}
        $gridGap={6}
        width='100%'
      >
        <GridItem $gridArea='a' $alignSelf='center' height='100%'>
          <GovernanceCard daoGroup={daoGroup} />
        </GridItem>
        <GridItem $gridArea='b' $alignSelf='center' height='100%'>
          {daoGroup.type === 'membership' ? (
            <VotingPowerCard daoGroup={daoGroup} />
          ) : (
            <TokensCard daoGroup={daoGroup} />
          )}
        </GridItem>
        <GridItem $gridArea='c' $alignSelf='center' height='100%'>
          <RolesCard daoGroup={daoGroup} />
        </GridItem>
        <GridItem $gridArea='d' $alignSelf='center' height='100%'>
          <ProposalsCard daoGroup={daoGroup} />
        </GridItem>
      </GridContainer>
    </Flex>
  )
}
export default GroupView
