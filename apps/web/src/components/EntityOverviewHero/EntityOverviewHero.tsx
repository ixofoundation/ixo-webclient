import { Flex, Title } from '@mantine/core'
import { useParams } from 'react-router-dom'
// import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import classes from './EntityOverviewHero.module.css'
import { getEntityById } from 'redux/entities/entities.selectors'

const EntityOverviewHero = () => {
  const { entityId = '' } = useParams()
  const entity = useAppSelector(getEntityById(entityId))
  const image = entity?.profile?.image
  const name = entity?.profile?.name

  return (
    <Flex w='100%' direction={'column'}>
      <Flex
        w='100%'
        h='125px'
        style={{ backgroundImage: `url(${image || ''})` }}
        className={classes.entityOverviewHero}
      >
        <Flex w='100%' className={classes.overlay}>
          <Flex w='100%'>
            <Title ml={80} className={classes.title}>
              {name}
            </Title>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default EntityOverviewHero
