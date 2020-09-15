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
  projectData: any // TEMP until projects gets it's own data from redux instead of storing it in some weird link state
  projectDid: string
  title: string
  shortDescription: string
  imageUrl: string
  founderLogoUrl: string
  status: string
  sdgs: number[]
  shieldColor: ShieldColor
  shieldLabel: string
  shield: string
}

export const EntityCardContainer: React.FunctionComponent<Props> = ({
  children,
  projectData,
  projectDid,
  shortDescription,
  imageUrl,
  status,
  sdgs,
  shieldColor,
  shieldLabel,
  shield,
}) => {
  const getSDGIcons = (): JSX.Element => (
    <>
      {sdgs.map((sdg, index) => {
        if (Math.floor(sdg) > 0 && Math.floor(sdg) <= SDGArray.length) {
          return (
            <i
              key={index}
              className={`icon-sdg-${SDGArray[Math.floor(sdg) - 1].ico}`}
            />
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
          pathname: `/projects/${projectDid}/overview`,
          state: {
            projectPublic: projectData,
            imageLink: imageUrl,
            projectStatus: status,
          },
        }}
      >
        <CardTop>
          <CardTopContainer
            style={{
              backgroundImage: `url(${imageUrl}),url(${require('assets/images/ixo-placeholder-large.jpg')})`,
            }}
          >
            <SDGs>{getSDGIcons()}</SDGs>
            <Description>
              <p>{excerptText(shortDescription, 20)}</p>
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
