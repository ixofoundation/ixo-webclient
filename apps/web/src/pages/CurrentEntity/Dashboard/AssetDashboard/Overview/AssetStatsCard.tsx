import { FlexBox } from 'components/App/App.styles'
// import { Card, CardProps } from './Card'
import { HorizontalLine } from 'components/HorizontalLine'
import { CopyIcon } from 'components/Icons'
import { Flex, Text } from '@mantine/core'
import CopyToClipboard from 'react-copy-to-clipboard'
import { successToast } from 'utils/toast'
import moment from 'moment'
import { mantineThemeColors } from 'styles/mantine'
import { truncateString } from 'utils/formatters'
import { Card } from 'pages/CurrentEntity/Components'

export type AssetStatsCardProps = {
  label: string
  icon?: JSX.Element
  did?: string
  creator?: string
  created?: any
  project?: string
  carbonProduced?: number
}

export const AssetStatsCard = ({
  label,
  icon,
  did,
  creator,
  created,
  project,
  carbonProduced = 0,
}: AssetStatsCardProps) => {
  return (
    <Card label={label} icon={icon}>
      <Flex direction={'column'} w='100%' gap={4}>
        <CopyToClipboard text={`${did}`} onCopy={() => successToast(`Copied to clipboard`)}>
          <Flex align='center' justify={'space-between'}>
            <Flex>{truncateString(did!, 20, 'middle')}</Flex>
            <Text ml={4} c={'ixo-blue.6'}>
              <CopyIcon />
            </Text>
          </Flex>
        </CopyToClipboard>

        <HorizontalLine />
        <FlexBox $justifyContent='space-between'>
          <span>Creator</span> <span style={{ color: mantineThemeColors['ixo-blue'][6] }}>{creator}</span>
        </FlexBox>
        <FlexBox $justifyContent='space-between'>
          <span>Project</span> <span style={{ color: mantineThemeColors['ixo-blue'][6] }}>{project}</span>
        </FlexBox>
        <FlexBox $justifyContent='space-between'>
          <span>Created</span> <span>{moment(created).format('DD MMM YYYY')}</span>
        </FlexBox>
        {/* <FlexBox $justifyContent='space-between'>
        <span>Expires</span> <span>24/09/2023</span>
      </FlexBox> */}
        <HorizontalLine />
        <FlexBox $justifyContent='space-between'>
          <span>Emissions Saved</span> <span>{carbonProduced.toLocaleString()} kg CO₂</span>
        </FlexBox>
      </Flex>
    </Card>
  )
}
