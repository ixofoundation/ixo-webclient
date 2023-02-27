// import EventsTable from './EventsTable'
import CircledLocation from 'assets/icons/CircledLocation'
import ButtonSlider from 'components/ButtonSlider/ButtonSlider'
import { Button, ButtonTypes } from 'components/Form/Buttons'
import BarChart, { BarColors } from 'components/Widgets/BarChart/BarChart'
import { CircleProgressbar } from 'components/Widgets/CircleProgressbar/CircleProgressbar'
import { LatLng, WorldMap } from 'components/Widgets/WorldMap/WorldMap'
import { LayoutWrapper } from 'components/Wrappers/LayoutWrapper'
import { gridSizes, WidgetWrapper } from 'components/Wrappers/WidgetWrapper'
import { nFormatter } from 'utils/currency'
import { AgentRole } from 'redux/account/account.types'
import { selectUserRole } from 'redux/selectedEntity/selectedEntity.selectors'
// import Events from 'assets/icons/Events'
import { Agent } from 'types/entities'
import React, { useMemo, useState } from 'react'
import { useAppSelector } from 'redux/hooks'
import { ProjectClaims } from '../../../Components/Claims/Claims'
import {
  ClaimsLabels,
  ClaimsTopLabels,
  ClaimsWidget,
  Container,
  ProgressContainer,
  SectionHeader,
  WrappedLink,
  ScrollableButtons,
} from './Dashboard.styles'
import ProjectGovernance from './ProjectGovernance'
import Targets from './Targets'
import { requireCheckDefault } from 'utils/images'

export interface Props {
  did: string
  bondDid: string
  goal: string
  serviceProvidersCount: number
  serviceProvidersPendingCount: number
  evaluatorsCount: number
  evaluatorsPendingCount: number
  claims: any[] // TODO - give type
  requiredClaimsCount: number
  successfulClaimsCount: number
  pendingClaimsCount: number
  rejectedClaimsCount: number
  disputedClaimsCount: number
  remainingClaimsCount: number
  latLng: LatLng
  showAgentLinks: boolean
  showClaimLinks: boolean
  entityClaims: any[]
  agents: Agent[]
}

