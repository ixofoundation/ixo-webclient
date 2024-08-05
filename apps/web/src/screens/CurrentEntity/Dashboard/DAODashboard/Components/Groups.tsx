import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import styled, { useTheme } from 'styled-components'
import { Avatar, Card } from '../../../Components'
import { ReactComponent as GroupsIcon } from '/public/assets/images/icon-groups.svg'
import { ReactComponent as ChevRightIcon } from '/public/assets/images/icon-chev-right.svg'
import { Box, FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { toTitleCase, truncateString } from 'utils/formatters'
import { ReactComponent as CopyIcon } from '/public/assets/images/icon-copy.svg'
import CopyToClipboard from 'react-copy-to-clipboard'
import { successToast } from 'utils/toast'
import Tooltip from 'components/Tooltip/Tooltip'
import useCurrentEntity from 'hooks/currentEntity'
import { TDAOGroupModel } from 'types/entities'
import { DAOGroupConfig } from 'constants/entity'
import { Member } from 'types/dao'
import { findDAObyDelegateAccount } from 'utils/entities'
import { useAppSelector } from 'redux/hooks'
import { selectEntitiesByType } from 'redux/entities/entities.selectors'

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

const NextArrow = (props: any) => {
  const theme: any = useTheme()
  return (
    <Arrow
      className={props.className}
      width='36px'
      height='36px'
      $borderRadius='100%'
      background={theme.ixoDarkBlue}
      style={{ ...props.style }}
      onClick={props.onClick}
    >
      <SvgBox position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)'>
        <ChevRightIcon />
      </SvgBox>
    </Arrow>
  )
}
const PrevArrow = (props: any) => {
  const theme: any = useTheme()
  return (
    <Arrow
      className={props.className}
      width='36px'
      height='36px'
      $borderRadius='100%'
      background={theme.ixoDarkBlue}
      style={{ ...props.style }}
      onClick={props.onClick}
    >
      <SvgBox position='absolute' top='50%' left='50%' transform='translate(-50%, -50%) rotate(180deg)'>
        <ChevRightIcon />
      </SvgBox>
    </Arrow>
  )
}

interface Props {
  selectedGroup: TDAOGroupModel | undefined
  selectDaoGroup: (address: string) => void
}

const Groups: React.FC<Props> = ({ selectedGroup, selectDaoGroup }): JSX.Element | null => {
  const theme: any = useTheme()
  const { daoGroups, daoController, isImpactsDAO, linkedEntity } = useCurrentEntity()
  const [dragging, setDragging] = useState(false)
  const daos = useAppSelector(selectEntitiesByType('dao'))

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

  const renderGroupCard = (daoGroup: TDAOGroupModel): JSX.Element => {
    const Icon = DAOGroupConfig[daoGroup.type]?.icon
    const members =
      isImpactsDAO && daoController === daoGroup.coreAddress
        ? daoGroup.votingModule.members
            .filter((member: Member) =>
              linkedEntity.some(({ type, id }) => type === 'MemberDAO' && id.includes(member.addr)),
            )
            .map((member: Member) => {
              const subDAO = findDAObyDelegateAccount(daos, member.addr)[0]
              const avatar = subDAO?.profile?.logo || subDAO?.profile?.image
              return { ...member, avatar }
            })
        : daoGroup.votingModule.members

    return (
      <FlexBox
        mx={2}
        $aspectRatio={1}
        $direction='column'
        $alignItems='center'
        $justifyContent='center'
        $borderWidth={selectedGroup === daoGroup ? '2px' : '1px'}
        $borderStyle='solid'
        $borderColor={selectedGroup === daoGroup ? theme.ixoNewBlue : theme.ixoDarkBlue}
        $borderRadius='12px'
        cursor='pointer'
        transition='all .2s'
        background={selectedGroup === daoGroup && theme.ixoDarkBlue}
        hover={{ $borderWidth: '2px', $borderColor: theme.ixoNewBlue }}
        onClick={() => !dragging && selectDaoGroup(daoGroup.coreAddress)}
      >
        <Box width='90%' $textAlign='center' mb={0.1}>
          <Typography color='white' size='lg' weight='medium' $overflowLines={1} style={{ width: '100%' }}>
            {daoGroup.config.name}
          </Typography>
        </Box>
        <Tooltip text={`${toTitleCase(daoGroup.type)} Governance`}>
          <SvgBox $svgWidth={5} $svgHeight={5} color={theme.ixoNewBlue}>
            {Icon && <Icon />}
          </SvgBox>
        </Tooltip>
        <CopyToClipboard text={daoGroup.coreAddress} onCopy={() => successToast(null, `Copied to clipboard`)}>
          <FlexBox mb={4} $alignItems='center' $gap={1} onClick={(e) => e.stopPropagation()}>
            <Typography color='blue' weight='medium' size='sm' hover={{ underline: true }}>
              {truncateString(daoGroup.coreAddress, 20, 'middle')}
            </Typography>
            <SvgBox color={theme.ixoNewBlue} $svgWidth={5} $svgHeight={5}>
              <CopyIcon />
            </SvgBox>
          </FlexBox>
        </CopyToClipboard>
        <FlexBox $alignItems='center' $gap={4} height='36px'>
          <FlexBox ml={-2}>
            {members.slice(0, 4).map((member, index) => (
              <Box key={index} width='24px'>
                <Avatar size={32} url={undefined} />
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
          {members.length} member{members.length > 1 && 's'}
        </Typography>
      </FlexBox>
    )
  }

  useEffect(() => {
    const daoGroupsArr = Object.values(daoGroups)
    if (daoGroupsArr.length > 0) {
      const selected = daoGroupsArr.some(({ selected }) => selected)
      if (!selected) {
        selectDaoGroup(daoGroupsArr[0].coreAddress)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daoGroups])

  if (Object.values(daoGroups).length === 0) {
    return null
  }

  const groups = Object.values(daoGroups).sort((group) => {
    if (group.coreAddress === daoController) {
      return -1
    }
    // If 'b' has the 'priority' property and 'a' doesn't, 'b' comes first
    if (group.coreAddress !== daoController) {
      return 1
    }
    // If neither or both have the property, retain original order
    return 0
  })

  return (
    <Box mb={4} width='100%'>
      <Card icon={<GroupsIcon />} label='Groups'>
        <Box width='100%' color='white'>
          <StyledSlider {...settings}>
            {groups.map((daoGroup: TDAOGroupModel) => (
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
