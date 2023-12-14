import { EvaluationStatus } from '@ixo/impactxclient-sdk/types/codegen/ixo/claims/v1beta1/claims'
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useClaimSetting } from 'hooks/claim'
import React from 'react'
import { useTheme } from 'styled-components'

interface Props {
  status: EvaluationStatus
  value: number
}

const ClaimTab: React.FC<Props> = ({ status, value }) => {
  const theme: any = useTheme()
  const Setting = useClaimSetting()

  return (
    <FlexBox
      direction='column'
      width='200px'
      height='100px'
      borderRadius='4px'
      background={theme.ixoGradientLight}
      alignItems='center'
      justifyContent='center'
      cursor='pointer'
    >
      <Typography variant='secondary' size='5xl'>
        {value}
      </Typography>
      <FlexBox alignItems='center' gap={2} color={Setting[status]?.color}>
        <FlexBox borderRadius='100%' width='10px' height='10px' background='currentColor' />
        <Typography weight='bold' size='sm'>
          {Setting[status]?.text}
        </Typography>
      </FlexBox>
    </FlexBox>
  )
}

export default ClaimTab
