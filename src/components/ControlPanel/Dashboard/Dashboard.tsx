import React, { useEffect, useState } from 'react'
import { Widget } from '../types'
import { ControlPanelSection } from '../ControlPanel.styles'
import { ShieldsWrapper } from './Dashboard.styles'
import DashboardIcon from 'assets/icons/Dashboard'
import Shield, { Image } from './Shield'
import { thousandSeparator } from 'utils/formatters'
// import { GetBalances,
// GetProjectAccounts
//  } from 'lib/protocol'
// import { useIxoConfigs } from 'hooks/configs'
import { Coin } from '@cosmjs/proto-signing'
import BigNumber from 'bignumber.js'

interface Props {
  entityDid: string
  widget: Widget
}

const Dashboard: React.FunctionComponent<Props> = ({ entityDid, widget }) => {
  const title = widget?.title
  const controls = widget?.controls ?? []
  // const { convertToDenom } = useIxoConfigs()
  const [
    ixoCoin,
    // setIxoCoin
  ] = useState<Coin | undefined>(undefined)

  useEffect((): void => {
    const init = async (projectDid: string) => {
      // const accounts = await GetProjectAccounts(projectDid)
      // const balances = await GetBalances(accounts![projectDid])
      // const ixoCoin = balances.find(({ denom }) => denom === 'uixo')
      // setIxoCoin(convertToDenom(ixoCoin!))
    }
    if (entityDid) {
      init(entityDid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityDid])

  return (
    <ControlPanelSection key={title}>
      <h4>
        <div className='heading-icon'>
          <DashboardIcon />
        </div>
        {title}
      </h4>
      <ShieldsWrapper>
        {controls.map((control, index) => {
          return <Shield key={index} control={control} entityDid={entityDid} />
        })}
        {ixoCoin && (
          <Image
            src={`https://img.shields.io/static/v1?label=${`Credit`}&labelColor=${`FFF`}&message=${`${thousandSeparator(
              new BigNumber(ixoCoin.amount).toFixed(0),
              ',',
            )} IXO`}&color=${`blue`}&style=flat-square`}
            alt=''
          />
        )}
      </ShieldsWrapper>
    </ControlPanelSection>
  )
}

export default Dashboard
