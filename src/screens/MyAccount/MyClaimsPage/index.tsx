import { useWallet } from 'wallet-connector'
import { Button, Flex, Skeleton, Text } from '@mantine/core'
import { Claim, ClaimsOrderBy, useClaimsQuery, useEntitiesLazyQuery } from 'generated/graphql'
import { useTheme } from 'styled-components'
import { getDisplayAmount } from 'utils/currency'

import { cosmos, createSigningClient, ixo } from '@ixo/impactxclient-sdk'
import { getQueryClient } from 'lib/queryClient'
import { RPC_ENDPOINT, fee } from 'lib/protocol'
import { WithdrawPaymentConstraints } from '@ixo/impactxclient-sdk/types/codegen/ixo/claims/v1beta1/authz'
import { PaymentType } from '@ixo/impactxclient-sdk/types/codegen/ixo/claims/v1beta1/claims'
import store from 'store'
import { GasPrice } from '@cosmjs/stargate'
import { OfflineSigner } from '@cosmjs/proto-signing'
import { useEffect, useState } from 'react'
import { TEntityProfileModel } from 'types/entities'
import { transformStorageEndpoint } from 'new-utils'
import Image from 'next/image'

const getClaimAmount = (claim: Partial<Claim>) => {
  if (claim.evaluationByClaimId?.amount?.length > 0) {
    return getDisplayAmount(claim.evaluationByClaimId?.amount[0].amount, 6)
  }

  return getDisplayAmount(claim.collection?.payments['approval']['amount'][0]['amount'], 6)
}

const ClaimButton = ({
  submission,
  admin,
  claimId,
  paymentType,
  refetch,
}: {
  submission: string
  admin: string
  claimId: string
  paymentType: PaymentType
  refetch: () => void
}) => {
  const theme = useTheme()
  const { wallet, execute, close } = useWallet()

  const claimStatus = submission === 'AUTHORIZED' ? 'Claim' : 'Paid'

  const assembleMessageAndExecute = async () => {
    const signer: OfflineSigner = {
      address: wallet?.address,
      did: wallet?.did,
      pubKey: wallet?.pubKey,
      keyType: wallet?.keyType,
    } as unknown as OfflineSigner
    const signingClient = await createSigningClient(
      RPC_ENDPOINT ?? '',
      signer,
      undefined,
      { gasPrice: GasPrice.fromString('0.025uixo') as any },
      {
        getLocalData: (k) => store.get(k),
        setLocalData: (k, d) => store.set(k, d),
      },
    )
    const queryClient = await getQueryClient(RPC_ENDPOINT)
    const granteeGrants = await queryClient.cosmos.authz.v1beta1.granteeGrants({
      grantee: wallet?.address ?? '',
    })

    const evaluateAuth = granteeGrants.grants.find(
      (g) => g.authorization?.typeUrl === '/ixo.claims.v1beta1.WithdrawPaymentAuthorization' && g.granter === admin,
    )

    if (evaluateAuth === undefined) throw Error('no current withdrawal authorizations')

    const withdrawContraints = (
      signingClient.registry.decode(evaluateAuth!.authorization!).constraints as WithdrawPaymentConstraints[]
    ).find((c) => c.paymentType === paymentType && c.claimId === claimId)
    if (withdrawContraints === undefined) throw Error('withdrawal constraints for claimId and paymentType not found')

    const message = {
      typeUrl: '/cosmos.authz.v1beta1.MsgExec',
      value: cosmos.authz.v1beta1.MsgExec.fromPartial({
        grantee: wallet?.address,
        msgs: [
          {
            typeUrl: '/ixo.claims.v1beta1.MsgWithdrawPayment',
            value: ixo.claims.v1beta1.MsgWithdrawPayment.encode(
              ixo.claims.v1beta1.MsgWithdrawPayment.fromPartial({
                adminAddress: admin,
                fromAddress: withdrawContraints.fromAddress,
                toAddress: withdrawContraints.toAddress,
                claimId,
                inputs: withdrawContraints.inputs,
                outputs: withdrawContraints.outputs,
                paymentType,
                contract_1155Payment: withdrawContraints.contract_1155Payment,
              }),
            ).finish(),
          },
        ],
      }),
    }

    await execute({ data: { messages: [message], fee: fee, memo: undefined }, transactionConfig: { sequence: 1 } })
    refetch()
    close()
  }

  return (
    <Button
      variant='primary'
      onClick={assembleMessageAndExecute}
      disabled={claimStatus === 'Paid'}
      bg={claimStatus === 'Paid' ? theme.ixoGreen : theme.ixoNewBlue}
      style={{
        color: 'white',
      }}
    >
      {claimStatus}
    </Button>
  )
}

