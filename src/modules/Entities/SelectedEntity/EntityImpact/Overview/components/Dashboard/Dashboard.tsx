import * as React from 'react'
import {
  WidgetWrapper,
  gridSizes,
} from 'common/components/Wrappers/WidgetWrapper'
import { LayoutWrapper } from 'common/components/Wrappers/LayoutWrapper'
import { SingleStatistic } from 'common/components/SingleStatistic/SingleStatistic'
import { StatType } from 'types/models'
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
} from './Dashboard.styles'

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

  return (
    <LayoutWrapper>
      <Container className="row">
        <div className="col-md-12">
          <WidgetWrapper
            title="Timeline"
            path={`/projects/${did}/detail/investors`}
            linkIcon={'icon-expand'}
          >
            <ClaimsTopLabels>
              <p>Claims pending</p>
              <p>Claims approved</p>
              <p>Claims rejected</p>
            </ClaimsTopLabels>
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
          <div className="col-sm-6 col-lg-3">
            <WidgetWrapper
              title="Evaluators"
              link={showAgentLinks}
              gridHeight={gridSizes.standard}
              path={`/projects/${did}/detail/evaluators`}
              linkIcon={'icon-expand'}
            >
              <SingleStatistic
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
              />
            </WidgetWrapper>
          </div>
        }
        {
          <div className="col-sm-6 col-lg-3">
            <WidgetWrapper
              title="Service Providers"
              link={showAgentLinks}
              gridHeight={gridSizes.standard}
              path={`/projects/${did}/detail/service-providers`}
              linkIcon={'icon-expand'}
            >
              <SingleStatistic
                title="Total"
                type={StatType.decimal}
                amount={serviceProvidersCount}
                descriptor={[
                  { class: 'text-block', value: 'Pending Approval:' },
                  {
                    class: 'number-orange',
                    value: serviceProvidersPendingCount,
                  },
                ]}
              />
            </WidgetWrapper>
          </div>
        }
        {
          <div className="col-lg-6">
            <WidgetWrapper
              title="Impact claims"
              path={`/projects/${did}/detail/claims`}
              gridHeight={gridSizes.standard}
              linkIcon={'icon-expand'}
              link={showClaimLinks}
            >
              <ClaimsWidget>
                <ClaimsLabels>
                  <div>
                    <p>
                      <strong>{successfulClaimsCount}</strong> approved
                    </p>
                    <p>
                      <strong>{pendingClaimsCount}</strong> pending approval
                    </p>
                    <p>
                      <strong>{rejectedClaimsCount}</strong> rejected
                    </p>
                    <p>
                      <strong>{remainingClaimsCount}</strong> remaining claims
                    </p>
                  </div>
                </ClaimsLabels>
                <CircleProgressbar
                  approved={successfulClaimsCount}
                  rejected={0}
                  pending={0}
                  totalNeeded={requiredClaimsCount}
                  descriptor={goal}
                />
              </ClaimsWidget>
            </WidgetWrapper>
          </div>
        }
        {claims.length > 0 && (
          <div className="col-md-6">
            <WidgetWrapper
              title="Latest claims"
              path={`/projects/${did}/detail/claims`}
              gridHeight={gridSizes.standard}
            >
              <ProjectClaims
                claims={claims}
                did={did}
                fullPage={false}
                hasLink={showClaimLinks}
              />
            </WidgetWrapper>
          </div>
        )}
        {claims.length > 0 && (
          <div className="col-md-6">
            <WidgetWrapper
              title="Claim location activity"
              path={`/projects/${did}/detail/claims`}
              gridHeight={gridSizes.standard}
            >
              <WorldMap markers={[latLng]} />
            </WidgetWrapper>
          </div>
        )}
      </Container>
    </LayoutWrapper>
  )
}

export default Dashboard
