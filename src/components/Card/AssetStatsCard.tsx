import { FlexBox } from 'components/App/App.styles'
import { Card, CardProps } from './Card'
import { HorizontalLine } from 'components/HorizontalLine'
import { CopyIcon } from 'components/Icons'

export type AssetStatsCardProps = Omit<CardProps, 'children'> & {
  did?: string
  creator?: string
}

export const AssetStatsCard = ({ width = '100%', height = '100%', did, ...props }: AssetStatsCardProps) => {
  return (
    <Card width={width} height={height} {...props}>
      <p>
        {did} <CopyIcon />
      </p>
      <HorizontalLine />
      <FlexBox justifyContent='space-between'>
        <span>Creator</span> <span>Emerging Cooking Solutions</span>
      </FlexBox>
      <FlexBox justifyContent='space-between'>
        <span>Project</span> <span>SupaMoto</span>
      </FlexBox>
      <FlexBox justifyContent='space-between'>
        <span>Created</span> <span>12/09/2023</span>
      </FlexBox>
      <FlexBox justifyContent='space-between'>
        <span>Expires</span> <span>24/09/2023</span>
      </FlexBox>
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
