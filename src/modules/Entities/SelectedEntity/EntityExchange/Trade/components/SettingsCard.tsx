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
  NetworkSettingBody,
  NetworkSettingOption,
} from './SettingsCard.styles'
import ChevDownIcon from 'assets/images/exchange/chev-down.svg'

const networkOptions = ['Impact Hub', 'Cosmos Hub', 'Osmosis']

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
        onChange={(e): void => setSlippage(Number(e.target.value))}
      />
    </SlippageSettingBody>
  )
}

const NetworkSetting = ({ network, setNetwork }): JSX.Element => {
  return (
    <NetworkSettingBody className="p-3">
      {networkOptions.map((option) => (
        <NetworkSettingOption
          className="d-flex justify-content-between"
          key={option}
          isSelected={option === network}
          onClick={(): void => setNetwork(option)}
        >
          <div className="d-flex align-items-center">
            <span className="dot mr-2" />
            <span>{option}</span>
          </div>
        </NetworkSettingOption>
      ))}
    </NetworkSettingBody>
  )
}

interface Props {
  slippage: number
  network: string
  setSlippage: (slippage: number) => void
  setNetwork: (network: string) => void
}
const SettingsCard: React.FC<Props> = ({
  slippage,
  network,
  setSlippage,
  setNetwork,
}): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState(0)

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
          <span>Network</span>
          <div className="d-flex align-items-center">
            <img
              src={ChevDownIcon}
              alt=""
              className={cx('ml-2', { reverse: selectedOption === 2 })}
            />
          </div>
        </SettingsCardOptionHeader>
        <SettingsCardOptionBody height={selectedOption === 2 ? '140px' : '0'}>
          <NetworkSetting network={network} setNetwork={setNetwork} />
        </SettingsCardOptionBody>
      </SettingsCardOption>
    </SettingsCardWrapper>
  )
}

export default SettingsCard
