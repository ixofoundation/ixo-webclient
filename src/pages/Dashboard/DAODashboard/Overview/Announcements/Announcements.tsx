import { Box, FlexBox, theme } from 'components/App/App.styles'
import React, { useState } from 'react'
import { Card, TabButton } from '../Components'
import { ReactComponent as BellIcon } from 'assets/images/icon-bell-in-circle.svg'
import { Typography } from 'components/Typography'

interface Props {
  tbd?: any
}
const Announcements: React.FC<Props> = (): JSX.Element => {
  const [filter, setFilter] = useState('Newest')
  return (
    <Card icon={<BellIcon />} label='Announcements'>
      <FlexBox gap={3}>
        <TabButton active={filter === 'Newest'} onClick={() => setFilter('Newest')}>
          Newest
        </TabButton>
        <TabButton active={filter === 'Trending'} onClick={() => setFilter('Trending')}>
          Trending
        </TabButton>
        <TabButton active={filter === 'Most activity'} onClick={() => setFilter('Most activity')}>
          Most activity
        </TabButton>
      </FlexBox>

      <FlexBox width='100%' gap={7.5}>
        {new Array(3).fill(0).map((_, index) => (
          <FlexBox key={index} borderRadius='4px' background='#012131' gap={4} p={4} direction='column'>
            <FlexBox alignItems='center' gap={2.5}>
              <Box>
                <FlexBox
                  borderRadius='4px'
                  background='#033C50'
                  justifyContent='center'
                  alignItems='center'
                  width='32px'
                  height='32px'
                >
                  <Typography color='blue' size='md'>
                    {index + 1}
                  </Typography>
                </FlexBox>
              </Box>
              <Typography color='blue' overflowLines={2} weight='bold' size='md'>
                Extend the project duration target for educational xxx bbb ccc
              </Typography>
            </FlexBox>
            <FlexBox alignItems='start' gap={2.5}>
              <Box>
                <Box
                  background={`url(${'https://randomuser.me/api/portraits/men/71.jpg'}), ${theme.ixoGrey500}`}
                  width='32px'
                  height='32px'
                  backgroundSize='contain'
                  borderRadius='100%'
                  borderColor='white'
                  borderWidth='2px'
                  borderStyle='solid'
                />
              </Box>

              <FlexBox direction='column' gap={3}>
                <Typography size='sm' overflowLines={4} color='white'>
                  Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vestibulum ante ipsum primis in
                  faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam
                  vel, ullamcorper sit amet ligula. Vivamus magna justo, lacinia eget consectetur sed, convallis at
                  tellus. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh
                  pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
                </Typography>
                <FlexBox justifyContent='space-between' width='100%'>
                  <Typography color='dark-blue' size='sm'>
                    12 Oct 2022
                  </Typography>
                  <Typography color='dark-blue' size='sm'>
                    16 Replies
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
