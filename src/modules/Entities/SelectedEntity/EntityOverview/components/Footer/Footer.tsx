import * as React from 'react'
import Twitter from 'assets/icons/Twitter'
import Facebook from 'assets/icons/Facebook'
import Instagram from 'assets/icons/Instagram'
import LinkedIn from 'assets/icons/Linkedin'
import Telegram from 'assets/icons/Telegram'
import Github from 'assets/icons/Github'
import {
  FooterWrapper,
  FooterImageWrapper,
  FooterContent,
} from './Footer.styles'

interface Props {
  ownerName: string
  ownerLogo: string
  ownerMission: string
  ownerWebsite: string
  linkedInUrl: string
  facebookUrl: string
  twitterUrl: string
  discourseUrl: string
  instagramUrl: string
  telegramUrl: string
  githubUrl: string
  otherUrl: string
}

const Footer: React.FunctionComponent<Props> = ({
  ownerName,
  ownerLogo,
  ownerMission,
  ownerWebsite,
  facebookUrl,
  twitterUrl,
  instagramUrl,
  linkedInUrl,
  // discourseUrl, // TODO - create icon
  telegramUrl,
  githubUrl,
  // otherUrl, // TODO - create icon
}) => {
  return (
    <FooterWrapper>
      <FooterImageWrapper>
        <img src={ownerLogo} alt={ownerName} />
      </FooterImageWrapper>
      <FooterContent>
        <h4>{ownerName}</h4>
        {ownerMission}
        <div className="link-wrapper">
          {ownerWebsite && (
            <a
              className="website-link"
              href={ownerWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit website
            </a>
          )}
          <div className="social-links">
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                <Instagram width="17" />
              </a>
            )}
            {twitterUrl && (
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                <Twitter width="17" />
              </a>
            )}
            {facebookUrl && (
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                <Facebook width="17" />
              </a>
            )}
            {linkedInUrl && (
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                <LinkedIn width="17" />
              </a>
            )}
            {telegramUrl && (
              <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
                <Telegram width="17" />
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github width="17" />
              </a>
            )}
          </div>
        </div>
      </FooterContent>
    </FooterWrapper>
  )
}

export default Footer
