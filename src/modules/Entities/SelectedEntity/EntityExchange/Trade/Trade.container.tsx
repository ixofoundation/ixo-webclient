import React, { useState } from 'react'

// export interface Props {
// }

const Trade: React.FunctionComponent = () => {

  const [action, setAction] = useState('Swap')

  const handleAction = (event: any): any => {
    setAction(event.target.value)
  }

  return (
    <>
      <h1>Trade</h1>
      <select name="action" onChange={handleAction}>
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
