import React, { useState } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import { Avatar, Card } from '../../Components'
import { ReactComponent as PieIcon } from 'assets/images/icon-pie.svg'
import { ReactComponent as ChevRightIcon } from 'assets/images/icon-chev-right.svg'
import { Box, FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { IDAOMember } from 'types/dao'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { useGetAllDAOGroups } from 'hooks/dao'
import { useParams } from 'react-router-dom'

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
  selectedGroups: object
  setSelectedGroups: (selectedGroups: object) => void
}

const Groups: React.FC<Props> = ({ selectedGroups, setSelectedGroups }): JSX.Element | null => {
  const { entityId: daoId } = useParams<{ entityId: string }>()
  const { data: groups } = useGetAllDAOGroups(daoId)
  const [dragging, setDragging] = useState(false)
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
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

  const renderGroupCard = (id: string, groupTitle: string, groupType: string, members: IDAOMember[]): JSX.Element => (
    <FlexBox
      maxWidth='240px'
      aspectRatio={1}
      direction='column'
      alignItems='center'
      justifyContent='center'
      borderWidth={selectedGroups[id] ? '2px' : '1px'}
      borderStyle='solid'
      borderColor={selectedGroups[id] ? theme.ixoNewBlue : theme.ixoDarkBlue}
      borderRadius='12px'
      cursor='pointer'
      margin='auto'
      transition='all .2s'
      background={selectedGroups[id] && theme.ixoDarkBlue}
      hover={{ borderWidth: '2px', borderColor: theme.ixoNewBlue }}
      onClick={() =>
        !dragging &&
        setSelectedGroups((groups: object) => {
          const newGroups = { ...groups }
          if (newGroups[id]) {
            delete newGroups[id]
          } else {
            newGroups[id] = true
          }
          return newGroups
        })
      }
    >
      <Box mb={0.1}>
        <Typography color='white' size='lg' weight='medium'>
          {groupTitle}
        </Typography>
      </Box>
      <Box mb={8}>
        <Typography color='light-blue' weight='medium' size='sm'>
          {groupType} group
        </Typography>
      </Box>
      <FlexBox alignItems='center' gap={4} mb={1}>
        <FlexBox>
          {members.slice(0, 4).map((member, index) => (
            <Box key={index} width='24px'>
              <Avatar size={32} url={member.avatar} />
            </Box>
          ))}
        </FlexBox>
        {members.length > 4 && (
          <Typography color='white' size='4xl'>
            ⋯
          </Typography>
        )}
      </FlexBox>
      <Typography color='white' weight='medium' size='lg'>
        {members.length} members
      </Typography>
    </FlexBox>
  )

  if (groups.length === 0) {
    return null
  }

  return (
    <Card icon={<PieIcon />} label='Groups'>
      <Box width='100%' color='white'>
        <Slider {...settings}>
          {groups.map((item: any) => (
            <div key={item.address}>{renderGroupCard(item.address, item.title, item.type, item.members)}</div>
          ))}
        </Slider>
      </Box>
    </Card>
  )
}

export default Groups
