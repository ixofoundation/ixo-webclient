import { ixo } from '@ixo/impactxclient-sdk'
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useClaimSetting } from 'hooks/claim'
import React from 'react'

const ClaimItem: React.FC = () => {
  const Setting = useClaimSetting()
  return (
    <FlexBox
      direction='column'
      width='100%'
      height='70px'
      borderRadius='4px'
      background={'#002D42'}
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
        background={Setting[ixo.claims.v1beta1.EvaluationStatus.PENDING].color}
        borderRadius='100px'
      />

      <Typography color='white' size='base'>
        Fuel Purchase Claim
      </Typography>
      <Typography color='blue' size='sm'>
        30 kg
      </Typography>
    </FlexBox>
  )
}

const LatestClaims: React.FC = () => {
  return (
    <FlexBox direction='column' width='100%' gap={2}>
      <ClaimItem />
      <ClaimItem />
      <ClaimItem />
      <ClaimItem />
    </FlexBox>
  )
}

export default LatestClaims