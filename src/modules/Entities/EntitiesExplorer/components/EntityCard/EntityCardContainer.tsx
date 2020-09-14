import * as React from 'react'
import { SDGArray } from 'lib/commonData'
import { excerptText, toTitleCase } from 'common/utils/formatters'
import {
  Description,
  SDGs,
  CardTop,
  CardTopContainer,
  CardBottom,
  ShieldContainer,
  ShieldText,
  Shield,
  ShieldLabel,
  CardContainer,
  CardLink,
  CardBottomHeadingContainer,
  ShieldColor,
} from './EntityCardContainer.styles'

export interface Props {
  children: any
  did: string
  name: string
  description: string
  image: string
  logo: string
  status: string
  sdgs: string[]
  shieldColor: ShieldColor
  shieldLabel: string
  shield: string
}

export const EntityCardContainer: React.FunctionComponent<Props> = ({
  children,
  did,
  description,
  image,
  sdgs,
  shieldColor,
  shieldLabel,
  shield,
}) => {
  const getSDGIcons = (): JSX.Element => (
    <>
      {sdgs.map((sdg, index) => {
        const sdgInt = Math.floor(parseInt(sdg, 10))
        if (sdgInt > 0 && sdgInt <= SDGArray.length) {
          return (
            <i key={index} className={`icon-sdg-${SDGArray[sdgInt - 1].ico}`} />
          )
        }
        return null
      })}
    </>
  )

  return (
    <CardContainer className="col-xl-4 col-md-6 col-sm-12 col-12">
      <CardLink
        to={{
          pathname: `/projects/${did}/overview`,
        }}
      >
        <CardTop>
          <CardTopContainer
            style={{
              backgroundImage: `url(${image}),url(${require('assets/images/ixo-placeholder-large.jpg')})`,
            }}
          >
            <SDGs>{getSDGIcons()}</SDGs>
            <Description>
              <p>{excerptText(description, 20)}</p>
            </Description>
          </CardTopContainer>
        </CardTop>
        <CardBottom>
          <CardBottomHeadingContainer>
            <ShieldContainer>
              <ShieldLabel>
                <ShieldText>{shieldLabel}</ShieldText>
              </ShieldLabel>
              <Shield className={shieldColor}>
                <ShieldText>{toTitleCase(shield)}</ShieldText>
              </Shield>
            </ShieldContainer>
          </CardBottomHeadingContainer>
          {children}
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}
