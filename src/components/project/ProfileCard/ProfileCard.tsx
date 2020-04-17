import * as React from 'react'
import { ProfileCardWrapper } from './ProfileCard.style'
import Linkedin from 'src/assets/icons/Linkedin'
import Twitter from 'src/assets/icons/Twitter'

const ProfileCard = (user: Record<string, any>): JSX.Element => {
  const { imageUrl, name, role } = user.user
  if (!name) {
    return null
  }
  return (
    <ProfileCardWrapper data-testid="ProfileCard">
      <img
        data-testid="ProfileCard-image"
        className="ProfileCard-image"
        src={imageUrl}
      />
      <div className="ProfileCard-content">
        <div className="ProfileCard-name">{name}</div>
        <div className="ProfileCard-role">{role}</div>

        <div className="ProfilceCard-social-links">
          <Linkedin width="14" />
          <Twitter width="14" />
        </div>
      </div>
    </ProfileCardWrapper>
  )
}

export default ProfileCard
