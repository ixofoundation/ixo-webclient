import * as React from 'react'
import Twitter from '../../../../assets/icons/Twitter'
import Facebook from '../../../../assets/icons/Facebook'
import Linkedin from '../../../../assets/icons/Linkedin'
import Github from '../../../../assets/icons/Github'
import Medium from '../../../../assets/icons/Medium'
import Telegram from '../../../../assets/icons/Telegram'
import { Main, SocialIconContainer, SocialIcon } from './FooterRight.styles'

export const FooterRight: React.FunctionComponent<{}> = () => {
  return (
    <Main className="col-md-4">
      <div className="row">
        <SocialIconContainer className="col-md-12">
          <SocialIcon
            href="https://twitter.com/ixoworld?lang=en"
            target="_blank"
          >
            <Twitter width="16" />
          </SocialIcon>
          <SocialIcon href="https://www.facebook.com/ixoworld/" target="_blank">
            <Facebook width="16" />
          </SocialIcon>
          <SocialIcon
            href="https://www.linkedin.com/company/25001970/admin/updates/"
            target="_blank"
          >
            <Linkedin width="16" />
          </SocialIcon>
          <SocialIcon href="https://github.com/ixofoundation" target="_blank">
            <Github width="16" />
          </SocialIcon>
          <SocialIcon href="https://medium.com/ixo-blog" target="_blank">
            <Medium width="16" />
          </SocialIcon>
          <SocialIcon
            href="https://t.me/joinchat/Ejz5exAfFUzcBMRlaYLecQ"
            target="_blank"
          >
            <Telegram width="16" />
          </SocialIcon>
        </SocialIconContainer>
      </div>
    </Main>
  )
}
