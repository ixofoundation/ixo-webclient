import * as React from 'react'
import {
  ControlPanelWrapper,
  MobileControlPanelToggle,
} from './ControlPanel.styles'
import Down from '../../../assets/icons/Down'
import Close from '../../../assets/icons/Close'
import { Schema } from './types'
import Dashboard from './Dashboard/Dashboard'
import Actions from './Actions/Actions'
import Apps from './Apps/Apps'
import Connections from './Connections/Connections'

interface Props {
  entityDid: string
  schema: Schema
}

interface State {
  showControlPanelMobile: boolean
  showMoreApps: boolean
  connection: string
}

class ControlPanel extends React.Component<Props, State> {
  state = {
    showControlPanelMobile: false,
    showMoreApps: false,
    connection: null,
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

  toggleConnection = (connection): void => {
    this.setState({
      connection: this.state.connection === connection ? null : connection,
    })
  }

  render(): JSX.Element {
    const {
      schema: {
        dashboardSection,
        actionsSection,
        appsSection,
        connectionsSection,
      },
    } = this.props
    return (
      <>
        <MobileControlPanelToggle onClick={this.toggleShowControlPanel}>
          {this.state.showControlPanelMobile ? (
            <Close width="16" fill="#BDBDBD" />
          ) : (
            <div className="down-arrow">
              <Down width="16" fill="#BDBDBD" />
            </div>
          )}
        </MobileControlPanelToggle>
        <ControlPanelWrapper
          className={this.state.showControlPanelMobile ? 'open' : ''}
        >
          <Dashboard
            dashboardSection={dashboardSection}
            entityDid={this.props.entityDid}
          />
          <Actions actionsSection={actionsSection} />
          <Apps
            appsSection={appsSection}
            showMore={this.state.showMoreApps}
            toggleShowMore={this.toggleShowApps}
          />
          <Connections
            connectionsSection={connectionsSection}
            selectedConnection={this.state.connection}
            toggleConnection={this.toggleConnection}
          />
        </ControlPanelWrapper>
      </>
    )
  }
}

export default ControlPanel
