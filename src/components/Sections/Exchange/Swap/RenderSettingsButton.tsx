import React from 'react'

import { SvgBox } from 'components/CoreEntry/App.styles'

export type RenderSettingsButtonProps = {
  viewSettings: boolean
  setViewSettings: React.Dispatch<React.SetStateAction<boolean>>
}
const RenderSettingsButton: React.FC<RenderSettingsButtonProps> = ({ viewSettings, setViewSettings }): JSX.Element => (
  <SvgBox onClick={(): void => setViewSettings(!viewSettings)} $svgWidth={7} $svgHeight={7} cursor='pointer'>
    <img src='/assets/images/icon-sliders-h-solid.svg' />
  </SvgBox>
)
export default RenderSettingsButton
