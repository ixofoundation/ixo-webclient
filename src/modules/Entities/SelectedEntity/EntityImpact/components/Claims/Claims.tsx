import * as React from 'react'
import moment from 'moment'
import { LayoutWrapper } from 'common/components/Wrappers/LayoutWrapper'
import {
  ClaimLink,
  ClaimsWidget,
  ClaimTitle,
  Col,
  Date,
  Did,
  ID,
  Indicator,
  ListItemWrapper,
  Section,
  ViewAllLink,
} from './Claims.styles'
import MediaQuery from 'react-responsive'
import { deviceWidth } from "lib/commonData";
export interface Props {
  claims?: any[]
  did: string
  fullPage: boolean
  hasLink: boolean
}

export const ProjectClaims: React.FunctionComponent<Props> = ({
  claims,
  did,
  fullPage,
  hasLink,
}) => {
  const claimDate = (date: string): string => {
    const duration = moment.duration(moment().diff(date))
    const daysDiff = duration.asDays()

    if (daysDiff > 7) {
      return moment(date).format('YYYY/MM/D')
    } else {
      return moment(date).fromNow()
    }
  }

  const claimItem = (claim, index, colorClass): JSX.Element => {
    const theItem = (
      <>
      <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
        <ListItemWrapper key={index} className="col-12">
          <Indicator color={colorClass} />
          <ClaimTitle>
            <ID>{claim.claimId}</ID> <Date>{claimDate(claim.date)}</Date>
          </ClaimTitle>
          <Did>{claim.saDid}</Did>
        </ListItemWrapper>
      </MediaQuery>
      <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
        <ListItemWrapper key={index} className="col-12">
          <Indicator color={colorClass} />
          <ClaimTitle>
            <ID>{claim.claimId}</ID>
            <Did>{claim.saDid}</Did>
            <Date>{claimDate(claim.date)}</Date>
          </ClaimTitle>
        </ListItemWrapper>
      </MediaQuery>
      </>
    )

    if (hasLink) {
      return (
        <ClaimLink
          key={index}
          to={{
            pathname: `/projects/${did}/detail/claims/${claim.claimId}`,
          }}
        >
          {theItem}
        </ClaimLink>
      )
    } else {
      return theItem
    }
  }

  const handleRenderWidget = (): JSX.Element => {
    let colorCLass = ''
    return (
      <ClaimsWidget>
        {claims.slice(0, 3).map((claim, index) => {
          switch (claim.status) {
            case '0':
              colorCLass = '#F89D28'
              break
            case '1':
              colorCLass = '#5AB946'
              break
            case '2':
              colorCLass = '#E2223B'
              break
            default:
              break
          }
          return claimItem(claim, index, colorCLass)
        })}
        {
          claims.length > 0 &&
            <ViewAllLink to={`/projects/${did}/detail/claims`}>
              <ListItemWrapper>View all claims</ListItemWrapper>
            </ViewAllLink>
        }
      </ClaimsWidget>
    )
  }

  const handleRenderPageSection = (
    iconClass: string,
    claimsList: any[],
    colorClass: string,
    title: string,
    key: number,
  ): JSX.Element => {
    return (
      <Section className="row" key={key}>
        <div className="col-12">
          <h2>
            <i className={iconClass} />
            {title}
          </h2>
        </div>
        {claimsList.map((claim, index) => {
          return (
            <Col className="col-12" key={index}>
              {claimItem(claim, index, colorClass)}
            </Col>
          )
        })}
      </Section>
    )
  }

  const handleRenderPage = (): JSX.Element => {
    const approved = []
    const pending = []
    const revoked = []
    const sections = []
    claims.forEach((claim) => {
      switch (claim.status) {
        case '1':
          approved.push(claim)
          break
        case '2':
          revoked.push(claim)
          break
        case '0':
        default:
          pending.push(claim)
          break
      }
    })

    pending.length > 0 &&
      sections.push(
        handleRenderPageSection(
          'icon-pending',
          pending,
          '#F89D28',
          'Claims pending approval',
          1,
        ),
      )
    revoked.length > 0 &&
      sections.push(
        handleRenderPageSection(
          'icon-rejected',
          revoked,
          '#E2223B',
          'Claims rejected',
          2,
        ),
      )
    approved.length > 0 &&
      sections.push(
        handleRenderPageSection(
          'icon-approved',
          approved,
          '#5AB946',
          'Claims Approved',
          3,
        ),
      )
    return <LayoutWrapper>{sections}</LayoutWrapper>
  }

  return <>{fullPage ? handleRenderPage() : handleRenderWidget()}</>
}
