import Image from 'next/image'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { useMantineTheme } from '@mantine/core'
import { Typography } from 'components/Typography'
import { Card } from '../Card'
import { useCurrentEntityDAOGroup } from 'hooks/currentEntity'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'
import { truncate } from 'lodash'
import { IconProfile } from 'components/IconPaths'
import { IconUserCheck } from 'components/IconPaths'
import { IconUserNinja } from 'components/IconPaths'
import { IconUserAstronaut } from 'components/IconPaths'
import { IconStar } from 'components/IconPaths'


const DAOGroupItem: React.FC<{ address: string }> = ({ address }) => {
  const theme = useMantineTheme()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { daoGroups = {} } = useAppSelector(getEntityById(entityId))

  const { daoGroup, myVotingPower } = useCurrentEntityDAOGroup(address, daoGroups)

  return (
    <FlexBox key={daoGroup.id} width='100%' $alignItems='center' $justifyContent='space-between'>
      <FlexBox $gap={2}>
        <Typography size='md'>{truncate(daoGroup.config.name, { length: 20 })}</Typography>
        <Typography size='md' color='blue'>
          {Intl.NumberFormat(undefined, { style: 'percent' }).format(myVotingPower)}
        </Typography>
      </FlexBox>

      <FlexBox $gap={2}>
        <SvgBox
          width='40px'
          height='40px'
          background='#F7F8F9'
          $borderRadius='8px'
          $svgWidth={5}
          $svgHeight={5}
          color={theme.colors.blue[5]}
          $justifyContent='center'
          $alignItems='center'
        >
          <Image src={IconStar} alt='Star' width={5} height={5} color={theme.colors.blue[5]} />
        </SvgBox>
        <SvgBox
          width='40px'
          height='40px'
          background='#F7F8F9'
          $borderRadius='8px'
          $svgWidth={5}
          $svgHeight={5}
          color={theme.colors.blue[5]}
          $justifyContent='center'
          $alignItems='center'
        >
          <Image src={IconProfile} alt='Profile' width={5} height={5} color={theme.colors.blue[5]} />
        </SvgBox>
      </FlexBox>
    </FlexBox>
  )
}

const MyParticipationCard = () => {
  const theme = useMantineTheme()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { profile, daoGroups } = useAppSelector(getEntityById(entityId))
  const daoGroupsArr = Object.values(daoGroups ?? {})

  return (
    <Card
      icon={<Image src={IconUserCheck} alt='UserCheck' width={5} height={5} color={theme.colors.blue[5]} />}
      title='My Participation'
      columns={1}
      items={
        <>
          <FlexBox width='100%' $alignItems='center' $justifyContent='space-between'>
            <Typography size='md'>{profile?.name}</Typography>

            <FlexBox $gap={2}>
              <SvgBox
                width='40px'
                height='40px'
                background='#F7F8F9'
                $borderRadius='8px'
                $svgWidth={5}
                $svgHeight={5}
                color={theme.colors.blue[5]}
                $justifyContent='center'
                $alignItems='center'
              >
                <Image src={IconProfile} alt='Profile' width={5} height={5} color={theme.colors.blue[5]} />
              </SvgBox>
              <SvgBox
                width='40px'
                height='40px'
                background='#F7F8F9'
                $borderRadius='8px'
                $svgWidth={5}
                $svgHeight={5}
                color={theme.colors.blue[5]}
                $justifyContent='center'
                $alignItems='center'
              >
                <Image src={IconUserAstronaut} alt='UserAstronaut' width={5} height={5} color={theme.colors.blue[5]} />
              </SvgBox>
              <SvgBox
                width='40px'
                height='40px'
                background='#F7F8F9'
                $borderRadius='8px'
                $svgWidth={5}
                $svgHeight={5}
                color={theme.colors.blue[5]}
                $justifyContent='center'
                $alignItems='center'
              >
                <Image src={IconUserNinja} alt='UserNinja' width={5} height={5} color={theme.colors.blue[5]} />
              </SvgBox>
            </FlexBox>
          </FlexBox>

          <FlexBox width='100%' height='1px' background={'#EAEAEA'} />

          {daoGroupsArr.map((daoGroup) => (
            <DAOGroupItem key={daoGroup.coreAddress} address={daoGroup.coreAddress} />
          ))}
        </>
      }
    />
  )
}

export default MyParticipationCard
