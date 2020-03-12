import * as React from 'react'
import { Main, SocialIconContainer, SocialIcon } from './FooterRight.styles'

export const FooterRight: React.FunctionComponent<{}> = () => {
  return (
    <Main className="col-md-4">
      <div className="row">
        <SocialIconContainer className="col-md-12">
          <SocialIcon
            href="https://twitter.com/ixoworld?lang=en"
            target="_blank"
            className="icon-twitter"
          />
          <SocialIcon
            href="https://www.facebook.com/ixoworld/"
            target="_blank"
            className="icon-facebook"
          />
          <SocialIcon
            href="https://www.linkedin.com/company/25001970/admin/updates/"
            target="_blank"
            className="icon-linkedin"
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
  )
}
