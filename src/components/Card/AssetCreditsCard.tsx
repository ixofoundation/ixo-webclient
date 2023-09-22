import { FlexBox } from 'components/App/App.styles'
import { Card, CardProps } from './Card'

export type AssetCreditsCardProps = Omit<CardProps, 'children'> & {
  carbonAmountProduced?: number
  carbonAmountOffset?: number
  carbonAmountClaimable?: number
}

export const AssetCreditsCard = ({ width = '100%', height = '100%', ...props }: AssetCreditsCardProps) => {
  return (
    <Card width={width} height={height} {...props}>
      <FlexBox direction='column' justifyContent='center' alignItems='center' width='100%' height='100%'>
        <p>1200 Carbon produced</p>
        <p>2200 Carbon offset</p>
        <p>200 Carbon claimable</p>
      </FlexBox>
    </Card>
  )
}
