import React from 'react'
import TwitterIcon from '../../../../../assets/icons/Twitter'
import { shareToTwitter } from '../../../../../common/utils/socialMedia.utils'

interface Props {
  twitterShareText: string
  show: boolean
}

const Share: React.FunctionComponent<Props> = ({ show, twitterShareText }) => {
  return (
    <>
      {show && (
        <div>
          <button onClick={(): void => shareToTwitter(twitterShareText)}>
            Share to twitter <TwitterIcon width="22" fill="#47568c" />
          </button>
        </div>
      )}
    </>
  )
}

export default Share
