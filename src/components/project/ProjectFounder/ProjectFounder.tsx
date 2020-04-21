import * as React from 'react'
import Twitter from '../../../assets/icons/Twitter'
import Facebook from '../../../assets/icons/Facebook'
import Instagram from 'src/assets/icons/Instagram'
import {
  FounderWrapper,
  FounderImageWrapper,
  FounderContent,
} from './ProjectFounder.style'
import { Founder, SocialMedia } from '../../../modules/project/types'

export interface ParentProps {
  founder: Founder
  socialMedia: SocialMedia
}

export const ProjectFounder: React.SFC<ParentProps> = ({
  founder,
  socialMedia,
}) => {
  return (
    <FounderWrapper>
      {founder.logoLink && founder.logoLink !== '' && (
        <FounderImageWrapper>
          <img src={founder.logoLink} alt="" />
        </FounderImageWrapper>
      )}
      <FounderContent>
        <h4>{founder.name}</h4>
        {founder.shortDescription}
        <div className="ProjectFounder-link-wrapper">
          {socialMedia.webLink && (
            <a
              className="ProjectFounder-website-link"
              href={socialMedia.webLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit website
            </a>
          )}
          <div className="ProjectFounder-social-links">
            {socialMedia.instagramLink && (
              <a
                href={socialMedia.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram width="17" />
              </a>
            )}
            {socialMedia.twitterLink && (
              <a
                href={socialMedia.twitterLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter width="17" />
              </a>
            )}
            {socialMedia.facebookLink && (
              <a
                href={socialMedia.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook width="17" />
              </a>
            )}
          </div>
        </div>
      </FounderContent>
    </FounderWrapper>
  )
}
