import React, { Dispatch } from 'react'
import { Route, NavLink } from 'react-router-dom'
import AddPerson from 'assets/icons/AddPerson'
import Message from 'assets/icons/Message'
import Target from 'assets/icons/Target'
import Star from 'assets/icons/Star'
import Fuel from 'assets/icons/Fuel'
import ActionIcon from 'assets/icons/Actions'
import { Widget } from '../types'
import { ControlPanelSection } from '../ControlPanel.styles'
import { ActionLinksWrapper } from './Actions.styles'
import FuelEntity from 'modules/Entities/FuelEntity/FuelEntity.container'
import { SummaryContainerConnected } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaimFinal/SubmitEntityClaimFinal.container'
import Tooltip from '../../Tooltip/Tooltip'
import { InstructionsContainerConnected } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaimInstructions/SubmitEntityClaimInstructions.container'
import CreateAgentContainer from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/CreateAgent/CreateAgent.container'
import Down from 'assets/icons/Down'
import ShowAssistantPanel from './ShowAssistantPanel'
import { AgentRole } from 'modules/Account/types'
import { updateProjectStatusToStarted } from 'modules/Entities/SelectedEntity/SelectedEntity.actions'
import { ProjectStatus } from 'modules/Entities/types'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types';

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
  toggleShowMore: () => void
  showMore: boolean
  assistantPanelToggle: () => void
  handleUpdateProjectStatusToStarted?: (projectDid: string) => void
}

const Actions: React.FunctionComponent<Props> = ({
  widget: { title, controls },
  userDid,
  entityDid,
  showMore,
  toggleShowMore,
  assistantPanelToggle,
  handleUpdateProjectStatusToStarted
}) => {
  const visibleControls = controls.filter(
    (control) => !(control.permissions[0].role === 'user' && !userDid),
  )

  const handleRenderControl = (control: any): JSX.Element => {
    const intent = control.parameters.find((param) => param?.name === 'intent')
      ?.value

    const to = `/projects/${entityDid}/overview/action/${intent}`

    const interceptNavClick = (e: any): void => {
      if (intent === 'update_status') {
        handleUpdateProjectStatusToStarted(entityDid)
      }

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
  }

  return (
    <>
      <Route
        exact
        path={`/projects/:projectDID/overview/action/fuel_my_entity`}
      >
        <FuelEntity assistantPanelToggle={ assistantPanelToggle } />
      </Route>
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
      <Route
        exact
        path={`/projects/:projectDID/overview/action/join`}
        component={CreateAgentContainer}
      >
        <CreateAgentContainer
          assistantPanelToggle={ assistantPanelToggle }
          role={ AgentRole.ServiceProvider }
        />
      </Route>
      <Route
        exact
        path={`/projects/:projectDID/overview/action/evaluator`}
        component={CreateAgentContainer}
      >
        <CreateAgentContainer
          assistantPanelToggle={ assistantPanelToggle }
          role={ AgentRole.Evaluator }
        />
      </Route>

      <Route
        exact
        path={`/projects/:projectDID/overview/action/help`}
      >
        <ShowAssistantPanel assistantPanelToggle={ assistantPanelToggle } />
      </Route>
      <Route
        exact
        path={`/projects/:projectDID/overview/action/oracle`}
      >
        <ShowAssistantPanel assistantPanelToggle={ assistantPanelToggle } />
      </Route>
      <Route
        exact
        path={`/projects/:projectDID/overview/action/rate`}
      >
        <ShowAssistantPanel assistantPanelToggle={ assistantPanelToggle } />
      </Route>

      <ControlPanelSection key={title}>
        <h4>
          <div className="heading-icon">
            <ActionIcon />
          </div>
          {title}
          {visibleControls.length > 4 && (
            <div
              onClick={toggleShowMore}
              className={`arrow-icon ${showMore ? 'active' : ''}`}
            >
              <Down width="16" fill="#A5ADB0" />
            </div>
          )}
        </h4>
        <ActionLinksWrapper>
          {visibleControls.slice(0, 4)?.map(handleRenderControl)}
        </ActionLinksWrapper>
        <div className={`show-more-container ${showMore ? 'show' : ''}`}>
          <ActionLinksWrapper>
            {visibleControls.slice(4)?.map(handleRenderControl)}
          </ActionLinksWrapper>
        </div>
      </ControlPanelSection>
    </>
  )
}

const mapStateToProps = (state: RootState): any => ({
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateProjectStatusToStarted: (projectDid: string): void =>
    dispatch(updateProjectStatusToStarted(projectDid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Actions)
