import React from 'react'
import { RootState } from 'common/redux/types'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import EnterBuyOrder from './components/EnterBuyOrder/EnterBuyOrder'
import ConfirmBuyOrder from './components/ConfirmBuyOrder/ConfirmBuyOrder'
import * as bondBuySelectors from './BondBuy.selectors'

interface Props {
  projectDID: string
  bondDID: string
  isReceiving: boolean
}

const BondBuy: React.FunctionComponent<Props> = ({
  projectDID,
  bondDID,
  isReceiving,
}) => {
  return (
    <div className="BondsWrapper_panel__chrome">
      <div className="BondsWrapper_panel__content">
        <div className="centerAll">
          <BrowserRouter>
            <div className="BuySellForm_wrapper">
              <Route
                exact
                path={[
                  `/projects/${projectDID}/bonds/${bondDID}/exchange/buy`,
                  `/projects/${projectDID}/bonds/${bondDID}/exchange/`,
                ]}
                render={(props: any): JSX.Element => {
                  if (isReceiving) {
                    return (
                      <Redirect
                        from={`/bonds/${bondDID}`}
                        to={`/projects/${projectDID}/bonds/${bondDID}/exchange/buy/confirm`}
                      />
                    )
                  } else {
                    return <EnterBuyOrder {...props} />
                  }
                }}
              />
              <Route
                exact
                path={`/projects/${projectDID}/bonds/${bondDID}/exchange/buy/confirm`}
                render={(props: any): JSX.Element => (
                  <ConfirmBuyOrder {...props} />
                )}
              />
            </div>
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState): any => ({
  isReceiving: bondBuySelectors.selectBondBuyIsReceiving(state),
})

export default connect(mapStateToProps)(BondBuy)
