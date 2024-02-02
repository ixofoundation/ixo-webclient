import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { ColorCode } from './ActivityCard.styles'

export type ActivityCardProps = {
  name: string
  quantity: string
  createdAt: string
}

export const ActivityCard = ({ name, quantity, createdAt }: ActivityCardProps) => {
  const colorCode = '#00D2FF'
  return (
    <FlexBox
      background='#002D42'
      width='100%'
      p={4}
      $borderRadius='4px'
      position='relative'
      $justifyContent='space-between'
    >
      <ColorCode backgroundColor={colorCode} />
      <FlexBox $direction='column'>
        <Typography>{name}</Typography>
        <Typography>{quantity}</Typography>
      </FlexBox>
      <FlexBox>
        <Typography>{createdAt}</Typography>
      </FlexBox>
    </FlexBox>
  )
}
