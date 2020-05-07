import React from 'react'
import TwitterIcon from '../../../../../assets/icons/Twitter'
import { shareToTwitter } from '../../../../../common/utils/socialMedia.utils'

interface Props {
  show: boolean
}

const shareText =
  'It’s up to all of us to start making an impact for a positive future for humanity. Check out this venture that aims to achieve the global SDGs. If you think it’s a worthy cause, then like or share this post to show your support.'

const Share: React.FunctionComponent<Props> = ({ show }) => {
  return (
    <>
      {show && (
        <div style={{ width: '100%' }}>
          <button onClick={(): void => shareToTwitter(shareText)}>
            Share to twitter <TwitterIcon width="22" fill="#47568c" />
          </button>
        </div>
      )}
    </>
  )
}

export default Share
