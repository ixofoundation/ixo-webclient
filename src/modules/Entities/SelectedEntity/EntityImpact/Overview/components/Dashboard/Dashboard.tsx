import * as React from 'react'
import {
  WidgetWrapper,
  gridSizes,
} from 'common/components/Wrappers/WidgetWrapper'
import { LayoutWrapper } from 'common/components/Wrappers/LayoutWrapper'
import { ProjectClaims } from '../../../components/Claims/Claims'
import { CircleProgressbar } from 'common/components/Widgets/CircleProgressbar/CircleProgressbar'
import BarChart, {
  BarColors,
} from 'common/components/Widgets/BarChart/BarChart'
import { LatLng, WorldMap } from 'common/components/Widgets/WorldMap/WorldMap'
import {
  Container,
  ClaimsLabels,
  ClaimsTopLabels,
  ClaimsWidget,
  SectionHeader,
  ProgressContainer
} from './Dashboard.styles'
import { Button, ButtonTypes } from 'common/components/Form/Buttons'
import ButtonSlider from 'common/components/ButtonSlider/ButtonSlider'
import ProjectGovernance from './ProjectGovernance'
import Targets from './Targets'
import EventsTable from './EventsTable'
import CircledLocation from 'assets/icons/CircledLocation'
import Events from 'assets/icons/Events'

export interface Props {
  did: string
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
  remainingClaimsCount: number
  latLng: LatLng
  showAgentLinks: boolean
  showClaimLinks: boolean
}

