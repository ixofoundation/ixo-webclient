import { BottomBar } from './FooterContainer.styles'
import { Main, SocialIconContainer, SocialIcon } from './FooterRight/FooterRight.styles'

import { FooterText, FooterTextBlue, ByLine } from './FooterLeft/FooterLeft.styles'
import { useSelector } from 'react-redux'
import { selectEntityFooterUIConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

const Footer: React.FC = () => {
  const footerConfig: any = useSelector(selectEntityFooterUIConfig)
  const mailTo = footerConfig?.mailTo
  const address = footerConfig?.address
  const privacyPolicy = footerConfig?.privacyPolicy
  const socials = footerConfig?.socials ?? {}

  return (
    <BottomBar className='container-fluid text-white'>
      <div className='row align-items-center'>
        <FooterText className='col-md-8'>
          <div className='row'>
            <a href={`mailto:${mailTo?.email}`}>
              <FooterTextBlue>{mailTo?.text}</FooterTextBlue>
            </a>
            <span className='mx-md-5 mx-0'>{address}</span>
            <ByLine>
              <a href={privacyPolicy?.href} target='_blank' rel='noopener noreferrer'>
                {privacyPolicy?.text}
              </a>
            </ByLine>
          </div>
        </FooterText>
        <Main className='col-md-4'>
          <div className='row'>
            <SocialIconContainer className='col-md-12'>
              {Object.values(socials).map((item: any) => (
                <SocialIcon key={item.title} href={item.href} target='_blank' className={item.iconClassName} />
              ))}
            </SocialIconContainer>
          </div>
        </Main>
      </div>
    </BottomBar>
  )
}

export default Footer
