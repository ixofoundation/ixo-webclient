import Image from 'next/image'
import { Flex, useMantineTheme } from '@mantine/core'
import { Card } from '../Card'
import { Avatar } from 'screens/CurrentEntity/Components'
import { Typography } from 'components/Typography'
import { useState } from 'react'
import { IconBookmark, IconCommentAlt, IconBell, IconThumbsUp } from 'components/IconPaths'

const FeedItem = () => {
  const theme = useMantineTheme()
  return (
    <Flex w='100%' bg='#F0F3F9' p={2} gap={4} align='center' style={{ borderRadius: '8px' }}>
      <Flex style={{ flex: 1 }}>
        <Avatar size={32} borderWidth={0} />
      </Flex>
      <Flex direction='column' w='100%' gap={2}>
        <Flex gap={2} align='center'>
          <Typography size='sm' weight='semi-bold'>
            Clean Cooking Company
          </Typography>
          <Flex w='8px' h='8px' bg={theme.colors.blue[5]} style={{ borderRadius: '100px' }} />
        </Flex>
        <Flex>
          <Typography size='md'>Your Stove NFT’s user has purchased 30kg of pellets.</Typography>
        </Flex>
        <Flex gap={2}>
          <Flex
            px={6}
            py={1}
            gap={1.5}
            style={{ borderRadius: '100px', alignItems: 'center', gap: '1.5px', background: '#F1F1F1' }}
          >
            <Image src={IconThumbsUp} alt='ThumbsUp' width={5} height={5} color={theme.colors.blue[5]} />
            <Typography size='sm' color='grey500'>
              32
            </Typography>
          </Flex>
          <Flex
            px={6}
            py={1}
            bg='#F1F1F1'
            align='center'
            gap={1.5}
            style={{ borderRadius: '100px', cursor: 'pointer' }}
          >
            <Image src={IconCommentAlt} alt='Comment' width={5} height={5} color={theme.colors.blue[5]} />
            <Typography size='sm' color='grey500'>
              123
            </Typography>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

const FeedCard = () => {
  const theme = useMantineTheme()
  const [tab, setTab] = useState<'unread' | 'favourite'>('unread')

  return (
    <Card
      icon={IconBell}
      title={
        <Flex align='center' gap={4}>
          <Typography variant='secondary' size='lg'>
            Feed
          </Typography>
          <Flex gap={2} align='center' color={theme.colors.white[5]}>
            <Flex
              w='24px'
              h='24px'
              justify='center'
              align='center'
              bg={tab === 'unread' ? theme.colors.blue[5] : `${theme.colors.blue[5]}66`}
              onClick={() => setTab('unread')}
              style={{ borderRadius: '100px', cursor: 'pointer ' }}
            >
              <Typography size='sm'>12</Typography>
            </Flex>
            <Flex
              h='24px'
              px={2}
              justify='center'
              align='center'
              bg={tab === 'favourite' ? theme.colors.blue[5] : `${theme.colors.blue[5]}66`}
              onClick={() => setTab('favourite')}
              style={{ borderRadius: '100px', cursor: 'pointer' }}
            >
              <Image src={IconBookmark} alt='BookMark' width={5} height={5} color={theme.colors.blue[5]} />

              <Typography size='sm'>32</Typography>
            </Flex>
          </Flex>
        </Flex>
      }
      columns={1}
      items={
        <>
          <FeedItem />
        </>
      }
    />
  )
}

export default FeedCard
