import * as React from 'react'
import styled from 'styled-components'
import { WidgetWrapper, gridSizes } from '../common/WidgetWrapper'
import { LayoutWrapper } from '../common/LayoutWrapper'
import { SingleStatistic } from '../common/SingleStatistic'
import { StatType } from '../../types/models'
import { CircleProgressbar } from '../../common/components/Widgets/CircleProgressbar/CircleProgressbar'
import { WorldMap } from '../../common/components/Widgets/WorldMap/WorldMap'
import { isoCountriesLatLng } from '../../lib/commonData'

const Container = styled.div`
  color: white;
  flex: 1 1 auto;
  display: flex;
`

const ClaimsWidget = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 0;
  flex-wrap: wrap;
`

const ClaimsLabels = styled.div`
  margin-top: 40px;

  strong {
    font-weight: 700;
  }

  p:before {
    content: '';
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-right: 25px;
  }
  p:nth-child(1):before {
    background: ${/* eslint-disable-line */ props => props.theme.ixoBlue};
  }
  p:nth-child(2):before {
    background: ${/* eslint-disable-line */ props => props.theme.ixoOrange};
  }
  p:nth-child(3):before {
    background: ${/* eslint-disable-line */ props => props.theme.red};
  }
  p:nth-child(4):before {
    background: #033c50;
  }
`

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
    <Container>
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
    </Container>
  )
}
