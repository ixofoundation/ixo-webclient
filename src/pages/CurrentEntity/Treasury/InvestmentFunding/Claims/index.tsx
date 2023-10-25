// import { EvaluationStatus } from '@ixo/impactxclient-sdk/types/codegen/ixo/claims/v1beta1/claims'
import { ixo } from '@ixo/impactxclient-sdk'
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useGetClaimCollection, useGetClaims } from 'graphql/claims'
import { useMemo } from 'react'
import ClaimCategory from './ClaimCategory'
import ClaimItem from './ClaimItem'
import ClaimTab from './ClaimTab'

const Claims: React.FC = () => {
  const collectionId = '1'
  const { data: claimCollection } = useGetClaimCollection(collectionId)
  const { data: claims } = useGetClaims(collectionId)

  const { pendingClaims, approvedClaims, rejectedClaims } = useMemo(() => {
    const pendingClaims = claims.filter((claim: any) => !claim.evaluationByClaimId?.status)
    const approvedClaims = claims.filter(
      (claim: any) => claim.evaluationByClaimId?.status === ixo.claims.v1beta1.EvaluationStatus.APPROVED,
    )
    const rejectedClaims = claims.filter(
      (claim: any) => claim.evaluationByClaimId?.status === ixo.claims.v1beta1.EvaluationStatus.REJECTED,
    )
    const disputedClaims = claims.filter(
      (claim: any) => claim.evaluationByClaimId?.status === ixo.claims.v1beta1.EvaluationStatus.DISPUTED,
    )
    return { pendingClaims, approvedClaims, rejectedClaims, disputedClaims }
  }, [claims])

  const { approved, disputed, rejected, pending } = useMemo(() => {
    const approved = claimCollection.approved ?? 0
    const disputed = claimCollection.disputed ?? 0
    const evaluated = claimCollection.evaluated ?? 0
    const rejected = claimCollection.rejected ?? 0

    const pending = evaluated - approved - disputed - rejected

    return {
      approved,
      disputed,
      evaluated,
      rejected,
      pending,
    }
  }, [claimCollection])

  return (
    <FlexBox direction='column' gap={6} width='100%' color='black'>
      <FlexBox direction='column' width='100%' gap={4}>
        <Typography variant='secondary' size='2xl'>
          All Claims
        </Typography>
        <FlexBox width='100%' gap={2} color='black' flexWrap='wrap'>
          <ClaimTab status={4} value={0} />
          <ClaimTab status={ixo.claims.v1beta1.EvaluationStatus.PENDING} value={pending} />
          <ClaimTab status={ixo.claims.v1beta1.EvaluationStatus.REJECTED} value={rejected} />
          <ClaimTab status={ixo.claims.v1beta1.EvaluationStatus.APPROVED} value={approved} />
          <ClaimTab status={ixo.claims.v1beta1.EvaluationStatus.DISPUTED} value={disputed} />
        </FlexBox>
      </FlexBox>

      <FlexBox width='100%' gap={2} color='black' flexWrap='wrap'>
        <ClaimCategory category='Educational Pass' />
        <ClaimCategory category='Schools Built' />
        <ClaimCategory category='Teachers Trained' />
        <ClaimCategory category='Another Claim' />
        <ClaimCategory category='One More Claim' />
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={6}>
        <FlexBox direction='column' width='100%' gap={4}>
          <Typography variant='secondary' size='2xl'>
            Saved Claims
          </Typography>
          <FlexBox direction='column' gap={2} width='100%'>
            {/* <ClaimItem status='saved' name='Claim/Project Name' identifier='did:sov:RFWuuFmLvNd8uq9x5sUYku' />
            <ClaimItem status='saved' name='Claim/Project Name' identifier='did:sov:RFWuuFmLvNd8uq9x5sUYku' /> */}
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' height='1px' background='#D5D9E0' />

        <FlexBox direction='column' width='100%' gap={4}>
          <Typography variant='secondary' size='2xl'>
            Claims Pending
          </Typography>
          <FlexBox direction='column' gap={2} width='100%'>
            {pendingClaims.slice(0, 3).map((claim: any) => (
              <ClaimItem
                key={claim.claimId}
                status={ixo.claims.v1beta1.EvaluationStatus.PENDING}
                claimId={claim.claimId}
              />
            ))}
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' height='1px' background='#D5D9E0' />

        <FlexBox direction='column' width='100%' gap={4}>
          <Typography variant='secondary' size='2xl'>
            Claims Rejected
          </Typography>
          <FlexBox direction='column' gap={2} width='100%'>
            {rejectedClaims.slice(0, 3).map((claim: any) => (
              <ClaimItem
                key={claim.claimId}
                status={ixo.claims.v1beta1.EvaluationStatus.REJECTED}
                claimId={claim.claimId}
              />
            ))}
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' height='1px' background='#D5D9E0' />

        <FlexBox direction='column' width='100%' gap={4}>
          <Typography variant='secondary' size='2xl'>
            Claims Approved
          </Typography>
          <FlexBox direction='column' gap={2} width='100%'>
            {approvedClaims.slice(0, 3).map((claim: any) => (
              <ClaimItem
                key={claim.claimId}
                status={ixo.claims.v1beta1.EvaluationStatus.APPROVED}
                claimId={claim.claimId}
              />
            ))}
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default Claims
