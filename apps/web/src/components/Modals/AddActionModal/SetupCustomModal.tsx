import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/CoreEntry/App.styles'
import { CodeMirror } from 'screens/CreateEntity/Components'
import { TProposalActionModel } from 'types/entities'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { validateCustomMessage } from 'utils/validation'

export interface CustomData {
  message: string
}
const initialState: CustomData = {
  message: '{}',
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupCustomModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<CustomData>(initialState)

  const validate = useMemo(() => validateCustomMessage(formData.message) === true, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: string | number) => {
    console.log('handleUpdateFormData', key, value)
    onSubmit && setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleConfirm = () => {
    onSubmit && onSubmit({ ...action, data: formData })
    onClose()
  }

  return (
    <SetupActionModalTemplate
      width='600px'
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={onSubmit && handleConfirm}
      validate={validate}
    >
      <FlexBox width='100%' $direction='column' $gap={2}>
        <CodeMirror value={formData.message} onChange={(value) => handleUpdateFormData('message', value)} />
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupCustomModal
