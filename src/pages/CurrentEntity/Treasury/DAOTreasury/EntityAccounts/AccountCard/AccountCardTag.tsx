import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'

interface Props {
  name: string
  address: string
  onClick?: () => void
}

const AccountCardTag: React.FC<Props> = ({ name, address, onClick }) => {
  const balance = 1145.25

  return (
    <FlexBox
      justifyContent='space-between'
      alignItems='center'
      p={4}
      height='90px'
      borderRadius='8px'
      background='#053549'
      cursor='pointer'
      style={{ flex: '0 0 calc(50% - 8px)' }}
      onClick={onClick && onClick}
    >
      <Typography variant='secondary' size='xl'>
        {name} account
      </Typography>
      <Typography variant='secondary' size='xl'>
        {new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        }).format(balance)}
      </Typography>
    </FlexBox>
  )
}

export default AccountCardTag
