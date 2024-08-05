import { useMantineTheme } from '@mantine/core'
import { Card } from '../Card'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Avatar } from 'screens/CurrentEntity/Components'
import { Typography } from 'components/Typography'
import { ReactComponent as BellIcon } from '/public/assets/images/icon-bell.svg'
import { ReactComponent as ThumbsUpIcon } from '/public/assets/images/icon-thumbs-up.svg'
import { ReactComponent as CommentIcon } from '/public/assets/images/icon-comment-alt.svg'
import { ReactComponent as BookMarkIcon } from '/public/assets/images/icon-bookmark.svg'
import { useState } from 'react'

const FeedItem = () => {
  const theme = useMantineTheme()
  return (
    <FlexBox width='100%' background='#F0F3F9' $borderRadius='8px' p={2} $gap={4} $alignItems='center'>
      <FlexBox style={{ flex: 1 }}>
        <Avatar size={32} borderWidth={0} />
      </FlexBox>
      <FlexBox $direction='column' width='100%' $gap={2}>
        <FlexBox $gap={2} $alignItems='center'>
          <Typography size='sm' weight='semi-bold'>
            Clean Cooking Company
          </Typography>
          <FlexBox width='8px' height='8px' $borderRadius='100px' background={theme.ixoNewBlue} />
        </FlexBox>
        <FlexBox>
          <Typography size='md'>Your Stove NFT’s user has purchased 30kg of pellets.</Typography>
        </FlexBox>
        <FlexBox $gap={2}>
          <FlexBox
            $borderRadius='100px'
            px={6}
            py={1}
            background='#F1F1F1'
            $alignItems='center'
            $gap={1.5}
            cursor='pointer'
          >
            <SvgBox $svgWidth={5} $svgHeight={5}>
              <ThumbsUpIcon />
            </SvgBox>
            <Typography size='sm' color='grey500'>
              32
            </Typography>
          </FlexBox>
          <FlexBox
            $borderRadius='100px'
            px={6}
            py={1}
            background='#F1F1F1'
            $alignItems='center'
            $gap={1.5}
            cursor='pointer'
          >
            <SvgBox $svgWidth={5} $svgHeight={5}>
              <CommentIcon />
            </SvgBox>
            <Typography size='sm' color='grey500'>
              123
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

const FeedCard = () => {
  const theme = useMantineTheme()
  const [tab, setTab] = useState<'unread' | 'favourite'>('unread')

  return (
    <Card
      icon={<BellIcon />}
      title={
        <FlexBox $alignItems='center' $gap={4}>
          <Typography variant='secondary' size='lg'>
            Feed
          </Typography>
          <FlexBox $gap={2} $alignItems='center' color={theme.ixoWhite}>
            <FlexBox
              $borderRadius='100px'
              width='24px'
              height='24px'
              $justifyContent='center'
              $alignItems='center'
              background={tab === 'unread' ? theme.ixoNewBlue : `${theme.ixoNewBlue}66`}
              cursor='pointer'
              onClick={() => setTab('unread')}
            >
              <Typography size='sm'>12</Typography>
            </FlexBox>
            <FlexBox
              height='24px'
              px={2}
              $justifyContent='center'
              $alignItems='center'
              $borderRadius='100px'
              background={tab === 'favourite' ? theme.ixoNewBlue : `${theme.ixoNewBlue}66`}
              cursor='pointer'
              onClick={() => setTab('favourite')}
            >
              <SvgBox $svgWidth={5} $svgHeight={5} color={theme.ixoWhite}>
                <BookMarkIcon />
              </SvgBox>
              <Typography size='sm'>32</Typography>
            </FlexBox>
          </FlexBox>
        </FlexBox>
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
