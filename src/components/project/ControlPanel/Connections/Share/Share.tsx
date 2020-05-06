import React from 'react'
import ShareIcon from '../../../../../assets/icons/Share'
import TwitterIcon from '../../../../../assets/icons/Twitter'

interface Props {
  title: string
  show: boolean
  toggleShow: () => void
}

const shareToTwitter = (): void => {
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

const Share: React.FunctionComponent<Props> = ({ title, show, toggleShow }) => {
  return (
    <>
      <button onClick={toggleShow}>
        <div className="icon-wrapper">
          <ShareIcon fill="#49BFE0" width="36" />
        </div>
        {title}
      </button>
      {show && (
        <div style={{ width: '100%' }}>
          <button onClick={shareToTwitter}>
            Share to twitter <TwitterIcon width="22" fill="#47568c" />
          </button>
        </div>
      )}
    </>
  )
}

export default Share
