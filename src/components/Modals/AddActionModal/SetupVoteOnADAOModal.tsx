import { FlexBox, GridContainer } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Button, Dropdown2 } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { TProposalActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { VoteOption } from 'cosmjs-types/cosmos/gov/v1beta1/gov'
import { useAppSelector } from 'redux/hooks'
import { selectDAOEntities } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { Proposal } from 'types/dao'

export interface DAOVoteData {
  dao: string
  groupAddress: string
  proposalId: string
  vote: VoteOption
}
const initialState: DAOVoteData = {
  dao: '',
  groupAddress: '',
  proposalId: '',
  vote: VoteOption.VOTE_OPTION_ABSTAIN,
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupVoteOnADAOModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<DAOVoteData>(initialState)
  const daos = useAppSelector(selectDAOEntities)
  const groups = useMemo(() => daos.find(({ id }) => id === formData.dao)?.daoGroups ?? {}, [daos, formData.dao])
  const proposals: Proposal[] = useMemo(
    () => groups[formData.groupAddress]?.proposalModule.proposals ?? [],
    [groups, formData.groupAddress],
  )
  const selectedProposal = useMemo(() => {
    const proposal = proposals.find(({ id }) => String(id) === formData.proposalId)
    if (!proposal) {
      return undefined
    }
    return {
      name: proposal.proposal.title || '',
      description: proposal.proposal.description.split('#')[0],
      status: proposal.proposal.status,
      startDate: proposal.proposal.submissionDate,
      endDate: proposal.proposal.closeDate,
    }
  }, [proposals, formData.proposalId])

  const validate = useMemo(() => !!selectedProposal && !!formData.proposalId, [formData, selectedProposal])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
    onSubmit && setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleConfirm = () => {
    onSubmit && onSubmit({ ...action, data: formData })
    onClose()
  }

  return (
    <SetupActionModalTemplate
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={onSubmit && handleConfirm}
      validate={validate}
    >
      <FlexBox width='100%' direction='column' gap={2}>
        <Typography size='xl' weight='medium'>
          Select DAO
        </Typography>
        <Dropdown2
          name='dao'
          value={formData.dao}
          options={daos.map((dao) => ({ value: dao.id, text: dao.profile?.name || '' }))}
          placeholder='Select DAO'
          onChange={(e) => handleUpdateFormData('dao', e.target.value)}
        />
      </FlexBox>

      {Object.keys(groups).length > 0 && (
        <FlexBox width='100%' direction='column' gap={2}>
          <Typography size='xl' weight='medium'>
            Select a group
          </Typography>
          <Dropdown2
            name='groupAddress'
            value={formData.groupAddress}
            options={Object.values(groups).map((group) => ({
              value: group.coreAddress,
              text: group.config.name || '',
            }))}
            placeholder='Select a group'
            onChange={(e) => handleUpdateFormData('groupAddress', e.target.value)}
          />
        </FlexBox>
      )}

      {proposals.length > 0 && (
        <FlexBox width='100%' direction='column' gap={2}>
          <Typography size='xl' weight='medium'>
            Select proposal to vote on
          </Typography>
          <Dropdown2
            name='proposal'
            value={formData.proposalId}
            options={proposals.map((proposal) => ({ value: String(proposal.id), text: proposal.proposal.title || '' }))}
            placeholder='Select a proposal'
            onChange={(e) => handleUpdateFormData('proposalId', e.target.value)}
          />
        </FlexBox>
      )}

      {selectedProposal && (
        <FlexBox width='100%' direction='column' gap={4}>
          <Typography size='xl' weight='medium'>
            {selectedProposal.name}
          </Typography>

          <FlexBox width='100%' direction='column' gap={1}>
            <FlexBox width='100%'>
              <Typography size='md' color='grey700' style={{ flex: '0 0 160px' }}>
                Status
              </Typography>
              <Typography size='md' color='grey700'>
                {selectedProposal.status}
              </Typography>
            </FlexBox>
            <FlexBox width='100%'>
              <Typography size='md' color='grey700' style={{ flex: '0 0 160px' }}>
                Voting Opened
              </Typography>
              {selectedProposal.startDate && (
                <Typography size='md' color='grey700'>
                  {new Date(selectedProposal.startDate).toLocaleString()}
                </Typography>
              )}
            </FlexBox>
            <FlexBox width='100%'>
              <Typography size='md' color='grey700' style={{ flex: '0 0 160px' }}>
                Time Left
              </Typography>
              {selectedProposal.endDate && (
                <Typography size='md' color='grey700'>
                  {new Date(selectedProposal.endDate).toLocaleString()}
                </Typography>
              )}
            </FlexBox>
          </FlexBox>

          <Typography size='md'>{selectedProposal.description}</Typography>
        </FlexBox>
      )}

      {selectedProposal && (
        <FlexBox width='100%' direction='column' gap={2}>
          <Typography size='xl' weight='medium'>
            Vote
          </Typography>

          <GridContainer width='100%' columns={2} gridGap={2}>
            <Button
              variant={formData.vote === VoteOption.VOTE_OPTION_YES ? 'primary' : 'secondary'}
              onClick={() => handleUpdateFormData('vote', VoteOption.VOTE_OPTION_YES)}
              style={{ textTransform: 'unset', width: '100%' }}
            >
              Yes
            </Button>
            <Button
              variant={formData.vote === VoteOption.VOTE_OPTION_NO ? 'primary' : 'secondary'}
              onClick={() => handleUpdateFormData('vote', VoteOption.VOTE_OPTION_NO)}
              style={{ textTransform: 'unset', width: '100%' }}
            >
              No
            </Button>
            <Button
              variant={formData.vote === VoteOption.VOTE_OPTION_NO_WITH_VETO ? 'primary' : 'secondary'}
              onClick={() => handleUpdateFormData('vote', VoteOption.VOTE_OPTION_NO_WITH_VETO)}
              style={{ textTransform: 'unset', width: '100%' }}
            >
              No with Veto
            </Button>
            <Button
              variant={formData.vote === VoteOption.VOTE_OPTION_ABSTAIN ? 'primary' : 'secondary'}
              onClick={() => handleUpdateFormData('vote', VoteOption.VOTE_OPTION_ABSTAIN)}
              style={{ textTransform: 'unset', width: '100%' }}
            >
              Abstain
            </Button>
          </GridContainer>
        </FlexBox>
      )}
    </SetupActionModalTemplate>
  )
}

export default SetupVoteOnADAOModal
