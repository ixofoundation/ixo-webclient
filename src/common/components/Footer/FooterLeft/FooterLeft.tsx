import * as React from 'react'
import MediaQuery from 'react-responsive'
import { deviceWidth } from '../../../../lib/commonData'
import { getIxoWorldRoute } from '../../../utils/formatters'
import {
  Main,
  IXOLogo,
  ExternalFooterLink,
  FooterText,
  FooterTextBlue,
  ByLine,
} from './FooterLeft.styles'

export const FooterLeft: React.FunctionComponent<{}> = () => {
  return (
    <Main className="col-md-8">
      <div className="row">
        <MediaQuery minWidth={`${deviceWidth.tablet}px`}>
          <a href={getIxoWorldRoute('')}>
            <IXOLogo
              alt="IXO Logo"
              src={require('../../../../assets/images/ixo-logo.svg')}
            />
          </a>
        </MediaQuery>
        <ExternalFooterLink href={getIxoWorldRoute('/membership')}>
          Membership
        </ExternalFooterLink>
        <ExternalFooterLink href={getIxoWorldRoute('/ecosystem')}>
          Ecosystem
        </ExternalFooterLink>
        <ExternalFooterLink target="_blank" href="https://ixo.foundation">
          ixo.Foundation
        </ExternalFooterLink>
      </div>
      <div className="row">
        <FooterText className="col-md-10">
          <div className="row">
            <a href="mailto:info@ixo.world">
              <FooterTextBlue>info@ixo.world</FooterTextBlue>
            </a>
          </div>
          <ByLine className="row">
            <p>
              ixo.world AG, Heiligkreuz 6, 9490 Vaduz, Liechtenstein
              <a
                href="https://github.com/ixofoundation/Legal-Documents/raw/master/Terms%20%26%20Conditions.pdf#page=2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms &amp; conditions
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
