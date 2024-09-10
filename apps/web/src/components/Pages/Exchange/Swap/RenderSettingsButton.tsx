import React from 'react'

import { SvgBox } from 'components/App/App.styles'

import SliderSettingsIcon from 'assets/images/icon-sliders-h-solid.svg'

export type RenderSettingsButtonProps = {
  viewSettings: boolean
  setViewSettings: React.Dispatch<React.SetStateAction<boolean>>
}
const RenderSettingsButton: React.FC<RenderSettingsButtonProps> = ({ viewSettings, setViewSettings }): JSX.Element => (
  <SvgBox onClick={(): void => setViewSettings(!viewSettings)} $svgWidth={7} $svgHeight={7} cursor='pointer'>
    <SliderSettingsIcon />
  </SvgBox>
)
export default RenderSettingsButton
