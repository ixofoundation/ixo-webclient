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
import { SummaryContainerConnected } from '../../../../modules/SubmitEntityClaim/Summary.container'
import { Tooltip } from '../../Tooltip'
import { InstructionsContainerConnected } from '../../../../modules/SubmitEntityClaim/Instructions.container'

interface IconTypes {
  [key: string]: any
}

const icons: IconTypes = {
  AddPerson,
  Message,
  Target,
  Star,
  Fuel,
}

interface Props {
  userDid: string
  entityDid: string
  widget: Widget
}

const Actions: React.FunctionComponent<Props> = ({
  widget: { title, controls },
  userDid,
  entityDid,
}) => {
  return (
    <>
      <Route
        exact
        path={`/projects/:projectDID/overview/action/fuel_my_entity`}
        component={FuelEntity}
      />
      <Route
        exact
        path="/projects/:projectDID/overview/action/new_claim/summary"
        component={SummaryContainerConnected}
      />
      <Route
        exact
        path={`/projects/:projectDID/overview/action/new_claim`}
        component={InstructionsContainerConnected}
      />
      <ControlPanelSection key={title}>
        <h4>
          <div className="heading-icon">
            <ActionIcon />
          </div>
          {title}
        </h4>
        <ActionLinksWrapper>
          {controls?.map((control) => {
            if (control.permissions[0].role === 'user' && !userDid) {
              return null
            }

            const intent = control.parameters.find(
              (param) => param?.name === 'intent',
            )?.value

            const to = `/projects/${entityDid}/overview/action/${intent}`

            const interceptNavClick = (e: any): void => {
              if (window.location.pathname.startsWith(to)) {
                e.preventDefault()
              }
            }

            return (
              <Tooltip text={control.tooltip} key={control['@id']}>
                <NavLink to={to} onClick={interceptNavClick}>
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
