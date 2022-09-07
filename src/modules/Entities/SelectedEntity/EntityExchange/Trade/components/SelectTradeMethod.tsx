import React, { useMemo, useState } from 'react'
import {
  SelectTradeMethodWrapper,
  SelectTradeMethodText,
  PopoverList,
  PopoverItem,
} from './SelectTradeMethod.styles'
import { TradeMethodType } from '../../types'
import ChevDownIcon from 'assets/images/exchange/chev-down.svg'
import { useHistory } from 'react-router-dom'

interface Props {
  currentMethod: TradeMethodType
}

const SelectTradeMethod: React.FunctionComponent<Props> = ({
  currentMethod,
}) => {
  const history = useHistory()
  const [isShowList, setIsShowList] = useState<boolean>(false)
  const tradeMethods = useMemo(() => {
    return [
      TradeMethodType.Swap,
      TradeMethodType.Buy,
      TradeMethodType.Sell,
      TradeMethodType.Auction,
      TradeMethodType.Bid,
    ].filter((type) => type !== currentMethod)
  }, [currentMethod])

  const handleMethodChange = (type: TradeMethodType): void => {
    const { pathname } = history.location
    const chunks = pathname.split('/')
    chunks.pop()
    history.push(`${chunks.join('/')}/${type.toLowerCase()}`)
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
        <span>{currentMethod}</span>
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
