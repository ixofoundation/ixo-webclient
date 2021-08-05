import React from 'react'
import { useDispatch } from 'react-redux'
import { changeTradeMethod } from '../EntityExchange.actions'
import {
  TradeContainerLayout,
  CardLayout,
  CardHeader,
  CardBodyAsset,
} from './Trade.container.styles'

const Trade: React.FunctionComponent = () => {
  const dispatch = useDispatch()

  const handleMethod = (event: any): any => {
    const newMethod = event.target.value
    dispatch(changeTradeMethod(newMethod))
  }

  return (
    <TradeContainerLayout>
      <CardLayout>
        <CardHeader>I have</CardHeader>
        <CardBodyAsset style={{ backgroundColor: 'white' }}>
          <img
            src='https://pds_pandora.ixo.world/public/srw12bu516jkpy0rzmi'
            alt='Asset'
          />

          <div style={{ padding: '20px 20px 30px 20px' }}>
            <div className='btn-group'>
              <button type='button' className='btn'>
                Impact Token
              </button>
              <button type='button' className='btn active'>
                Biodiversity
              </button>
            </div>
            <div className='d-inline-flex justify-content-center align-items-center float-right token-logo'>
              ixo
            </div>

            <div style={{ marginTop: '10px' }} />
            <div className='title'>White Rhino</div>
            <div className='location'>Umgeni Park, South Africa</div>
            <div style={{ marginTop: '10px' }} />
            <div className='progress'>
              <div
                className='progress-bar'
                role='progressbar'
                style={{
                  width: '50%',
                  background:
                    'linear-gradient(-90deg, #6FCF97 0%, #036784 100%)',
                }}
                aria-valuenow={50}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </CardBodyAsset>
      </CardLayout>
      <CardLayout>
        <CardHeader>Connect My Wallet</CardHeader>
        <select name='method' onChange={handleMethod}>
          <option value='Swap'>Swap</option>
          <option value='Purchase'>Purchase</option>
          <option value='Sell'>Sell</option>
          <option value='Auction'>Auction</option>
          <option value='Bid'>Bid</option>
        </select>
      </CardLayout>
    </TradeContainerLayout>
  )
}
export default Trade
