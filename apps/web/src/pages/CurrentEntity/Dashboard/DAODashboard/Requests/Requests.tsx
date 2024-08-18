import { Flex, Grid, Tabs, Title, rem } from '@mantine/core'
import {
  IconCode,
  IconSpeakerphone,
  IconDeviceLaptop,
  IconThumbUp,
  IconListDetails,
  IconLayoutGrid,
} from '@tabler/icons-react'
import { upperFirst } from 'lodash'
import { ReactComponent as AssistantIcon } from 'assets/images/icon-assistant.svg'
import { useTheme } from 'styled-components'
import RequestCard from 'components/EntityCards/RequestCard'
import TabsWrapper from 'components/Wrappers/TabsWrapper'
import { useAppSelector } from 'redux/hooks'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { Entity, useEntitiesQuery } from 'generated/graphql'
import { useState } from 'react'
import { populateEntitiesForEntityExplorer } from 'services/entities'
import { TEntityModel } from 'types/entities'

const Requests = () => {
  const [requests, setRequests] = useState<TEntityModel[]>([])
  const { entityId = '' } = useParams<{ entityId: string }>()
  const entity = useAppSelector(getEntityById(entityId))

  useEntitiesQuery({
    variables: {
      filter: {
        id: {
          in: entity?.linkedEntity?.map(({ id }) => id),
        },
      },
    },
    onCompleted: async (data) => {
      const nodes = data.entities?.nodes ?? []
      if (nodes.length > 0) {
        const updatedNodes = (await populateEntitiesForEntityExplorer(nodes as Entity[])) as TEntityModel[]
        setRequests(updatedNodes)
      }
    },
  })

  console.log({requests})

  const theme = useTheme()
  const iconStyle = { width: rem(12), height: rem(12) }

  const categories = [
    {
      title: 'development',
      icon: <IconCode style={iconStyle} />,
    },
    {
      title: 'marketing',
      icon: <IconSpeakerphone style={iconStyle} />,
    },
    {
      title: 'product',
      icon: <IconDeviceLaptop style={iconStyle} />,
    },
    {
      title: 'governance',
      icon: <IconThumbUp style={iconStyle} />,
    },
  ] 
  
  return (
    <Flex w='100%' h='100%'>
      <TabsWrapper style={{ width: '100%' }}>
        <Tabs
          w='100%'
          defaultValue='development'
          styles={{ list: { borderBottom: 'none' }, tab: { paddingBottom: '3px' } }}
        >
          <Tabs.List>
            {categories.map((category) => (
              <Tabs.Tab
                key={category.title}
                value={category.title}
                leftSection={category.icon}
                styles={{ tabLabel: { color: '#0089D7', fontWeight: 'bolder' } }}
              >
                {upperFirst(category.title)}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {categories.map((category) => (
            <Tabs.Panel w='100%' key={category.title} value={category.title}>
              <Flex direction={'column'} justify={'center'} w='100%'>
                <Flex w='100%' justify={'space-between'} py={10}>
                  <Title fw='bolder' mb='md'>
                    Open Requests for {category.title}
                  </Title>
                  <Flex align={'center'} gap={8}>
                    <IconLayoutGrid style={{ width: rem(30), height: rem(30), color: theme.ixoBlue }} />
                    <IconListDetails style={{ width: rem(30), height: rem(30), color: theme.ixoGrey500 }} />
                    <AssistantIcon />
                  </Flex>
                </Flex>
                <Flex w='100%'>
                  <Grid w='100%'>
                    {requests.map((request) => (
                      <Grid.Col key={request.id} span={4}>
                        <RequestCard
                          did={request.id}
                          entityName={entity.profile?.name ?? ''}
                          requestName={request.profile?.name ?? ''}
                          requestDescription={request.profile?.description ?? ''}
                          requestImage={request.profile?.image ?? ''}
                        />
                      </Grid.Col>
                    ))}
                  </Grid>
                </Flex>
              </Flex>
            </Tabs.Panel>
          ))}
        </Tabs>
      </TabsWrapper>
    </Flex>
  )
}

export default Requests
