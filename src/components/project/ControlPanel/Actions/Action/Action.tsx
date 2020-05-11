import React from 'react'
import AddPersonIcon from '../../../../../assets/icons/AddPerson'
import MessageIcon from '../../../../../assets/icons/Message'
import TargetIcon from '../../../../../assets/icons/Target'
import StarIcon from '../../../../../assets/icons/Star'
import { ActionSettings } from '../../types'
import { ActionLink } from '../Actions.styles'

interface Props {
  actionSettings: ActionSettings
}

const Action: React.FunctionComponent<Props> = ({ actionSettings }) => {
  let Icon
  switch (actionSettings.icon) {
    case 'AddPerson':
      Icon = <AddPersonIcon fill={actionSettings.iconColor} />
      break
    case 'Message':
      Icon = <MessageIcon fill={actionSettings.iconColor} />
      break
    case 'Target':
      Icon = <TargetIcon fill={actionSettings.iconColor} />
      break
    case 'Star':
      Icon = <StarIcon fill={actionSettings.iconColor} />
      break
  }

  return (
    <ActionLink href={`#${actionSettings.intent}`}>
      {Icon}
      {actionSettings.title}
    </ActionLink>
  )
}

export default Action
