import MediaQuery from 'react-responsive'
import { deviceWidth } from 'constants/device'
import { getIxoWorldRoute } from '../../../../utils/formatters'

import {
  Main,
  FooterMenuPosition,
  FooterMenuWrapper,
  FooterMenu,
  FooterLink,
  ExternalFooterLink,
  FooterText,
  ByLine,
  FooterTextBlue,
  IXOLogo,
} from './FooterLeft.styles'
import { Link } from 'react-router-dom'

export const FooterLeft: React.SFC<any> = () => {
  return (
    <Main className='col-md-8'>
      <div className='row'>
        <MediaQuery minWidth={`${deviceWidth.tablet}px`}>
          <Link style={{ position: 'relative', top: '45px', left: '42px' }} to={getIxoWorldRoute('')}>
            <IXOLogo alt='IXO Logo' src={require('assets/images/ixo-logo.svg')} />
          </Link>
        </MediaQuery>
        <FooterMenuPosition>
          <FooterMenuWrapper>
            <FooterMenu>
              <h4>Products</h4>
              <div>
                <FooterLink
                  className='disabled'
                  target='_blank'
                  rel='noopener noreferrer'
                  exact={true}
                  onClick={(e): void => e.preventDefault()}
                  to='#'
                >
                  Explorer
                </FooterLink>
                <ExternalFooterLink
                  target='_blank'
                  rel='noopener noreferrer'
                  href={'https://play.google.com/store/apps/details?id=com.ixo&hl=en_ZA'}
                >
                  Mobile Android
                </ExternalFooterLink>
                <ExternalFooterLink
                  target='_blank'
                  rel='noopener noreferrer'
                  href={'https://apps.apple.com/za/app/ixo/id1441394401'}
                >
                  Mobile iOS
                </ExternalFooterLink>
                <FooterLink
                  className='nowrap disabled'
                  target='_blank'
                  rel='noopener noreferrer'
                  exact={true}
                  onClick={(e): void => e.preventDefault()}
                  to='#'
                >
                  AI Assistant
                </FooterLink>
                <ExternalFooterLink target='_blank' href={getIxoWorldRoute('/getixowallet/deliver/#Steps')}>
                  Keysafe
                </ExternalFooterLink>
                <FooterLink
                  className='nowrap disabled'
                  target='_blank'
                  rel='noopener noreferrer'
                  exact={true}
                  onClick={(e): void => e.preventDefault()}
                  to='#'
                >
                  Blockchain SDK
                </FooterLink>
                <FooterLink className='nowrap' exact={true} to='/todo'>
                  Oracle Launchpad
                </FooterLink>
                <FooterLink
                  target='_blank'
                  rel='noopener noreferrer'
                  to='/entities/select?type=Cell&categories=[{"name": "Cell Type", "tags": ["Relayer"]}]'
                >
                  Relayer Nodes
                </FooterLink>
              </div>
            </FooterMenu>
            <FooterMenu>
              <h4>Ecosystem</h4>
              <div>
                <FooterLink
                  target='_blank'
                  rel='noopener noreferrer'
                  to='/entities/select?type=Cell&categories=[{"name": "Cell Type", "tags": ["Portal"]}]'
                >
                  Portals
                </FooterLink>
                <FooterLink
                  exact={true}
                  to='/entities/select?type=Investment&categories=[{"name": "View", "tags": ["Featured"]}]'
                >
                  Funds
                </FooterLink>
                <FooterLink
                  target='_blank'
                  rel='noopener noreferrer'
                  to='/entities/select?type=Cell&categories=[{"name": "Cell Type", "tags": ["Relayer"]}]'
                >
                  Relayers
                </FooterLink>
                <FooterLink
                  exact={true}
                  to='/entities/select?type=Oracle&categories=[{"name": "View", "tags": ["Featured"]}]'
                >
                  Oracles
                </FooterLink>
                <ExternalFooterLink
                  className='mailto'
                  href='mailto:ixo@ixo.world?subject=I am interested in becoming a Relayer'
                >
                  Become A Relayer
                </ExternalFooterLink>
              </div>
            </FooterMenu>
            <FooterMenu>
              <h4>Resources</h4>
              <div>
                <ExternalFooterLink target='_blank' rel='noopener noreferrer' href='https://forum.ixo.world'>
                  Forum
                </ExternalFooterLink>
                <ExternalFooterLink target='_blank' rel='noopener noreferrer' href='https://docs.ixo.world'>
                  Documentation
                </ExternalFooterLink>
                <ExternalFooterLink target='_blank' rel='noopener noreferrer' href='https://build.ixo.world'>
                  Developers
                </ExternalFooterLink>
              </div>
            </FooterMenu>
            <FooterMenu style={{ zIndex: 10 }}>
              <h4>About</h4>
              <div>
                <FooterLink target='_blank' rel='noopener noreferrer' exact={true} to='/'>
                  ixo.world
                </FooterLink>
                <ExternalFooterLink target='_blank' rel='noopener noreferrer' href='https://ixo.foundation'>
                  ixo.foundation
                </ExternalFooterLink>
              </div>
            </FooterMenu>
          </FooterMenuWrapper>
        </FooterMenuPosition>
      </div>
      <hr />
      <div className='row'>
        <FooterText>
          <div className='row'>
            <a href='mailto:info@ixo.world'>
              <FooterTextBlue>info@ixo.world</FooterTextBlue>
            </a>
          </div>
          <ByLine className='row'>
            <p className='loc'>ixo.world AG, Industriering 10, 9491, Ruggel, Liechtenstein</p>
            <p className='legalInfo'>
              {/* <a
                href="https://github.com/ixofoundation/Legal-Documents/raw/master/Terms%20%26%20Conditions.pdf#page=2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms
              </a> */}
              <a href='https://www.ixo.world/privacy-policy' target='_blank' rel='noopener noreferrer'>
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
      </div>
    </Main>
  )
}
