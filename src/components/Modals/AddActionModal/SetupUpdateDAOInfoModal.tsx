import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Input, Switch } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { TDeedActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'

export interface UpdateInfoData {
  automatically_add_cw20s: boolean
  automatically_add_cw721s: boolean
  dao_uri?: string | null
  description: string
  image_url?: string | null
  name: string
  [k: string]: unknown
}

const initialState: UpdateInfoData = {
  name: '',
  description: '',
  automatically_add_cw20s: true,
  automatically_add_cw721s: false,
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupUpdateDAOInfoModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<UpdateInfoData>(initialState)

  const validate = useMemo(() => !!formData.name && !!formData.description, [formData])

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
      <FlexBox direction='column' width='100%' gap={2}>
        <Typography color='black' weight='medium' size='xl'>
          Name
        </Typography>
        <Input
          name='dao_name'
          placeholder='DAO Name'
          inputValue={formData.name}
          handleChange={(value) => handleUpdateFormData('name', value)}
        />
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography color='black' weight='medium' size='xl'>
          Description
        </Typography>
        <Input
          name='dao_description'
          placeholder='DAO Description'
          inputValue={formData.description}
          handleChange={(value) => handleUpdateFormData('description', value)}
        />
      </FlexBox>

      <FlexBox width='100%' gap={4}>
        <Typography color='black' weight='medium' size='xl'>
          Automatically add tokens
        </Typography>
        <Switch
          size='md'
          value={formData.automatically_add_cw20s}
          onChange={(value) => handleUpdateFormData('automatically_add_cw20s', value)}
        />
      </FlexBox>

      <FlexBox width='100%' gap={4}>
        <Typography color='black' weight='medium' size='xl'>
          Automatically add NFTs
        </Typography>
        <Switch
          size='md'
          value={formData.automatically_add_cw721s}
          onChange={(value) => handleUpdateFormData('automatically_add_cw721s', value)}
        />
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupUpdateDAOInfoModal
