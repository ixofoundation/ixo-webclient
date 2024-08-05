import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useClaimSetting } from 'hooks/claim'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { EvaluationStatus } from '@ixo/impactxclient-sdk/types/codegen/ixo/claims/v1beta1/claims'
import { chainNetwork } from 'hooks/configs'
import { customQueries } from '@ixo/impactxclient-sdk'
import { NavLink, useLocation } from 'react-router-dom'

interface Props {
  status: EvaluationStatus
  claimId: string
}

const ClaimItem: React.FC<Props> = ({ status, claimId }) => {
  const { pathname } = useLocation()
  const theme: any = useTheme()
  const Setting = useClaimSetting()
  const [name, setName] = useState('')

  useEffect(() => {
    if (claimId) {
      customQueries.cellnode
        .getPublicDoc(claimId, undefined, chainNetwork)
        .then((response) => {
          setName(response?.credentialSubject?.claim?.type?.replace('claim:', ''))
        })
        .catch((e) => {
          console.error('getPublicDoc', e)
        })
    }
  }, [claimId])

  return (
    <NavLink to={`${pathname}/${claimId}`} style={{ width: '100%' }}>
      <FlexBox
        $direction='column'
        width='100%'
        height='70px'
        $borderRadius='4px'
        background={theme.ixoGradientLight}
        $justifyContent='center'
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
          $borderRadius='100px'
        />

        <Typography color='black' size='lg' weight='bold'>
          {name}
        </Typography>
        <Typography color='dark-blue' size='sm'>
          {claimId}
        </Typography>
      </FlexBox>
    </NavLink>
  )
}

export default ClaimItem
