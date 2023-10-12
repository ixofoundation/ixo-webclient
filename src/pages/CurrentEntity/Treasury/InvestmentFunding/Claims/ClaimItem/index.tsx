import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useClaimSetting } from 'hooks/claim'
import React from 'react'
import { useTheme } from 'styled-components'

interface Props {
  status: string
  name: string
  identifier: string
  timestamp?: number
}

const ClaimItem: React.FC<Props> = ({ status, name, identifier, timestamp }) => {
  const theme: any = useTheme()
  const Setting = useClaimSetting()

  return (
    <FlexBox
      direction='column'
      width='100%'
      height='70px'
      borderRadius='4px'
      background={theme.ixoGradientLight}
      justifyContent='center'
      cursor='pointer'
      px={8}
      position='relative'
    >
      <FlexBox
        position='absolute'
        top='50%'
        left='0px'
        transform='translate(-50%, -50%)'
        width='8px'
        height='24px'
        background={Setting[status].color}
        borderRadius='100px'
      />

      <Typography color='black' size='lg' weight='bold'>
        {name}
      </Typography>
      <Typography color='dark-blue' size='sm'>
        {identifier}
      </Typography>
    </FlexBox>
  )
}

export default ClaimItem
