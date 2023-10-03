import Dashboard from 'components/Dashboard/Dashboard'
import useCurrentEntity from 'hooks/currentEntity'
import { MatchType } from 'types/models'
import _ from 'lodash'
import { FlexBox } from 'components/App/App.styles'
import AssetCard from 'components/AssetCard'
import { useGetEntityById } from 'graphql/entities'
import { AssetCreditsCard, AssetEventsTable, AssetPerformanceCard, AssetStatsCard, Card, MapImage } from 'components'
import { useEffect, useMemo, useState } from 'react'
import { useGetAccountTokens } from 'graphql/tokens'
import { useAccount } from 'hooks/account'
import { apiEntityToEntity } from 'utils/entities'
import { useGetCreatorProfileWithVerifiableCredential } from 'utils/asset'
import { Message, useMessagesQuery } from 'generated/graphql'
import { getCookStove } from 'api/netlify/getCookStove'
import { Flex, Text } from '@mantine/core'
import {
  AssetActivityIcon,
  AssetLocationIcon,
  AssetPerformanceIcon,
  AssetStatsIcon,
  ClockIcon,
  ImpactsCreditIcon,
} from 'components/Icons'
import { useLocation } from 'react-router-dom'

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

const AssetDashboard = () => {
  const currentEntity = useCurrentEntity()
  const entityType = currentEntity.entityType.replace('protocol/', '')
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const collection = searchParams.get('collection')

  const { data } = useGetEntityById(currentEntity.id)

  const { cwClient } = useAccount()
  const [entity, setEntity] = useState<any>()

  const [cookStove, setCookStove] = useState<any>()

  const adminAccount = useMemo(() => data?.accounts?.find((v: any) => v.name === 'admin')?.address || '', [data])

  const { data: accountTokens } = useGetAccountTokens(adminAccount)

  const { data: messagesData } = useMessagesQuery({
    variables: { first: 10, filter: { value: { contains: { id: data.id } } } },
  })

  useEffect(() => {
    getCookStove(data.externalId).then((response) => setCookStove(response.data))
  }, [data.externalId])

  const carbonTokens = useMemo(() => {
    if (accountTokens['CARBON']) {
      const carbon = accountTokens['CARBON']
      const claimable = Object.values(carbon.tokens).reduce((acc: number, cur: any) => acc + cur.amount, 0)
      const produced = Object.values(carbon.tokens).reduce((acc: number, cur: any) => acc + cur.minted, 0)
      const retired = Object.values(carbon.tokens).reduce((acc: number, cur: any) => acc + cur.retired, 0)
      return { retired, produced, claimable }
    }

    return { retired: 0, produced: 0, claimable: 0 }
  }, [accountTokens])

  useEffect(() => {
    if (data) {
      setEntity(data)
      apiEntityToEntity({ entity: data, cwClient }, (key, value) => {
        setEntity((entity: any) => ({ ...entity, [key]: value }))
      })
    }
    return () => {
      setEntity(undefined)
    }
  }, [data, cwClient])

  const assetNumber = _.get(currentEntity, 'currentEntity.alsoKnownAs').replace('{id}', '')
  const did = _.get(currentEntity, 'id')

  const { profile } = useGetCreatorProfileWithVerifiableCredential({
    endpoint: entity?.linkedResource?.find((item: any) => item.type === 'VerifiableCredential')?.serviceEndpoint || '',
    service: entity?.service || [],
  })

  const inputAssetCardData = useMemo(() => {
    if (entity) {
      const {
        settings: { Profile, Tags },
        linkedResource,
      } = entity
      const {
        data: { image, logo, type, brand, name },
      } = Profile
      const zLottie = linkedResource.find((resource: any) => resource.type === 'Lottie').data

      return {
        logo,
        type: type.split(':')[1],
        collectionName: collection,
        title: brand,
        cardImage: image,
        creator: name,
        tags: Tags.data.entityTags,
        animation: zLottie,
        assetNumber: '',
        maxSupply: '',
        accountTokens: {},
      }
    }
    return EmptyAssetCardData
  }, [entity, collection])

  return (
    <Dashboard
      theme={'dark'}
      title={`SupaMoto ${assetNumber}`}
      subRoutes={[]}
      baseRoutes={[]}
      entityType={entityType}
      matchType={MatchType.strict}
    >
      <FlexBox height='300px' width='100%' gap={5}>
        {entity && <AssetCard {...inputAssetCardData} accountTokens={carbonTokens} width='250px' height='100%' />}
        <FlexBox flexGrow={1} height='100%' gap={5}>
          <AssetStatsCard
            title='Assets Stats'
            creator={profile?.name}
            created={entity?.metadata?.created}
            did={did}
            icon={<AssetStatsIcon />}
          />
          <AssetCreditsCard
            title='Impact Credits'
            icon={<ImpactsCreditIcon transform='scale(1.4)' />}
            carbonAmountClaimable={carbonTokens.claimable}
            carbonAmountProduced={carbonTokens.produced}
            carbonAmountRetired={carbonTokens.retired}
          />
        </FlexBox>
      </FlexBox>
      <FlexBox height='400px' py={5}>
        <AssetPerformanceCard
          externalId={data.externalId}
          title='Asset Performance'
          icon={<AssetPerformanceIcon transform='scale(1.4)' />}
        />
      </FlexBox>
      <FlexBox height='250px' width={'100%'} gap={10} overflowY='hidden'>
        <Flex w='100%' align='flex-start' h='100%' pos={'relative'} style={{ overflow: 'hidden', borderRadius: '5px' }}>
          <Flex w='100%' h='auto' align='center' justify='flex-start' p={16} style={{ zIndex: 9 }}>
            <Flex color='white' align='center'>
              <AssetLocationIcon transform='scale(1.4)' />
            </Flex>
            <Text ml={6} weight='bolder' size='24px'>
              Asset Location
            </Text>
          </Flex>
          <MapImage longitude={cookStove?.longitude} latitude={cookStove?.latitude} />
        </Flex>

        <Card title='Claim Activity' height='100%' width='100%' icon={<AssetActivityIcon transform='scale(1.4)' />}>
          <Flex w='100%' h='100%' gap={2} align='center' justify='center'>
            <Text>Coming Soon</Text>
          </Flex>
        </Card>
      </FlexBox>
      <FlexBox py={5} height='auto' width={'100%'} gap={10} overflowY='hidden'>
        <Card title='Asset Events' height='100%' width='100%' icon={<ClockIcon transform='scale(1.4)' />}>
          {messagesData?.messages?.nodes && <AssetEventsTable events={messagesData?.messages?.nodes as Message[]} />}
        </Card>
      </FlexBox>
    </Dashboard>
  )
}

export default AssetDashboard
