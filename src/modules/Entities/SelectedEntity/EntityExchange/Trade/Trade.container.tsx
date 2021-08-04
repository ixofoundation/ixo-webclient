import React from 'react'
import { useDispatch } from 'react-redux'
import { changeTradeMethod } from '../EntityExchange.actions'

const Trade: React.FunctionComponent = () => {

  const dispatch = useDispatch()

  const handleMethod = (event: any): any => {
    const newMethod = event.target.value
    dispatch(changeTradeMethod(newMethod))
  }

  return (
    <>
      <h1>Trade</h1>
      <select name="method" onChange={handleMethod}>
        <option value="Swap">Swap</option>
        <option value="Purchase">Purchase</option>
        <option value="Sell">Sell</option>
        <option value="Auction">Auction</option>
        <option value="Bid">Bid</option>
      </select>
    </>
  )
}
export default Trade
