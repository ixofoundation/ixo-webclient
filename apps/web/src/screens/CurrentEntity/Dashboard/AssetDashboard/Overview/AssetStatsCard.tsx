import Image from 'next/image'
import { HorizontalLine } from 'components/HorizontalLine'
import { Flex, Text, useMantineTheme } from '@mantine/core'
import CopyToClipboard from 'react-copy-to-clipboard'
import { successToast } from 'utils/toast'
import moment from 'moment'
import { mantineThemeColors } from 'styles/mantine'
import { truncateString } from 'utils/formatters'
import { Card } from 'screens/CurrentEntity/Components'
import { IconCopy } from 'components/IconPaths'

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
  const theme = useMantineTheme()
  return (
    <Card label={label} icon={icon}>
      <Flex direction={'column'} w='100%' gap={4}>
        <CopyToClipboard text={`${did}`} onCopy={() => successToast(`Copied to clipboard`)}>
          <Flex align='center' justify={'space-between'}>
            <Flex>{truncateString(did!, 20, 'middle')}</Flex>
            <Text ml={4} c={'ixo-blue.6'}>
              <Image src={IconCopy} alt='Copy' width={5} height={5} color={theme.colors.blue[5]} />
            </Text>
          </Flex>
        </CopyToClipboard>

        <HorizontalLine />
        <Flex justify='space-between'>
          <span>Creator</span> <span style={{ color: mantineThemeColors['ixo-blue'][6] }}>{creator}</span>
        </Flex>
        <Flex justify='space-between'>
          <span>Project</span> <span style={{ color: mantineThemeColors['ixo-blue'][6] }}>{project}</span>
        </Flex>
        <Flex justify='space-between'>
          <span>Created</span> <span>{moment(created).format('DD MMM YYYY')}</span>
        </Flex>
        <HorizontalLine />
        <Flex justify='space-between'>
          <span>Emissions Saved</span> <span>{carbonProduced.toLocaleString()} kg CO₂</span>
        </Flex>
      </Flex>
    </Card>
  )
}
