import { customQueries } from '@ixo/impactxclient-sdk'
import { FlexBox } from 'components/App/App.styles'
import { useGetClaim } from 'graphql/claims'
import { chainNetwork } from 'hooks/configs'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ClaimSubmission: React.FC = () => {
  const { claimId } = useParams<{ claimId: string }>()
  const { data: claim } = useGetClaim(claimId)

  console.log(111111, claim)

  useEffect(() => {
    if (claimId) {
      customQueries.cellnode
        .getPublicDoc(claimId, undefined, chainNetwork)
        .then((response) => {
          console.log({ response })
        })
        .catch((e) => {
          console.error('getPublicDoc', e)
        })
    }
  }, [claimId])

  return (
    <FlexBox>
      <FlexBox></FlexBox>
    </FlexBox>
  )
}

export default ClaimSubmission
