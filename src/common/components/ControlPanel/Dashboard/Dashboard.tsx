import React, { useEffect, useState } from 'react'
import { Widget } from '../types'
import { ControlPanelSection } from '../ControlPanel.styles'
import { ShieldsWrapper } from './Dashboard.styles'
import DashboardIcon from '../../../../assets/icons/Dashboard'
import Shield, { Image } from './Shield/Shield'
import { useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'common/utils/currency.utils'
import { thousandSeparator } from 'common/utils/formatters'

interface Props {
  entityDid: string
  widget: Widget
}

const Dashboard: React.FunctionComponent<Props> = ({
  entityDid,
  widget: { title, controls },
}) => {
  const [IXOBalance, setIXOBalance] = useState(0)

  const { balances } = useSelector((state: RootState) => state.account)

  useEffect(() => {
    if (balances && balances.length > 0) {
      setIXOBalance(
        getBalanceNumber(
          new BigNumber(
            balances.find((balance) => balance.denom === 'uixo')?.amount,
          ),
        ),
      )
    }
  }, [balances])

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
            src={`https://img.shields.io/static/v1?label=${`IXO Credit`}&labelColor=${`FFF`}&message=${`${thousandSeparator(IXOBalance.toFixed(0), ',')} IXO`}&color=${`blue`}&style=flat-square`}
            alt="asdf"
          />
        )}
      </ShieldsWrapper>
    </ControlPanelSection>
  )
}

export default Dashboard
