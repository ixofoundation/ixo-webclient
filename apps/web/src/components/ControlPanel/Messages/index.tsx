import Image from 'next/image'
import { useMantineTheme } from '@mantine/core'
import { Card } from '../Card'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Avatar } from 'screens/CurrentEntity/Components'
import { Typography } from 'components/Typography'
import { useState } from 'react'
import { Input, TextArea } from 'screens/CreateEntity/Components'
import { IconArrowUp } from 'components/IconPaths'
import { IconComment } from 'components/IconPaths'
import { IconSearch } from 'components/IconPaths'


const SearchBox = () => {
  const theme = useMantineTheme()
  const [keyword, setKeyword] = useState('')

  return (
    <FlexBox width='100%' height='40px' $borderRadius='8px' px={3} $gap={1.5} $alignItems='center' background='#F0F3F9'>
      <SvgBox $svgWidth={5} $svgHeight={5} color={theme.ixoBlack}>
        <Image src={IconSearch} alt='Search' width={5} height={5} color={theme.colors.blue[5]} />
      </SvgBox>
      <Input
        placeholder='Type to Search'
        inputValue={keyword}
        handleChange={setKeyword}
        wrapperStyle={{ border: 'none' }}
      />
    </FlexBox>
  )
}

interface UserItemProps {
  onClick: () => void
}
const UserItem: React.FC<UserItemProps> = ({ onClick }) => {
  const theme = useMantineTheme()
  return (
    <FlexBox
      width='100%'
      background='#F0F3F9'
      $borderRadius='8px'
      p={2}
      $gap={4}
      $alignItems='center'
      cursor='pointer'
      onClick={onClick}
    >
      <FlexBox style={{ flex: 1 }}>
        <Avatar size={50} borderWidth={0} />
      </FlexBox>
      <FlexBox $direction='column' width='100%' $gap={2}>
        <FlexBox $gap={2} $alignItems='center'>
          <Typography size='sm' weight='semi-bold'>
            Jane Doe
          </Typography>
          <FlexBox width='8px' height='8px' $borderRadius='100px' background={theme.colors.blue[5]} />
        </FlexBox>
        <FlexBox>
          <Typography size='md'>How’s it going? Your Stove NFT’s user has purchased 30kg of pellets.</Typography>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

const MessageBox = () => {
  const theme = useMantineTheme()
  const [message, setMessage] = useState('')

  return (
    <FlexBox width='100%' height='100%' $direction='column' $gap={4} $overflowY='auto'>
      <FlexBox width='100%' $justifyContent='space-between' $alignItems='center' $gap={4} p={2}>
        <Typography size='md'>Hello, how&apos;s it going?</Typography>
        <Avatar size={50} borderWidth={0} />
      </FlexBox>

      <FlexBox width='100%' $borderRadius='16px' background='#F7F8F9' p={2}>
        Hello Hello!
      </FlexBox>

      <FlexBox width='100%' $justifyContent='space-between' $alignItems='center' $gap={4} p={2}>
        <Typography size='md'>Did you get a SupaMoto Nifty yet?</Typography>
        <Avatar size={50} borderWidth={0} />
      </FlexBox>

      <FlexBox width='100%' $borderRadius='16px' background='#F7F8F9' p={2}>
        {`Yes!\nI got two`}
      </FlexBox>

      <FlexBox
        position='relative'
        width='100%'
        border={`1px solid ${theme.colors.blue[5]}`}
        $borderRadius='16px'
        py={5}
        px={3}
      >
        <TextArea inputValue={message} handleChange={setMessage} placeholder='Type here' style={{ border: 0 }} />
        <SvgBox
          position='absolute'
          right={'0px'}
          top='50%'
          transform='translate(-50%, -50%)'
          color={theme.colors.blue[5]}
          $svgWidth={8}
          $svgHeight={8}
          cursor='pointer'
        >
          <Image src={IconArrowUp} alt='ArrowUp' width={5} height={5} color={theme.colors.blue[5]} />
        </SvgBox>
      </FlexBox>
    </FlexBox>
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
      icon={<Image src={IconComment} alt='Comment' width={5} height={5} color={theme.colors.blue[5]} />}
      title={
        <FlexBox $alignItems='center' $gap={4}>
          <FlexBox cursor='pointer' onClick={() => setSelected('')}>
            <Typography variant='secondary' size='lg' color={selected ? 'grey500' : 'black'}>
              Messages
            </Typography>
          </FlexBox>
          {selected ? (
            <FlexBox>
              <Typography variant='secondary' size='lg'>
                {selected}
              </Typography>
            </FlexBox>
          ) : (
            <FlexBox $gap={2} $alignItems='center' color={theme.ixoWhite}>
              <FlexBox
                $borderRadius='100px'
                width='24px'
                height='24px'
                $justifyContent='center'
                $alignItems='center'
                background={tab === 'unread' ? theme.colors.blue[5] : `${theme.colors.blue[5]}66`}
                cursor='pointer'
                onClick={() => setTab('unread')}
              >
                <Typography size='sm'>8</Typography>
              </FlexBox>
            </FlexBox>
          )}
        </FlexBox>
      }
      columns={1}
      items={
        selected ? (
          <FlexBox $direction='column' $gap={4} width='100%' height='100%'>
            <MessageBox />
          </FlexBox>
        ) : (
          <FlexBox $direction='column' $gap={4} width='100%'>
            <SearchBox />
            <FlexBox $direction='column' width='100%' $gap={2}>
              <UserItem onClick={onClickUser} />
            </FlexBox>
          </FlexBox>
        )
      }
    />
  )
}

export default MessagesCard
