import React from 'react'
import ActionIcon from '../../../../assets/icons/Actions'
import { Widget } from '../types'
import Action from './Action/Action'
import { ControlPanelSection } from '../ControlPanel.styles'
import { ActionButtonsWrapper } from './Actions.styles'

interface Props {
  widget: Widget
}

const Actions: React.FunctionComponent<Props> = ({
  widget: { title, controls },
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
        {controls.map((control, index) => {
          return <Action key={index} control={control} />
        })}
      </ActionButtonsWrapper>
    </ControlPanelSection>
  )
}

export default Actions
