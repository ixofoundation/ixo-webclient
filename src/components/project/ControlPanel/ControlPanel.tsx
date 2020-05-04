import * as React from 'react'
import {
  ControlPanelWrapper,
  ControlPanelSection,
  ActionButtonsWrapper,
  ActionLink,
  AppButtonsWrapper,
  ConnectionButtonsWrapper,
  MobileControlPanelToggle,
} from './ControlPanel.style'
import { Tooltip } from '../../common/Tooltip'
import Performance from './Icons/Performance'
import Actions from './Icons/Actions'
import Apps from './Icons/Apps'
import Connections from './Icons/Connections'
import Riot from './Icons/Apps/Riot'
import Gitcoin from './Icons/Apps/GitCoin'
import DAOStack from './Icons/Apps/DAOStack'
import Share from '../../../assets/icons/Share'
import OpenOnMobile from '../../../assets/icons/OpenOnMobile'
import Forum from '../../../assets/icons/Forum'
import AddPerson from '../../../assets/icons/AddPerson'
import Message from '../../../assets/icons/Message'
import Target from '../../../assets/icons/Target'
import Star from '../../../assets/icons/Star'
import Down from '../../../assets/icons/Down'
import Close from '../../../assets/icons/Close'
import Twitter from '../../../assets/icons/Twitter'
import QRComponent from '../../common/QRComponent'

interface State {
  showControlPanelMobile: boolean
  showMoreApps: boolean
  showMobileLink: boolean
  showSharingLinks: boolean
}

class ControlPanel extends React.Component<{}, State> {
  state = {
    showControlPanelMobile: false,
    showMoreApps: false,
    showMobileLink: false,
    showSharingLinks: false,
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
  toggleMobileLink = (): void => {
    this.setState(prevState => ({ showMobileLink: !prevState.showMobileLink }))
  }

  showSharingLinks = (): void => {
    this.setState(prevState => ({
      showSharingLinks: !prevState.showSharingLinks,
    }))
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
                      className={`arrow-icon ${
                        this.state.showMobileLink || this.state.showSharingLinks
                          ? 'active'
                          : ''
                      }`}
                    >
                      <Down width="16" fill="#BDBDBD" />
                    </div>
                  )}
                </h4>
                {section.title == 'Performance' && 'The shields will go here'}
                {section.title == 'Actions' && (
                  <ActionButtonsWrapper>
                    <ActionLink href="#">
                      <AddPerson fill="#49BFE0" />
                      Apply to join
                    </ActionLink>
                    <ActionLink href="#">
                      <Message fill="#49BFE0" />
                      Ask for help
                    </ActionLink>
                    <ActionLink href="#">
                      <Target fill="#49BFE0" />
                      Offer oracle service
                    </ActionLink>
                    <ActionLink href="#">
                      <Star fill="#49BFE0" />
                      Rate this project
                    </ActionLink>
                  </ActionButtonsWrapper>
                )}
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
                    <button onClick={this.toggleMobileLink}>
                      <div className="icon-wrapper">
                        {this.displaySvg('Mobile', 36)}
                      </div>
                      Mobile
                    </button>
                    <button onClick={this.showSharingLinks}>
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

                    {this.state.showMobileLink && (
                      <div className="show-more-container">
                        <QRComponent url={location.href} />
                      </div>
                    )}
                    {this.state.showSharingLinks && (
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
