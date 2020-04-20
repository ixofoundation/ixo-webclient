import * as React from 'react'
import { ProfileCardWrapper } from './ProfileCard.style'
import Linkedin from '../../../assets/icons/Linkedin'
import Twitter from '../../../assets/icons/Twitter'

const ProfileCard = (user: Record<string, any>): JSX.Element => {
  const { imageUrl, name, role, linkedinLink, twitterLink } = user.user
  if (!name) {
    return null
  }
  return (
    <ProfileCardWrapper data-testid="ProfileCard">
      {imageUrl && (
        <img
          data-testid="ProfileCard-image"
          className="ProfileCard-image"
          src={imageUrl}
        />
      )}
      <div className="ProfileCard-content">
        <div className="ProfileCard-name">{name}</div>
        {role && <div className="ProfileCard-role">{role}</div>}

        {(linkedinLink !== '' || twitterLink !== '') && (
          <div className="ProfileCard-social-links">
            {linkedinLink !== '' && (
              <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
                <Linkedin width="14" />
              </a>
            )}
            {twitterLink !== '' && (
              <a href={twitterLink} target="_blank" rel="noopener noreferrer">
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
