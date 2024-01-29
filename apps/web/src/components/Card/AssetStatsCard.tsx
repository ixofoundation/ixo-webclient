import { FlexBox } from 'components/App/App.styles'
import { Card, CardProps } from './Card'
import { HorizontalLine } from 'components/HorizontalLine'
import { CopyIcon } from 'components/Icons'
import { Flex, Text } from '@mantine/core'
import CopyToClipboard from 'react-copy-to-clipboard'
import { successToast } from 'utils/toast'
import moment from 'moment'

export type AssetStatsCardProps = Omit<CardProps, 'children'> & {
  did?: string
  creator?: string
  created?: any
  project?: string
}

export const AssetStatsCard = ({
  width = '100%',
  height = '100%',
  did,
  creator,
  created,
  project,
  ...props
}: AssetStatsCardProps) => {
  return (
    <Card width={width} height={height} {...props}>
      <CopyToClipboard text={`${did}`} onCopy={() => successToast(`Copied to clipboard`)}>
        <Flex align='center'>
          <Flex>{did}</Flex>
          <Text ml={4} color={'#00D2FF'}>
            <CopyIcon />
          </Text>
        </Flex>
      </CopyToClipboard>

      <HorizontalLine />
      <FlexBox justifyContent='space-between'>
        <span>Creator</span> <span style={{ color: '#00D2FF' }}>{creator}</span>
      </FlexBox>
      <FlexBox justifyContent='space-between'>
        <span>Project</span> <span style={{ color: '#00D2FF' }}>{project}</span>
      </FlexBox>
      <FlexBox justifyContent='space-between'>
        <span>Created</span> <span>{moment(created).format('DD MMM YYYY')}</span>
      </FlexBox>
      {/* <FlexBox justifyContent='space-between'>
        <span>Expires</span> <span>24/09/2023</span>
      </FlexBox> */}
      <HorizontalLine />
      <FlexBox justifyContent='space-between'>
        <span>Emission Saved</span> <span>1,234 KGCo2</span>
      </FlexBox>
      <FlexBox justifyContent='space-between'>
        <span>Carbon Generated</span> <span>123 Carbon</span>
      </FlexBox>
      <FlexBox justifyContent='space-between'>
        <span>Carbon Saved</span> <span>800 Carbon</span>
      </FlexBox>
    </Card>
  )
}
