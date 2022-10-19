import React from 'react'
import AppIcon from 'assets/icons/Apps'
import DownIcon from 'assets/icons/Down'
import { AppButtonsWrapper } from './Apps.styles'
import { ControlPanelSection } from '../ControlPanel.styles'
import { Widget } from '../types'
import RiotChat from './RiotChat/RiotChat'
import GitCoin from './GitCoin/GitCoin'
import DaoStack from './DaoStack/DaoStack'
import AddPlugin from './AddPlugin/AddPlugin'

declare global {
  interface Window {
    MobileContext: boolean | undefined
  }
}

interface Props {
  widget: Widget
  showMore: boolean
  toggleShowMore: () => void
}

const Apps: React.FunctionComponent<Props> = ({
  widget: { title, controls },
  showMore,
  toggleShowMore,
}) => {
  //TODO when we have more than 3 apps then set buttonClassName of apps to...
  // showMore ? 'show' : 'hide'

  const riotChatControl = controls.find(
    (control) => control['@type'] === 'RiotChat',
  )

  const gitCoinControl = controls.find(
    (control) => control['@type'] === 'Gitcoin',
  )

  const daoStackControl = controls.find(
    (control) => control['@type'] === 'DaoStack',
  )

  return (
    <ControlPanelSection>
      <h4>
        <div className="heading-icon">
          <AppIcon />
        </div>
        {title}
        {controls.length > 3 && (
          <div
            className={`arrow-icon ${showMore ? 'active' : ''}`}
            onClick={toggleShowMore}
          >
            <DownIcon width="16" fill="#BDBDBD" />
          </div>
        )}
      </h4>
      <AppButtonsWrapper>
        {riotChatControl && (
          <RiotChat buttonClassName="hide" control={riotChatControl} />
        )}
        {gitCoinControl && (
          <GitCoin buttonClassName="hide" control={gitCoinControl} />
        )}
        {daoStackControl && (
          <DaoStack buttonClassName="hide" control={daoStackControl} />
        )}
        <AddPlugin buttonClassName="show" />
      </AppButtonsWrapper>
    </ControlPanelSection>
  )
}

export default Apps
