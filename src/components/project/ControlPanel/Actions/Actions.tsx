import React from 'react'
import ActionIcon from '../../../../assets/icons/Actions'
import { ActionsSection } from '../types'
import Action from './Action/Action'
import { ControlPanelSection } from '../ControlPanel.styles'
import { ActionButtonsWrapper } from './Actions.styles'

interface Props {
  actionsSection: ActionsSection
}

const Actions: React.FunctionComponent<Props> = ({
  actionsSection: { title, actions },
}) => {
  return (
    <ControlPanelSection key={title}>
      <h4>
        <div className="heading-icon">
          <ActionIcon />
        </div>
        {title}
      </h4>
      <ActionButtonsWrapper>
        {actions.map(action => {
          return <Action key={action.intent} actionSettings={action} />
        })}
      </ActionButtonsWrapper>
    </ControlPanelSection>
  )
}

export default Actions
