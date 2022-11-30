import React from 'react'
import { ControlPanelScrollWrapper, ControlPanelWrapper, MobileControlPanelToggle } from './ControlPanel.styles'
import Down from 'assets/icons/Down'
import Close from 'assets/icons/Close'
import { Schema, ConnectionType, ActionType } from './types'
import Dashboard from './Dashboard/Dashboard'
import Actions from './Actions/Actions' //, { triggerAction }
import Apps from './Apps/Apps'
import Connections from './Connections/Connections'
import Claims from './Claims/Claims'

interface Props {
  entityDid: string
  userDid: string
  schema: Schema
  claims?: any[]
  assistantPanelToggle?: () => void
}

interface State {
  showControlPanelMobile: boolean
  showMoreApps: boolean
  currentAction: ActionType | null
  currentConnection: ConnectionType | null
  showMoreActions: boolean
  showMoreConnections: boolean
}

class ControlPanel extends React.Component<Props, State> {
  state = {
    showControlPanelMobile: false,
    showMoreApps: false,
    currentAction: null,
    currentConnection: null,
    showMoreActions: false,
    showMoreConnections: false,
  }

  panelRef: any = null

  toggleShowControlPanel = (): void => {
    if (this.state.showControlPanelMobile) {
      document?.querySelector('body')?.classList?.remove('noScroll')
    } else {
      document?.querySelector('body')?.classList.add('noScroll')
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
      currentConnection: this.state.currentConnection === connection ? null : connection,
      currentAction: null,
    })

    setTimeout(
      (): void =>
        this.panelRef.scroll({
          top: this.panelRef.scrollHeight,
          behavior: 'smooth',
        }),
      1000,
    )
  }

  toggleShowActions = (): void => {
    localStorage.setItem('show_more_actions', String(!this.state.showMoreActions))
    this.setState({ showMoreActions: !this.state.showMoreActions })
  }

  toggleShowConnections = (): void => {
    localStorage.setItem('show_more_connections', String(!this.state.showMoreConnections))
    this.setState({ showMoreConnections: !this.state.showMoreConnections })
  }

  componentDidMount(): void {
    const showMoreActions = localStorage.getItem('show_more_actions') === 'true'
    const showMoreConnections = localStorage.getItem('show_more_connections') === 'true'
    this.setState({ showMoreActions, showMoreConnections })
  }

  render(): JSX.Element {
    const {
      schema: { dashboard, actions, apps, connections },
      entityDid,
      userDid,
      claims,
    } = this.props

    const isViewedFromApp = !!window.MobileContext
    if (isViewedFromApp) return <div />

    return (
      <>
        <MobileControlPanelToggle onClick={this.toggleShowControlPanel}>
          {this.state.showControlPanelMobile ? (
            <Close width='20' fill='#fff' />
          ) : (
            <Down className='down-arrow' width='20' fill='#fff' />
          )}
        </MobileControlPanelToggle>
        <ControlPanelScrollWrapper id='ControlPanelWrapper'>
          <ControlPanelWrapper
            className={this.state.showControlPanelMobile ? 'open' : ''}
            ref={(ref): HTMLDivElement => (this.panelRef = ref!)}
          >
            <Dashboard widget={dashboard} entityDid={entityDid} />
            <Actions
              widget={actions}
              entityDid={entityDid}
              userDid={userDid}
              toggleShowMore={this.toggleShowActions}
              showMore={this.state.showMoreActions}
            />
            <Apps widget={apps} showMore={this.state.showMoreApps} toggleShowMore={this.toggleShowApps} />
            <Claims
              widget={apps}
              showMore={this.state.showMoreApps}
              toggleShowMore={this.toggleShowApps}
              claims={claims!}
              entityDid={entityDid}
            />
            <Connections
              widget={connections}
              selectedConnection={this.state.currentConnection}
              handleConnectionClick={this.handleConnectionClick}
              toggleShowConnections={this.toggleShowConnections}
              showMore={this.state.showMoreConnections}
            />
          </ControlPanelWrapper>
        </ControlPanelScrollWrapper>
      </>
    )
  }
}

export default ControlPanel
