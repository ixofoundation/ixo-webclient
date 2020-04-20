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
  requiredClaims: number
  successfulClaims: number
  pendingClaims: number
  rejectedClaims: number
  remainingClaims: number
  serviceProviders: number
  evaluators: number
  countries: any[]
}

export const ProjectsDashboard: React.SFC<ParentProps> = ({
  requiredClaims,
  pendingClaims,
  successfulClaims,
  rejectedClaims,
  remainingClaims,
  serviceProviders,
  evaluators,
  countries,
}) => {
  const getProjectsLatLng = (): Array<unknown> => {
    const coords = []
    for (const key in isoCountriesLatLng) {
      if (Object.hasOwnProperty.call(isoCountriesLatLng, key)) {
        for (const i in countries) {
          if (countries[i] === key) {
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
                  amount={serviceProviders}
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
                  amount={evaluators}
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
                      <strong>{successfulClaims}</strong> Approved
                    </p>
                    <p>
                      <strong>{pendingClaims}</strong> Pending Approval
                    </p>
                    <p>
                      <strong>{rejectedClaims}</strong> Rejected
                    </p>
                    <p>
                      <strong>{remainingClaims}</strong> Total remaining claims
                    </p>
                  </ClaimsLabels>
                  <CircleProgressbar
                    approved={successfulClaims}
                    rejected={0}
                    pending={0}
                    totalNeeded={requiredClaims}
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
