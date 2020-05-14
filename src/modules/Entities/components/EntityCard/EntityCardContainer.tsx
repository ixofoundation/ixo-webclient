import * as React from 'react'
import { SDGArray } from '../../../../lib/commonData'
import { excerptText, toTitleCase } from '../../../../common/utils/formatters'
import {
  Description,
  SDGs,
  CardTop,
  CardTopContainer,
  CardBottom,
  StatusContainer,
  StatusText,
  Status,
  StatusLabel,
  CardContainer,
  CardLink,
  CardBottomHeadingContainer,
  Logo,
  LogoContainer,
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
}

export const EntityCardContainer: React.FunctionComponent<Props> = ({
  children,
  projectData,
  projectDid,
  shortDescription,
  imageUrl,
  founderLogoUrl,
  status,
  sdgs,
}) => {
  const getStatus = (): JSX.Element => {
    const statusType = status === 'CREATED' ? 'PENDING' : status

    if (status) {
      return (
        <StatusContainer>
          <StatusLabel>
            <StatusText>Status</StatusText>
          </StatusLabel>
          <Status className={statusType}>
            <StatusText>{toTitleCase(statusType)}</StatusText>
          </Status>
        </StatusContainer>
      )
    }

    return null
  }

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
    <CardContainer className="col-10 offset-1 col-xl-4 col-md-6 col-sm-10 offset-sm-1 offset-md-0">
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
              backgroundImage: `url(${imageUrl}),url(${require('../../../../assets/images/ixo-placeholder-large.jpg')})`,
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
            {getStatus()}
            <LogoContainer>
              <Logo src={founderLogoUrl} width="34" height="34" />
            </LogoContainer>
          </CardBottomHeadingContainer>
          {children}
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}
