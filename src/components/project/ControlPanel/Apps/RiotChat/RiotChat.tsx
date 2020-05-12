import React from 'react'
import RiotIcon from '../../../../../assets/icons/Riot'
import { Tooltip } from '../../../../common/Tooltip'
import { AppSettings } from '../../types'

interface Props {
  buttonClassName: string //index > 3 ? (showMore ? 'show' : 'hide') : 'show'
  app: AppSettings
}

const RiotChat: React.FunctionComponent<Props> = ({ app, buttonClassName }) => {
  return (
    <Tooltip text={app.description}>
      <button className={buttonClassName}>
        <div
          className="icon-wrapper"
          style={{
            background: app.backgroundColor,
          }}
        >
          <RiotIcon width="36" />
        </div>
        {app.title}
      </button>
    </Tooltip>
  )
}

export default RiotChat
