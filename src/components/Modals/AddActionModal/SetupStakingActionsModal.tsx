import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Dropdown, Input } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'

const initialState = {
  stakeAction: '',
  token: {
    amount: 1,
    denom: '$IXO',
  },
  validator: '',
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupStakingActionsModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)

  const validate = useMemo(
    () => formData.stakeAction && formData.validator && formData.token.amount && formData.token.denom,
    [formData],
  )

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: string | number) => {
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
      <FlexBox width='100%' gap={2} direction='column'>
        <Typography size='xl' weight='medium'>
          Select Action
        </Typography>
        <Dropdown
          name='stake'
          value={formData.stakeAction}
          options={[]}
          hasArrow={false}
          placeholder='Stake'
          onChange={(e) => handleUpdateFormData('stakeAction', { ...formData.stakeAction, denom: e.target.value })}
        />
      </FlexBox>

      <FlexBox width='100%' gap={4}>
        <Input
          inputValue={formData.token?.amount}
          handleChange={(value) => handleUpdateFormData('token', { ...formData.token, amount: value })}
          style={{ textAlign: 'right' }}
        />
        {/* TODO: missing options */}
        <Dropdown
          name={'token'}
          value={formData.token?.denom}
          options={[formData.token?.denom]}
          hasArrow={false}
          onChange={(e) => handleUpdateFormData('token', { ...formData.token, denom: e.target.value })}
        />
      </FlexBox>

      <FlexBox width='100%' gap={2} direction='column'>
        <Typography size='xl' weight='medium'>
          Stake with
        </Typography>
        <Dropdown
          name='validator'
          value={formData.validator}
          options={[]}
          hasArrow={false}
          placeholder='Select Validator'
          onChange={(e) => handleUpdateFormData('validator', { ...formData.validator, denom: e.target.value })}
        />
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupStakingActionsModal
