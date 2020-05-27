import React from 'react'
import AddPerson from '../../../../../assets/icons/AddPerson'
import Message from '../../../../../assets/icons/Message'
import Target from '../../../../../assets/icons/Target'
import Star from '../../../../../assets/icons/Star'
import Fuel from '../../../../../assets/icons/Fuel'
import { Control, ActionType } from '../../types'
import { ActionLink } from './ActionButton.styles'
import { Tooltip } from 'src/components/common/Tooltip'

interface Props {
  control: Control
  onClick: (type: ActionType, intent: string) => void
}

const icons = {
  AddPerson,
  Message,
  Target,
  Star,
  Fuel,
}

const ActionButton: React.FunctionComponent<Props> = ({ control, onClick }) => {
  const intent = control.parameters.find(param => param.name === 'intent').value

  return (
    <Tooltip text={control.tooltip}>
      <ActionLink
        onClick={(): void => onClick(control['@type'] as ActionType, intent)}
      >
        {React.createElement(icons[control.icon], { fill: control.iconColor })}
        {control.title}
      </ActionLink>
    </Tooltip>
  )
}

export default ActionButton
