import TwitterIcon from 'assets/icons/Twitter'
import { shareToTwitter } from '../../../../../utils/socialMedia'

interface Props {
  twitterShareText: string
  show: boolean
}

const Share: React.FunctionComponent<Props> = ({ show, twitterShareText }) => {
  return (
    <div className={`show-more-container ${show ? 'show' : ''}`}>
      <button onClick={(): void => shareToTwitter(twitterShareText)}>
        Share to twitter <TwitterIcon width='22' fill='#47568c' />
      </button>
    </div>
  )
}

export default Share
