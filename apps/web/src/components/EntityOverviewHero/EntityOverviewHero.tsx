import { Flex, Title } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import classes from './EntityOverviewHero.module.css'

const EntityOverviewHero = () => {
  const { entityId = '' } = useParams()
  const { profile } = useAppSelector(getEntityById(entityId))

  return (
    <Flex w='100%' direction={'column'}>
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
    </Flex>
  )
}

export default EntityOverviewHero
