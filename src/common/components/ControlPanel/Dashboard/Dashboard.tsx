import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Widget } from '../types'
import { ControlPanelSection } from '../ControlPanel.styles'
import { ShieldsWrapper } from './Dashboard.styles'
import DashboardIcon from '../../../../assets/icons/Dashboard'
import Shield, { Image } from './Shield/Shield'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'common/utils/currency.utils'
import { thousandSeparator } from 'common/utils/formatters'
import { useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'

interface Props {
  entityDid: string
  widget: Widget
}

const Dashboard: React.FunctionComponent<Props> = ({
  entityDid,
  widget: { title, controls },
}) => {
  const [IXOBalance, setIXOBalance] = useState(0)

  const { creatorDid: projectDID } = useSelector(
    (state: RootState) => state.selectedEntity,
  )

  const getProjectAccountBalance = (did: string): void => {
    Axios.get(`${process.env.REACT_APP_GAIA_URL}/didToAddr/${did}`)
      .then((response) => response.data)
      .then((response) => response.result)
      .then((address) => {
        Axios.get(`${process.env.REACT_APP_GAIA_URL}/bank/balances/${address}`)
          .then((response) => response.data)
          .then((response) => response.result)
          .then((balances) => {
            setIXOBalance(
              getBalanceNumber(
                new BigNumber(
                  balances.find((balance) => balance.denom === 'uixo')
                    ?.amount ?? 0,
                ),
              ),
            )
          })
      })
  }

  useEffect(() => {
    if (projectDID) {
      getProjectAccountBalance(projectDID)
    }
  }, [projectDID])

  return (
    <ControlPanelSection key={title}>
      <h4>
        <div className="heading-icon">
          <DashboardIcon />
        </div>
        {title}
      </h4>
      <ShieldsWrapper>
        {controls.map((control, index) => {
          return <Shield key={index} control={control} entityDid={entityDid} />
        })}
        {IXOBalance && (
          <Image
            src={`https://img.shields.io/static/v1?label=${`IXO Credit`}&labelColor=${`FFF`}&message=${`${thousandSeparator(
              IXOBalance.toFixed(0),
              ',',
            )} IXO`}&color=${`blue`}&style=flat-square`}
            alt="asdf"
          />
        )}
      </ShieldsWrapper>
    </ControlPanelSection>
  )
}

export default Dashboard
