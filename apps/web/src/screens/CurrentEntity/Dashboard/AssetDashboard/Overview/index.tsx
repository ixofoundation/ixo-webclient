import Image from 'next/image'
import { Flex, Grid, Box, useMantineTheme } from '@mantine/core'
import React from 'react'
import { AssetCard } from 'components/EntityCards/AssetCard'
import { Message, useMessagesQuery } from 'generated/graphql'
import { useGetCreatorProfileWithVerifiableCredential } from 'utils/asset'
import { useGetAccountTokens } from 'graphql/tokens'
import { useLocation, useParams } from 'react-router-dom'
import { AssetStatsCard } from './AssetStatsCard'
import { AssetCreditsCard } from './AssetCreditsCard'
import { AssetPerformanceCard } from './AssetPerfomanceCard'
import AssetLocationCard from './AssetLocationCard'
import { getCookStove } from 'api/netlify/getCookStove'
import ClaimActivityCard from './ClaimActivityCard'
import AssetEventsCard from './AssetEventsCard'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'

import {
  IconAssetPerformance,
  IconAssetLocation,
  IconAssetStats,
  IconClock,
  IconAssetActivity,
  IconImpactCredits,
} from 'components/IconPaths'

const EmptyAssetCardData = {
  type: '',
  logo: '',
  collectionName: '',
  title: '',
  cardImage: '',
  creator: '',
  tags: '',
  animation: '',
  assetNumber: '',
  maxSupply: '',
  accountTokens: {},
}

const AssetOverview: React.FC = () => {
  const theme = useMantineTheme()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const collection = searchParams.get('collection')
  const { entityId = '' } = useParams()
  const {
    id,
    accounts,
    externalId,
    alsoKnownAs,
    linkedResource,
    service,
    profile: entityProfile,
    tags,
    zlottie,
    metadata,
  } = useAppSelector(getEntityById(entityId))

  const adminAccount = React.useMemo(() => accounts?.find((v: any) => v.name === 'admin')?.address || '', [accounts])
  const { data: accountTokens } = useGetAccountTokens(adminAccount)

  const [cookStove, setCookStove] = React.useState<any>()

  const { profile } = useGetCreatorProfileWithVerifiableCredential({
    endpoint: linkedResource?.find((item: any) => item.type === 'VerifiableCredential')?.serviceEndpoint || '',
    service: service || [],
  })

  const { data: messagesData } = useMessagesQuery({
    variables: {
      first: 10,
      filter: {
        typeUrl: { equalTo: '/ixo.entity.v1beta1.MsgTransferEntity' },
        value: { contains: { id } },
      },
    },
  })

  const carbonTokens = React.useMemo(() => {
    if (accountTokens['CARBON']) {
      const carbon = accountTokens['CARBON']
      const claimable = Object.values(carbon.tokens).reduce((acc: number, cur: any) => acc + cur.amount, 0)
      const produced = Object.values(carbon.tokens).reduce((acc: number, cur: any) => acc + cur.minted, 0)
      const retired = Object.values(carbon.tokens).reduce((acc: number, cur: any) => acc + cur.retired, 0)
      return { retired, produced, claimable }
    }

    return { retired: 0, produced: 0, claimable: 0 }
  }, [accountTokens])

  const assetNumber = alsoKnownAs?.replace('{id}#', '') ?? ''

  const inputAssetCardData = React.useMemo(() => {
    if (entityProfile) {
      return {
        logo: entityProfile?.logo,
        type: entityProfile?.type.split(':')[1] ?? '',
        collectionName: collection,
        title: entityProfile?.brand,
        cardImage: entityProfile?.image,
        creator: entityProfile?.name,
        tags: tags ?? ([] as any),
        animation: zlottie,
        assetNumber: assetNumber,
        maxSupply: '',
        accountTokens: {},
      }
    }
    return EmptyAssetCardData
  }, [entityProfile, collection, assetNumber, zlottie, tags])

  React.useEffect(() => {
    if (externalId) {
      getCookStove(externalId)
        .then(({ data }) => setCookStove(data))
        .catch(console.log)
    }
  }, [externalId])

  return (
    <Flex w='100%' direction='column' gap={theme.spacing.md}>
      <Grid gutter={theme.spacing.md}>
        <Grid.Col span={4}>
          <Box h={400}>
            <AssetCard {...inputAssetCardData} accountTokens={carbonTokens} w={300} h='100%' />
          </Box>
        </Grid.Col>
        <Grid.Col span={4}>
          <Box h={400}>
            <AssetStatsCard
              creator={profile?.name}
              created={metadata?.created}
              project={profile?.brand}
              did={id}
              carbonProduced={carbonTokens.produced as number}
              label='Asset Stats'
              icon={<Image src={IconAssetStats} alt='AssetStats' width={5} height={5} />}
            />
          </Box>
        </Grid.Col>
        <Grid.Col span={4}>
          <Box h={400}>
            <AssetCreditsCard
              label='Impact Credits'
              icon={<Image src={IconImpactCredits} alt='ImpactsCredit' width={5} height={5} />}
              carbonAmountClaimable={carbonTokens.claimable as number}
              carbonAmountProduced={carbonTokens.produced as number}
              carbonAmountRetired={carbonTokens.retired as number}
            />
          </Box>
        </Grid.Col>
        <Grid.Col span={12}>
          <Box h={400}>
            <AssetPerformanceCard
              externalId={externalId ?? ''}
              label='Asset Performance'
              icon={<Image src={IconAssetPerformance} alt='AssetPerformance' width={5} height={5} />}
            />
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box h={400}>
            <AssetLocationCard
              icon={<Image src={IconAssetLocation} alt='AssetLocation' width={5} height={5} />}
              label='Asset Location'
              cookStove={cookStove}
            />
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box h={400}>
            <ClaimActivityCard
              icon={<Image src={IconAssetActivity} alt='AssetActivity' width={5} height={5} />}
              label='Claim Activity'
            />
          </Box>
        </Grid.Col>
        <Grid.Col span={12}>
          <Box mih={400}>
            <AssetEventsCard
              label='Asset Events'
              icon={<Image src={IconClock} alt='Clock' width={5} height={5} />}
              messages={(messagesData?.messages?.nodes ?? []) as Message[]}
            />
          </Box>
        </Grid.Col>
      </Grid>
    </Flex>
  )
}

export default AssetOverview
