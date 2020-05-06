import React from 'react'
import ActionIcon from '../../../../assets/icons/Actions'
import AddPerson from '../../../../assets/icons/AddPerson'
import Message from '../../../../assets/icons/Message'
import Target from '../../../../assets/icons/Target'
import Star from '../../../../assets/icons/Star'
import { SchemaAction } from '../types'
import { ControlPanelSection } from '../ControlPanel.styles'
import { ActionButtonsWrapper, ActionLink } from './Actions.styles'

interface Props {
  title: string
  triggers: SchemaAction[]
}

const Actions: React.FunctionComponent<Props> = ({ title, triggers }) => {
  return (
    <ControlPanelSection key={title}>
      <h4>
        <div className="heading-icon">
          <ActionIcon />
        </div>
        {title}
        <ActionButtonsWrapper>
          {triggers.map(trigger => {
            let Icon
            switch (trigger.icon) {
              case 'AddPerson':
                Icon = <AddPerson fill={trigger.iconColor} />
                break
              case 'Message':
                Icon = <Message fill={trigger.iconColor} />
                break
              case 'Target':
                Icon = <Target fill={trigger.iconColor} />
                break
              case 'Star':
                Icon = <Star fill={trigger.iconColor} />
                break
            }

            return (
              <ActionLink key={trigger.intent} href="#">
                {Icon}
              </ActionLink>
            )
          })}
        </ActionButtonsWrapper>
      </h4>
    </ControlPanelSection>
  )
}

export default Actions
