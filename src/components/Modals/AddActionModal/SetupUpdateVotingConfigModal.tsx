import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Dropdown, NumberCounter, Switch } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'

const initialState = {
  votingDuration: {
    unit: 'day', // 'day' | 'month' | 'week'
    amount: 1,
  },
  voteSwitching: false,
  passingThreshold: {
    majority: {},
    percent: undefined,
  },
  quorum: {
    percent: 20,
    majority: undefined,
  },
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupUpdateVotingConfigModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)

  const validate = useMemo(() => formData.votingDuration.amount, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
    setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleUpdatePassingThreshold = (key: string, value: any): void => {
    handleUpdateFormData('passingThreshold', { [key]: value })
  }
  const handleUpdateQuorum = (key: string, value: any): void => {
    handleUpdateFormData('quorum', { [key]: value })
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
      <FlexBox direction='column' width='100%' gap={2}>
        <Typography size='xl' weight='medium'>
          Voting Duration
        </Typography>
        <FlexBox width='100%' direction='column' gap={4}>
          <Typography size='md'>
            The amount of time proposals are open for voting. A low proposal duration may increase the speed at which
            your DAO can pass proposals. Setting the duration too low may make it diffcult for proposals to pass as
            voters will have limited time to vote. After this time elapses, the proposal will either pass or fail.
          </Typography>
          <FlexBox gap={4} width='100%'>
            <NumberCounter
              direction='row-reverse'
              value={formData.votingDuration?.amount ?? 0}
              onChange={(value: number): void =>
                handleUpdateFormData('votingDuration', { ...formData.votingDuration, amount: value })
              }
            />
            <Dropdown
              name='voting_unit'
              value={formData.votingDuration?.unit ?? 'day'}
              options={['second', 'minute', 'hour', 'day', 'week']}
              hasArrow={false}
              onChange={(e) =>
                handleUpdateFormData('votingDuration', { ...formData.votingDuration, unit: e.target.value })
              }
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography size='xl' weight='medium'>
          Allow Vote Switching
        </Typography>
        <FlexBox width='100%' direction='column' gap={4}>
          <Typography size='md'>
            Members will be allowed to change their vote before the voting deadline has expired. This will result in all
            proposals having to complete the full voting duration, even if consensus is reached early.
          </Typography>
          <Switch
            offLabel='NO'
            onLabel='YES'
            value={formData.voteSwitching}
            onChange={(value) => handleUpdateFormData('voteSwitching', value)}
          />
        </FlexBox>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography size='xl' weight='medium'>
          Passing Threshold
        </Typography>
        <FlexBox width='100%' direction='column' gap={4}>
          <Typography size='md'>
            A majority passing threshold is recommended. Without a majority threshold, the quorum is set by those who
            voted. A proposal could therefore pass with only a minority of the group voting ‘yes’. With a majority
            threshold, as least 50% of the whole group must vote ‘yes’.
          </Typography>
          <FlexBox gap={4} width='100%'>
            {formData.passingThreshold?.percent && (
              <NumberCounter
                direction='row-reverse'
                value={formData.passingThreshold.percent ?? 0}
                onChange={(value: number): void => handleUpdatePassingThreshold('percent', value)}
              />
            )}
            <Dropdown
              hasArrow={false}
              value={Object.keys(formData.passingThreshold)[0] ?? 'majority'}
              options={['%', 'majority']}
              onChange={(e) =>
                handleUpdatePassingThreshold(
                  e.target.value === '%' ? 'percent' : e.target.value,
                  e.target.value === '%' ? 20 : {},
                )
              }
              style={{ textAlign: 'center' }}
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography size='xl' weight='medium'>
          Quorum
        </Typography>
        <FlexBox width='100%' direction='column' gap={4}>
          <Typography size='md'>
            The minimum percentage of voting power that must vote on a proposal for it to be considered a valid vote. If
            the group has many inactive members, setting this value too high may make it difficult to pass proposals.
          </Typography>
          <FlexBox gap={4} width='100%'>
            {formData.quorum?.percent && (
              <NumberCounter
                direction='row-reverse'
                value={formData.quorum.percent ?? 0}
                onChange={(value: number): void => handleUpdateQuorum('percent', value)}
              />
            )}
            <Dropdown
              hasArrow={false}
              value={Object.keys(formData.quorum)[0] ?? 'majority'}
              options={['%', 'majority']}
              onChange={(e) =>
                handleUpdateQuorum(
                  e.target.value === '%' ? 'percent' : e.target.value,
                  e.target.value === '%' ? 20 : {},
                )
              }
              style={{ textAlign: 'center' }}
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupUpdateVotingConfigModal
