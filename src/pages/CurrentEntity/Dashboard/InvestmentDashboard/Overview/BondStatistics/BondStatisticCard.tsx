import { FlexBox } from 'components/App/App.styles'
import React from 'react'

interface Props {
  prefix?: string | JSX.Element
  color: string
  header: string
  body: string
  footer: string
  available: boolean
}

const BondStatisticCard: React.FC<Props> = ({ prefix, color, header, body, footer, available }) => {
  return (
    <FlexBox alignItems='center' gap={6} padding={6}>
      {prefix && <FlexBox></FlexBox>}
    </FlexBox>
  )
}

export default BondStatisticCard