const Dashboard: React.FunctionComponent<Props> = ({
  did,
  bondDid,
  serviceProvidersCount,
  serviceProvidersPendingCount,
  claims,
  requiredClaimsCount,
  successfulClaimsCount,
  pendingClaimsCount,
  rejectedClaimsCount,
  disputedClaimsCount,
  remainingClaimsCount,
  latLng,
  // showAgentLinks,
  entityClaims,
  agents,
}) => {
  const isViewedFromApp = !!window.MobileContext
  const userRole = useAppSelector(selectUserRole)
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  // const [successfulClaims, setSuccessfulClaims] = useState(0)
  // const [rejectedClaims, setRejectedClaims] = useState(0)
  // const [pendingClaims, setPendingClaims] = useState(0)
  // const [remainingClaims, setRemainingClaims] = useState(0)

  const canViewClaim = useMemo(
    () => userRole === AgentRole.Evaluator || userRole === AgentRole.ServiceProvider,
    [userRole],
  )

  const claimsRejected = useMemo(() => {
    return claims.filter(
      (claim) => claim.claimTemplateId === entityClaims[activeTabIndex]['@id'] && claim.status === '2',
    )
  }, [claims, entityClaims, activeTabIndex])

  const claimsApproved = useMemo(() => {
    return claims.filter(
      (claim) => claim.claimTemplateId === entityClaims[activeTabIndex]['@id'] && claim.status === '1',
    )
  }, [claims, entityClaims, activeTabIndex])

  const claimsPending = useMemo(() => {
    return claims.filter(
      (claim) => claim.claimTemplateId === entityClaims[activeTabIndex]['@id'] && claim.status === '0',
    )
  }, [claims, entityClaims, activeTabIndex])

  const claimsDisputed = useMemo(() => {
    return claims.filter(
      (claim) => claim.claimTemplateId === entityClaims[activeTabIndex]['@id'] && claim.status === '3',
    )
  }, [claims, entityClaims, activeTabIndex])

  const handleTabClick = (tabIndex: number): void => {
    setActiveTabIndex(tabIndex)
  }

  return (
    <LayoutWrapper className='pt-0'>
      <Container className='row'>
        <div className='col-md-12'>
          <WidgetWrapper
            title='Project performance timeline'
            path={`/projects/${did}/detail/investors`}
            linkIcon={'icon-expand'}
            titleIcon={<img alt='' src={requireCheckDefault(require('assets/img/sidebar/performance.svg'))} />}
          >
            <div className='d-flex justify-content-between w-100 mt-3 mb-2 flex-column flex-sm-row flex-wrap'>
              <ScrollableButtons>
                <ButtonSlider>
                  {entityClaims.map((claim, key) => (
                    <Button
                      type={ButtonTypes.dark}
                      onClick={(): void => handleTabClick(key)}
                      inactive={activeTabIndex !== key}
                      key={key}
                    >
                      {claim.title}
                    </Button>
                  ))}
                </ButtonSlider>
              </ScrollableButtons>
              <ClaimsTopLabels>
                <p>Claims pending</p>
                <p>Claims approved</p>
                <p>Claims rejected</p>
                <p>Claims disputed</p>
              </ClaimsTopLabels>
            </div>

            <BarChart
              barData={[
                {
                  data: claimsRejected,
                  color: BarColors.red,
                  label: 'Claims Rejected',
                },
                {
                  data: claimsApproved,
                  color: BarColors.green,
                  label: 'Claims Approved',
                },
                {
                  data: claimsPending,
                  color: BarColors.darkBlue,
                  label: 'Claims Pending',
                },
                {
                  data: claimsDisputed,
                  color: BarColors.yellow,
                  label: 'Claims Disputed',
                },
              ]}
            />
          </WidgetWrapper>
        </div>
        {
          <div className='col-sm-6 col-lg-3' style={{ paddingTop: 20, paddingBottom: 20 }}>
            <WidgetWrapper
              title='Project Governance'
              link={true}
              gridHeight={gridSizes.standard}
              path={(!isViewedFromApp && `/projects/${did}/detail/governance`) || undefined}
              linkIcon={(!isViewedFromApp && 'icon-expand') || undefined}
              titleIcon={<img alt='' src={requireCheckDefault(require('assets/img/sidebar/governance.svg'))} />}
            >
              <ProjectGovernance />
              {/* <SingleStatistic
                title="Total"
                type={StatType.decimal}
                amount={evaluatorsCount}
                descriptor={[
                  { class: 'text-block', value: 'Pending Approval:' },
                  {
                    class: 'number-orange',
                    value: evaluatorsPendingCount,
                  },
                ]}
              /> */}
            </WidgetWrapper>
          </div>
        }
        {
          <div className='col-sm-6 col-lg-3' style={{ paddingTop: 20, paddingBottom: 20 }}>
            <WidgetWrapper
              title='Outcome Target'
              link={bondDid ? true : false}
              gridHeight={gridSizes.standard}
              path={`/projects/${did}/bonds/${bondDid}/detail/outcomes`}
              linkIcon={'icon-expand'}
              titleIcon={<img alt='' src={requireCheckDefault(require('assets/img/sidebar/target.svg'))} />}
            >
              <Targets />
            </WidgetWrapper>
          </div>
        }

        <div className='col-lg-6' style={{ paddingTop: 20, paddingBottom: 20 }}>
          <WidgetWrapper
            // title="Impact claims"
            gridHeight={gridSizes.standard}
            // titleIcon={
            //   <img alt="" src={requireCheckDefault(require('assets/img/sidebar/claim.svg'))} />
            // }
          >
            <ClaimsWidget>
              <ClaimsLabels className='m-0'>
                <SectionHeader className='p-0'>
                  <div>
                    <img alt='' src={requireCheckDefault(require('assets/img/sidebar/claim.svg'))} />
                    Headline Claims
                  </div>
                  {!isViewedFromApp && (
                    <WrappedLink to={canViewClaim ? `/projects/${did}/detail/claims` : undefined!}>
                      <i className='icon-expand' />
                    </WrappedLink>
                  )}
                </SectionHeader>
                <div className='pl-4'>
                  <p>
                    <strong>{nFormatter(successfulClaimsCount)}</strong> Approved
                  </p>
                  <p>
                    <strong>{nFormatter(pendingClaimsCount)}</strong> Pending Approval
                  </p>
                  <p>
                    <strong>{nFormatter(rejectedClaimsCount)}</strong> Rejected
                  </p>
                  <p>
                    <strong>{nFormatter(disputedClaimsCount)}</strong> Disputed
                  </p>
                  <p>
                    <strong>{nFormatter(remainingClaimsCount)}</strong> Remaining
                  </p>
                </div>
                <div className='mt-2'>
                  <SectionHeader>
                    <div>
                      <img alt='' src={requireCheckDefault(require('assets/img/sidebar/profile.svg'))} />
                      Agents
                    </div>
                    {!isViewedFromApp && (
                      <WrappedLink to={`/projects/${did}/detail/agents`}>
                        <i className='icon-expand' />
                      </WrappedLink>
                    )}
                  </SectionHeader>
                  <div className='mt-2 mt-sm-4'>
                    <div style={{ paddingLeft: '60px' }}>
                      <div>
                        <strong>{serviceProvidersCount}</strong> Authorised
                      </div>
                      <div>
                        <strong>{serviceProvidersPendingCount}</strong> Pending
                      </div>
                    </div>
                  </div>
                </div>
              </ClaimsLabels>
              <ProgressContainer>
                <CircleProgressbar
                  approved={successfulClaimsCount}
                  rejected={rejectedClaimsCount}
                  pending={pendingClaimsCount}
                  disputed={disputedClaimsCount}
                  totalNeeded={requiredClaimsCount}
                  descriptor={
                    <>
                      {nFormatter(
                        successfulClaimsCount + rejectedClaimsCount + pendingClaimsCount + disputedClaimsCount,
                      )}{' '}
                      by {agents.length} <strong>Agents</strong>
                    </>
                  }
                />
              </ProgressContainer>
            </ClaimsWidget>
          </WidgetWrapper>
        </div>

        {/* <div className="col-md-12">
          <WidgetWrapper
            title="Project Events"
            path={`/projects/${did}/detail/events`}
            gridHeight={gridSizes.standard}
            titleIcon={<Events />}
            link={true}
            linkIcon={'icon-expand'}
          >
            <EventsTable />
          </WidgetWrapper> */}
        {/* <BondTable selectedHeader={selectedHeader} /> */}
        {/* </div> */}
        {/* debug-elite comment outed by elite 2021-1209 end */}
        <div className='col-md-6' style={{ paddingTop: 20, paddingBottom: 20 }}>
          <WidgetWrapper
            title='Claim location activity'
            path={`/projects/${did}/detail/claims`}
            gridHeight={gridSizes.standard}
            titleIcon={<CircledLocation />}
          >
            <WorldMap markers={[latLng]} />
          </WidgetWrapper>
        </div>
        <div className='col-md-6' style={{ paddingTop: 20, paddingBottom: 20 }}>
          <WidgetWrapper
            title='Latest claims'
            path={canViewClaim ? `/projects/${did}/detail/claims` : undefined}
            gridHeight={gridSizes.standard}
            titleIcon={<img alt='' src={requireCheckDefault(require('assets/img/sidebar/claim.svg'))} />}
            linkIcon={(!isViewedFromApp && 'icon-expand') || undefined}
            link={true}
          >
            <ProjectClaims claims={claims} did={did} fullPage={false} hasLink={true} />
          </WidgetWrapper>
        </div>
      </Container>
    </LayoutWrapper>
  )
}

export default Dashboard
