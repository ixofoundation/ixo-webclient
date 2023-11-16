import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import clsx from 'classnames'
import styled, { useTheme } from 'styled-components'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { ReactComponent as ExpandIcon } from 'assets/images/icon-expand-alt.svg'

import IMG_wait from 'assets/images/eco/wait.svg'
import { gridSizes, WidgetWrapper } from 'components/Wrappers/WidgetWrapper'
import { CircleProgressbar } from 'components/Widgets/CircleProgressbar/CircleProgressbar'
import moment from 'moment'
import CopyToClipboard from 'react-copy-to-clipboard'
import { VoteModal } from 'components/Modals'
import { DashboardThemeContext } from 'components/Dashboard/Dashboard'
import { Box, FlexBox, SvgBox } from 'components/App/App.styles'
import {
  Status,
  Vote,
  VoteInfo,
  Config as ProposalConfig,
} from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { fee } from 'lib/protocol'
import * as Toast from 'utils/toast'
import { serializeCoin } from 'utils/conversions'
import { useHistory, useParams } from 'react-router-dom'
import { getDifference, thousandSeparator, truncateString, votingRemainingDateFormat } from 'utils/formatters'
import { contracts } from '@ixo/impactxclient-sdk'
import { useAccount } from 'hooks/account'
import { SingleChoiceProposal } from '@ixo/impactxclient-sdk/types/codegen/DaoMigrator.types'
import { proposalMsgToActionConfig } from 'utils/dao'
import { useAppSelector } from 'redux/hooks'
import { selectEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { serviceEndpointToUrl } from 'utils/entities'
import useCurrentEntity, { useCurrentEntityDAOGroup } from 'hooks/currentEntity'
import { TEntityModel, TProposalActionModel } from 'types/entities'
import { EntityLinkedResourceConfig, ProposalActionConfigMap } from 'constants/entity'
import { Typography } from 'components/Typography'
import { getDisplayAmount } from 'utils/currency'

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

  &.disable,
  &:disabled {
    pointer-events: none;
    border: transparent 1px solid;
    background-color: ${(props) => (props.isDark ? props.theme.ixoDarkBlue : props.theme.ixoGrey300)};
    color: ${(props) => (props.isDark ? props.theme.ixoWhite : props.theme.ixoGrey700)};
  }
`

const calcPercentage = (limit: number, value: number): number => {
  if (!limit) return 0
  return Number(((value / limit) * 100).toFixed(0))
}

interface GovernanceProposalProps {
  coreAddress: string
  proposalId: number
  title: string
  proposer: string
  submissionDate: string
  closeDate: string
  status: Status
  deedDid: string | undefined
  proposal: SingleChoiceProposal
  onUpdate?: () => void
}

const GovernanceProposal: React.FunctionComponent<GovernanceProposalProps> = ({
  coreAddress,
  proposal,
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
  const theme: any = useTheme()
  const { entityId } = useParams<{ entityId: string }>()
  const { isDark } = useContext(DashboardThemeContext)
  const { isImpactsDAO, isMemberOfImpactsDAO, isOwner, daoController, refetchAndUpdate } = useCurrentEntity()
  const { daoGroup, proposalModuleAddress, isParticipating, depositInfo, tqData } =
    useCurrentEntityDAOGroup(coreAddress)
  const { cwClient, cosmWasmClient, address } = useAccount()

  const [myVoteStatus, setMyVoteStatus] = useState<VoteInfo | undefined>(undefined)
  const [votes, setVotes] = useState<VoteInfo[]>([])
  const [votingPeriod, setVotingPeriod] = useState<number>(0)
  const [votingRemain, setVotingRemain] = useState<number>(0)
  const [voteModalOpen, setVoteModalOpen] = useState<boolean>(false)
  const [selectedAction, setSelectedAction] = useState<TProposalActionModel | undefined>()
  const SetupModal = useMemo(() => {
    if (!selectedAction) {
      return undefined
    }
    try {
      return ProposalActionConfigMap[selectedAction.type!].setupModal
    } catch (e) {
      return undefined
    }
  }, [selectedAction])

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
  const perOfYesVotes = useMemo(() => (numOfYesVotes / numOfAvailableVotes) * 100, [numOfAvailableVotes, numOfYesVotes])
  const proposalConfig: ProposalConfig | undefined = useMemo(() => daoGroup?.proposalModule.proposalConfig, [daoGroup])
  const proposalActions: TProposalActionModel[] = useMemo(
    () => proposal.msgs.map(proposalMsgToActionConfig).filter(Boolean),
    [proposal],
  )
  const deedId: string = useMemo(() => proposal.description.split('#deed:').pop() || '', [proposal])
  const deedEntity: TEntityModel | undefined = useAppSelector(selectEntityById(deedId))
  const linkedFiles: LinkedResource[] = useMemo(
    () =>
      deedEntity?.linkedResource.filter((item: LinkedResource) =>
        Object.keys(EntityLinkedResourceConfig).includes(item.type),
      ) ?? [],
    [deedEntity],
  )

  /**
   * Actions
   */

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

  const handleVote = async (vote: Vote): Promise<string> => {
    const daoProposalSingleClient = new contracts.DaoProposalSingle.DaoProposalSingleClient(
      cosmWasmClient,
      address,
      proposalModuleAddress,
    )
    return daoProposalSingleClient
      .vote({ proposalId, vote }, fee, undefined, undefined)
      .then(({ transactionHash }) => {
        getVoteStatus()
        return transactionHash
      })
      .catch((e) => {
        console.error('handleVote', e)
        return ''
      })
      .finally(refetchAndUpdate)
  }

  const handleExecuteProposal = () => {
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
          onUpdate && onUpdate()
          Toast.successToast(null, 'Successfully executed proposal')
        }
      })
      .catch((e) => {
        console.error('handleExecuteProposal', e)
        Toast.errorToast(null, 'Transaction failed')
      })
      .finally(refetchAndUpdate)
  }

  const handleCloseProposal = () => {
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
          onUpdate && onUpdate()
          Toast.successToast(null, 'Successfully closed proposal')
        }
      })
      .catch((e) => {
        console.error('handleCloseProposal', e)
        Toast.errorToast(null, 'Transaction failed')
      })
      .finally(refetchAndUpdate)
  }

  useEffect(() => {
    getVoteStatus()
    return () => {
      setMyVoteStatus(undefined)
      setVotes([])
    }
  }, [getVoteStatus])

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
              <SvgBox
                cursor='pointer'
                svgWidth={6}
                onClick={() => history.push(`/entity/${entityId}/overview/proposal/${deedDid}`)}
              >
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
                activeBarColor={theme.ixoNewBlue}
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
                <CopyToClipboard text={proposer} onCopy={() => Toast.successToast(null, 'Copied to clipboard')}>
                  <span>{truncateString(proposer, 20, 'middle')}</span>
                </CopyToClipboard>
              </LabelLG>
            </div>
            {depositInfo && (
              <div className='col-6 pb-3'>
                <LabelSM>Deposit</LabelSM>
                <br />
                <LabelLG style={{ textTransform: 'uppercase' }}>
                  {serializeCoin({
                    amount: thousandSeparator(getDisplayAmount(depositInfo.amount), ','),
                    denom: 'ixo',
                  })}
                </LabelLG>
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
                className={clsx({ disable: status !== 'open' || !!myVoteStatus })}
                onClick={(): void => setVoteModalOpen(true)}
                disabled={
                  !isParticipating ||
                  (isImpactsDAO && daoController === daoGroup.coreAddress && !isMemberOfImpactsDAO && !isOwner)
                }
              >
                {status === 'open' && !myVoteStatus ? 'New Vote' : 'My Vote'}
              </Action>
              {status === 'passed' && (!proposalConfig?.only_members_execute || isParticipating) && (
                <Action
                  isDark={isDark}
                  onClick={handleExecuteProposal}
                  disabled={
                    !isParticipating ||
                    (isImpactsDAO && daoController === daoGroup.coreAddress && !isMemberOfImpactsDAO && !isOwner)
                  }
                >
                  Execute
                </Action>
              )}
              {status === 'rejected' && (
                <Action
                  isDark={isDark}
                  onClick={handleCloseProposal}
                  disabled={
                    !isParticipating ||
                    (isImpactsDAO && daoController === daoGroup.coreAddress && !isMemberOfImpactsDAO && !isOwner)
                  }
                >
                  Close
                </Action>
              )}
            </FlexBox>
            <FlexBox gap={3}>
              {/* {proposalActions.map((action, index) => {
                const Icon = ProposalActionConfigMap[action.type!]?.icon
                return (
                  <SvgBox
                    key={index}
                    width='35px'
                    height='35px'
                    alignItems='center'
                    justifyContent='center'
                    border={`1px solid ${theme.ixoNewBlue}`}
                    borderRadius='4px'
                    svgWidth={5}
                    svgHeight={5}
                    color={theme.ixoNewBlue}
                    cursor='pointer'
                    hover={{ background: theme.ixoNewBlue, color: theme.ixoWhite }}
                    transition='.2s all'
                    onClick={() => setSelectedAction(action)}
                  >
                    {Icon && <Icon />}
                  </SvgBox>
                )
              })} */}
              {linkedFiles.map((file, index) => {
                const { type, serviceEndpoint } = file
                const Icon = EntityLinkedResourceConfig[type].icon
                const to = serviceEndpointToUrl(serviceEndpoint, deedEntity?.service ?? [])
                return (
                  <a href={to} target='_blank' rel='noreferrer' key={index}>
                    <SvgBox
                      width='35px'
                      height='35px'
                      alignItems='center'
                      justifyContent='center'
                      border={`1px solid ${theme.ixoNewBlue}`}
                      borderRadius='4px'
                      svgWidth={5}
                      svgHeight={5}
                      color={theme.ixoNewBlue}
                      cursor='pointer'
                      hover={{ background: theme.ixoNewBlue, color: theme.ixoWhite }}
                      transition='.2s all'
                    >
                      {Icon && <Icon />}
                    </SvgBox>
                  </a>
                )
              })}
              {proposalActions
                .filter((action) => !!action.type && !!ProposalActionConfigMap[action.type])
                .map((action, index) => {
                  const Icon = ProposalActionConfigMap[action.type!].icon
                  return (
                    <SvgBox
                      key={index}
                      width='35px'
                      height='35px'
                      alignItems='center'
                      justifyContent='center'
                      border={`1px solid ${theme.ixoNewBlue}`}
                      borderRadius='4px'
                      svgWidth={5}
                      svgHeight={5}
                      color={theme.ixoNewBlue}
                      cursor='pointer'
                      hover={{ background: theme.ixoNewBlue, color: theme.ixoWhite }}
                      transition='.2s all'
                      onClick={() => setSelectedAction(action)}
                    >
                      {Icon && <Icon />}
                    </SvgBox>
                  )
                })}
            </FlexBox>
          </div>

          <LabelSM className='bold'>{numOfYesVotes.toLocaleString()} YES</LabelSM>
          <LabelSM>{` (of ${numOfAvailableVotes.toLocaleString()} available)`}</LabelSM>
        </Box>
        <div className='col-12 col-lg-6'>
          <WidgetWrapper title='' gridHeight={gridSizes.standard} light={true} padding={false}>
            <FlexBox className='p-0 m-0' justifyContent='space-between'>
              <FlexBox direction='column' gap={5}>
                <FlexBox direction='column'>
                  <FlexBox mb={2}>
                    <Typography variant='secondary' weight='bold'>
                      Current status: Proposal Passes
                    </Typography>
                  </FlexBox>
                  <FlexBox direction='column'>
                    <Typography variant='secondary' weight='thin'>
                      <strong>{numOfYesVotes}</strong> Yes ({calcPercentage(numOfAvailableVotes, numOfYesVotes)}%)
                    </Typography>
                    <Typography variant='secondary' weight='thin'>
                      <strong>{numOfNoVotes}</strong> No ({calcPercentage(numOfAvailableVotes, numOfNoVotes)}%)
                    </Typography>
                    <Typography variant='secondary' weight='thin'>
                      <strong>{numOfNoWithVetoVotes}</strong> No with Veto (
                      {calcPercentage(numOfAvailableVotes, numOfNoWithVetoVotes)}%)
                    </Typography>
                    <Typography variant='secondary' weight='thin'>
                      <strong>{numOfAbstainVotes}</strong> Abstain (
                      {calcPercentage(numOfAvailableVotes, numOfAbstainVotes)}%)
                    </Typography>
                    <Typography variant='secondary' weight='thin'>
                      <strong>{numOfEmptyVotes}</strong> have not yet voted (
                      {calcPercentage(numOfAvailableVotes, numOfEmptyVotes)}%)
                    </Typography>
                  </FlexBox>
                </FlexBox>
                <FlexBox direction='column'>
                  <FlexBox mb={2}>
                    <Typography variant='secondary' weight='bold'>
                      Consensus thresholds
                    </Typography>
                  </FlexBox>
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
                  <FlexBox direction='column'>
                    {tqData?.quorumPercentage && (
                      <Typography variant='secondary' weight='thin'>
                        <strong>{getDifference(perOfYesVotes, tqData.quorumPercentage)}</strong>% more than the quorum
                        of {tqData.quorumPercentage}%
                      </Typography>
                    )}
                    <Typography variant='secondary'>
                      <strong>+ 14</strong>% in favour over the 50% required
                    </Typography>
                    <Typography variant='secondary'>
                      <strong>- 7</strong>% under the 33% required to veto
                    </Typography>
                  </FlexBox>
                </FlexBox>
              </FlexBox>
              <FlexBox>
                <CircleProgressbar
                  approved={numOfYesVotes}
                  rejected={numOfNoVotes + numOfNoWithVetoVotes}
                  pending={numOfEmptyVotes}
                  disputed={numOfAbstainVotes}
                  totalNeeded={numOfAvailableVotes}
                  descriptor={<>In favour of the Proposal</>}
                  percentageFormat={true}
                />
              </FlexBox>
            </FlexBox>
          </WidgetWrapper>
        </div>
      </div>
      {voteModalOpen && <VoteModal open={voteModalOpen} setOpen={setVoteModalOpen} onVote={handleVote} />}
      {SetupModal && (
        <SetupModal open={!!SetupModal} action={selectedAction} onClose={() => setSelectedAction(undefined)} />
      )}
    </Container>
  )
}

export default React.memo(GovernanceProposal)
