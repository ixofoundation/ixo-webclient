import * as React from 'react'
import {
  ControlPanelWrapper,
  MobileControlPanelToggle,
} from './ControlPanel.styles'
import Down from '../../../assets/icons/Down'
import Close from '../../../assets/icons/Close'
import { Schema } from './types'
import Performance from './Performance/Performance'
import Actions from './Actions/Actions'
import Apps from './Apps/Apps'
import Connections from './Connections/Connections'

interface Props {
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
    connection: '',
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
    // this.setState(prevState => ({ showMoreApps: !prevState.showMoreApps }))
    this.setState({ showMoreApps: !this.state.showMoreApps })
  }

  toggleConnection = (connection): void => {
    this.setState({ connection })
  }

  render(): JSX.Element {
    const {
      schema: { performanceWidgets },
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
          <Performance title={performanceWidgets.title} shields={} />
          <Actions />
          <Apps />
          <Connections />
        </ControlPanelWrapper>
      </>
    )
  }
}

export default ControlPanel
