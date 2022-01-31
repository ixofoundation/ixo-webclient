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
      <div className="row">
        <FooterText className="col-md-4">
          <div className="row">
            <a href="mailto:info@ixo.world">
              <FooterTextBlue>info@ixo.world</FooterTextBlue>
            </a>
          </div>
          <ByLine className="row">
            <p className="loc">
              ixo.world AG, Industriering 14, 9491, Ruggel, Liechtenstein
            </p>
            <p className="legalInfo">
              {/* <a
                href="https://github.com/ixofoundation/Legal-Documents/raw/master/Terms%20%26%20Conditions.pdf#page=2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms
              </a> */}
              <a
                href="https://www.ixo.world/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy policy
              </a>
              {/* <a
                href="https://github.com/ixofoundation/Legal-Documents/raw/master/ixo.world%20-%20Security.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Security
              </a> */}
            </p>
          </ByLine>
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
