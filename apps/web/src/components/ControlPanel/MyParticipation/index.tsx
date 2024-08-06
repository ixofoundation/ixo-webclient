import Image from 'next/image'
import { Flex, useMantineTheme } from '@mantine/core'
import { Typography } from 'components/Typography'
import { Card } from '../Card'
import { useCurrentEntityDAOGroup } from 'hooks/currentEntity'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'
import { truncate } from 'lodash'
import {
  IconProfile,
  IconUserCheckSolid,
  IconUserNinjaSolid,
  IconUserAstronautSolid,
  IconStar,
} from 'components/IconPaths'

const DAOGroupItem: React.FC<{ address: string }> = ({ address }) => {
  const theme = useMantineTheme()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { daoGroups = {} } = useAppSelector(getEntityById(entityId))

  const { daoGroup, myVotingPower } = useCurrentEntityDAOGroup(address, daoGroups)

  return (
    <Flex key={daoGroup.id} w='100%' align='center' justify='space-between'>
      <Flex gap={2}>
        <Typography size='md'>{truncate(daoGroup.config.name, { length: 20 })}</Typography>
        <Typography size='md' color='blue'>
          {Intl.NumberFormat(undefined, { style: 'percent' }).format(myVotingPower)}
        </Typography>
      </Flex>

      <Flex gap={2}>
        <Image src={IconStar} alt='Star' width={5} height={5} color={theme.colors.blue[5]} />
        <Image src={IconProfile} alt='Profile' width={5} height={5} color={theme.colors.blue[5]} />
      </Flex>
    </Flex>
  )
}

const MyParticipationCard = () => {
  const theme = useMantineTheme()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { profile, daoGroups } = useAppSelector(getEntityById(entityId))
  const daoGroupsArr = Object.values(daoGroups ?? {})

  return (
    <Card
      icon={IconUserCheckSolid}
      title='My Participation'
      columns={1}
      items={
        <>
          <Flex w='100%' align='center' justify='space-between'>
            <Typography size='md'>{profile?.name}</Typography>

            <Flex gap={2}>
              <Image src={IconProfile} alt='Profile' width={5} height={5} color={theme.colors.blue[5]} />
              <Image
                src={IconUserAstronautSolid}
                alt='UserAstronaut'
                width={5}
                height={5}
                color={theme.colors.blue[5]}
              />
              <Image src={IconUserNinjaSolid} alt='UserNinja' width={5} height={5} color={theme.colors.blue[5]} />
            </Flex>
          </Flex>

          <Flex w='100%' h='1px' bg='#EAEAEA' />

          {daoGroupsArr.map((daoGroup) => (
            <DAOGroupItem key={daoGroup.coreAddress} address={daoGroup.coreAddress} />
          ))}
        </>
      }
    />
  )
}

export default MyParticipationCard
