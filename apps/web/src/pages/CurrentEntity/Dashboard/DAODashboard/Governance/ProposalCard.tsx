import { contracts } from '@ixo/impactxclient-sdk'
import { Vote, VoteInfo } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { Badge, Button, Flex, Text } from '@mantine/core'
import { Typography } from 'components/Typography'
import { CircleProgressbar } from 'components/Widgets/CircleProgressbar/CircleProgressbar'
import { useAccount } from 'hooks/account'
import { useCurrentEntityDAOGroup } from 'hooks/currentEntity'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { truncateString } from 'utils/formatters'
import { SvgBox } from 'components/App/App.styles'
import { SingleChoiceProposal } from '@ixo/impactxclient-sdk/types/codegen/DaoMigrator.types'
import { VoteModal } from 'components/Modals'
import { fee } from 'lib/protocol'
import { useNavigate, useParams } from 'react-router-dom'
import { diffMinsFromNow, expirationToTimestamp, isExpired } from 'utils/time'
import moment from 'moment'
import { errorToast, successToast } from 'utils/toast'
import { formatMinutes } from 'utils/conversions'

import { ReactComponent as SandClockIcon } from 'assets/images/icon-sandclock.svg'
import { ReactComponent as CheckCircleIcon } from 'assets/images/icon-check-circle.svg'
import { ReactComponent as TimesCircleIcon } from 'assets/images/icon-times-circle.svg'
import { ReactComponent as ThumbsUpIcon } from 'assets/images/icon-thumbs-up.svg'
import { ReactComponent as ThumbsDownIcon } from 'assets/images/icon-thumbs-down.svg'
import { ReactComponent as UnlinkIcon } from 'assets/images/icon-unlink-solid.svg'
import { useTheme } from 'styled-components'

const RemainingBadge: React.FC<{ minutes: number }> = ({ minutes }) => {
  const theme: any = useTheme()
  return (
    <Badge w={110} px={8} py={4} style={{ color: theme.ixoLightBlue, backgroundColor: theme.ixoDarkBlue }}>
      <Flex align={'center'} gap={4}>
        <SvgBox $svgWidth={4} $svgHeight={4}>
          <SandClockIcon />
        </SvgBox>
        <Typography size='sm' transform='none'>
          {/* 3d 4h 12min {moment(4000).format('d h m')} */}
          {formatMinutes(Math.floor(minutes))}
        </Typography>
      </Flex>
    </Badge>
  )
}

const PassedBadge: React.FC = () => {
  const theme: any = useTheme()
  return (
    <Badge w={110} px={8} py={4} style={{ color: theme.ixoWhite, backgroundColor: theme.ixoNewBlue }}>
      <Flex align={'center'} gap={4}>
        <SvgBox $svgWidth={4} $svgHeight={4}>
          <CheckCircleIcon />
        </SvgBox>
        <Typography size='sm' transform='none'>
          Passed
        </Typography>
      </Flex>
    </Badge>
  )
}

const ExecutedBadge: React.FC = () => {
  const theme: any = useTheme()
  return (
    <Badge w={110} px={8} py={4} style={{ color: theme.ixoWhite, backgroundColor: theme.ixoGreen }}>
      <Flex align={'center'} gap={4}>
        <SvgBox $svgWidth={4} $svgHeight={4}>
          <CheckCircleIcon />
        </SvgBox>
        <Typography size='sm' transform='none'>
          Executed
        </Typography>
      </Flex>
    </Badge>
  )
}

const RejectedBadge: React.FC = () => {
  const theme: any = useTheme()
  return (
    <Badge w={110} px={8} py={4} style={{ color: theme.ixoWhite, backgroundColor: theme.ixoRed }}>
      <Flex align={'center'} gap={4}>
        <SvgBox $svgWidth={4} $svgHeight={4}>
          <TimesCircleIcon />
        </SvgBox>
        <Typography size='sm' transform='none'>
          Rejected
        </Typography>
      </Flex>
    </Badge>
  )
}

const FailedBadge: React.FC = () => {
  const theme: any = useTheme()
  return (
    <Badge w={110} px={8} py={4} style={{ color: theme.ixoOrange, backgroundColor: theme.ixoDarkBlue }}>
      <Flex align={'center'} gap={4}>
        <SvgBox $svgWidth={4} $svgHeight={4}>
          <UnlinkIcon />
        </SvgBox>
        <Typography size='sm' transform='none'>
          Failed
        </Typography>
      </Flex>
    </Badge>
  )
}

