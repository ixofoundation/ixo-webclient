import * as React from 'react'
import MediaQuery from 'react-responsive'
import { deviceWidth } from '../../../../lib/commonData'
import { getIxoWorldRoute } from '../../../utils/formatters'

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
    <Main className="col-md-8">
      <div className="row">
        <MediaQuery minWidth={`${deviceWidth.tablet}px`}>
          <Link
            style={{ position: 'relative', top: '45px', left: '42px' }}
            to={getIxoWorldRoute('')}
          >
            <IXOLogo
              alt="IXO Logo"
              src={require('../../../../assets/images/ixo-logo.svg')}
            />
          </Link>
        </MediaQuery>
        <FooterMenuPosition>
          <FooterMenuWrapper>
            <FooterMenu>
              <h4>Products</h4>
              <div>
                <FooterLink target="_blank" exact={true} to="#">
                  Explorer
                </FooterLink>
                <FooterLink target="_blank" exact={true} to="#">
                  Mobile
                </FooterLink>
                <FooterLink
                  target="_blank"
                  className="nowrap"
                  exact={true}
                  to="#"
                >
                  AI Assistant
                </FooterLink>
                <FooterLink
                  target="_blank"
                  exact={true}
                  to="/getixowallet/deliver#Steps"
                >
                  Keysafe
                </FooterLink>
                <FooterLink
                  target="_blank"
                  className="nowrap"
                  exact={true}
                  to=""
                >
                  Blockchain SDK
                </FooterLink>
                <FooterLink className="nowrap" exact={true} to="/todo">
                  Oracle Launchpad
                </FooterLink>
                <ExternalFooterLink href="https://app.ixo.world/cells">
                  Relayer Nodes
                </ExternalFooterLink>
              </div>
            </FooterMenu>
            <FooterMenu>
              <h4>Ecosystem</h4>
              <div>
                <ExternalFooterLink
                  target="_blank"
                  href="https://app.ixo.world/cells"
                >
                  Portals
                </ExternalFooterLink>
                <FooterLink exact={true} to="/todo">
                  Funds
                </FooterLink>
                <ExternalFooterLink
                  target="_blank"
                  href="https://app.ixo.world/cells"
                >
                  Relayers
                </ExternalFooterLink>
                <FooterLink exact={true} to="/todo">
                  Oracles
                </FooterLink>
                <ExternalFooterLink
                  className="mailto"
                  href="ixo@ixo.world?subject=I am interested in becoming a Relayer"
                >
                  Become A Relayer
                </ExternalFooterLink>
              </div>
            </FooterMenu>
            <FooterMenu>
              <h4>Resources</h4>
              <div>
                <ExternalFooterLink
                  target="_blank"
                  href="https://forum.ixo.world"
                >
                  Forums
                </ExternalFooterLink>
                <ExternalFooterLink
                  target="_blank"
                  href="https://docs.ixo.world"
                >
                  Documentation
                </ExternalFooterLink>
                {/* <FooterLink target="_blank" exact={true} to="/todo">Presentations</FooterLink> */}
              </div>
            </FooterMenu>
            <FooterMenu style={{ zIndex: 10 }}>
              <h4>About</h4>
              <div>
                <FooterLink target="_blank" exact={true} to="/">
                  IXO.world
                </FooterLink>
                <ExternalFooterLink
                  target="_blank"
                  href="https://ixo.foundation"
                >
                  IXO.foundation
                </ExternalFooterLink>
              </div>
            </FooterMenu>
          </FooterMenuWrapper>
        </FooterMenuPosition>
      </div>
      <hr />
      <div className="row">
        <FooterText>
          <div className="row">
            <a href="mailto:info@ixo.world">
              <FooterTextBlue>info@ixo.world</FooterTextBlue>
            </a>
          </div>
          <ByLine className="row">
            <p className="loc">
              ixo.world AG, Industriering 10, 9491, Ruggel, Liechtenstein
            </p>
            <p className="legalInfo">
              <a
                href="https://github.com/ixofoundation/Legal-Documents/raw/master/Terms%20%26%20Conditions.pdf#page=2"
                target="_blank"
                rel="noopener noreferrer"
              >
                T&apos;s & C&apos;s
              </a>
              <a
                href="https://github.com/ixofoundation/Legal-Documents/raw/master/Privacy%20Policy.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy policy
              </a>
              <a
                href="https://github.com/ixofoundation/Legal-Documents/raw/master/ixo.world%20-%20Security.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Security
              </a>
            </p>
          </ByLine>
        </FooterText>
      </div>
    </Main>
  )
}
