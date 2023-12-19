import { contracts } from '@ixo/impactxclient-sdk'
import { VoteInfo } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { Flex } from '@mantine/core'
import { CircleProgressbar } from 'components/Widgets/CircleProgressbar/CircleProgressbar'
import { useAccount } from 'hooks/account'
import { useCurrentEntityDAOGroup } from 'hooks/currentEntity'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface Props {
  active?: boolean
  coreAddress: string
  proposalId: number
}

const GovernanceProposalCard: React.FC<Props> = ({ active, coreAddress, proposalId }) => {
  const { cwClient, address } = useAccount()
  const { daoGroup, proposalModuleAddress } = useCurrentEntityDAOGroup(coreAddress)

  const [votes, setVotes] = useState<VoteInfo[]>([])
  const [, setMyVoteStatus] = useState<VoteInfo | undefined>(undefined)

  const numOfAvailableVotes = useMemo(() => daoGroup.votingModule.members.length, [daoGroup])
  const {
    numOfYesVotes = 0,
    numOfNoVotes = 0,
    numOfNoWithVetoVotes = 0,
    numOfAbstainVotes = 0,
  } = useMemo(() => {
    const numOfYesVotes = votes.filter(({ vote }) => vote === 'yes').length
    const numOfNoVotes = votes.filter(({ vote, rationale }) => vote === 'no' && !rationale).length
    const numOfNoWithVetoVotes = votes.filter(({ vote, rationale }) => vote === 'no' && rationale).length
    const numOfAbstainVotes = votes.filter(({ vote }) => vote === 'abstain').length
    return {
      numOfYesVotes,
      numOfNoVotes,
      numOfNoWithVetoVotes,
      numOfAbstainVotes,
    }
  }, [votes])

  const getVoteStatus = useCallback(() => {
    const daoProposalSingleClient = new contracts.DaoProposalSingle.DaoProposalSingleQueryClient(
      cwClient,
      proposalModuleAddress,
    )
    daoProposalSingleClient.getVote({ proposalId, voter: address }).then(({ vote }) => {
      setMyVoteStatus(vote!)
    })
    daoProposalSingleClient.listVotes({ proposalId }).then(({ votes }) => {
      setVotes(votes)
    })
  }, [address, cwClient, proposalId, proposalModuleAddress])

  useEffect(() => {
    getVoteStatus()
  }, [getVoteStatus])

  return (
    <Flex
      p={40}
      align={'center'}
      style={{ border: `1px solid ${active ? '#0089D7' : 'transparent'}`, background: '#1C3955' }}
    >
      <Flex w='100%' direction={'column'} gap={'md'}>
        <Flex></Flex>
        <Flex>Extend the project end-date to September 2020</Flex>
        <Flex>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ...{' '}
        </Flex>
        <Flex></Flex>
      </Flex>
      <Flex>
        <CircleProgressbar
          approved={numOfYesVotes}
          rejected={numOfNoVotes + numOfNoWithVetoVotes}
          pending={0}
          disputed={numOfAbstainVotes}
          totalNeeded={numOfAvailableVotes}
          descriptor={<>In favour of the Proposal</>}
          percentageFormat={true}
          radius={30}
        />
      </Flex>
    </Flex>
  )
}

export default GovernanceProposalCard
