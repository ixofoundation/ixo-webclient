// import EventsTable from './EventsTable'
import CircledLocation from 'assets/icons/CircledLocation'
import ButtonSlider from 'common/components/ButtonSlider/ButtonSlider'
import { Button, ButtonTypes } from 'common/components/Form/Buttons'
import BarChart, {
  BarColors,
} from 'common/components/Widgets/BarChart/BarChart'
import { CircleProgressbar } from 'common/components/Widgets/CircleProgressbar/CircleProgressbar'
import { LatLng, WorldMap } from 'common/components/Widgets/WorldMap/WorldMap'
import { LayoutWrapper } from 'common/components/Wrappers/LayoutWrapper'
import {
  gridSizes,
  WidgetWrapper,
} from 'common/components/Wrappers/WidgetWrapper'
// import Events from 'assets/icons/Events'
import { Agent } from 'modules/Entities/types'
import React, { useState } from 'react'
import { ProjectClaims } from '../../../components/Claims/Claims'
import {
  ClaimsLabels,
  ClaimsTopLabels,
  ClaimsWidget,
  Container,
  ProgressContainer,
  SectionHeader,
  WrappedLink,
} from './Dashboard.styles'
import ProjectGovernance from './ProjectGovernance'
import Targets from './Targets'

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
  goal,
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
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  // const [successfulClaims, setSuccessfulClaims] = useState(0)
  // const [rejectedClaims, setRejectedClaims] = useState(0)
  // const [pendingClaims, setPendingClaims] = useState(0)
  // const [remainingClaims, setRemainingClaims] = useState(0)

  // const fetchEntity = (entityDid: string): Promise<ApiListedEntity> =>
  //   blocksyncApi.project.getProjectByProjectDid(entityDid)

  const getClaimsOfType = (claimType: string): Array<any> => {
    return [...claims]
      .filter(
        (claim) =>
          claim.claimTemplateId === entityClaims[activeTabIndex]['@id'],
      )
      .filter((claim) => claim.status === claimType)
  }

  const handleTabClick = (tabIndex: number): void => {
    setActiveTabIndex(tabIndex)
  }

  return (
    <LayoutWrapper className="pt-0">
      <Container className="row">
        <div className="col-md-12">
          <WidgetWrapper
            title="Project performance timeline"
            path={`/projects/${did}/detail/investors`}
            linkIcon={'icon-expand'}
            titleIcon={
              <img alt="" src={require('assets/img/sidebar/performance.svg')} />
            }
          >
            <div className="d-flex justify-content-between w-100 mt-3 mb-2 flex-column flex-sm-row flex-wrap">
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
                  data: getClaimsOfType('2'),
                  color: BarColors.red,
                  label: 'Claims Rejected',
                },
                {
                  data: getClaimsOfType('1'),
                  color: BarColors.green,
                  label: 'Claims Approved',
                },
                {
                  data: getClaimsOfType('0'),
                  color: BarColors.darkBlue,
                  label: 'Claims Pending',
                },
                {
                  data: getClaimsOfType('3'),
                  color: BarColors.yellow,
                  label: 'Claims Disputed',
                },
              ]}
            />
          </WidgetWrapper>
        </div>
        {
          <div
            className="col-sm-6 col-lg-3"
            style={{ paddingTop: 20, paddingBottom: 20 }}
          >
            <WidgetWrapper
              title="Project Governance"
              link={true}
              gridHeight={gridSizes.standard}
              path={`/projects/${did}/detail/governance`}
              linkIcon={'icon-expand'}
              titleIcon={
                <img
                  alt=""
                  src={require('assets/img/sidebar/governance.svg')}
                />
              }
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
          <div
            className="col-sm-6 col-lg-3"
            style={{ paddingTop: 20, paddingBottom: 20 }}
          >
            <WidgetWrapper
              title="Outcomes Targets"
              link={bondDid ? true : false}
              gridHeight={gridSizes.standard}
              path={`/projects/${did}/bonds/${bondDid}/outcomes`}
              linkIcon={'icon-expand'}
              titleIcon={
                <img alt="" src={require('assets/img/sidebar/target.svg')} />
              }
            >
              <Targets />
            </WidgetWrapper>
          </div>
        }

        <div className="col-lg-6" style={{ paddingTop: 20, paddingBottom: 20 }}>
          <WidgetWrapper
            // title="Impact claims"
            gridHeight={gridSizes.standard}
            // titleIcon={
            //   <img alt="" src={require('assets/img/sidebar/claim.svg')} />
            // }
          >
            <ClaimsWidget>
              <ClaimsLabels className="m-0">
                <SectionHeader className="p-0">
                  <div>
                    <img alt="" src={require('assets/img/sidebar/claim.svg')} />
                    Headline claims
                  </div>
                  <WrappedLink to={`/projects/${did}/detail/claims`}>
                    <i className="icon-expand" />
                  </WrappedLink>
                </SectionHeader>
                <div className="pl-4">
                  <p>
                    <strong>{successfulClaimsCount}</strong> claims approved
                  </p>
                  <p>
                    <strong>{pendingClaimsCount}</strong> claims pending
                    approval
                  </p>
                  <p>
                    <strong>{rejectedClaimsCount}</strong> claims rejected
                  </p>
                  <p>
                    <strong>{disputedClaimsCount}</strong> claims disputed
                  </p>
                  <p>
                    <strong>{remainingClaimsCount}</strong> claims remaining
                  </p>
                </div>
                <div className="mt-2">
                  <SectionHeader>
                    <div>
                      <img
                        alt=""
                        src={require('assets/img/sidebar/profile.svg')}
                      />
                      Agents
                    </div>
                    <WrappedLink to={`/projects/${did}/detail/agents`}>
                      <i className="icon-expand" />
                    </WrappedLink>
                  </SectionHeader>
                  <div className="mt-2 mt-sm-4">
                    <div style={{ paddingLeft: '60px' }}>
                      <div>
                        <strong>{serviceProvidersCount}</strong> authorised
                        Agents
                      </div>
                      <div>
                        <strong>{serviceProvidersPendingCount}</strong> pending
                        Agents
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
                      {goal} by {agents.length} <strong>Agents</strong>
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
        <div className="col-md-6" style={{ paddingTop: 20, paddingBottom: 20 }}>
          <WidgetWrapper
            title="Claim location activity"
            path={`/projects/${did}/detail/claims`}
            gridHeight={gridSizes.standard}
            titleIcon={<CircledLocation />}
          >
            <WorldMap markers={[latLng]} />
          </WidgetWrapper>
        </div>
        <div className="col-md-6" style={{ paddingTop: 20, paddingBottom: 20 }}>
          <WidgetWrapper
            title="Latest claims"
            path={`/projects/${did}/detail/claims`}
            gridHeight={gridSizes.standard}
            titleIcon={
              <img alt="" src={require('assets/img/sidebar/claim.svg')} />
            }
            linkIcon={'icon-expand'}
            link={true}
          >
            <ProjectClaims
              claims={claims}
              did={did}
              fullPage={false}
              hasLink={true}
            />
          </WidgetWrapper>
        </div>
      </Container>
    </LayoutWrapper>
  )
}

export default Dashboard
