import React, { useMemo, useState } from 'react'
import {
  SelectTradeMethodWrapper,
  SelectTradeMethodText,
  PopoverList,
  PopoverItem,
} from './SelectTradeMethod.styles'
import { TradeMethodType } from '../../types'
import ChevDownIcon from 'assets/images/icon-chev-down.svg'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTradeMethod } from '../../EntityExchange.actions'
import { selectSelectedTradeMethod } from '../../EntityExchange.selectors'

const SelectTradeMethod: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isShowList, setIsShowList] = useState<boolean>(false)
  const selectedTradeMethod = useSelector(selectSelectedTradeMethod)
  const tradeMethods = useMemo(() => {
    return [
      TradeMethodType.Swap,
      TradeMethodType.Buy,
      // TradeMethodType.Sell,
      // TradeMethodType.Auction,
      // TradeMethodType.Bid,
    ].filter((type) => type !== selectedTradeMethod)
  }, [selectedTradeMethod])

  const handleMethodChange = (type: TradeMethodType): void => {
    const { pathname } = history.location
    const chunks = pathname.split('/')
    chunks.pop()
    history.push(`${chunks.join('/')}/${type.toLowerCase()}`)
    dispatch(setSelectedTradeMethod(type))
  }

  return (
    <SelectTradeMethodWrapper>
      <SelectTradeMethodText
        onMouseEnter={(): void => {
          setIsShowList(true)
        }}
        onMouseLeave={(): void => {
          setIsShowList(false)
        }}
      >
        <span>{selectedTradeMethod}</span>
        <img src={ChevDownIcon} alt="" />
      </SelectTradeMethodText>

      {isShowList && (
        <PopoverList
          onMouseEnter={(): void => {
            setIsShowList(true)
          }}
          onMouseLeave={(): void => {
            setIsShowList(false)
          }}
        >
          {tradeMethods.map((method) => (
            <PopoverItem
              key={method}
              onClick={(): void => {
                handleMethodChange(method)
              }}
            >
              {method}
            </PopoverItem>
          ))}
        </PopoverList>
      )}
    </SelectTradeMethodWrapper>
  )
}
export default SelectTradeMethod
