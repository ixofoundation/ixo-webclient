import React from 'react'
import ActionIcon from '../../../../assets/icons/Actions'
import AddPerson from '../../../../assets/icons/AddPerson'
import Message from '../../../../assets/icons/Message'
import Target from '../../../../assets/icons/Target'
import Star from '../../../../assets/icons/Star'
import { SchemaActionTrigger } from '../types'
import {
  ActionButtonsWrapper,
  ActionLink,
  ControlPanelSection,
} from '../ControlPanel.styles'

interface Props {
  title: string
  triggers: SchemaActionTrigger[]
}

export const Actions: React.FunctionComponent<Props> = ({
  title,
  triggers,
}) => {
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
                return <AddPerson fill={trigger.iconColor} />
              case 'Message':
                return <Message fill={trigger.iconColor} />
              case 'Target':
                return <Target fill={trigger.iconColor} />
              case 'Star':
                return <Star fill={trigger.iconColor} />
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
