import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import clsx from 'classnames'
import styled from 'styled-components'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { ReactComponent as ExpandIcon } from 'assets/images/icon-expand-alt.svg'

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
import CopyToClipboard from 'react-copy-to-clipboard'
import { VoteModal2 } from 'components/Modals'
import { DashboardThemeContext } from 'components/Dashboard/Dashboard'
import { Box, FlexBox, SvgBox, theme } from 'components/App/App.styles'
import {
  Status,
  Vote,
  VoteInfo,
  Config as ProposalConfig,
} from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { useCurrentDaoGroup } from 'hooks/currentDao'
import { fee } from 'lib/protocol'
import * as Toast from 'utils/toast'
import { useIxoConfigs } from 'hooks/configs'
import { serializeCoin } from 'utils/conversions'
import { useHistory } from 'react-router-dom'
import { truncateString, votingRemainingDateFormat } from 'utils/formatters'
import { contracts } from '@ixo/impactxclient-sdk'
import { useAccount } from 'hooks/account'

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
  status: Status
  deedDid: string | undefined
  onUpdate: () => void
}

const GovernanceProposal: React.FunctionComponent<GovernanceProposalProps> = ({
  coreAddress,
  proposalId,
  title,
  proposer,
  submissionDate,
  closeDate,
  status,
  deedDid,
  onUpdate,
}) => {
  const history = useHistory()
  const { isDark } = useContext(DashboardThemeContext)
  const { convertToDenom } = useIxoConfigs()
  const { daoGroup, proposalModuleAddress, isParticipating, depositInfo } = useCurrentDaoGroup(coreAddress)
  const { cosmWasmClient, address } = useAccount()
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
  const numOfAbstainVotes = useMemo(() => votes.filter(({ vote }) => vote === 'abstain').length, [votes])
  const numOfEmptyVotes = useMemo(
    () => numOfAvailableVotes - numOfYesVotes - numOfNoVotes - numOfNoWithVetoVotes - numOfAbstainVotes,
    [numOfAvailableVotes, numOfYesVotes, numOfNoVotes, numOfNoWithVetoVotes, numOfAbstainVotes],
  )
  const proposalConfig: ProposalConfig | undefined = useMemo(() => daoGroup?.proposalModule.proposalConfig, [daoGroup])

  const daoProposalSingleClient = useMemo(
    () => new contracts.DaoProposalSingle.DaoProposalSingleClient(cosmWasmClient, address, proposalModuleAddress),
    [proposalModuleAddress, cosmWasmClient, address],
  )

  const getVoteStatus = useCallback(() => {
    daoProposalSingleClient.getVote({ proposalId, voter: address }).then(({ vote }) => {
      setMyVoteStatus(vote!)
    })
    daoProposalSingleClient.listVotes({ proposalId }).then(({ votes }) => {
      setVotes(votes)
    })
  }, [proposalId, address, daoProposalSingleClient])

  const handleVote = async (vote: Vote): Promise<string> => {
    return daoProposalSingleClient
      .vote({ proposalId, vote }, fee, undefined, depositInfo ? [depositInfo] : undefined)
      .then(({ transactionHash }) => {
        getVoteStatus()
        return transactionHash
      })
      .catch((e) => {
        console.error('handleVote', e)
        return ''
      })
  }

  const handleExecuteProposal = () => {
    daoProposalSingleClient
      .execute({ proposalId }, fee, undefined, depositInfo ? [depositInfo] : undefined)
      .then(({ transactionHash, logs }) => {
        console.log('handleExecuteProposal', transactionHash, logs)
        if (transactionHash) {
          onUpdate()
          Toast.successToast(null, 'Successfully executed proposal')
        }
      })
      .catch((e) => {
        console.error('handleExecuteProposal', e)
        Toast.errorToast(null, 'Transaction failed')
      })
  }

  const handleCloseProposal = () => {
    daoProposalSingleClient
      .close({ proposalId }, fee, undefined, depositInfo ? [depositInfo] : undefined)
      .then(({ transactionHash, logs }) => {
        console.log('handleCloseProposal', transactionHash, logs)
        if (transactionHash) {
          onUpdate()
          Toast.successToast(null, 'Successfully closed proposal')
        }
      })
      .catch((e) => {
        console.error('handleCloseProposal', e)
        Toast.errorToast(null, 'Transaction failed')
      })
  }

  useEffect(() => {
    getVoteStatus()
  }, [getVoteStatus])

  const calcPercentage = (limit: number, value: number): number => {
    if (!limit) return 0
    return Number(((value / limit) * 100).toFixed(0))
  }

  // const formatDiffThresholds = (value: number): string => {
  //   if (value >= 0) return `+ ${value}`
  //   return `- ${Math.abs(value)}`
  // }

  useEffect(() => {
    setVotingPeriod(moment.utc(closeDate).diff(moment.utc(submissionDate), 'minutes'))
    setVotingRemain(moment.utc(closeDate).diff(moment().utc(), 'minutes'))
    // eslint-disable-next-line
  }, [])

  return (
    <Container className='container-fluid' isDark={isDark}>
      <div className='row pb-3'>
        <div className='col-12'>
          <div className='d-flex align-items-center justify-content-between'>
            <FlexBox gap={2}>
              <NumberBadget isDark={!isDark}>#{proposalId}</NumberBadget>
              <NumberBadget isDark={isDark}>{groupName}</NumberBadget>
            </FlexBox>
            {deedDid && (
              <SvgBox cursor='pointer' svgWidth={6} onClick={() => history.push(`/entity/${deedDid}/overview`)}>
                <ExpandIcon />
              </SvgBox>
            )}
          </div>
        </div>
      </div>
      <div className='row'>
        <Box className='col-12 col-lg-6' borderRight={`1px solid ${theme.ixoGrey300}`}>
          <Title className='pb-3'>{title}</Title>

          <div className='d-flex align-items-center'>
            <img src={IMG_wait} alt='remain' width='10px' height='20px' />
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
            <LabelSM className='bold'>{votingRemain > 0 && votingRemainingDateFormat(votingRemain)}</LabelSM>
            <LabelSM>{votingRemain > 0 ? 'remaining' : 'Voting period is now closed'}</LabelSM>
          </div>

          <div className='row'>
            <div className='col-6 pb-3'>
              <LabelSM>Proposed by</LabelSM>
              <br />
              <LabelLG style={{ cursor: 'pointer' }} title='Click to copy'>
                <CopyToClipboard text={proposer} onCopy={() => Toast.successToast(null, 'Coiped to clipboard')}>
                  <span>{truncateString(proposer, 20, 'middle')}</span>
                </CopyToClipboard>
              </LabelLG>
            </div>
            {depositInfo && (
              <div className='col-6 pb-3'>
                <LabelSM>Deposit</LabelSM>
                <br />
                <LabelLG style={{ textTransform: 'uppercase' }}>{serializeCoin(convertToDenom(depositInfo))}</LabelLG>
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
            <FlexBox gap={4}>
              <Action
                isDark={isDark}
                className={clsx({ disable: status !== 'open' || !!myVoteStatus || !isParticipating })}
                onClick={(): void => setVoteModalOpen(true)}
              >
                {status === 'open' && !myVoteStatus ? 'New Vote' : 'My Vote'}
              </Action>
              {status === 'passed' && (!proposalConfig.only_members_execute || isParticipating) && (
                <Action isDark={isDark} onClick={handleExecuteProposal}>
                  Execute
                </Action>
              )}
              {status === 'rejected' && (
                <Action isDark={isDark} onClick={handleCloseProposal}>
                  Close
                </Action>
              )}
            </FlexBox>
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
                  <div>
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
                      <strong>{numOfAbstainVotes}</strong> Abstain (
                      {calcPercentage(numOfAvailableVotes, numOfAbstainVotes)}%)
                    </p>
                    <p>
                      <strong>{numOfEmptyVotes}</strong> have not yet voted (
                      {calcPercentage(numOfAvailableVotes, numOfEmptyVotes)}%)
                    </p>
                  </div>
                </div>
                <div className='mt-2'>
                  <SectionHeader>
                    <strong>Consensus thresholds</strong>
                  </SectionHeader>
                  {/* <div>
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
                  </div> */}
                  <div>
                    <div>
                      <strong>+ 10</strong>% more than the quorum of 40%
                    </div>
                    <div>
                      <strong>+ 14</strong>% in favour over the 50% required
                    </div>
                    <div>
                      <strong>- 7</strong>% under the 33% required to veto
                    </div>
                  </div>
                </div>
              </ClaimsLabels>
              <ProgressContainer>
                <CircleProgressbar
                  approved={numOfYesVotes}
                  rejected={numOfNoVotes + numOfNoWithVetoVotes}
                  pending={numOfEmptyVotes}
                  disputed={numOfAbstainVotes}
                  totalNeeded={numOfAvailableVotes}
                  descriptor={<>In favour of the Proposal</>}
                  percentageFormat={true}
                />
              </ProgressContainer>
            </ClaimsWidget>
          </WidgetWrapper>
        </div>
      </div>
      {voteModalOpen && <VoteModal2 open={voteModalOpen} setOpen={setVoteModalOpen} onVote={handleVote} />}
    </Container>
  )
}

export default GovernanceProposal
