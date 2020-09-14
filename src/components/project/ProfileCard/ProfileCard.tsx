import * as React from 'react'
import { ProfileCardWrapper } from './ProfileCard.style'
import Linkedin from 'assets/icons/Linkedin'
import Twitter from 'assets/icons/Twitter'

const ProfileCard = (user: Record<string, any>): JSX.Element => {
  const { imageLink, title, subtitle, icons } = user.user
  if (!title) {
    return null
  }
  return (
    <ProfileCardWrapper data-testid="ProfileCard">
      {imageLink && (
        <img
          data-testid="ProfileCard-image"
          className="ProfileCard-image"
          src={imageLink}
        />
      )}
      <div className="ProfileCard-content">
        <div className="ProfileCard-name">{title}</div>
        {subtitle && <div className="ProfileCard-role">{subtitle}</div>}

        {icons.length > 0 && (
          <div className="ProfileCard-social-links">
            {icons.map((icon) => (
              <a
                key={icon.class}
                href={icon.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon.class === 'twitter' ? (
                  <Twitter width="14" />
                ) : (
                  <Linkedin width="14" />
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </ProfileCardWrapper>
  )
}

export default ProfileCard
