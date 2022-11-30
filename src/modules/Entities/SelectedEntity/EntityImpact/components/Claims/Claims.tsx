import * as React from 'react'
import moment from 'moment'
import { LayoutWrapper } from 'common/components/Wrappers/LayoutWrapper'
import { theme } from 'modules/App/App.styles'
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
import { deviceWidth } from 'constants/device'
import { useSelector } from 'react-redux'
import { selectUserRole } from 'redux/selectedEntity/selectedEntity.selectors'
import { AgentRole } from 'redux/account/account.types'
import { selectUserDid } from 'redux/account/account.selectors'

export interface Props {
  claims?: any[]
  did: string
  fullPage: boolean
  hasLink: boolean
}

export const ProjectClaims: React.FunctionComponent<Props> = ({ claims, did, fullPage, hasLink }) => {
  const userRole = useSelector(selectUserRole)
  const userDid = useSelector(selectUserDid)

  const determineViewClaim = (claim: any): boolean => {
    const { saDid, eaDid } = claim
    if (saDid === userDid && userRole === AgentRole.ServiceProvider) {
      return true
    }
    if (eaDid === userDid && userRole === AgentRole.Evaluator) {
      return true
    }
    return false
  }

  const claimDate = (date: string): string => {
    const duration = moment.duration(moment().diff(date))
    const daysDiff = duration.asDays()

    if (daysDiff > 7) {
      return moment(date).format('YYYY/MM/DD')
    } else {
      return moment(date).fromNow()
    }
  }

  const claimItem = (claim: any, index: any, colorClass: any, clickable: any): JSX.Element => {
    const theItem = (
      <>
        <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
          <ListItemWrapper key={index} className='col-12'>
            <Indicator color={colorClass} />
            <ClaimTitle>
              <ID>{claim.claimId}</ID>
              <Date>{claimDate(claim.date)}</Date>
            </ClaimTitle>
            <Did>{claim.saDid}</Did>
          </ListItemWrapper>
        </MediaQuery>
        <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
          <ListItemWrapper key={index} className='col-12'>
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

    if (hasLink && clickable) {
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
        {[...claims!]
          .reverse()
          .slice(0, 3)
          .map((claim, index) => {
            switch (claim.status) {
              case '0':
                colorCLass = theme.pending
                break
              case '1':
                colorCLass = theme.approved
                break
              case '2':
                colorCLass = theme.rejected
                break
              case '3':
                colorCLass = theme.disputed
                break
              default:
                break
            }
            return claimItem(claim, index, colorCLass, determineViewClaim(claim))
          })}
        {claims!.length > 0 && (userRole === AgentRole.Evaluator || userRole === AgentRole.ServiceProvider) && (
          <ViewAllLink to={`/projects/${did}/detail/claims`}>
            <ListItemWrapper>View all claims</ListItemWrapper>
          </ViewAllLink>
        )}
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
      <Section className='row' key={key}>
        <div className='col-12'>
          <h2>
            <i className={iconClass} />
            {title}
          </h2>
        </div>
        {claimsList.map((claim, index) => {
          return (
            <Col className='col-12' key={index}>
              {claimItem(claim, index, colorClass, determineViewClaim(claim))}
            </Col>
          )
        })}
      </Section>
    )
  }

  const handleRenderPage = (): JSX.Element => {
    const approved: any[] = []
    const pending: any[] = []
    const revoked: any[] = []
    const disputed: any[] = []
    const sections: any[] = []
    claims!.forEach((claim) => {
      switch (claim.status) {
        case '1':
          approved.push(claim)
          break
        case '2':
          revoked.push(claim)
          break
        case '3':
          disputed.push(claim)
          break
        case '0':
        default:
          pending.push(claim)
          break
      }
    })

    pending.length > 0 &&
      sections.push(handleRenderPageSection('icon-pending', pending, '#F89D28', 'Claims pending approval', 1))
    revoked.length > 0 &&
      sections.push(handleRenderPageSection('icon-rejected', revoked, '#E2223B', 'Claims rejected', 2))
    approved.length > 0 &&
      sections.push(handleRenderPageSection('icon-approved', approved, '#5AB946', 'Claims Approved', 3))
    disputed.length > 0 &&
      disputed.push(handleRenderPageSection('icon-disputed', disputed, '#e18c21', 'Claims Disputed', 3))
    return <LayoutWrapper>{sections}</LayoutWrapper>
  }

  return <>{fullPage ? handleRenderPage() : handleRenderWidget()}</>
}
