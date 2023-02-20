import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Button, Dropdown, Input, Switch } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'

const initialState = {
  deposit: {
    amount: 1,
    denom: '$IXO',
  },
  enabled: true,
  whenReturned: 'pass', // 'always' | 'pass' | 'never'
  whoCan: 'membersOnly', // 'membersOnly' | 'everyone'
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupUpdateContractAdminModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: string | number | boolean) => {
    setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleConfirm = () => {
    onSubmit(formData)
    onClose()
  }

  return (
    <SetupActionModalTemplate open={open} action={action} onClose={onClose} onSubmit={handleConfirm}>
      <FlexBox width='100%' direction='column' gap={2}>
        <FlexBox width='100%' justifyContent='space-between'>
          <Typography size='xl'>Proposal deposit</Typography>

          <FlexBox alignItems='center' gap={4}>
            <Typography size='xl'>Enabled</Typography>
            <Switch value={formData.enabled} size='md' onChange={(value) => handleUpdateFormData('enabled', value)} />
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' gap={4}>
          <Input
            inputValue={formData.deposit?.amount}
            handleChange={(value) => handleUpdateFormData('deposit', { ...formData.deposit, amount: value })}
            style={{ textAlign: 'right' }}
          />
          {/* TODO: missing options */}
          <Dropdown
            name={'deposit'}
            value={formData.deposit?.denom}
            options={[formData.deposit?.denom]}
            hasArrow={false}
            onChange={(e) => handleUpdateFormData('deposit', { ...formData.deposit, denom: e.target.value })}
          />
        </FlexBox>
      </FlexBox>

      <FlexBox width='100%' direction='column' gap={2}>
        <Typography size='xl'>When should the deposit be returned?</Typography>
        <FlexBox width='100%' gap={4}>
          <Button
            variant={formData.whenReturned === 'always' ? 'primary' : 'secondary'}
            onClick={() => handleUpdateFormData('whenReturned', 'always')}
            style={{ textTransform: 'unset' }}
          >
            Always
          </Button>
          <Button
            variant={formData.whenReturned === 'pass' ? 'primary' : 'secondary'}
            onClick={() => handleUpdateFormData('whenReturned', 'pass')}
            style={{ textTransform: 'unset' }}
          >
            If it passes
          </Button>
          <Button
            variant={formData.whenReturned === 'never' ? 'primary' : 'secondary'}
            onClick={() => handleUpdateFormData('whenReturned', 'never')}
            style={{ textTransform: 'unset' }}
          >
            Never
          </Button>
        </FlexBox>
      </FlexBox>

      <FlexBox width='100%' direction='column' gap={2}>
        <Typography size='xl'>Who can submit proposals?</Typography>
        <FlexBox width='100%' gap={4}>
          <Button
            variant={formData.whoCan === 'membersOnly' ? 'primary' : 'secondary'}
            onClick={() => handleUpdateFormData('whoCan', 'membersOnly')}
            style={{ textTransform: 'unset', width: '100%' }}
          >
            Only Members
          </Button>
          <Button
            variant={formData.whoCan === 'everyone' ? 'primary' : 'secondary'}
            onClick={() => handleUpdateFormData('whoCan', 'everyone')}
            style={{ textTransform: 'unset', width: '100%' }}
          >
            Everyone
          </Button>
        </FlexBox>
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupUpdateContractAdminModal
