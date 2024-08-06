import Image from 'next/image'
import { Flex, useMantineTheme } from '@mantine/core'
import { Card } from '../Card'
import { Avatar } from 'screens/CurrentEntity/Components'
import { Typography } from 'components/Typography'
import { useState } from 'react'
import { Input, TextArea } from 'screens/CreateEntity/Components'
import { IconArrowUp, IconCommentAlt, IconSearch } from 'components/IconPaths'

const SearchBox = () => {
  const theme = useMantineTheme()
  const [keyword, setKeyword] = useState('')

  return (
    <Flex w='100%' h='40px' px={3} gap={1.5} align='center' bg='#F0F3F9' style={{ borderRadius: '8px' }}>
      <Image src={IconSearch} alt='Search' width={5} height={5} color={theme.colors.blue[5]} />
      <Input
        placeholder='Type to Search'
        inputValue={keyword}
        handleChange={setKeyword}
        wrapperStyle={{ border: 'none' }}
      />
    </Flex>
  )
}

interface UserItemProps {
  onClick: () => void
}
const UserItem: React.FC<UserItemProps> = ({ onClick }) => {
  const theme = useMantineTheme()
  return (
    <Flex
      w='100%'
      bg='#F0F3F9'
      p={2}
      gap={4}
      align='center'
      onClick={onClick}
      style={{ borderRadius: '8px', cursor: 'pointer' }}
    >
      <Flex style={{ flex: 1 }}>
        <Avatar size={50} borderWidth={0} />
      </Flex>
      <Flex direction='column' w='100%' gap={2}>
        <Flex gap={2} align='center'>
          <Typography size='sm' weight='semi-bold'>
            Jane Doe
          </Typography>
          <Flex w='8px' h='8px' style={{ borderRadius: '8px' }} bg={theme.colors.blue[5]} />
        </Flex>
        <Flex>
          <Typography size='md'>How’s it going? Your Stove NFT’s user has purchased 30kg of pellets.</Typography>
        </Flex>
      </Flex>
    </Flex>
  )
}

const MessageBox = () => {
  const theme = useMantineTheme()
  const [message, setMessage] = useState('')

  return (
    <Flex w='100%' h='100%' direction='column' gap={4} style={{ overflowY: 'auto' }}>
      <Flex w='100%' justify='space-between' align='center' gap={4} p={2}>
        <Typography size='md'>Hello, how&apos;s it going?</Typography>
        <Avatar size={50} borderWidth={0} />
      </Flex>

      <Flex w='100%' style={{ borderRadius: '16px', background: '#F7F8F9', padding: '16px' }}>
        Hello Hello!
      </Flex>

      <Flex w='100%' justify='space-between' align='center' gap={4} p={2}>
        <Typography size='md'>Did you get a SupaMoto Nifty yet?</Typography>
        <Avatar size={50} borderWidth={0} />
      </Flex>

      <Flex w='100%' style={{ borderRadius: '16px', background: '#F7F8F9', padding: '16px' }}>
        {`Yes!\nI got two`}
      </Flex>

      <Flex
        pos='relative'
        w='100%'
        style={{ border: `1px solid ${theme.colors.blue[5]}`, borderRadius: '16px' }}
        py={5}
        px={3}
      >
        <TextArea inputValue={message} handleChange={setMessage} placeholder='Type here' style={{ border: 0 }} />
        <Image src={IconArrowUp} alt='ArrowUp' width={5} height={5} color={theme.colors.blue[5]} />
      </Flex>
    </Flex>
  )
}

const MessagesCard = () => {
  const theme = useMantineTheme()
  const [tab, setTab] = useState<'unread' | 'favourite'>('unread')
  const [selected, setSelected] = useState('')

  const onClickUser = () => {
    //
    setSelected('Jane')
  }

  return (
    <Card
      icon={IconCommentAlt}
      title={
        <Flex align='center' gap={4}>
          <Flex onClick={() => setSelected('')} style={{ cursor: 'pointer' }}>
            <Typography variant='secondary' size='lg' color={selected ? 'grey500' : 'black'}>
              Messages
            </Typography>
          </Flex>
          {selected ? (
            <Flex>
              <Typography variant='secondary' size='lg'>
                {selected}
              </Typography>
            </Flex>
          ) : (
            <Flex gap={2} align='center' color={theme.colors.white[5]}>
              <Flex
                w='24px'
                h='24px'
                justify='center'
                align='center'
                bg={tab === 'unread' ? theme.colors.blue[5] : `${theme.colors.blue[5]}66`}
                onClick={() => setTab('unread')}
                style={{ borderRadius: '100px', cursor: 'pointer' }}
              >
                <Typography size='sm'>8</Typography>
              </Flex>
            </Flex>
          )}
        </Flex>
      }
      columns={1}
      items={
        selected ? (
          <Flex direction='column' gap={4} w='100%' h='100%'>
            <MessageBox />
          </Flex>
        ) : (
          <Flex direction='column' gap={4} w='100%'>
            <SearchBox />
            <Flex direction='column' w='100%' gap={2}>
              <UserItem onClick={onClickUser} />
            </Flex>
          </Flex>
        )
      }
    />
  )
}

export default MessagesCard
