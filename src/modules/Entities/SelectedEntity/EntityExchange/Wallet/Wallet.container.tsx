import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { changeTradeMethod } from '../EntityExchange.actions'
import Tooltip, { TooltipPosition } from 'common/components/Tooltip/Tooltip'
import {
  CardHeader,
  CardBody,
  WalletBox,
} from './Wallet.container.styles'
import { TradeMethodType } from '../types'

import IMG_wallet1 from 'assets/images/exchange/wallet1.svg'
import IMG_wallet2 from 'assets/images/exchange/wallet2.svg'
import IMG_wallet3 from 'assets/images/exchange/wallet3.svg'
import * as keplr from 'common/utils/keplr'
import { useHistory } from 'react-router-dom'
import { setKeplrWallet } from 'modules/Account/Account.actions'

const Wallet: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const selectedEntity = useSelector((state: RootState) => state.selectedEntity)
  const [, setSignedIn] = useState<boolean>(false)
  const [method, setMethod] = useState<TradeMethodType>(null)
  const history = useHistory()

  const handleMethodChange = (newMethod: TradeMethodType): any => {
    setMethod(newMethod)
    dispatch(changeTradeMethod(newMethod))
  }

  const handleWalletClick = async (): Promise<any> => {
    const [accounts, offlineSigner] = await keplr.connectAccount()

    console.log('cosmJS', accounts, offlineSigner)
    if (!accounts) {
      setSignedIn(false)
    } else {
      dispatch(setKeplrWallet(accounts[0].address, offlineSigner))
      handleMethodChange(TradeMethodType.Purchase)
      setSignedIn(true)
      history.push(`/projects/${selectedEntity.did}/exchange`)
    }
  }

  useEffect(() => {
    console.log('selectedEntity', selectedEntity)
  }, [selectedEntity])

  return (
    <>
      {selectedEntity && (
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-sm-6 col-md-4'></div>
            <div className='col-xs-12 col-sm-6 col-md-4'>
              <CardHeader>
                {'Connect My Wallet'}
              </CardHeader>

              {method === null && (
                <CardBody>
                  <Tooltip
                    text={'Coming soon'}
                    position={TooltipPosition.Bottom}
                  >
                    <WalletBox>
                      <img src={IMG_wallet1} alt='wallet1' />
                      <span>WalletConnect</span>
                    </WalletBox>
                  </Tooltip>
                  <WalletBox onClick={handleWalletClick}>
                    <img src={IMG_wallet2} alt='wallet2' />
                    <span>Keplr</span>
                  </WalletBox>
                  <Tooltip
                    text={'Coming soon'}
                    position={TooltipPosition.Bottom}
                  >
                    <WalletBox>
                      <img src={IMG_wallet3} alt='wallet3' />
                      <span>ixo mobile</span>
                    </WalletBox>
                  </Tooltip>
                </CardBody>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Wallet
