import Dashboard from 'components/Dashboard/Dashboard'
import useCurrentEntity from 'hooks/currentEntity'
import { MatchType } from 'types/models'
import * as _ from 'lodash'
import { FlexBox } from 'components/App/App.styles'
import AssetCard from 'components/AssetCard'
import { useGetEntityById } from 'graphql/entities'
import {
  ActivityCard,
  AssetCreditsCard,
  AssetEventsTable,
  AssetPerformanceCard,
  AssetStatsCard,
  Card,
  MapImage,
} from 'components'
import { useEffect, useMemo, useState } from 'react'
import { useGetAccountTokens } from 'graphql/tokens'
import { TEntityModel } from 'types/entities'
import { useAccount } from 'hooks/account'
import { apiEntityToEntity } from 'utils/entities'
import { resolveClaims } from 'utils/asset'
import { Message, useMessagesQuery } from 'generated/graphql'
import { getCookingSessions } from 'api/netlify/getCookingSessions'
import moment from 'moment'
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

const AssetDashboard = () => {
  const currentEntity = useCurrentEntity()
  const entityType = currentEntity.entityType.replace('protocol/', '')

  const { data } = useGetEntityById(currentEntity.id)

  const { cwClient } = useAccount()
  const [entity, setEntity] = useState<TEntityModel>()
  const [cookingSessions, setCookingSessions] = useState<any>()
  const [cookStove, setCookStove] = useState<any>()

  const adminAccount = useMemo(() => data?.accounts?.find((v: any) => v.name === 'admin')?.address || '', [data])

  const { data: accountTokens } = useGetAccountTokens(adminAccount)

  const { data: messagesData } = useMessagesQuery({
    variables: { first: 10, filter: { value: { contains: { id: data.id } } } },
  })

  useEffect(() => {
    getCookStove(data.externalId).then((response) => setCookStove(response.data))
  }, [data.externalId])

  useEffect(() => {
    getCookingSessions(data.externalId).then((response) => {
      const aggregatedData: any[] = []

      // Iterate through each data point
      response.data.content.forEach((item: any) => {
        const week = moment(item.startDateTime).week()
        const month = moment(item.startDateTime).format('MMM')

        const dateFormat = `${month}-${week}`
        // Check if the week is already in the aggregated data
        const existingWeekData = _.find(aggregatedData, { date: dateFormat })

        if (existingWeekData) {
          existingWeekData.duration += Math.ceil(item.duration / 60) // Add to existing week data
        } else {
          aggregatedData.push({ date: dateFormat, duration: Math.ceil(item.duration / 60), month, week }) // Create new entry for the week
        }
      })

      setCookingSessions(aggregatedData)
    })
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
  const claims = resolveClaims(entity?.linkedClaim, entity?.service)

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
        {entity && (
          <AssetCard
            collectionName='SupaMoto Collection'
            entity={entity}
            accountTokens={carbonTokens}
            width='250px'
            height='100%'
          />
        )}
        <FlexBox flexGrow={1} height='100%' gap={5}>
          <AssetStatsCard title='Assets Stats' did={did} icon={<AssetStatsIcon />} />
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
          data={cookingSessions}
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
          <FlexBox width='100%' gap={2} direction='column'>
            {claims.map((value, index) => (
              <ActivityCard
                key={`${value} ${index}`}
                name='Fuel Purchase'
                quantity='15kg'
                createdAt={new Date().toLocaleDateString()}
              />
            ))}
          </FlexBox>
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
