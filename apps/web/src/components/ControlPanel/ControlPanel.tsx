import React from 'react'
import { ControlPanelScrollWrapper, ControlPanelWrapper, MobileControlPanelToggle } from './ControlPanel.styles'
import Down from 'assets/icons/Down'
import Close from 'assets/icons/Close'
import { Schema, ConnectionType, ActionType } from './types'
import Performance from './Performance/Performance'
import Share from './Share/Share'

interface Props {
  entityDid: string
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
      document?.querySelector('body')?.classList?.remove('overflow-hidden')
    } else {
      document?.querySelector('body')?.classList.add('overflow-hidden')
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
    const { schema } = this.props
    const actions = schema?.actions

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
            <Performance />
            <Share widget={actions} />
          </ControlPanelWrapper>
        </ControlPanelScrollWrapper>
      </>
    )
  }
}

export default ControlPanel
