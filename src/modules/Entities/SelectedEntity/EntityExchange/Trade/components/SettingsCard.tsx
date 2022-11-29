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
import ChevDownIcon from 'assets/images/icon-chev-down.svg'
import { useIxoConfigs } from 'redux/configs/configs.hooks'

const SlippageSetting = ({ slippage, setSlippage }: any): JSX.Element => {
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
        type='range'
        min='1'
        max='100'
        value={slippage}
        onChange={(e): void => setSlippage(Number(e.target.value))}
      />
    </SlippageSettingBody>
  )
}

const NetworkSetting = ({ chainId, setChainId }: any): JSX.Element => {
  const { getRelayerNameAndChainIdList } = useIxoConfigs()
  const relayers = useMemo(() => getRelayerNameAndChainIdList(), [getRelayerNameAndChainIdList])

  return (
    <NetworkSettingBody className='p-3'>
      {Object.keys(relayers).map((option) => (
        <NetworkSettingOption
          className='d-flex justify-content-between'
          key={option}
          isSelected={option === chainId}
          onClick={(): void => setChainId(option)}
        >
          <div className='d-flex align-items-center'>
            <span className='dot mr-2' />
            <span>{relayers[option]}</span>
          </div>
        </NetworkSettingOption>
      ))}
    </NetworkSettingBody>
  )
}

interface Props {
  slippage?: number
  chainId: string
  setSlippage?: (slippage: number) => void
  setChainId: (network: string) => void
}
const SettingsCard: React.FC<Props> = ({ slippage, chainId, setSlippage, setChainId }): JSX.Element => {
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
      {slippage && setSlippage && (
        <SettingsCardOption>
          <SettingsCardOptionHeader onClick={(): void => toggleOption(1)}>
            <span>Max Slippage</span>
            <div className='d-flex align-items-center'>
              <span>{slippage}%</span>
              <img src={ChevDownIcon} alt='' className={cx('ml-2', { reverse: selectedOption === 1 })} />
            </div>
          </SettingsCardOptionHeader>
          <SettingsCardOptionBody height={selectedOption === 1 ? '70px' : '0'}>
            <SlippageSetting slippage={slippage} setSlippage={setSlippage} />
          </SettingsCardOptionBody>
        </SettingsCardOption>
      )}

      <SettingsCardOption>
        <SettingsCardOptionHeader onClick={(): void => toggleOption(2)}>
          <span>Network</span>
          <div className='d-flex align-items-center'>
            <img src={ChevDownIcon} alt='' className={cx('ml-2', { reverse: selectedOption === 2 })} />
          </div>
        </SettingsCardOptionHeader>
        <SettingsCardOptionBody height={selectedOption === 2 ? '140px' : '0'}>
          <NetworkSetting chainId={chainId} setChainId={setChainId} />
        </SettingsCardOptionBody>
      </SettingsCardOption>
    </SettingsCardWrapper>
  )
}

export default SettingsCard
