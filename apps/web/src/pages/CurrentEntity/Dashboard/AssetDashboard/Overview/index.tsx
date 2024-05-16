import { Flex } from '@mantine/core'
import React from 'react'
import { AssetCard } from 'components/EntityCards/AssetCard'
import { GridContainer, GridItem } from 'components/App/App.styles'
import {
  AssetActivityIcon,
  AssetLocationIcon,
  AssetPerformanceIcon,
  AssetStatsIcon,
  ClockIcon,
  ImpactsCreditIcon,
} from 'components/Icons'
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
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'

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
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const collection = searchParams.get('collection')
  const { entityId = "" } = useParams()
  const { id, accounts, externalId, alsoKnownAs, linkedResource, service, profile: entityProfile, tags, zlottie, metadata } = useAppSelector(getEntityById(entityId))

  const adminAccount = React.useMemo(
    () => accounts?.find((v: any) => v.name === 'admin')?.address || '',
    [accounts],
  )
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

  const assetNumber = alsoKnownAs?.replace('{id}#', '') ?? ""

  const inputAssetCardData = React.useMemo(() => {
    if (entityProfile) {
      return {
        logo: entityProfile?.logo,
        type: entityProfile?.type.split(':')[1] ?? '',
        collectionName: collection,
        title: entityProfile?.brand,
        cardImage: entityProfile?.image,
        creator: entityProfile?.name,
        tags: tags ?? [] as any,
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
    <Flex w={'100%'} direction={'column'} gap={6}>
      <GridContainer
        $gridTemplateAreas={`"a a b b c c""d d d d d d""e e e f f f""g g g g g g"`}
        $gridTemplateColumns={'1fr 1fr 1fr 1fr 1fr 1fr'}
        $gridTemplateRows={'repeat(3, minmax(400px, auto))'}
        $gridGap={6}
        width='100%'
      >
        <GridItem $gridArea='a' $alignSelf='stretch' height='400px'>
          <AssetCard {...inputAssetCardData} accountTokens={carbonTokens} width='300px' height='100%' />
        </GridItem>
        <GridItem $gridArea='b' $alignSelf='stretch' height='400px'>
          <AssetStatsCard
            creator={profile?.name}
            created={metadata?.created}
            project={profile?.brand}
            did={id}
            carbonProduced={carbonTokens.produced}
            label='Asset Stats'
            icon={<AssetStatsIcon />}
          />
        </GridItem>
        <GridItem $gridArea='c' $alignSelf='stretch' height='400px'>
          <AssetCreditsCard
            label='Impact Credits'
            icon={<ImpactsCreditIcon />}
            carbonAmountClaimable={carbonTokens.claimable}
            carbonAmountProduced={carbonTokens.produced}
            carbonAmountRetired={carbonTokens.retired}
          />
        </GridItem>
        <GridItem $gridArea='d' $alignSelf='stretch' height='400px'>
          <AssetPerformanceCard
            externalId={externalId ?? ''}
            label='Asset Performance'
            icon={<AssetPerformanceIcon />}
          />
        </GridItem>
        <GridItem $gridArea='e' $alignSelf='stretch' height='400px'>
          <AssetLocationCard icon={<AssetLocationIcon />} label={'Asset Location'} cookStove={cookStove} />
        </GridItem>
        <GridItem $gridArea='f' $alignSelf='stretch' height='400px'>
          <ClaimActivityCard icon={<AssetActivityIcon />} label='Claim Activity' />
        </GridItem>
        <GridItem $gridArea='g' $alignSelf='stretch' $minHeight='400px'>
          <AssetEventsCard
            label='Asset Events'
            icon={<ClockIcon />}
            messages={(messagesData?.messages?.nodes ?? []) as Message[]}
          />
        </GridItem>
      </GridContainer>
    </Flex>
  )
}

export default AssetOverview
