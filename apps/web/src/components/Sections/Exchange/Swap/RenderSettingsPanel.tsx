import { CardBody, CardHeader, CardHeaderText } from './Swap.styles'
import RenderSettingsButton, { RenderSettingsButtonProps } from './RenderSettingsButton'
import SettingsCard, { SettingsCardProps } from './SettingsCard'
import { Flex } from '@mantine/core'

type RenderSettingsPanelProps = RenderSettingsButtonProps &
  SettingsCardProps & {
    panelHeight?: string
  }
const RenderSettingsPanel = ({
  panelHeight = '420px',
  viewSettings,
  setViewSettings,
  chainId,
  setChainId,
}: RenderSettingsPanelProps): JSX.Element => (
  <Flex direction={'column'} w='100%'>
    <CardHeader>
      <CardHeaderText>
        <span>Settings</span>
      </CardHeaderText>
      <RenderSettingsButton viewSettings={viewSettings} setViewSettings={setViewSettings} />
    </CardHeader>
    <CardBody height={panelHeight}>
      <SettingsCard chainId={chainId!} setChainId={setChainId} />
    </CardBody>
  </Flex>
)

export default RenderSettingsPanel
