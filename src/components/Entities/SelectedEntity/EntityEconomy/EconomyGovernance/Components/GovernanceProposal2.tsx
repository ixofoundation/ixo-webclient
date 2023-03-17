import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import clsx from 'classnames'
import styled from 'styled-components'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import IMG_expand from 'assets/images/icon-expand.svg'
import IMG_wait from 'assets/images/eco/wait.svg'
import IMG_decision_textfile from 'assets/images/eco/decision/textfile.svg'
import IMG_decision_pdf from 'assets/images/eco/decision/pdf.svg'
import { gridSizes, WidgetWrapper } from 'components/Wrappers/WidgetWrapper'
import {
  ClaimsLabels,
  ClaimsWidget,
  ProgressContainer,
  SectionHeader,
} from 'components/Entities/SelectedEntity/EntityImpact/Overview/Components/Dashboard/Dashboard.styles'
import { CircleProgressbar } from 'components/Widgets/CircleProgressbar/CircleProgressbar'
import moment from 'moment'
import { useAppSelector } from 'redux/hooks'
import CopyToClipboard from 'react-copy-to-clipboard'
import { VoteModal } from 'components/Modals'
import { DashboardThemeContext } from 'components/Dashboard/Dashboard'
import { Box, FlexBox, theme } from 'components/App/App.styles'
import { Status, Vote, VoteInfo } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { useCurrentDaoGroup } from 'hooks/currentDao'
import { fee } from 'lib/protocol'
import * as Toast from 'utils/toast'
import { useIxoConfigs } from 'hooks/configs'
import { serializeCoin } from 'utils/conversions'

const Container = styled.div<{ isDark: boolean }>`
  background: ${(props) =>
    props.isDark ? props.theme.ixoGradientDark2 : 'linear-gradient(180deg, #ffffff 0%, #f2f5fb 100%)'};
  box-shadow: ${(props) =>
    props.isDark ? 'linear-gradient(180deg, #012639 0%, #002D42 97.29%);' : '0px 4px 25px #e1e5ec'};
  border: ${(props) => (props.isDark ? '1px solid #0C3549' : 'unset')};
  border-radius: 4px;
  padding: 20px;
  margin: 0px 0px 30px 0px;
`

const NumberBadget = styled.span<{ isDark: boolean }>`
  background: ${(props) => (props.isDark ? '#033C50' : '#e9edf5')};
  border-radius: 9px;
  padding: 5px 10px;
  color: ${(props): string => props.theme.highlight.light};
  font-size: 14px;
  line-height: 16px;
`
const Title = styled.div`
  font-size: 22px;
  line-height: 28px;
  color: currentColor;
`

const LabelSM = styled.span`
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.3px;
  color: currentColor;

  &.bold {
    font-weight: bold;
  }
`
const LabelLG = styled.span`
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.3px;
  color: currentColor;
`
const Action = styled.button<{ isDark: boolean }>`
  border-radius: 4px;
  padding: 10px 30px;
  border: ${(props): string => props.theme.highlight.light} 1px solid;
  color: currentColor;
  background-color: transparent;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;

  &.disable {
    pointer-events: none;
    border: transparent 1px solid;
    background-color: ${(props) => (props.isDark ? props.theme.ixoDarkBlue : props.theme.ixoGrey300)};
    color: ${(props) => (props.isDark ? props.theme.ixoWhite : props.theme.ixoGrey700)};
  }
`

const DecisionIMG = styled.img`
  height: 30px;
`

interface GovernanceProposalProps {
  coreAddress: string
  proposalId: number
  title: string
  proposer: string
  submissionDate: string
  closeDate: string
  totalDeposit: Coin | undefined | null
  status: Status
}

