import Dashboard from 'components/Dashboard/Dashboard'
import useCurrentEntity from 'hooks/currentEntity'
import { MatchType } from 'types/models'
import * as _ from 'lodash'
import { FlexBox } from 'components/App/App.styles'
import AssetCard from 'components/AssetCard'
import { useGetEntityById } from 'graphql/entities'
import { AssetCreditsCard, AssetPerformanceCard, AssetStatsCard, Card, WorldMap } from 'components'
import { useEffect, useState } from 'react'
import Axios from 'axios'

const AssetDashboard = () => {
  const currentEntity = useCurrentEntity()
  const entityType = currentEntity.entityType.replace('protocol/', '')
  const [cookingSummarySessions, setCookingSummarySessions] = useState([])

  const { data } = useGetEntityById(currentEntity.id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('https://app.impacts.exchange/api/cookstove/cooking-sessions/summary', {
          params: {
            deviceIds: ['202200009'],
          },
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
          },
        })
        setCookingSummarySessions(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
        // You might want to handle errors here
      }
    }

    fetchData()
  }, [])

  const assetNumber = _.get(currentEntity, 'currentEntity.alsoKnownAs').replace('{id}', '')
  const did = _.get(currentEntity, 'id')

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
        <AssetCard collectionName='SupaMoto ${assetNumber}' entity={data} width='250px' height='100%' />
        <FlexBox flexGrow={1} height='100%' gap={5}>
          <AssetStatsCard title='Assets Stats' did={did} />
          <AssetCreditsCard title='Impact Credits' />
        </FlexBox>
      </FlexBox>
      <FlexBox height='400px' py={5}>
        <AssetPerformanceCard data={cookingSummarySessions} title='Asset Performance' />
      </FlexBox>
      <FlexBox height='250px' width={'100%'} gap={10} overflowY='hidden'>
        <Card title='Asset Location' height='100%' width='100%' position='relative'>
          <WorldMap />
        </Card>
        <Card title='Claim Activity' height='100%' width='100%'>
          <>Something</>
        </Card>
      </FlexBox>
      <FlexBox py={5} height='250px' width={'100%'} gap={10} overflowY='hidden'>
        <Card title='Asset Events' height='100%' width='100%'>
          <>Something</>
        </Card>
      </FlexBox>
      <>{JSON.stringify({ currentEntity }, null, 2)}</>
    </Dashboard>
  )
}

export default AssetDashboard
