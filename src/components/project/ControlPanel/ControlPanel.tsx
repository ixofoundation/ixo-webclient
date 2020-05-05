import * as React from 'react'
import {
  ControlPanelWrapper,
  ControlPanelSection,
  ActionButtonsWrapper,
  ActionLink,
  AppButtonsWrapper,
  ConnectionButtonsWrapper,
  MobileControlPanelToggle,
} from './ControlPanel.styles'
import { Tooltip } from '../../common/Tooltip'
import Performance from '../../../assets/icons/Performance'
import Actions from '../../../assets/icons/Actions'
import Apps from '../../../assets/icons/Apps'
import Connections from '../../../assets/icons/Connections'
import Riot from '../../../assets/icons/Riot'
import Gitcoin from '../../../assets/icons/GitCoin'
import DAOStack from '../../../assets/icons/DAOStack'
import Share from '../../../assets/icons/Share'
import OpenOnMobile from '../../../assets/icons/OpenOnMobile'
import Forum from '../../../assets/icons/Forum'
import Down from '../../../assets/icons/Down'
import Close from '../../../assets/icons/Close'
import Twitter from '../../../assets/icons/Twitter'
import QRComponent from '../../common/QRComponent'

interface State {
  showControlPanelMobile: boolean
  showMoreApps: boolean
  showConnectionsInfo: string
}

class ControlPanel extends React.Component<{}, State> {
  state = {
    showControlPanelMobile: false,
    showMoreApps: false,
    showConnectionsInfo: '',
  }

  displaySvg = (title, width = 16): JSX.Element => {
    switch (title) {
      case 'Performance':
        return <Performance />
      case 'Actions':
        return <Actions />
      case 'Apps':
        return <Apps />
      case 'Connections':
        return <Connections />
      case 'Riot':
        return <Riot width={width} />
      case 'Gitcoin':
        return <Gitcoin width={width} />
      case 'DAOStack':
        return <DAOStack width={width} />
      case 'Mobile':
        return <OpenOnMobile fill="#49BFE0" width={width} />
      case 'Share':
        return <Share fill="#49BFE0" width={width} />
      case 'Forum':
        return <Forum fill="#49BFE0" width={width} />
      default:
        return null
    }
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
    this.setState(prevState => ({ showMoreApps: !prevState.showMoreApps }))
  }
  toggleConnectionInfo = (sectionName): void => {
    this.setState({ showConnectionsInfo: sectionName })
  }

  shareToTwitter = (): void => {
    const url = location.href
    const text =
      'It’s up to all of us to start making an impact for a positive future for humanity. Check out this venture that aims to achieve the global SDGs. If you think it’s a worthy cause, then like or share this post to show your support.'
    window.open(
      'http://twitter.com/share?url=' +
        encodeURIComponent(url) +
        '&text=' +
        encodeURIComponent(text),
      '',
      'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0',
    )
  }

  sectionData = [
    {
      title: 'Performance',
    },
    {
      title: 'Actions',
    },
    {
      title: 'Apps',
      appData: [
        { svg: 'Riot', title: 'Riot chat', backgroundColor: '#fff' },
        // { svg: 'Gitcoin', title: 'Gitcoin', backgroundColor: '#A2DDEF' },
        // { svg: 'DAOStack', title: 'DAOStack', backgroundColor: '#000' },
        // { svg: '', title: 'Another app', backgroundColor: '#979797' },
        // { svg: '', title: 'Another app', backgroundColor: '#979797' },
        // { svg: '', title: 'Another app', backgroundColor: '#979797' },
      ],
    },
    {
      title: 'Connections',
      connectionData: [
        { title: 'Mobile' },
        { title: 'Share' },
        { title: 'Forum' },
      ],
    },
  ]
  render(): JSX.Element {
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
          {this.sectionData.map(section => {
            return (
              <ControlPanelSection key={section.title}>
                <h4>
                  <div className="heading-icon">
                    {this.displaySvg(section.title)}
                  </div>
                  {section.title}
                  {section.title === 'Apps' && section.appData.length > 3 && (
                    <div
                      className={`arrow-icon ${
                        this.state.showMoreApps ? 'active' : ''
                      }`}
                      onClick={this.toggleShowApps}
                    >
                      <Down width="16" fill="#BDBDBD" />
                    </div>
                  )}
                  {section.title === 'Connections' && (
                    <div
                      onClick={(): void => this.toggleConnectionInfo('')}
                      className={`arrow-icon ${
                        this.state.showConnectionsInfo !== '' ? 'active' : ''
                      }`}
                    >
                      <Down width="16" fill="#BDBDBD" />
                    </div>
                  )}
                </h4>
                // PERFORMANCE // ACTIONS
                {section.title == 'Apps' && (
                  <AppButtonsWrapper>
                    {section.appData.map((sectionData, index) => {
                      return (
                        <Tooltip
                          text="Private communication channel (encrypted)"
                          key={sectionData.title}
                        >
                          <button
                            className={
                              index > 3
                                ? this.state.showMoreApps
                                  ? 'show'
                                  : 'hide'
                                : 'show'
                            }
                          >
                            <div
                              className="icon-wrapper"
                              style={{
                                background: sectionData.backgroundColor,
                              }}
                            >
                              {this.displaySvg(sectionData.svg, 36)}
                            </div>
                            {sectionData.title}
                          </button>
                        </Tooltip>
                      )
                    })}
                  </AppButtonsWrapper>
                )}
                {section.title == 'Connections' && (
                  <ConnectionButtonsWrapper>
                    <button
                      onClick={(): void => this.toggleConnectionInfo('mobile')}
                    >
                      <div className="icon-wrapper">
                        {this.displaySvg('Mobile', 36)}
                      </div>
                      Mobile
                    </button>
                    <button
                      onClick={(): void => this.toggleConnectionInfo('share')}
                    >
                      <div className="icon-wrapper">
                        {this.displaySvg('Share', 36)}
                      </div>
                      Share
                    </button>
                    <button>
                      <div className="icon-wrapper">
                        {this.displaySvg('Forum', 36)}
                      </div>
                      Forum
                    </button>
                    {this.state.showConnectionsInfo === 'mobile' && (
                      <div className="show-more-container">
                        <QRComponent url={location.href} />
                      </div>
                    )}
                    {this.state.showConnectionsInfo === 'share' && (
                      <div className="show-more-container">
                        <button onClick={this.shareToTwitter}>
                          Share to twitter <Twitter width="22" fill="#47568c" />
                        </button>
                      </div>
                    )}
                  </ConnectionButtonsWrapper>
                )}
              </ControlPanelSection>
            )
          })}
        </ControlPanelWrapper>
      </>
    )
  }
}

export default ControlPanel
