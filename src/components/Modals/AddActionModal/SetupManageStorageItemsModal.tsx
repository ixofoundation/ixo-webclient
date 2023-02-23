import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { AccountValidStatus, Button, Dropdown2, Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress } from 'utils/validation'

export interface ManageStorageItemsData {
  setting: boolean
  key: string
  value: string
}
const initialState: ManageStorageItemsData = {
  setting: true,
  key: '',
  value: '',
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupManageStorageItemsModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<ManageStorageItemsData>(initialState)

  const validate = useMemo(() => !!formData.key && !!formData.value, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])
  useEffect(() => {
    handleUpdateFormData('key', '')
    handleUpdateFormData('value', '')
  }, [formData.setting])

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
      <FlexBox width='100%' gap={4}>
        <Button
          variant={formData.setting ? 'primary' : 'secondary'}
          onClick={() => handleUpdateFormData('setting', true)}
          style={{ width: '100%', textTransform: 'capitalize', fontWeight: 500 }}
        >
          Set Item
        </Button>
        <Button
          variant={!formData.setting ? 'primary' : 'secondary'}
          onClick={() => handleUpdateFormData('setting', false)}
          style={{ width: '100%', textTransform: 'capitalize', fontWeight: 500 }}
        >
          Remove Item
        </Button>
      </FlexBox>

      {formData.setting ? (
        <FlexBox width='100%' direction='column' gap={2}>
          <Typography size='xl' weight='normal'>
            Set storage item
          </Typography>
          <FlexBox width='100%' gap={4}>
            <Input
              name='storage_item_key'
              placeholder='Item'
              inputValue={formData.key}
              handleChange={(value) => handleUpdateFormData('key', value)}
            />
            <Input
              name='storage_item_value'
              placeholder='Value'
              inputValue={formData.value}
              handleChange={(value) => handleUpdateFormData('value', value)}
            />
          </FlexBox>
        </FlexBox>
      ) : (
        <FlexBox width='100%' direction='column' gap={2}>
          <Typography size='xl' weight='normal'>
            Remove storage item
          </Typography>
          <FlexBox width='100%' gap={4}>
            {/* TODO: options ??? */}
            <Dropdown2
              name='storage_item_key'
              value={formData.key}
              placeholder='Item'
              options={[]}
              onChange={(e) => handleUpdateFormData('key', e.target.value)}
            />
          </FlexBox>
        </FlexBox>
      )}
    </SetupActionModalTemplate>
  )
}

export default SetupManageStorageItemsModal