const ClaimLine = ({
  claim,
  profile,
  refetch,
}: {
  claim: Partial<Claim>
  profile: TEntityProfileModel
  refetch: () => void
}) => {
  const theme = useTheme()
  return (
    <Flex w='100%' direction={'column'} p={10} bg={theme.ixoDarkBlue} style={{ cursor: 'pointer', borderRadius: 10 }}>
      <Flex w='100%' justify={'space-between'}>
        <Text size='lg'>Claim: {profile?.name} </Text>
        <Flex direction={'row'}>
          <Flex align={'center'} mr={4} gap={4}>
            <Image height={24} src={'/assets/tokens/ixo.svg'} alt='ixo' />
            <Text w={45}>{getClaimAmount(claim)}</Text>
          </Flex>
          <ClaimButton
            submission={claim.paymentsStatus['submission']}
            admin={claim.collection?.admin ?? ''}
            claimId={claim.claimId ?? ''}
            paymentType={ixo.claims.v1beta1.PaymentType.SUBMISSION}
            refetch={refetch}
          />
        </Flex>
      </Flex>
      <Flex w='100%'>
        <Text>Submitted: {new Date(claim.submissionDate as string).toLocaleDateString()}</Text>
      </Flex>
    </Flex>
  )
}

const MyclaimsPage = () => {
  const [claimsWithCollectionInformation, setClaimsWithCollectionInformation] = useState<
    { claim: Partial<Claim>; profile: TEntityProfileModel }[]
  >([])
  const { wallet } = useWallet()
  const queryVariables = {
    condition: {
      agentAddress: wallet?.address,
    },
    orderBy: [ClaimsOrderBy.SubmissionDateDesc],
  }
  const { data, refetch, loading } = useClaimsQuery({
    variables: queryVariables,
  })

  const [fetchEntities] = useEntitiesLazyQuery()

  useEffect(() => {
    if ((data?.claims?.nodes?.length ?? 0) > 0) {
      const protocolIds = data?.claims?.nodes.map((claim) => claim.collection?.protocol).filter(Boolean) as string[]

      fetchEntities({ variables: { filter: { id: { in: protocolIds } } } })
        .then(async (response: { data?: any }) => {
          const entityProfilePromises = await Promise.all(
            (response.data?.entities?.nodes ?? []).map(async (entity: any) => {
              const endpoint = transformStorageEndpoint(entity.settings['Profile']?.serviceEndpoint)
              if (!endpoint) {
                return null
              }
              const response = await fetch(endpoint).then((response) => response.json())
              return { ...response, did: entity.id }
            }),
          )

          setClaimsWithCollectionInformation(
            data?.claims?.nodes.map((claim, index) => ({
              claim,
              profile: entityProfilePromises.find((profile) => profile?.did === claim.collection?.protocol),
            })) as any[],
          )
        })
        .catch((error: any) => {
          // Handle error
          console.error('Error fetching entities:', error)
        })
    }
  }, [data?.claims?.nodes, fetchEntities])

  return (
    <Flex direction={'column'} gap={40}>
      <Flex direction={'column'} gap={10}>
        {loading && <Skeleton h={100} radius={'md'} />}
        {claimsWithCollectionInformation.map(({ claim, profile }) => (
          <ClaimLine
            key={claim.claimId}
            claim={claim as Claim}
            profile={profile}
            refetch={() => refetch(queryVariables)}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default MyclaimsPage
