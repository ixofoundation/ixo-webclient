import React from 'react'
import { PopoverList, PopoverItem } from './SelectTradeMethod.styles'
import { TradeMethodType } from '../../types'

interface Props {
  handleMethodChange: any
  handleMethodHover: any
}

const SelectTradeMethod: React.FunctionComponent<Props> = ({
  handleMethodChange,
  handleMethodHover,
}) => {
  return (
    <PopoverList
      onMouseEnter={(): any => {
        handleMethodHover(true)
      }}
      onMouseLeave={(): any => {
        handleMethodHover(false)
      }}
    >
      <PopoverItem
        onClick={(): any => {
          handleMethodChange(TradeMethodType.Swap)
        }}
      >
        {TradeMethodType.Swap}
      </PopoverItem>
      <PopoverItem
        onClick={(): any => {
          handleMethodChange(TradeMethodType.Purchase)
        }}
      >
        {TradeMethodType.Purchase}
      </PopoverItem>
      <PopoverItem
        onClick={(): any => {
          handleMethodChange(TradeMethodType.Sell)
        }}
      >
        {TradeMethodType.Sell}
      </PopoverItem>
      <PopoverItem
        onClick={(): any => {
          handleMethodChange(TradeMethodType.Auction)
        }}
      >
        {TradeMethodType.Auction}
      </PopoverItem>
      <PopoverItem
        onClick={(): any => {
          handleMethodChange(TradeMethodType.Bid)
        }}
      >
        {TradeMethodType.Bid}
      </PopoverItem>
    </PopoverList>
  )
}
export default SelectTradeMethod
