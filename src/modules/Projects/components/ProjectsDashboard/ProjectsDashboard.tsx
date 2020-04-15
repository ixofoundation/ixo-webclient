import * as React from 'react'
import {
  DashboardContainer,
  ClaimsWidget,
  ClaimsLabels,
} from './ProjectsDashboard.styles'
import { LayoutWrapper } from '../../../../components/common/LayoutWrapper'
import { SingleStatistic } from '../../../../components/common/SingleStatistic'
import { StatType } from '../../../../types/models'
import { CircleProgressbar } from '../../../../common/components/Widgets/CircleProgressbar/CircleProgressbar'
import { WorldMap } from '../../../../common/components/Widgets/WorldMap/WorldMap'
import { isoCountriesLatLng } from '../../../../lib/commonData'
import {
  WidgetWrapper,
  gridSizes,
} from '../../../../components/common/WidgetWrapper'

export interface ParentProps {
  claims: any[]
  claimsTotalRequired: number
  agents: any
  projectCountries: any[]
}

export const ProjectsDashboard: React.SFC<ParentProps> = ({
  claims,
  claimsTotalRequired,
  agents,
  projectCountries,
}) => {
  const countClaimsOfType = (claimType: string): number => {
    return [...claims].filter(claim => claim.status === claimType).length
  }

  const getProjectsLatLng = (): Array<unknown> => {
    const coords = []
    for (const key in isoCountriesLatLng) {
      if (Object.hasOwnProperty.call(isoCountriesLatLng, key)) {
        for (const i in projectCountries) {
          if (projectCountries[i] === key) {
            coords.push([
              isoCountriesLatLng[key].lng,
              isoCountriesLatLng[key].lat,
            ])
          }
        }
      }
    }
    return coords
  }

  getProjectsLatLng()
  return (
    <DashboardContainer>
      <LayoutWrapper>
        <div className="row">
          {
            <div className="col-sm-6 col-lg-3">
              <WidgetWrapper
                title="Service Providers"
                gridHeight={gridSizes.standard}
              >
                <SingleStatistic
                  title="Total"
                  type={StatType.decimal}
                  amount={agents.serviceProviders}
                />
              </WidgetWrapper>
            </div>
          }
          {
            <div className="col-sm-6 col-lg-3">
              <WidgetWrapper title="Evaluators" gridHeight={gridSizes.standard}>
                <SingleStatistic
                  title="Total"
                  type={StatType.decimal}
                  amount={agents.evaluators}
                />
              </WidgetWrapper>
            </div>
          }
          {
            <div className="col-lg-6">
              <WidgetWrapper
                title="Impact claims"
                gridHeight={gridSizes.standard}
                linkIcon={'icon-expand'}
              >
                <ClaimsWidget>
                  <ClaimsLabels>
                    <p>
                      <strong>{countClaimsOfType('1')}</strong> Approved
                    </p>
                    <p>
                      <strong>{countClaimsOfType('0')}</strong> Pending Approval
                    </p>
                    <p>
                      <strong>{countClaimsOfType('2')}</strong> Rejected
                    </p>
                    <p>
                      <strong>
                        {claimsTotalRequired - countClaimsOfType('1')}
                      </strong>{' '}
                      Total remaining claims
                    </p>
                  </ClaimsLabels>
                  <CircleProgressbar
                    approved={countClaimsOfType('1')}
                    rejected={0}
                    pending={0}
                    totalNeeded={claimsTotalRequired}
                    descriptor={'verified claims'}
                  />
                </ClaimsWidget>
              </WidgetWrapper>
            </div>
          }
          {
            <div className="col-md-6">
              <WidgetWrapper
                title="Projects location activity"
                gridHeight={gridSizes.standard}
                padding={false}
              >
                <WorldMap
                  // @ts-ignore
                  markers={getProjectsLatLng()}
                />
              </WidgetWrapper>
            </div>
          }
        </div>
      </LayoutWrapper>
    </DashboardContainer>
  )
}
