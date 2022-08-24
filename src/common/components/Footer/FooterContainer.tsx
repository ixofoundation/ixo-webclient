import * as React from 'react'
import { BottomBar } from './FooterContainer.styles'
import {
  Main,
  SocialIconContainer,
  SocialIcon,
} from './FooterRight/FooterRight.styles'

import {
  FooterText,
  FooterTextBlue,
  ByLine,
} from './FooterLeft/FooterLeft.styles'

const Footer: React.FunctionComponent<{}> = () => {
  return (
    <BottomBar className="container-fluid text-white">
      <div className="row align-items-center">
        <FooterText className="col-md-8">
          <div className="row">
            <a href="mailto:info@ixo.world">
              <FooterTextBlue>Email</FooterTextBlue>
            </a>
            <span className="mx-md-5 mx-0">
              ixo.world Herrengasse 30, 9490 Vaduz, Liechtenstein
            </span>
            <ByLine>
              <a
                href="https://www.ixo.world/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy policy
              </a>
            </ByLine>
          </div>
        </FooterText>
        <Main className="col-md-4">
          <div className="row">
            <SocialIconContainer className="col-md-12">
              <SocialIcon
                href="https://twitter.com/ixoworld?lang=en"
                target="_blank"
                className="icon-twitter"
              />
              <SocialIcon
                href="https://github.com/ixofoundation"
                target="_blank"
                className="icon-github"
              />
              <SocialIcon
                href="https://medium.com/ixo-blog"
                target="_blank"
                className="icon-medium"
              />
              <SocialIcon
                href="https://t.me/joinchat/Ejz5exAfFUzcBMRlaYLecQ"
                target="_blank"
                className="icon-telegram"
              />
            </SocialIconContainer>
          </div>
        </Main>
      </div>
    </BottomBar>
  )
}

export default Footer
