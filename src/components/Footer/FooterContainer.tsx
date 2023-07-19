import { BottomBar } from './FooterContainer.styles'
import { Main, SocialIconContainer, SocialIcon } from './FooterRight/FooterRight.styles'

import { FooterText, ByLine } from './FooterLeft/FooterLeft.styles'
import {
  selectEntityFooterUIConfig,
  selectEntityHeaderUIConfig,
  selectEntityHeadTitleUIConfig,
  selectEntityLogoConfig,
} from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { AppLogo } from 'components/Header/HeaderLeft/HeaderLeft.styles'
import { requireCheckDefault } from 'utils/images'
import { Typography } from 'components/Typography'
import { ReactComponent as IXOLogo } from 'assets/images/ixo-logo.svg'
import { SvgBox } from 'components/App/App.styles'
import { useMemo } from 'react'
import { getIxoWorldRoute } from 'utils/formatters'

const Footer: React.FC = () => {
  const logo = useAppSelector(selectEntityLogoConfig)
  const headerUIConfig: any = useAppSelector(selectEntityHeaderUIConfig)
  const title = useAppSelector(selectEntityHeadTitleUIConfig)
  const footerConfig: any = useAppSelector(selectEntityFooterUIConfig)

  const address = footerConfig?.address
  const privacyPolicy = footerConfig?.privacyPolicy
  const socials = footerConfig?.socials ?? {}

  const logoLink = useMemo(() => {
    if (!headerUIConfig || !headerUIConfig.link) {
      return getIxoWorldRoute('')
    }
    return headerUIConfig.link
  }, [headerUIConfig])

  return (
    <BottomBar className='container-fluid text-white'>
      <div className='row align-items-center'>
        <FooterText className='col-md-8'>
          <div className='row align-items-center'>
            <a href={logoLink}>
              <AppLogo alt='Logo' src={requireCheckDefault(require(`../../assets/images/${logo}.svg`))} />
            </a>
            <span className='mx-md-3 mx-0'>{title}</span>
            <span className='mx-md-3 mx-0'>{address}</span>
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
      <div className='row align-items-center justify-content-center mt-4' style={{ gap: 8 }}>
        <Typography color='dark-blue'>Powered by</Typography>
        <SvgBox svgWidth={7} color='#00D2FF'>
          <IXOLogo />
        </SvgBox>
      </div>
    </BottomBar>
  )
}

export default Footer
