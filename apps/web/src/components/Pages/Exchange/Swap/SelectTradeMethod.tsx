import React, { useMemo, useState } from 'react'
import { SelectTradeMethodWrapper, SelectTradeMethodText, PopoverList, PopoverItem } from './SelectTradeMethod.styles'
import { TradeMethodType } from 'redux/selectedEntityExchange/entityExchange.types'
import ChevDownIcon from '/public/assets/images/icon-chev-down.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { setSelectedTradeMethod } from 'redux/selectedEntityExchange/entityExchange.actions'
import { selectSelectedTradeMethod } from 'redux/selectedEntityExchange/entityExchange.selectors'

const SelectTradeMethod: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isShowList, setIsShowList] = useState<boolean>(false)
  const selectedTradeMethod = useAppSelector(selectSelectedTradeMethod)
  const { pathname } = useLocation()
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
    const chunks = pathname.split('/')
    chunks.pop()
    navigate(`${chunks.join('/')}/${type.toLowerCase()}`)
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
        <img src={ChevDownIcon} alt='' />
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
