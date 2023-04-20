import React, { useState } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import { Avatar, Card } from '../../Components'
import { ReactComponent as GroupsIcon } from 'assets/images/icon-groups.svg'
import { ReactComponent as ChevRightIcon } from 'assets/images/icon-chev-right.svg'
import { Box, FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import useCurrentDao from 'hooks/currentDao'
import { DaoGroup } from 'redux/currentEntity/dao/currentDao.types'
import { deviceWidth } from 'constants/device'

const StyledSlider = styled(Slider)`
  .slick-track {
    margin-left: 0;
  }
`

const Arrow = styled(Box)`
  &:before {
    content: '';
  }
  &:hover {
    background: ${(props) => props.theme.ixoDarkBlue};
  }
`

const NextArrow = (props: any) => (
  <Arrow
    className={props.className}
    width='36px'
    height='36px'
    borderRadius='100%'
    background={theme.ixoDarkBlue}
    style={{ ...props.style }}
    onClick={props.onClick}
  >
    <SvgBox position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)'>
      <ChevRightIcon />
    </SvgBox>
  </Arrow>
)
const PrevArrow = (props: any) => (
  <Arrow
    className={props.className}
    width='36px'
    height='36px'
    borderRadius='100%'
    background={theme.ixoDarkBlue}
    style={{ ...props.style }}
    onClick={props.onClick}
  >
    <SvgBox position='absolute' top='50%' left='50%' transform='translate(-50%, -50%) rotate(180deg)'>
      <ChevRightIcon />
    </SvgBox>
  </Arrow>
)

interface Props {
  isFollowing?: boolean
}

const Groups: React.FC<Props> = ({ isFollowing }): JSX.Element | null => {
  const { daoGroups, selectedGroups, myGroups, selectDaoGroup } = useCurrentDao()
  const [dragging, setDragging] = useState(false)
  const settings = {
    className: 'slider variable-width',
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: () => setDragging(true),
    afterChange: () => setDragging(false),
    responsive: [
      {
        breakpoint: deviceWidth.tablet,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: deviceWidth.desktop,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: deviceWidth.desktopLarge,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: deviceWidth.desktopExtra,
        settings: { slidesToShow: 4 },
      },
    ],
  }

  const renderGroupCard = (daoGroup: DaoGroup): JSX.Element => (
    <FlexBox
      mx={2}
      aspectRatio={1}
      direction='column'
      alignItems='center'
      justifyContent='center'
      borderWidth={selectedGroups[daoGroup.coreAddress] ? '2px' : '1px'}
      borderStyle='solid'
      borderColor={selectedGroups[daoGroup.coreAddress] ? theme.ixoNewBlue : theme.ixoDarkBlue}
      borderRadius='12px'
      cursor='pointer'
      transition='all .2s'
      background={selectedGroups[daoGroup.coreAddress] && theme.ixoDarkBlue}
      hover={{ borderWidth: '2px', borderColor: theme.ixoNewBlue }}
      onClick={() => !dragging && selectDaoGroup(daoGroup.coreAddress)}
    >
      <Box mb={0.1}>
        <Typography color='white' size='lg' weight='medium'>
          {daoGroup.config.name}
        </Typography>
      </Box>
      <Box mb={4}>
        <Typography color='light-blue' weight='medium' size='sm'>
          {daoGroup.type} group
        </Typography>
      </Box>
      <FlexBox alignItems='center' gap={4} height='36px'>
        <FlexBox ml={-2}>
          {daoGroup.votingModule.members.slice(0, 4).map((member, index) => (
            <Box key={index} width='24px'>
              <Avatar size={32} url={undefined} />
            </Box>
          ))}
        </FlexBox>
        {daoGroup.votingModule.members.length > 4 && (
          <Typography color='white' size='4xl'>
            ⋯
          </Typography>
        )}
      </FlexBox>
      <Typography color='white' weight='medium' size='lg'>
        {daoGroup.votingModule.members.length} members
      </Typography>
    </FlexBox>
  )

  if (Object.values(isFollowing ? myGroups : daoGroups).length === 0) {
    return null
  }

  return (
    <Box mb={4} width='100%'>
      <Card icon={<GroupsIcon />} label='Groups'>
        <Box width='100%' color='white'>
          <StyledSlider {...settings}>
            {Object.values(isFollowing ? myGroups : daoGroups)
              .sort((a, b) => {
                if (a.selected! > b.selected!) {
                  return -1
                } else if (a.selected! < b.selected!) {
                  return 1
                }
                return 0
              })
              .map((daoGroup: DaoGroup) => (
                <div key={daoGroup.coreAddress} style={{ width: 240 }}>
                  {renderGroupCard(daoGroup)}
                </div>
              ))}
          </StyledSlider>
        </Box>
      </Card>
    </Box>
  )
}

export default Groups