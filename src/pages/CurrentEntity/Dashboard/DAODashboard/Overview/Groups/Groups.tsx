import React, { useState } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import { Avatar, Card } from '../../Components'
import { ReactComponent as PieIcon } from 'assets/images/icon-pie.svg'
import { ReactComponent as ChevRightIcon } from 'assets/images/icon-chev-right.svg'
import { Box, FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import useCurrentDao from 'hooks/useCurrentDao'
import { DaoGroup } from 'redux/currentEntity/dao/currentDao.types'

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
  selectedGroups: { [coreAddress: string]: DaoGroup }
  setSelectedGroups: any
}

const Groups: React.FC<Props> = ({ selectedGroups, setSelectedGroups }): JSX.Element | null => {
  const { daoGroups } = useCurrentDao()
  const [dragging, setDragging] = useState(false)
  const settings = {
    infinite: true,
    speed: 500,
    // slidesToShow: 5,
    // slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: () => setDragging(true),
    afterChange: () => setDragging(false),
    // responsive: [
    //   {
    //     breakpoint: deviceWidth.tablet,
    //     settings: { slidesToShow: 1 },
    //   },
    //   {
    //     breakpoint: deviceWidth.desktop,
    //     settings: { slidesToShow: 2 },
    //   },
    //   {
    //     breakpoint: deviceWidth.desktopLarge,
    //     settings: { slidesToShow: 3 },
    //   },
    //   {
    //     breakpoint: deviceWidth.desktopExtra,
    //     settings: { slidesToShow: 4 },
    //   },
    // ],
  }

  const renderGroupCard = (daoGroup: DaoGroup): JSX.Element => (
    <FlexBox
      maxWidth='240px'
      aspectRatio={1}
      direction='column'
      alignItems='center'
      justifyContent='center'
      borderWidth={selectedGroups[daoGroup.coreAddress] ? '2px' : '1px'}
      borderStyle='solid'
      borderColor={selectedGroups[daoGroup.coreAddress] ? theme.ixoNewBlue : theme.ixoDarkBlue}
      borderRadius='12px'
      cursor='pointer'
      margin='auto'
      transition='all .2s'
      background={selectedGroups[daoGroup.coreAddress] && theme.ixoDarkBlue}
      hover={{ borderWidth: '2px', borderColor: theme.ixoNewBlue }}
      onClick={() =>
        !dragging &&
        setSelectedGroups((groups: { [coreAddress: string]: DaoGroup }) => {
          const newGroups = { ...groups }
          if (newGroups[daoGroup.coreAddress]) {
            delete newGroups[daoGroup.coreAddress]
          } else {
            newGroups[daoGroup.coreAddress] = daoGroup
          }
          return newGroups
        })
      }
    >
      <Box mb={0.1}>
        <Typography color='white' size='lg' weight='medium'>
          {daoGroup.config.name}
        </Typography>
      </Box>
      <Box mb={8}>
        <Typography color='light-blue' weight='medium' size='sm'>
          {daoGroup.type} group
        </Typography>
      </Box>
      <FlexBox alignItems='center' gap={4} mb={1}>
        <FlexBox>
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

  if (Object.values(daoGroups).length === 0) {
    return null
  }
  return (
    <Card icon={<PieIcon />} label='Groups'>
      <Box width='100%' color='white'>
        <Slider {...settings}>
          {Object.values(daoGroups).map((daoGroup: DaoGroup, index: number) => (
            <div key={daoGroup.coreAddress}>{renderGroupCard(daoGroup)}</div>
          ))}
        </Slider>
      </Box>
    </Card>
  )
}

export default Groups
