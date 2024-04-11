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

const Requests = () => {
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

  const requests = [
    {
      id: 'one',
      title: 'Some request',
    },
    {
      id: 'two',
      title: 'Some request',
    },
    {
      id: 'three',
      title: 'Some request',
    },
    {
      id: 'four',
      title: 'Some request',
    },
  ]

  return (
    <Flex w='100%' h='100%'>
      <TabsWrapper>
        <Tabs w='100%' defaultValue='development' styles={{ list: { borderBottom: 'none' }, tab: { paddingBottom: "3px"} }}>
          <Tabs.List >
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
                        <RequestCard />
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