const Dashboard: React.FunctionComponent<Props> = ({
  did,
  serviceProvidersCount,
  serviceProvidersPendingCount,
  evaluatorsCount,
  evaluatorsPendingCount,
  claims,
  goal,
  requiredClaimsCount,
  successfulClaimsCount,
  pendingClaimsCount,
  rejectedClaimsCount,
  remainingClaimsCount,
  latLng,
  showAgentLinks,
  showClaimLinks,
}) => {
  const getClaimsOfType = (claimType: string): Array<any> => {
    return [...claims].filter((claim) => claim.status === claimType)
  }
  
  const [activeTab, setActiveTab] = React.useState('educational_pass');
  const [selectedHeader, setSelectedHeader] = React.useState('price')

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  }
  const dummyClaims = [
    {
      status: '1',
      claimId: 'Water system no.234559574 completed',
      saDid: 'Service Provider name',
      date: '2020-10-09',
    },
    {
      status: '2',
      claimId: 'Water system no.234559574 completed',
      saDid: 'Service Provider name',
      date: '2020-10-09',
    },
    {
      status: '3',
      claimId: 'Water system no.234559574 completed',
      saDid: 'Service Provider name',
      date: '2020-10-09',
    },
    {
      status: '0',
      claimId: 'Water system no.234559574 completed',
      saDid: 'Service Provider name',
      date: '2020-10-09',
    },
    {
      status: '0',
      claimId: 'Water system no.234559574 completed',
      saDid: 'Service Provider name',
      date: '2020-10-09',
    }
  ]
  return (
    <LayoutWrapper>
      <Container className="row">
        <div className="col-md-12">
          <WidgetWrapper
            title="Project performance timeline"
            path={`/projects/${did}/detail/investors`}
            linkIcon={'icon-expand'}
            titleIcon={ <img src={ require('assets/img/sidebar/performance.svg') } /> }
          >
            <div className="d-flex justify-content-between w-100 mt-3 mb-2 flex-column flex-sm-row">
              <ButtonSlider>
                <Button
                  type={ ButtonTypes.dark }
                  onClick={() => handleTabClick('educational_pass') }
                  disabled={ activeTab !== 'educational_pass' }
                >
                  Educational Pass
                </Button>
                <Button
                  type={ ButtonTypes.dark }
                  onClick={() => handleTabClick('schools_built') }
                  disabled={ activeTab !== 'schools_built' }
                >
                  Schools Built
                </Button>
                <Button
                  type={ ButtonTypes.dark }
                  onClick={() => handleTabClick('teachers_trained') }
                  disabled={ activeTab !== 'teachers_trained' }
                >
                  Teachers Trained
                </Button>
                <Button
                  type={ ButtonTypes.dark }
                  onClick={() => handleTabClick('another_claim') }
                  disabled={ activeTab !== 'another_claim' }
                >
                  Another Claim
                </Button>
                <Button
                  type={ ButtonTypes.dark }
                  onClick={() => handleTabClick('one_more_claim') }
                  disabled={ activeTab !== 'one_more_claim' }
                >
                  One More Claim
                </Button>
                <Button
                  type={ ButtonTypes.dark }
                  onClick={() => handleTabClick('exams') }
                  disabled={ activeTab !== 'exams' }
                >
                  Exams
                </Button>
              </ButtonSlider>
              <ClaimsTopLabels>
                <p>Claims pending</p>
                <p>Claims approved</p>
                <p>Claims rejected</p>
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
                  color: BarColors.blue,
                  label: 'Claims Approved',
                },
                {
                  data: getClaimsOfType('0'),
                  color: BarColors.darkBlue,
                  label: 'Claims Submitted',
                },
              ]}
            />
          </WidgetWrapper>
        </div>
        {
          <div className="col-sm-6 col-lg-3" style={{ paddingTop: 20, paddingBottom: 20 }}>
            <WidgetWrapper
              title="Project Governance"
              link={showAgentLinks}
              gridHeight={gridSizes.standard}
              path={`/projects/${did}/detail/evaluators`}
              linkIcon={'icon-expand'}
              titleIcon={ <img src={ require('assets/img/sidebar/governance.png') } /> }
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
          <div className="col-sm-6 col-lg-3" style={{ paddingTop: 20, paddingBottom: 20 }}>
            <WidgetWrapper
              title="Outcomes Targets"
              link={showAgentLinks}
              gridHeight={gridSizes.standard}
              path={`/projects/${did}/detail/service-providers`}
              linkIcon={'icon-expand'}
              titleIcon={ <img src={ require('assets/img/sidebar/target.png') } /> }
            >
              <Targets 
              />
            </WidgetWrapper>
          </div>
        }
        {
          <div className="col-lg-6" style={{ paddingTop: 20, paddingBottom: 20 }}>
            <WidgetWrapper
              title="Impact claims"
              gridHeight={gridSizes.standard}
              titleIcon={ <img src={ require('assets/img/sidebar/claim.png') } /> }
            >
              <ClaimsWidget>
                <ClaimsLabels>
                  <div>
                    <p>
                      <strong>{successfulClaimsCount}</strong> claims approved
                    </p>
                    <p>
                      <strong>{pendingClaimsCount}</strong> claims pending approval
                    </p>
                    <p>
                      <strong>{rejectedClaimsCount}</strong> claims rejected
                    </p>
                    <p>
                      <strong>{remainingClaimsCount}</strong> remaining claims
                    </p>
                  </div>
                  <div className="mt-2">
                    <SectionHeader>
                      <img src={ require('assets/img/sidebar/profile.png') } />
                      Agents
                      <i className='icon-expand' />
                    </SectionHeader>
                    <div className="mt-2 mt-sm-4">
                      <div style={{ paddingLeft: '60px'}}>
                        <div>
                          <strong>23</strong> authorised Service Providers
                        </div>
                        <div>
                          <strong>5</strong> pending Service Providers
                        </div>
                      </div>
                    </div>
                  </div>
                </ClaimsLabels>
                <ProgressContainer>
                  <CircleProgressbar
                    approved={2}
                    rejected={1}
                    pending={1}
                    totalNeeded={requiredClaimsCount}
                    descriptor={<>water systems built by 23 <strong>Agents</strong></>}
                  />
                </ProgressContainer> 
              </ClaimsWidget>
            </WidgetWrapper>
          </div>
        }
        <div className="col-md-12">
          <WidgetWrapper
            title="Project Events"
            path={`/projects/${did}/detail/events`}
            gridHeight={gridSizes.standard}
            titleIcon={ <Events /> }
            link={true}
            linkIcon={'icon-expand'}
          >
            <EventsTable />
          </WidgetWrapper>
          {/* <BondTable selectedHeader={selectedHeader} /> */}
        </div>
        <div className="col-md-6" style={{ paddingTop: 20, paddingBottom: 20 }}>
          <WidgetWrapper
            title="Claim location activity"
            path={`/projects/${did}/detail/claims`}
            gridHeight={gridSizes.standard}
            titleIcon={ <CircledLocation /> }
          >
            <WorldMap markers={[latLng]} />
          </WidgetWrapper>
        </div>
        {dummyClaims.length > 0 && (
          <div className="col-md-6" style={{ paddingTop: 20, paddingBottom: 20 }}>
            <WidgetWrapper
              title="Latest claims"
              path={`/projects/${did}/detail/claims`}
              gridHeight={gridSizes.standard}
              titleIcon={ <img src={ require('assets/img/sidebar/claim.png') } /> }
              linkIcon={'icon-expand'}
              link={true}
            >
              <ProjectClaims
                claims={dummyClaims}
                did={did}
                fullPage={false}
                hasLink={showClaimLinks}
              />
            </WidgetWrapper>
          </div>
        )}
      </Container>
    </LayoutWrapper>
  )
}

export default Dashboard
