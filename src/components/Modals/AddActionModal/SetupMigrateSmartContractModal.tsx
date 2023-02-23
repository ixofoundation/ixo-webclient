import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { Input } from 'pages/CreateEntity/Components'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress } from 'utils/validation'

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
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupMigrateSmartContractModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<MigrateData>(initialState)

  const validate = useMemo(() => isAccountAddress(formData.contract) && !!formData.codeId && !!formData.msg, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
    setFormData((data) => ({ ...data, [key]: value }))
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
        <FlexBox width='100%' gap={4}>
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

      <FlexBox direction='column' width='100%' gap={2}>
        <FlexBox width='100%' gap={4}>
          <Input
            name='message'
            placeholder='Message (json)'
            inputValue={formData.msg}
            handleChange={(value) => handleUpdateFormData('msg', value)}
          />
        </FlexBox>
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupMigrateSmartContractModal
