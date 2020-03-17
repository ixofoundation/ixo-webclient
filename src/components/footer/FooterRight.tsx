import * as React from 'react'
import styled from 'styled-components'
import { deviceWidth } from '../../lib/commonData'
import Twitter from 'src/assets/icons/Twitter'
import Facebook from 'src/assets/icons/Facebook'
import Linkedin from 'src/assets/icons/Linkedin'
import Github from 'src/assets/icons/Github'
import Medium from 'src/assets/icons/Medium'
import Telegram from 'src/assets/icons/Telegram'

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
  i:before {
    color: #fff;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    text-align: center;
  }
`

const SocialIcon = styled.a`
  padding: 10px;
  svg path {
    fill: #fff;
  }
  &:hover {
    svg path {
      fill: ${/* eslint-disable-line */ props => props.theme.ixoBlue};
    }
  }
`

const SocialIconContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;

  @media (min-width: ${deviceWidth.tablet}px) {
    margin: 0;
    padding-right: 60px;
  }
`

export const FooterRight: React.SFC<any> = () => {
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
