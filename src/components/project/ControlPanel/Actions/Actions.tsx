import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import AddPerson from '../../../../assets/icons/AddPerson'
import Message from '../../../../assets/icons/Message'
import Target from '../../../../assets/icons/Target'
import Star from '../../../../assets/icons/Star'
import Fuel from '../../../../assets/icons/Fuel'
import ActionIcon from '../../../../assets/icons/Actions'
import { Widget } from '../types'
import { ControlPanelSection } from '../ControlPanel.styles'
import { ActionLinksWrapper } from './Actions.styles'
import FuelEntity from '../../../../modules/FuelEntity/FuelEntity.container'
import { Tooltip } from '../../../common/Tooltip'

const icons = {
  AddPerson,
  Message,
  Target,
  Star,
  Fuel,
}

interface Props {
  entityDid: string
  widget: Widget
}

const Actions: React.FunctionComponent<Props> = ({
  entityDid,
  widget: { title, controls },
}) => {
  return (
    <>
      <Route
        exact
        path={`/projects/${entityDid}/overview/action/fuel_my_entity`}
        component={FuelEntity}
      />
      <ControlPanelSection key={title}>
        <h4>
          <div className="heading-icon">
            <ActionIcon />
          </div>
          {title}
        </h4>
        <ActionLinksWrapper>
          {controls.map(control => {
            const intent = control.parameters.find(
              param => param.name === 'intent',
            ).value

            return (
              <Tooltip text={control.tooltip} key={control['@id']}>
                <NavLink
                  to={`/projects/${entityDid}/overview/action/${intent}`}
                >
                  {React.createElement(icons[control.icon], {
                    fill: control.iconColor,
                  })}
                  {control.title}
                </NavLink>
              </Tooltip>
            )
          })}
        </ActionLinksWrapper>
      </ControlPanelSection>
    </>
  )
}

export default Actions
