import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { CodeMirror, Input } from 'screens/CreateEntity/Components'
import { TProposalActionModel } from 'types/entities'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress, validateJSON } from 'utils/validation'
import { Typography } from 'components/Typography'

export interface MigrateData {
  contract: string
  codeId: number
  msg: string
}

const initialState: MigrateData = {
  contract: '',
  codeId: 0,
  msg: '{}',
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupMigrateSmartContractModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<MigrateData>(initialState)

  const validate = useMemo(
    () => isAccountAddress(formData.contract) && !!formData.codeId && validateJSON(formData.msg) === true,
    [formData],
  )

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
    onSubmit && setFormData((data) => ({ ...data, [key]: value }))
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
        <Typography size='xl' weight='medium'>
          This will{' '}
          <a href='https://docs.cosmwasm.com/docs/smart-contracts/migration/' rel='noreferrer' target='_blank'>
            <Typography size='xl' weight='medium' underline color='black'>
              migrate
            </Typography>
          </a>{' '}
          the selected contract to a new code ID.
        </Typography>
      </FlexBox>
      <FlexBox $direction='column' width='100%' $gap={2}>
        <FlexBox width='100%' $gap={4}>
          <Input
            width='100px'
            name='code_id'
            placeholder='Code ID'
            inputValue={formData.codeId}
            handleChange={(value) => handleUpdateFormData('codeId', value)}
          />
          <Input
            name='contract_label'
            placeholder='Smart Contract Address'
            inputValue={formData.contract}
            handleChange={(value) => handleUpdateFormData('contract', value)}
          />
        </FlexBox>
      </FlexBox>

      <FlexBox $direction='column' width='100%' $gap={2}>
        <Typography color='black' weight='medium' size='xl'>
          Migrate message
        </Typography>
        <CodeMirror value={formData.msg} onChange={(value) => handleUpdateFormData('msg', value)} />
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupMigrateSmartContractModal
