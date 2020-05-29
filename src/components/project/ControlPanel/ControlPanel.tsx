import * as React from 'react'
import {
  ControlPanelScrollWrapper,
  ControlPanelWrapper,
  MobileControlPanelToggle,
} from './ControlPanel.styles'
import Down from '../../../assets/icons/Down'
import Close from '../../../assets/icons/Close'
import { Schema, ConnectionType, ActionType } from './types'
import Dashboard from './Dashboard/Dashboard'
import Actions from './Actions/Actions' //, { triggerAction }
import Apps from './Apps/Apps'
import Connections from './Connections/Connections'

interface Props {
  entityDid: string
  userDid: string
  schema: Schema
}

interface State {
  showControlPanelMobile: boolean
  showMoreApps: boolean
  currentAction: ActionType
  currentConnection: ConnectionType
}

class ControlPanel extends React.Component<Props, State> {
  state = {
    showControlPanelMobile: false,
    showMoreApps: false,
    currentAction: null,
    currentConnection: null,
  }

  toggleShowControlPanel = (): void => {
    if (this.state.showControlPanelMobile) {
      document.querySelector('body').classList.remove('noScroll')
    } else {
      document.querySelector('body').classList.add('noScroll')
    }
    this.setState({
      showControlPanelMobile: !this.state.showControlPanelMobile,
    })
  }

  toggleShowApps = (): void => {
    this.setState({ showMoreApps: !this.state.showMoreApps })
  }

  handleConnectionClick = (connection: ConnectionType): void => {
    this.setState({
      currentConnection:
        this.state.currentConnection === connection ? null : connection,
      currentAction: null,
    })
  }

  render(): JSX.Element {
    const {
      schema: { dashboard, actions, apps, connections },
    } = this.props
    return (
      <>
        <MobileControlPanelToggle onClick={this.toggleShowControlPanel}>
          {this.state.showControlPanelMobile ? (
            <Close width="20" fill="#fff" />
          ) : (
            <div className="down-arrow">
              <Down width="20" fill="#fff" />
            </div>
          )}
        </MobileControlPanelToggle>
        <ControlPanelScrollWrapper>
          <ControlPanelWrapper
            className={this.state.showControlPanelMobile ? 'open' : ''}
          >
            <Dashboard widget={dashboard} entityDid={this.props.entityDid} />
            <Actions entityDid={this.props.entityDid} widget={actions} />
            <Apps
              widget={apps}
              showMore={this.state.showMoreApps}
              toggleShowMore={this.toggleShowApps}
            />
            <Connections
              widget={connections}
              selectedConnection={this.state.currentConnection}
              handleConnectionClick={this.handleConnectionClick}
            />
          </ControlPanelWrapper>
        </ControlPanelScrollWrapper>
      </>
    )
  }
}

export default ControlPanel
