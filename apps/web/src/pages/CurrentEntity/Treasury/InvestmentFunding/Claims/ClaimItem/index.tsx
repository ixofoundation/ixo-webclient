<<<<<<<< HEAD:apps/web/src/pages/CurrentEntity/Treasury/InvestmentFunding/Claims/ClaimItem/index.tsx
========
import { ixo } from '@ixo/impactxclient-sdk'
>>>>>>>> 507fcd32c0991e72d139490af26e0d5f9e848701:src/pages/CurrentEntity/Dashboard/OracleDashboard/Overview/LatestClaims.tsx
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useClaimSetting } from 'hooks/claim'
import React from 'react'
<<<<<<<< HEAD:apps/web/src/pages/CurrentEntity/Treasury/InvestmentFunding/Claims/ClaimItem/index.tsx
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

========

const ClaimItem: React.FC = () => {
  const Setting = useClaimSetting()
>>>>>>>> 507fcd32c0991e72d139490af26e0d5f9e848701:src/pages/CurrentEntity/Dashboard/OracleDashboard/Overview/LatestClaims.tsx
  return (
    <FlexBox
      direction='column'
      width='100%'
      height='70px'
      borderRadius='4px'
<<<<<<<< HEAD:apps/web/src/pages/CurrentEntity/Treasury/InvestmentFunding/Claims/ClaimItem/index.tsx
      background={theme.ixoGradientLight}
========
      background={'#002D42'}
>>>>>>>> 507fcd32c0991e72d139490af26e0d5f9e848701:src/pages/CurrentEntity/Dashboard/OracleDashboard/Overview/LatestClaims.tsx
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
<<<<<<<< HEAD:apps/web/src/pages/CurrentEntity/Treasury/InvestmentFunding/Claims/ClaimItem/index.tsx
        background={Setting[status].color}
        borderRadius='100px'
      />

      <Typography color='black' size='lg' weight='bold'>
        {name}
      </Typography>
      <Typography color='dark-blue' size='sm'>
        {identifier}
========
        background={Setting[ixo.claims.v1beta1.EvaluationStatus.PENDING].color}
        borderRadius='100px'
      />

      <Typography color='white' size='base'>
        Fuel Purchase Claim
      </Typography>
      <Typography color='blue' size='sm'>
        30 kg
>>>>>>>> 507fcd32c0991e72d139490af26e0d5f9e848701:src/pages/CurrentEntity/Dashboard/OracleDashboard/Overview/LatestClaims.tsx
      </Typography>
    </FlexBox>
  )
}

<<<<<<<< HEAD:apps/web/src/pages/CurrentEntity/Treasury/InvestmentFunding/Claims/ClaimItem/index.tsx
export default ClaimItem
========
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
>>>>>>>> 507fcd32c0991e72d139490af26e0d5f9e848701:src/pages/CurrentEntity/Dashboard/OracleDashboard/Overview/LatestClaims.tsx
