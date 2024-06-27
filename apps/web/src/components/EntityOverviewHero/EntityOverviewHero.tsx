import { Avatar, Box, Flex, Image, Text, Title, rem } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import classes from './EntityOverviewHero.module.css'
import { LiaCalendarAltSolid } from 'react-icons/lia'
import moment from 'moment'
import { ReactNode } from 'react'
import { getFlagURL } from 'utils/countries'
import { getCountryName } from 'utils/formatters'

type EntityOverviewHeroAttributeProps = {
  image?: string
  icon?: ReactNode
  avatar?: string
  text?: string
}

const EntityOverviewHeroAttribute = ({ image, icon, text, avatar }: EntityOverviewHeroAttributeProps) => {
  if (!image && !icon && !text && !avatar) return null

  return (
    <Flex align='center' gap={10}>
      {avatar && <Avatar src={avatar} bg='transparent' />}
      {image && <Image radius={4} h={14} w={22} src={image} />}
      {icon && icon}
      {text && <Text fw='bold'>{text}</Text>}
    </Flex>
  )
}

const EntityOverviewHero = () => {
  const { entityId = '' } = useParams()
  const { profile, startDate, creator } = useAppSelector(getEntityById(entityId))

  return (
    <Flex w='100%' direction={"column"}>
      <Flex
        w='100%'
        h='125px'
        style={{ backgroundImage: `url(${profile?.image || ''})` }}
        className={classes.entityOverviewHero}
      >
        <Flex w='100%' className={classes.overlay}>
          <Flex w='100%'>
            <Title ml={80} className={classes.title}>
              {profile?.name}
            </Title>
          </Flex>
        </Flex>
      </Flex>
      <Box ml={80}>
        <Text pt={20} c='#7b8285'>
          {profile?.description}
        </Text>
        <Flex gap={80} pt={20}>
          <EntityOverviewHeroAttribute avatar={creator?.logo} text={creator?.displayName} />
          <EntityOverviewHeroAttribute
            icon={<LiaCalendarAltSolid fill='#A5ADB0' style={{ width: rem(24), height: rem(24) }} />}
            text={startDate ? moment(`${startDate}`).format('DD MMM ‘YYYY') : undefined}
          />
          <EntityOverviewHeroAttribute text={getCountryName(profile?.location)} image={getFlagURL(profile?.location)} />
        </Flex>
      </Box>
    </Flex>
  )
}

export default EntityOverviewHero
