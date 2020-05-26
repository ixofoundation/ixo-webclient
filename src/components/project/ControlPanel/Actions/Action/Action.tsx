import React from 'react'
import AddPersonIcon from '../../../../../assets/icons/AddPerson'
import MessageIcon from '../../../../../assets/icons/Message'
import TargetIcon from '../../../../../assets/icons/Target'
import StarIcon from '../../../../../assets/icons/Star'
import FuelIcon from '../../../../../assets/icons/Fuel'
import { Control, ActionType } from '../../types'
import { ActionLink } from '../Actions.styles'
import { Tooltip } from 'src/components/common/Tooltip'

interface Props {
  control: Control
  onClick: (type: ActionType, intent: string) => void
}

const Action: React.FunctionComponent<Props> = ({ control, onClick }) => {
  const intent = control.parameters.find(param => param.name === 'intent').value

  let Icon
  switch (control.icon) {
    case 'AddPerson':
      Icon = <AddPersonIcon fill={control.iconColor} />
      break
    case 'Message':
      Icon = <MessageIcon fill={control.iconColor} />
      break
    case 'Target':
      Icon = <TargetIcon fill={control.iconColor} />
      break
    case 'Star':
      Icon = <StarIcon fill={control.iconColor} />
      break
    case 'Fuel':
      Icon = <FuelIcon fill={control.iconColor} />
      break
  }

  return (
    <Tooltip text={control.tooltip}>
      <ActionLink
        onClick={(): void => onClick(control['@type'] as ActionType, intent)}
      >
        {Icon}
        {control.title}
      </ActionLink>
    </Tooltip>
  )
}

export default Action
