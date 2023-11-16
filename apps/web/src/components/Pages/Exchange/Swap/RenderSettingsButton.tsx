import React from 'react'

import { SettingsButton } from './Swap.styles'
import SliderSettingsIcon from 'assets/images/icon-sliders-h-solid.svg'

export type RenderSettingsButtonProps = {
  viewSettings: boolean
  setViewSettings: React.Dispatch<React.SetStateAction<boolean>>
}
const RenderSettingsButton = ({ viewSettings, setViewSettings }: RenderSettingsButtonProps): JSX.Element => (
  <SettingsButton
    onClick={(): void => {
      setViewSettings(!viewSettings)
    }}
  >
    <img src={SliderSettingsIcon} alt='' />
  </SettingsButton>
)
export default RenderSettingsButton
