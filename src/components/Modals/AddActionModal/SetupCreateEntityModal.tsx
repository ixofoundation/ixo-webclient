import React, { useState } from 'react'
import { GridContainer } from 'components/App/App.styles'
import { PropertyBox } from 'pages/CreateEntity/Components'
import { EntityLinkedEntityConfig, TProposalActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { useHistory } from 'react-router-dom'

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupCreateEntityModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const history = useHistory()
  const [type, setType] = useState('')

  const handleConfirm = () => {
    if (onSubmit) {
      history.push({ pathname: `/create/entity/${type}/process`, state: { redirectTo: history.location.pathname } })
    }
  }

  return (
    <SetupActionModalTemplate
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={onSubmit && handleConfirm}
      validate={!!type}
    >
      <GridContainer width='100%' columns={3} gridGap={4}>
        {Object.entries(EntityLinkedEntityConfig).map(([key, value]) => {
          const Icon = value.icon
          return (
            <PropertyBox
              key={key}
              icon={Icon && <Icon />}
              label={value.text}
              hovered={type === key}
              handleClick={() => setType(key)}
            />
          )
        })}
      </GridContainer>
    </SetupActionModalTemplate>
  )
}

export default SetupCreateEntityModal
