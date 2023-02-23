import { FlexBox, GridContainer } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Button, Dropdown2 } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { VoteOption } from 'cosmjs-types/cosmos/gov/v1beta1/gov'

export interface GovernanceVoteData {
  proposalId: string
  vote: VoteOption
}
const initialState: GovernanceVoteData = {
  proposalId: '',
  vote: VoteOption.VOTE_OPTION_ABSTAIN,
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupVoteOnAGovernanceProposalModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<GovernanceVoteData>(initialState)
  const proposalInfo = useMemo(() => {
    return {
      name: 'Juno v12 Upgrade',
      status: 'Voting Period',
      startDate: '02/13/2023, 11:13 PM GMT+1',
      endDate: '03/13/2023, 11:13 PM GMT+1',
      timeLeft: '4 days',
    }
  }, [])

  const validate = useMemo(() => !!formData.proposalId, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
    setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleConfirm = () => {
    onSubmit({ ...action, data: formData })
    onClose()
  }

  return (
    <SetupActionModalTemplate
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={handleConfirm}
      validate={validate}
    >
      <FlexBox width='100%' direction='column' gap={2}>
        <Typography size='xl' weight='medium'>
          Select proposal to vote on
        </Typography>
        <Dropdown2
          name='proposal'
          value={formData.proposalId}
          options={[
            { value: '1', text: '1' },
            { value: '2', text: '2' },
            { value: '3', text: '3' },
          ]}
          placeholder='Select a proposal'
          onChange={(e) => handleUpdateFormData('proposalId', e.target.value)}
        />
      </FlexBox>

      <FlexBox width='100%' direction='column' gap={4}>
        <Typography size='xl' weight='medium'>
          #Juno v 12 Upgrade
        </Typography>

        <FlexBox width='100%' direction='column' gap={1}>
          <FlexBox width='100%'>
            <Typography size='md' color='grey700' style={{ flex: '0 0 160px' }}>
              Status
            </Typography>
            <Typography size='md' color='grey700'>
              {proposalInfo.status}
            </Typography>
          </FlexBox>
          <FlexBox width='100%'>
            <Typography size='md' color='grey700' style={{ flex: '0 0 160px' }}>
              Voting Opened
            </Typography>
            <Typography size='md' color='grey700'>
              {proposalInfo.startDate}
            </Typography>
          </FlexBox>
          <FlexBox width='100%'>
            <Typography size='md' color='grey700' style={{ flex: '0 0 160px' }}>
              Time Left
            </Typography>
            <Typography size='md' color='grey700'>
              {proposalInfo.timeLeft}
            </Typography>
          </FlexBox>
        </FlexBox>

        <Typography size='md'>
          {`To reduce spamming in the Juno governance system, we propose requiring a 20% deposit (200 JUNO) on proposal
          creation. This will ensure that only quality proposals are submitted and deter malicious governance spam.
          Should you wish to make a proposal, but don't have 200 Juno, you can reach out to a member of the core team or
          Sub-DAOs for assistance. The minimum deposit is meant to deter spam, not participation. Tag v12.0.0-beta.1 has
          been tested on our testnet, uni-6, and will be finalized as v12.0.0 if this proposal passes. NOTE This
          subsequently renames the previous v12 upgrade to v13 from our medium blog post Provided this upgrade passes,
          it is scheduled for block 7075551. Roughly expected Monday, February 20th around 1700UTC.`}
        </Typography>
      </FlexBox>

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
    </SetupActionModalTemplate>
  )
}

export default SetupVoteOnAGovernanceProposalModal
