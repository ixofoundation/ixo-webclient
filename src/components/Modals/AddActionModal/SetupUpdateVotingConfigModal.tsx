import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useCurrentDaoGroup } from 'hooks/currentDao'
import { Dropdown2, NumberCounter, Switch } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TProposalActionModel } from 'types/protocol'
import { thresholdToTQData } from 'utils/dao'
import { TitleAndDescription } from './Component'
import SetupActionModalTemplate from './SetupActionModalTemplate'

export interface UpdateProposalConfigData {
  onlyMembersExecute: boolean

  thresholdType: '%' | 'majority'
  thresholdPercentage?: number

  quorumEnabled: boolean
  quorumType: '%' | 'majority'
  quorumPercentage?: number

  proposalDuration: number
  proposalDurationUnits: 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds'

  allowRevoting: boolean
}

export const initialProposalConfigState: UpdateProposalConfigData = {
  onlyMembersExecute: false,
  proposalDuration: 1,
  proposalDurationUnits: 'weeks',
  allowRevoting: true,

  thresholdType: 'majority',
  thresholdPercentage: undefined,

  quorumEnabled: true,
  quorumType: '%',
  quorumPercentage: 0.2,
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupUpdateVotingConfigModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const { coreAddress } = useParams<{ coreAddress: string }>()
  const { daoGroup } = useCurrentDaoGroup(coreAddress)
  const proposalConfig = daoGroup?.proposalModule.proposalConfig
  const [formData, setFormData] = useState<UpdateProposalConfigData>(initialProposalConfigState)

  const validate = useMemo(() => {
    if (formData.thresholdType === '%' && !formData.thresholdPercentage) {
      return false
    }
    if (formData.quorumEnabled && formData.quorumType === '%' && !formData.quorumPercentage) {
      return false
    }
    return true
  }, [formData])

  useEffect(() => {
    if (action.data) {
      setFormData(action.data)
    } else if (proposalConfig) {
      setFormData({
        onlyMembersExecute: proposalConfig.only_members_execute,
        proposalDuration: (proposalConfig.max_voting_period as { time: number }).time,
        proposalDurationUnits: 'seconds',
        allowRevoting: proposalConfig.allow_revoting,
        ...thresholdToTQData(proposalConfig.threshold),
      })
    }
  }, [action.data, proposalConfig])

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
      <FlexBox>
        <Typography size='md'>
          This will update the voting configuration for this DAO. A bad configuration can lock the DAO or create
          unexpected voting outcomes. Take care. If you have questions, please feel free to ask in the IXO Discord.
        </Typography>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <TitleAndDescription
          title={`Voting Duration`}
          description='The amount of time proposals are open for voting. A low proposal duration may increase the speed at which
            your DAO can pass proposals. Setting the duration too low may make it diffcult for proposals to pass as
            voters will have limited time to vote. After this time elapses, the proposal will either pass or fail.'
        />
        <FlexBox gap={4} width='100%'>
          <NumberCounter
            direction='row-reverse'
            value={formData.proposalDuration}
            onChange={(value: number): void => handleUpdateFormData('proposalDuration', value)}
          />
          <Dropdown2
            name='proposal_duration_units'
            value={formData.proposalDurationUnits}
            options={[
              { value: 'weeks', text: 'Weeks' },
              { value: 'days', text: 'Days' },
              { value: 'hours', text: 'Hours' },
              { value: 'minutes', text: 'Minutes' },
              { value: 'seconds', text: 'Seconds' },
            ]}
            onChange={(e) => handleUpdateFormData('proposalDurationUnits', e.target.value)}
            style={{ textAlign: 'center' }}
          />
        </FlexBox>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <TitleAndDescription
          title={`Allow Vote Switching`}
          description='Members will be allowed to change their vote before the voting deadline has expired. This will result in all
          proposals having to complete the full voting duration, even if consensus is reached early.'
        />
        <Switch
          offLabel='NO'
          onLabel='YES'
          value={formData.allowRevoting}
          onChange={(value) => handleUpdateFormData('allowRevoting', value)}
        />
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <TitleAndDescription
          title={`Passing Threshold`}
          description='A majority passing threshold is recommended. Without a majority threshold, the quorum is set by those who
          voted. A proposal could therefore pass with only a minority of the group voting ‘yes’. With a majority
          threshold, as least 50% of the whole group must vote ‘yes’.'
        />
        <FlexBox gap={4} width='100%'>
          {formData.thresholdType === '%' && (
            <NumberCounter
              direction='row-reverse'
              value={formData.thresholdPercentage!}
              onChange={(value: number): void => handleUpdateFormData('thresholdPercentage', value)}
            />
          )}
          <Dropdown2
            value={formData.thresholdType}
            options={[
              { value: '%', text: '%' },
              { value: 'majority', text: 'Majority' },
            ]}
            onChange={(e) => {
              handleUpdateFormData('thresholdType', e.target.value)
              handleUpdateFormData('thresholdPercentage', e.target.value === '%' && 20)
            }}
            style={{ textAlign: 'center' }}
          />
        </FlexBox>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <TitleAndDescription
          title={`Quorum`}
          description='The minimum percentage of voting power that must vote on a proposal for it to be considered a valid vote. If
          the group has many inactive members, setting this value too high may make it difficult to pass proposals.'
        />
        <FlexBox gap={4} width='100%'>
          {formData.quorumType === '%' && (
            <NumberCounter
              direction='row-reverse'
              value={formData.quorumPercentage!}
              onChange={(value: number): void => handleUpdateFormData('quorumPercentage', value)}
            />
          )}
          <Dropdown2
            value={formData.quorumType}
            options={[
              { value: '%', text: '%' },
              { value: 'majority', text: 'Majority' },
            ]}
            onChange={(e) => {
              handleUpdateFormData('quorumType', e.target.value)
              handleUpdateFormData('quorumPercentage', e.target.value === '%' && 20)
            }}
            style={{ textAlign: 'center' }}
          />
        </FlexBox>
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupUpdateVotingConfigModal
