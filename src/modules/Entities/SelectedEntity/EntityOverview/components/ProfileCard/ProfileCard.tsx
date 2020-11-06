import * as React from 'react'
import { ProfileCardWrapper } from './ProfileCard.styles'
import LinkedIn from 'assets/icons/Linkedin'
import Twitter from 'assets/icons/Twitter'

interface Props {
  name: string
  position: string
  linkedInUrl: string
  twitterUrl: string
  image: string
}

const ProfileCard: React.FunctionComponent<Props> = ({
  name,
  position,
  linkedInUrl,
  twitterUrl,
  image,
}) => {
  return (
    <ProfileCardWrapper>
      <img className="ProfileCard-image" src={image} alt="profile image" />
      <div className="ProfileCard-content">
        <div className="ProfileCard-name">{name}</div>
        <div className="ProfileCard-role">{position}</div>
        {(linkedInUrl || twitterUrl) && (
          <div className="ProfileCard-social-links">
            {linkedInUrl && (
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                <LinkedIn width="14" />
              </a>
            )}
            {twitterUrl && (
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                <Twitter width="14" />
              </a>
            )}
          </div>
        )}
      </div>
    </ProfileCardWrapper>
  )
}

export default ProfileCard
