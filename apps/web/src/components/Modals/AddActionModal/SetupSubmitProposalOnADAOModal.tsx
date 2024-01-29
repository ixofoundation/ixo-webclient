import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Dropdown } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { TProposalActionModel } from 'types/entities'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { useAppSelector } from 'redux/hooks'
import { selectDAOEntities } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

export interface DAOVoteData {
  dao: string
  groupAddress: string
}
const initialState: DAOVoteData = {
  dao: '',
  groupAddress: '',
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupSubmitProposalOnADAOModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<DAOVoteData>(initialState)
  const daos = useAppSelector(selectDAOEntities)
  const groups = useMemo(() => daos.find(({ id }) => id === formData.dao)?.daoGroups ?? {}, [daos, formData.dao])

  const validate = useMemo(() => !!formData.dao && !!formData.groupAddress, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

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
      <FlexBox width='100%' direction='column' gap={2}>
        <Typography size='xl' weight='medium'>
          Select DAO
        </Typography>
        <Dropdown
          name='dao'
          value={formData.dao}
          options={daos.map((dao) => ({ value: dao.id, text: dao.profile?.name || '' }))}
          placeholder='Select DAO'
          onChange={(e) => handleUpdateFormData('dao', e.target.value)}
        />
      </FlexBox>

      {Object.keys(groups).length > 0 && (
        <FlexBox width='100%' direction='column' gap={2}>
          <Typography size='xl' weight='medium'>
            Select a group
          </Typography>
          <Dropdown
            name='groupAddress'
            value={formData.groupAddress}
            options={Object.values(groups).map((group) => ({
              value: group.coreAddress,
              text: group.config.name || '',
            }))}
            placeholder='Select a group'
            onChange={(e) => handleUpdateFormData('groupAddress', e.target.value)}
          />
        </FlexBox>
      )}

      <FlexBox width='100%'>
        <Typography size='md'>This will start the proposal creation process.</Typography>
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupSubmitProposalOnADAOModal
