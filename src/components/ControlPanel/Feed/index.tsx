import { useTheme } from 'styled-components'
import { Card } from '../Card'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Avatar } from 'pages/CurrentEntity/Components'
import { Typography } from 'components/Typography'
import { ReactComponent as BellIcon } from 'assets/images/icon-bell.svg'
import { ReactComponent as ThumbsUpIcon } from 'assets/images/icon-thumbs-up.svg'
import { ReactComponent as CommentIcon } from 'assets/images/icon-comment-alt.svg'

const FeedItem = () => {
  const theme: any = useTheme()
  return (
    <FlexBox width='100%' background='#F0F3F9' borderRadius='8px' p={2} gap={4} alignItems='center'>
      <FlexBox style={{ flex: 1 }}>
        <Avatar size={32} borderWidth={0} />
      </FlexBox>
      <FlexBox direction='column' width='100%' gap={2}>
        <FlexBox gap={2} alignItems='center'>
          <Typography size='sm' weight='semi-bold'>
            Clean Cooking Company
          </Typography>
          <FlexBox width='8px' height='8px' borderRadius='100px' background={theme.ixoNewBlue} />
        </FlexBox>
        <FlexBox>
          <Typography size='md'>Your Stove NFT’s user has purchased 30kg of pellets.</Typography>
        </FlexBox>
        <FlexBox gap={2}>
          <FlexBox
            borderRadius='100px'
            px={6}
            py={1}
            background='#F1F1F1'
            alignItems='center'
            gap={1.5}
            cursor='pointer'
          >
            <SvgBox svgWidth={5} svgHeight={5}>
              <ThumbsUpIcon />
            </SvgBox>
            <Typography size='sm' color='grey500'>
              32
            </Typography>
          </FlexBox>
          <FlexBox
            borderRadius='100px'
            px={6}
            py={1}
            background='#F1F1F1'
            alignItems='center'
            gap={1.5}
            cursor='pointer'
          >
            <SvgBox svgWidth={5} svgHeight={5}>
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
  const theme: any = useTheme()

  return (
    <Card
      icon={<BellIcon />}
      title='Feed'
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
