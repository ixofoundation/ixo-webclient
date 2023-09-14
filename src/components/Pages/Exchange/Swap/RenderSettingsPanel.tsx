import React from 'react'
import { CardBody, CardHeader, CardHeaderText } from './Swap.styles'
import RenderSettingsButton, { RenderSettingsButtonProps } from './RenderSettingsButton'
import SettingsCard, { SettingsCardProps } from './SettingsCard'

type RenderSettingsPanelProps = RenderSettingsButtonProps &
  SettingsCardProps & {
    panelHeight?: string
  }
const RenderSettingsPanel = ({
  panelHeight,
  viewSettings,
  setViewSettings,
  slippage,
  setSlippage,
  chainId,
  setChainId,
}: RenderSettingsPanelProps): JSX.Element => (
  <>
    <CardHeader>
      <CardHeaderText>
        <span>Settings</span>
      </CardHeaderText>
      <RenderSettingsButton viewSettings={viewSettings} setViewSettings={setViewSettings} />
    </CardHeader>
    <CardBody height={panelHeight}>
      <SettingsCard slippage={slippage} setSlippage={setSlippage} chainId={chainId!} setChainId={setChainId} />
    </CardBody>
  </>
)

export default RenderSettingsPanel
