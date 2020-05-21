import React from 'react'
import AddPersonIcon from '../../../../../assets/icons/AddPerson'
import MessageIcon from '../../../../../assets/icons/Message'
import TargetIcon from '../../../../../assets/icons/Target'
import StarIcon from '../../../../../assets/icons/Star'
import { Control } from '../../types'
import { ActionButton } from '../Actions.styles'
import { Tooltip } from 'src/components/common/Tooltip'

interface Props {
  control: Control
  onClick: (intent: string) => void
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
  }

  return (
    <Tooltip text={control.tooltip}>
      <ActionButton onClick={(): void => onClick(intent)}>
        {Icon}
        {control.title}
      </ActionButton>
    </Tooltip>
  )
}

export default Action
