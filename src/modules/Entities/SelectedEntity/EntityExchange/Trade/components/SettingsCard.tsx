import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import {
  SettingsCardWrapper,
  SlippageSettingBody,
  SlippageSettingOptions,
  SlippageSettingOption,
  SlippageSettingSlider,
  SettingsCardOption,
  SettingsCardOptionHeader,
  SettingsCardOptionBody,
  GasPriceSettingBody,
  GasPriceSettingOption,
} from './SettingsCard.styles'
import ChevDownIcon from 'assets/images/exchange/chev-down.svg'

const gasOptions = [
  {
    label: 'Medium',
    price: 0.03,
  },
  {
    label: 'Fast',
    price: 0.05,
  },
  {
    label: 'Very Fast',
    price: 0.08,
  },
]

const SlippageSetting = ({ slippage, setSlippage }): JSX.Element => {
  const options = useMemo(() => [1, 2, 3, 5], [])
  return (
    <SlippageSettingBody>
      <SlippageSettingOptions>
        {options.map((option) => (
          <SlippageSettingOption
            key={option}
            isSelected={option === slippage}
            onClick={(): void => setSlippage(option)}
          >
            {option}%
          </SlippageSettingOption>
        ))}
      </SlippageSettingOptions>
      <SlippageSettingSlider
        type="range"
        min="1"
        max="100"
        value={slippage}
        onChange={(e): void => setSlippage(e.target.value)}
      />
    </SlippageSettingBody>
  )
}

const GasPriceSetting = ({ gasPrice, setGasPrice }): JSX.Element => {
  return (
    <GasPriceSettingBody className="p-3">
      {gasOptions.map((option) => (
        <GasPriceSettingOption
          className="d-flex justify-content-between"
          key={option.label}
          isSelected={option.price === gasPrice}
          onClick={(): void => setGasPrice(option.price)}
        >
          <div className="d-flex align-items-center">
            <span className="dot mr-2" />
            <span>{option.label}</span>
          </div>
          <span>({option.price} IXO)</span>
        </GasPriceSettingOption>
      ))}
    </GasPriceSettingBody>
  )
}

interface Props {
  slippage: number
  gasPrice: number
  setSlippage: (slippage: number) => void
  setGasPrice: (gasPrice: number) => void
}
const SettingsCard: React.FC<Props> = ({
  slippage,
  gasPrice,
  setSlippage,
  setGasPrice,
}): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState(0)

  const selectedGasOption = useMemo(
    () => gasOptions.find((option) => option.price === gasPrice),
    [gasPrice],
  )

  const toggleOption = (number: number): void => {
    if (selectedOption === number) {
      setSelectedOption(0)
    } else {
      setSelectedOption(number)
    }
  }

  return (
    <SettingsCardWrapper>
      <SettingsCardOption>
        <SettingsCardOptionHeader onClick={(): void => toggleOption(1)}>
          <span>Max Slippage</span>
          <div className="d-flex align-items-center">
            <span>{slippage}%</span>
            <img
              src={ChevDownIcon}
              alt=""
              className={cx('ml-2', { reverse: selectedOption === 1 })}
            />
          </div>
        </SettingsCardOptionHeader>
        <SettingsCardOptionBody height={selectedOption === 1 ? '70px' : '0'}>
          <SlippageSetting slippage={slippage} setSlippage={setSlippage} />
        </SettingsCardOptionBody>
      </SettingsCardOption>

      <SettingsCardOption>
        <SettingsCardOptionHeader onClick={(): void => toggleOption(2)}>
          <span>Exchanges</span>
          <div className="d-flex align-items-center">
            <img
              src={ChevDownIcon}
              alt=""
              className={cx('ml-2', { reverse: selectedOption === 2 })}
            />
          </div>
        </SettingsCardOptionHeader>
        <SettingsCardOptionBody height={selectedOption === 2 ? '20px' : '0'}>
          Exchanges
        </SettingsCardOptionBody>
      </SettingsCardOption>

      <SettingsCardOption>
        <SettingsCardOptionHeader onClick={(): void => toggleOption(3)}>
          <span>Gas Price</span>
          <div className="d-flex align-items-center">
            <span>
              {selectedGasOption?.label} ({selectedGasOption?.price} IXO)
            </span>
            <img
              src={ChevDownIcon}
              alt=""
              className={cx('ml-2', { reverse: selectedOption === 3 })}
            />
          </div>
        </SettingsCardOptionHeader>
        <SettingsCardOptionBody height={selectedOption === 3 ? '140px' : '0'}>
          <GasPriceSetting gasPrice={gasPrice} setGasPrice={setGasPrice} />
        </SettingsCardOptionBody>
      </SettingsCardOption>
    </SettingsCardWrapper>
  )
}

export default SettingsCard