const ClosedBadge: React.FC = () => {
  const theme: any = useTheme()
  return (
    <Badge w={110} px={8} py={4} style={{ color: theme.ixoWhite, backgroundColor: theme.ixoLightRed }}>
      <Flex align={'center'} gap={4}>
        <SvgBox $svgWidth={4} $svgHeight={4}>
          <TimesCircleIcon />
        </SvgBox>
        <Typography size='sm' transform='none'>
          Closed
        </Typography>
      </Flex>
    </Badge>
  )
}

interface Props {
  coreAddress: string
  proposalId: number
  proposal: SingleChoiceProposal
}

const ProposalCard: React.FC<Props> = ({ coreAddress, proposalId, proposal }) => {
  const { proposer, status, title, description: description_origin, allow_revoting, expiration } = proposal
  const [description, deedDid] = description_origin.split('#deed:')

  const navigate = useNavigate()
  const theme: any = useTheme()
  const { entityId } = useParams<{ entityId: string }>()
  const { cwClient, address, cosmWasmClient } = useAccount()
  const { daoGroup, proposalModuleAddress, isParticipating, anyoneCanPropose } = useCurrentEntityDAOGroup(coreAddress)

  const [votes, setVotes] = useState<VoteInfo[]>([])
  const [myVoteStatus, setMyVoteStatus] = useState<VoteInfo | undefined>(undefined)
  const [voteModalOpen, setVoteModalOpen] = useState<boolean>(false)

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
    return () => {
      setMyVoteStatus(undefined)
      setVotes([])
    }
  }, [getVoteStatus])

  const onVote = (vote: Vote): Promise<string> => {
    const daoProposalSingleClient = new contracts.DaoProposalSingle.DaoProposalSingleClient(
      cosmWasmClient,
      address,
      proposalModuleAddress,
    )
    return daoProposalSingleClient
      .vote({ proposalId, vote }, fee, undefined, undefined)
      .then(({ transactionHash }) => transactionHash)
      .catch((e) => {
        console.error('handleVote', e)
        return ''
      })
      .finally(getVoteStatus)
  }

  const onViewMore = () => {
    navigate(`/entity/${entityId}/overview/proposal/${deedDid}`)
  }

  const onExecute = () => {
    const daoProposalSingleClient = new contracts.DaoProposalSingle.DaoProposalSingleClient(
      cosmWasmClient,
      address,
      proposalModuleAddress,
    )
    daoProposalSingleClient
      .execute({ proposalId }, fee, undefined, undefined)
      .then(({ transactionHash, logs, events, gasUsed, gasWanted, height }) => {
        console.log('handleExecuteProposal', { transactionHash, logs, events, gasUsed, gasWanted, height })
        if (transactionHash) {
          successToast(null, 'Successfully executed proposal')
        }
      })
      .catch((e) => {
        console.error('handleExecuteProposal', e)
        errorToast(null, 'Transaction failed')
      })
  }

  const onClose = () => {
    const daoProposalSingleClient = new contracts.DaoProposalSingle.DaoProposalSingleClient(
      cosmWasmClient,
      address,
      proposalModuleAddress,
    )
    daoProposalSingleClient
      .close({ proposalId }, fee, undefined, undefined)
      .then(({ transactionHash, logs }) => {
        console.log('handleCloseProposal', transactionHash, logs)
        if (transactionHash) {
          successToast(null, 'Successfully closed proposal')
        }
      })
      .catch((e) => {
        console.error('handleCloseProposal', e)
        errorToast(null, 'Transaction failed')
      })
  }

  const renderVoteButton = () => {
    if (myVoteStatus?.vote === 'yes') {
      return (
        <Button
          variant='outline'
          color='ixo-blue'
          leftSection={
            <SvgBox $svgWidth={5} $svgHeight={5}>
              <ThumbsUpIcon />
            </SvgBox>
          }
          {...(allow_revoting && !isExpired(expiration) ? { onClick: () => setVoteModalOpen(true) } : [])}
          style={{ color: theme.ixoLightGreen }}
        >
          Yes
        </Button>
      )
    }
    if (myVoteStatus?.vote === 'no') {
      return (
        <Button
          variant='outline'
          color='ixo-blue.8'
          leftSection={
            <SvgBox $svgWidth={5} $svgHeight={5}>
              <ThumbsDownIcon />
            </SvgBox>
          }
          {...(allow_revoting && !isExpired(expiration) ? { onClick: () => setVoteModalOpen(true) } : [])}
          style={{ color: theme.ixoLightRed }}
        >
          No
        </Button>
      )
    }

    if (isExpired(expiration)) {
      return (
        <Button variant='outline' color='ixo-blue.8' style={{ color: '#22658C' }}>
          Not Voted
        </Button>
      )
    }

    return (
      <Button variant='outline' color='ixo-blue.8' onClick={() => setVoteModalOpen(true)} style={{ color: 'white' }}>
        Vote
      </Button>
    )
  }

  const renderSubmitButton = () => {
    if (!anyoneCanPropose && !isParticipating) {
      return <Text c={'ixo-blue.8'}>Only members can vote</Text>
    }

    if (status === 'passed') {
      return (
        <Button variant='outline' color='ixo-blue' onClick={onExecute} style={{ color: 'white' }}>
          Execute
        </Button>
      )
    }

    if (status === 'rejected') {
      return (
        <Button variant='outline' color='ixo-blue' onClick={onClose} style={{ color: 'white' }}>
          Close
        </Button>
      )
    }
  }

  return (
    <Flex
      p={40}
      gap={32}
      align={'center'}
      style={{
        border: `1px solid ${isExpired(expiration) ? 'transparent' : '#0089D7'}`,
        background: isExpired(expiration) ? '#152B3F' : '#1C3955',
      }}
    >
      <Flex w='100%' direction={'column'} gap={20}>
        {/* Badges */}
        <Flex align={'center'} justify={'space-between'}>
          <Flex gap={4}>
            <Badge px={8} py={4} style={{ color: '#63ACEE', backgroundColor: '#2C4963' }}>
              <Typography size='sm'>#{proposalId}</Typography>
            </Badge>

            <Badge px={8} py={4} style={{ color: '#63ACEE', backgroundColor: '#2C4963' }}>
              <Typography size='sm' transform='none'>
                By: {truncateString(proposer, 20)}
              </Typography>
            </Badge>

            {isExpired(expiration) && (
              <Badge px={8} py={4} style={{ color: '#63ACEE', backgroundColor: '#2C4963' }}>
                <Typography size='sm' transform='none'>
                  {moment(expirationToTimestamp(expiration)).format('DD MMM YY')}
                </Typography>
              </Badge>
            )}
          </Flex>

          {status === 'open' && <RemainingBadge minutes={diffMinsFromNow(expiration)} />}
          {status === 'passed' && <PassedBadge />}
          {status === 'rejected' && <RejectedBadge />}
          {status === 'executed' && <ExecutedBadge />}
          {status === 'execution_failed' && <FailedBadge />}
          {status === 'closed' && <ClosedBadge />}
        </Flex>

        {/* Body */}
        <Flex direction={'column'} gap={14}>
          <Flex>
            <Typography size='xl'>{title}</Typography>
          </Flex>
          <Flex h='1px' w='200px' bg={'#213E59'} />
          <Flex h={48} gap='xs'>
            <Typography size='md' $overflowLines={3}>
              {description}
            </Typography>
            <Typography size='md' color='blue' onClick={onViewMore} style={{ cursor: 'pointer' }}>
              View More
            </Typography>
          </Flex>
          <Flex gap={18} align={'center'}>
            {isParticipating && renderVoteButton()}
            {/* <Button variant='outline' onClick={onViewMore} style={{ color: 'white' }}>
              View More
            </Button> */}
            {renderSubmitButton()}
          </Flex>
        </Flex>
      </Flex>

      <Flex w='1px' h='220px' bg={'#436779'} />

      <Flex>
        <CircleProgressbar
          approved={numOfYesVotes}
          rejected={numOfNoVotes + numOfNoWithVetoVotes}
          pending={0}
          disputed={numOfAbstainVotes}
          totalNeeded={numOfAvailableVotes}
          descriptor={<>In favour of the Proposal</>}
          percentageFormat={true}
        />
      </Flex>

      {voteModalOpen && <VoteModal open={voteModalOpen} setOpen={setVoteModalOpen} onVote={onVote} />}
    </Flex>
  )
}

export default ProposalCard