const GovernanceProposal: React.FunctionComponent<GovernanceProposalProps> = ({
  coreAddress,
  proposalId,
  title,
  proposer,
  submissionDate,
  closeDate,
  status,
  totalDeposit,
}) => {
  const { isDark } = useContext(DashboardThemeContext)
  const { convertToDenom } = useIxoConfigs()
  const { daoGroup, daoProposalSingleClient } = useCurrentDaoGroup(coreAddress)
  const { address } = useAppSelector((state) => state.account)
  const [myVoteStatus, setMyVoteStatus] = useState<VoteInfo | undefined>(undefined)
  const [votes, setVotes] = useState<VoteInfo[]>([])
  const [votingPeriod, setVotingPeriod] = useState<number>(0)
  const [votingRemain, setVotingRemain] = useState<number>(0)
  const [voteModalOpen, setVoteModalOpen] = useState<boolean>(false)

  const groupName = useMemo(() => daoGroup.config.name, [daoGroup.config.name])
  const numOfAvailableVotes = useMemo(() => daoGroup.votingModule.members.length, [daoGroup])
  const numOfYesVotes = useMemo(() => votes.filter(({ vote }) => vote === 'yes').length, [votes])
  const numOfNoVotes = useMemo(() => votes.filter(({ vote, rationale }) => vote === 'no' && !rationale).length, [votes])
  const numOfNoWithVetoVotes = useMemo(
    () => votes.filter(({ vote, rationale }) => vote === 'no' && rationale).length,
    [votes],
  )
  const numOfAbstainVotes = useMemo(
    () => numOfAvailableVotes - numOfYesVotes - numOfNoVotes - numOfNoWithVetoVotes,
    [numOfAvailableVotes, numOfYesVotes, numOfNoVotes, numOfNoWithVetoVotes],
  )

  const getVoteStatus = useCallback(() => {
    daoProposalSingleClient.getVote({ proposalId, voter: address }).then(({ vote }) => {
      setMyVoteStatus(vote!)
    })
    daoProposalSingleClient.listVotes({ proposalId }).then(({ votes }) => {
      setVotes(votes)
    })
  }, [proposalId, address, daoProposalSingleClient])

  const handleVote = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const vote: Vote = { 1: 'yes', 2: 'abstain', 3: 'no', 4: 'no' }[(event.target as any).elements.option.value]

    if (proposalId && vote) {
      daoProposalSingleClient
        .vote({ proposalId, vote }, fee)
        .then(({ transactionHash }) => {
          Toast.successToast(`Successfully voted with '${vote}'`)
          getVoteStatus()
        })
        .catch((e) => {
          console.error('handleVote', e)
          Toast.errorToast(`Failed vote`)
        })
    }
  }

  useEffect(() => {
    getVoteStatus()
  }, [getVoteStatus])

  const remainDateFormat = (min: any): string => {
    const x = moment.utc(min * 60 * 1000)
    const dayNum: number = Number(x.format('D')) - 1
    return `${('0' + dayNum).slice(-2)}d ${x.format('H[h] mm[m]')} `
  }

  const calcPercentage = (limit: number, value: number): number => {
    if (!limit) return 0
    return Number(((value / limit) * 100).toFixed(0))
  }

  const formatDiffThresholds = (value: number): string => {
    if (value >= 0) return `+ ${value}`
    return `- ${Math.abs(value)}`
  }

  useEffect(() => {
    setVotingPeriod(moment.utc(closeDate).diff(moment.utc(submissionDate), 'minutes'))
    setVotingRemain(moment.utc(closeDate).diff(moment().utc(), 'minutes'))
    // eslint-disable-next-line
  }, [])

  return (
    <Container className='container-fluid' isDark={isDark}>
      <div className='row pb-3'>
        <div className='col-6'>
          <div className='d-flex align-items-center justify-content-between'>
            <FlexBox gap={2}>
              <NumberBadget isDark={!isDark}>#{proposalId}</NumberBadget>
              <NumberBadget isDark={isDark}>{groupName}</NumberBadget>
            </FlexBox>
            <img src={IMG_expand} alt='message' height='30px' />
          </div>
        </div>
      </div>
      <div className='row'>
        <Box className='col-12 col-lg-6' borderRight={`1px solid ${theme.ixoGrey300}`}>
          <Title className='pb-3'>{title}</Title>

          <div className='d-flex align-items-center'>
            <img src={IMG_wait} alt='remain' height='20px' />
            <div className='d-inline-block w-100 pl-3'>
              <ProgressBar
                total={votingPeriod}
                approved={votingRemain}
                rejected={0}
                height={22}
                activeBarColor='#39c3e6'
                barColor={isDark ? '#143F54' : undefined}
                closedText={votingRemain > votingPeriod ? 'Closed' : ''}
              />
            </div>
          </div>

          <div className='text-right'>
            <LabelSM className='bold'>{votingRemain > 0 && remainDateFormat(votingRemain)}</LabelSM>
            <LabelSM>{votingRemain > 0 ? 'remaining' : 'Voting period is now closed'}</LabelSM>
          </div>

          <div className='row'>
            <div className='col-6 pb-3'>
              <LabelSM>Proposed by</LabelSM>
              <br />
              <LabelLG style={{ cursor: 'pointer' }} title='Click to copy'>
                <CopyToClipboard text={proposer} onCopy={() => Toast.successToast('Coiped to clipboard')}>
                  <span>
                    {proposer.substring(0, 10)}
                    {proposer && '...'}
                  </span>
                </CopyToClipboard>
              </LabelLG>
            </div>
            {totalDeposit && (
              <div className='col-6 pb-3'>
                <LabelSM>Deposit</LabelSM>
                <br />
                <LabelLG style={{ textTransform: 'uppercase' }}>{serializeCoin(convertToDenom(totalDeposit))}</LabelLG>
              </div>
            )}
          </div>
          <div className='row'>
            <div className='col-6 pb-3'>
              <LabelSM>Submission Date</LabelSM>
              <br />
              <LabelLG>{moment.utc(submissionDate).format('YYYY-MM-DD [at] HH:mm [UTC]')}</LabelLG>
            </div>
            <div className='col-6 pb-3'>
              <LabelSM>{votingRemain > 0 ? 'Closes' : 'Closed'}</LabelSM>
              <br />
              <LabelLG>{moment.utc(closeDate).format('YYYY-MM-DD [at] HH:mm [UTC]')}</LabelLG>
            </div>
          </div>

          <div className='d-flex justify-content-between align-items-center pt-2'>
            <Action
              isDark={isDark}
              className={clsx({ disable: status === 'open' && !!myVoteStatus })}
              onClick={(): void => setVoteModalOpen(true)}
            >
              {status === 'open' && !myVoteStatus ? 'New Vote' : 'My Vote'}
            </Action>
            <div>
              <DecisionIMG className='pr-2' src={IMG_decision_textfile} alt='decision1' />
              <DecisionIMG src={IMG_decision_pdf} alt='decision2' />
            </div>
          </div>

          <LabelSM className='bold'>{numOfYesVotes.toLocaleString()} YES</LabelSM>
          <LabelSM>{` (of ${numOfAvailableVotes.toLocaleString()} available)`}</LabelSM>
        </Box>
        <div className='col-12 col-lg-6'>
          <WidgetWrapper title='' gridHeight={gridSizes.standard} light={true} padding={false}>
            <ClaimsWidget className='p-0 m-0'>
              <ClaimsLabels>
                <div className='pl-0'>
                  <SectionHeader>
                    <strong>Current status: Proposal Passes</strong>
                  </SectionHeader>
                  <div className='pl-4'>
                    <p>
                      <strong>{numOfYesVotes}</strong> Yes ({calcPercentage(numOfAvailableVotes, numOfYesVotes)}%)
                    </p>
                    <p>
                      <strong>{numOfNoVotes}</strong> No ({calcPercentage(numOfAvailableVotes, numOfNoVotes)}%)
                    </p>
                    <p>
                      <strong>{numOfNoWithVetoVotes}</strong> No with Veto (
                      {calcPercentage(numOfAvailableVotes, numOfNoWithVetoVotes)}%)
                    </p>
                    <p>
                      <strong>{numOfAbstainVotes}</strong> have not yet voted (
                      {calcPercentage(numOfAvailableVotes, numOfAbstainVotes)}%)
                    </p>
                  </div>
                </div>
                <div className='mt-2'>
                  <SectionHeader>
                    <strong>Consensus thresholds</strong>
                  </SectionHeader>
                  <div className='pl-5'>
                    <div>
                      <strong>
                        {formatDiffThresholds(
                          calcPercentage(numOfAvailableVotes, numOfYesVotes + numOfNoVotes + numOfNoWithVetoVotes) - 40,
                        )}
                      </strong>
                      % more than the quorum of 40%
                    </div>
                    <div>
                      <strong>
                        {formatDiffThresholds(
                          calcPercentage(numOfAvailableVotes - numOfAbstainVotes, numOfYesVotes) - 50,
                        )}
                      </strong>
                      % in favour over the 50% required
                    </div>
                    <div>
                      <strong>
                        {formatDiffThresholds(
                          calcPercentage(numOfAvailableVotes - numOfAbstainVotes, numOfNoWithVetoVotes) - 33,
                        )}
                      </strong>
                      % under the 33% required to veto
                    </div>
                  </div>
                </div>
              </ClaimsLabels>
              <ProgressContainer>
                <CircleProgressbar
                  approved={numOfYesVotes}
                  rejected={numOfNoVotes + numOfNoWithVetoVotes}
                  pending={numOfAbstainVotes}
                  totalNeeded={numOfAvailableVotes}
                  descriptor={<>In favour of the Proposal</>}
                  percentageFormat={true}
                />
              </ProgressContainer>
            </ClaimsWidget>
          </WidgetWrapper>
        </div>
      </div>
      <VoteModal
        open={voteModalOpen}
        setOpen={setVoteModalOpen}
        givenProposalId={String(proposalId)}
        onSubmit={handleVote}
      />
    </Container>
  )
}

export default GovernanceProposal
