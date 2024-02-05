import { Box, FlexBox } from 'components/App/App.styles'
import React, { useState } from 'react'
import moment from 'moment'
import { Card, TabButton } from '../../../../Components'
import { ReactComponent as BellIcon } from 'assets/images/icon-bell-in-circle.svg'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'

const DEFAULT_FILTER_BY = 'newest'

interface Props {
  daoId: string
  groupAddresses: string[]
}
const Announcements: React.FC<Props> = ({ daoId, groupAddresses = [] }): JSX.Element => {
  const theme: any = useTheme()
  const [filterBy, setFilterBy] = useState(DEFAULT_FILTER_BY)

  return (
    <Card icon={<BellIcon />} label='Announcements'>
      <FlexBox $gap={3}>
        <TabButton active={filterBy === 'newest'} onClick={() => setFilterBy('newest')}>
          Newest
        </TabButton>
        <TabButton active={filterBy === 'trending'} onClick={() => setFilterBy('trending')}>
          Trending
        </TabButton>
        <TabButton active={filterBy === 'most_activity'} onClick={() => setFilterBy('most_activity')}>
          Most activity
        </TabButton>
      </FlexBox>

      <FlexBox width='100%' $gap={7.5}>
        {[].map((item: any, index: number) => (
          <FlexBox key={index} $borderRadius='4px' background='#012131' $gap={4} p={4} $direction='column'>
            <FlexBox $alignItems='center' $gap={2.5}>
              <Box>
                <FlexBox
                  $borderRadius='4px'
                  background='#033C50'
                  $justifyContent='center'
                  $alignItems='center'
                  width='32px'
                  height='32px'
                >
                  <Typography color='blue' size='md'>
                    {index + 1}
                  </Typography>
                </FlexBox>
              </Box>
              <Typography color='blue' $overflowLines={2} weight='bold' size='md'>
                {item.title}
              </Typography>
            </FlexBox>
            <FlexBox $alignItems='flex-start' $gap={2.5}>
              <Box>
                <Box
                  background={`url(${item.announcerAvatar}), ${theme.ixoGrey500}`}
                  width='32px'
                  height='32px'
                  $backgroundSize='contain'
                  $borderRadius='100%'
                  $borderColor='white'
                  $borderWidth='2px'
                  $borderStyle='solid'
                />
              </Box>

              <FlexBox $direction='column' $gap={3}>
                <Typography size='sm' $overflowLines={4} color='white'>
                  {item.description}
                </Typography>
                <FlexBox $justifyContent='space-between' width='100%'>
                  <Typography color='dark-blue' size='sm'>
                    {moment(item.updatedAt).format('DD MMM YYYY')}
                  </Typography>
                  <Typography color='dark-blue' size='sm'>
                    {item.replies} Replies
                  </Typography>
                </FlexBox>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        ))}
      </FlexBox>
    </Card>
  )
}

export default Announcements
