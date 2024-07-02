import { ixo } from '@ixo/impactxclient-sdk'
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useGetClaimCollection, useGetClaimCollectionsByEntityId, useGetClaims } from 'graphql/claims'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import ClaimItem from './ClaimItem'
import ClaimTab from './ClaimTab'
import { Flex, Select, Text } from '@mantine/core'
import { claimCollectionSelectOptions } from 'services/claims/getClaimTemplate'

interface Props {
  collectionId: string
}

const ClaimCollection: React.FC<Props> = ({ collectionId }) => {
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
    const count = claimCollection.count ?? 0
    const approved = claimCollection.approved ?? 0
    const disputed = claimCollection.disputed ?? 0
    const rejected = claimCollection.rejected ?? 0

    const pending = count - approved - disputed - rejected

    return {
      approved,
      disputed,
      rejected,
      pending,
    }
  }, [claimCollection])

  return (
    <>
      <FlexBox width='100%' $gap={2} color='black' $flexWrap='wrap'>
        <ClaimTab status={ixo.claims.v1beta1.EvaluationStatus.UNRECOGNIZED} value={0} />
        <ClaimTab status={ixo.claims.v1beta1.EvaluationStatus.PENDING} value={pending} />
        <ClaimTab status={ixo.claims.v1beta1.EvaluationStatus.REJECTED} value={rejected} />
        <ClaimTab status={ixo.claims.v1beta1.EvaluationStatus.APPROVED} value={approved} />
        <ClaimTab status={ixo.claims.v1beta1.EvaluationStatus.DISPUTED} value={disputed} />
      </FlexBox>

      <FlexBox $direction='column' width='100%' $gap={6}>
        <FlexBox $direction='column' width='100%' $gap={4}>
          <Typography variant='secondary' size='2xl'>
            Saved Claims
          </Typography>
          <FlexBox $direction='column' $gap={2} width='100%'>
            {/* <ClaimItem status='saved' name='Claim/Project Name' identifier='did:sov:RFWuuFmLvNd8uq9x5sUYku' />
            <ClaimItem status='saved' name='Claim/Project Name' identifier='did:sov:RFWuuFmLvNd8uq9x5sUYku' /> */}
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' height='1px' background='#D5D9E0' />

        <FlexBox $direction='column' width='100%' $gap={4}>
          <Typography variant='secondary' size='2xl'>
            Claims Pending
          </Typography>
          <FlexBox $direction='column' $gap={2} width='100%'>
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

        <FlexBox $direction='column' width='100%' $gap={4}>
          <Typography variant='secondary' size='2xl'>
            Claims Rejected
          </Typography>
          <FlexBox $direction='column' $gap={2} width='100%'>
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

        <FlexBox $direction='column' width='100%' $gap={4}>
          <Typography variant='secondary' size='2xl'>
            Claims Approved
          </Typography>
          <FlexBox $direction='column' $gap={2} width='100%'>
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
    </>
  )
}

const ClaimCollections = ({ onCreate, canCreate }: { onCreate: () => void; canCreate: boolean }) => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { data: claimCollections, loading } = useGetClaimCollectionsByEntityId(entityId)
  const [collectionId, setCollectionId] = useState('')
  const [options, setOptions] = useState<any[]>([])

  useEffect(() => {
    claimCollectionSelectOptions(claimCollections).then((options) => {
      setOptions(options)
    })
  }, [claimCollections, setOptions])

  return (
    <FlexBox $direction='column' $gap={6} width='100%' color='black'>
      <FlexBox width='100%' $gap={2} color='black' $flexWrap='wrap'>
        <Flex align={'center'}>
          <Select
            disabled={loading}
            nothingFoundMessage='No claims collecion found'
            placeholder={options.length ? 'Select a claim collection' : 'No claims collection found'}
            data={options}
            onChange={(value) => setCollectionId(value ?? '')}
            value={collectionId}
          />
          {canCreate && (
            <Text
              size='md'
              c='blue'
              style={{ marginLeft: 20 }}
              onClick={onCreate}
              styles={{ root: { cursor: 'pointer' } }}
            >
              + Create New
            </Text>
          )}
        </Flex>
      </FlexBox>

      {collectionId && <ClaimCollection collectionId={collectionId} />}
    </FlexBox>
  )
}

export default ClaimCollections
