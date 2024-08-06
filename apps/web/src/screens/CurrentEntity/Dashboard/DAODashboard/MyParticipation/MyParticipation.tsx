import Image from 'next/image'
import clsx from 'classnames'
import { Typography } from 'components/Typography'
import { useQuery } from 'hooks/window'
import React, { useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AssetDetailCard, Card } from '../../../Components'
import { Groups, UserStakes, UserVotingPower, UserProposals } from '../Components'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'
import { IconProposals, IconPie, IconStakes, IconArrowLeft } from 'components/IconPaths'
import { Box, Flex, Grid, useMantineTheme } from '@mantine/core'
import { createStyles } from '@mantine/emotion'

const useStyles = createStyles((theme) => ({
  wrapper: {
    color: theme.white,
  },
  hidden: {
    display: 'none',
  },
  icon: {
    width: 20,
    height: 20,
    color: theme.colors.blue[5],
  },
}))

const MyParticipation: React.FC = () => {
  const { classes } = useStyles()
  const theme = useMantineTheme()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const navigate = useNavigate()
  const { state, pathname } = useLocation()
  const { getQuery } = useQuery()
  const token: string | undefined = getQuery('token')
  const expand: string | undefined = getQuery('expand')
  const selectedGroup = getQuery('selectedGroup')
  const tokenDetail: any = state
  const { daoGroups = {}, verificationMethod } = useAppSelector(getEntityById(entityId))
  const selectedDAOGroup = daoGroups[selectedGroup]

  const daoController: string = useMemo(
    () =>
      Object.values(daoGroups)
        .map((v) => v.coreAddress)
        .find((addr) => verificationMethod.some((v) => v.id.includes(addr))) || '',
    [daoGroups, verificationMethod],
  )

  return (
    <Flex direction='column' gap='md' w='100%' className={classes.wrapper}>
      <Groups entityId={entityId} daoController={daoController} />

      {selectedDAOGroup && (
        <>
          <Typography variant='secondary' size='5xl' weight='normal' color='white'>
            {selectedDAOGroup.config.name}
          </Typography>
          <Typography variant='secondary' size='2xl' weight='normal' color='dark-blue'>
            My participation
          </Typography>

          {selectedDAOGroup.type === 'staking' && (
            <Card
              className={clsx({ [classes.hidden]: expand !== 'token' })}
              icon={IconStakes}
              label='My Stakes'
              actionIcon={<Image src={IconArrowLeft} alt='ArrowLeft' className={classes.icon} />}
              onAction={() => navigate(-1)}
            >
              <UserStakes show={expand === 'token'} coreAddress={selectedDAOGroup.coreAddress} />
            </Card>
          )}
          {selectedDAOGroup.type === 'membership' && (
            <Card
              className={clsx({ [classes.hidden]: expand !== 'votingPower' })}
              icon={IconPie}
              label='My Voting Power'
              actionIcon={<Image src={IconArrowLeft} alt='ArrowLeft' className={classes.icon} />}
              onAction={() => navigate(-1)}
            >
              <UserVotingPower show={expand === 'votingPower'} coreAddress={selectedDAOGroup.coreAddress} />
            </Card>
          )}
          <Card
            className={clsx({ [classes.hidden]: expand !== 'proposal' })}
            icon={IconProposals}
            label='My Proposals'
            actionIcon={<Image src={IconArrowLeft} alt='ArrowLeft' className={classes.icon} />}
            onAction={() => navigate(-1)}
          >
            <UserProposals show={expand === 'proposal'} coreAddress={selectedDAOGroup.coreAddress} />
          </Card>
          {selectedDAOGroup.type === 'staking' && <AssetDetailCard show={token && tokenDetail} {...tokenDetail} />}
          <Grid className={clsx({ [classes.hidden]: expand || token })}>
            <Grid.Col span={6}>
              {selectedDAOGroup.type === 'staking' && (
                <Card
                  icon={IconStakes}
                  label='My Stakes'
                  onAction={() => navigate({ pathname: pathname, search: `?expand=token` })}
                >
                  <UserStakes show={!expand && !token} coreAddress={selectedDAOGroup.coreAddress} />
                </Card>
              )}

              {selectedDAOGroup.type === 'membership' && (
                <Card
                  icon={IconPie}
                  label='My Voting Power'
                  onAction={() => navigate({ pathname: pathname, search: `?expand=votingPower` })}
                >
                  <UserVotingPower show={!expand && !token} coreAddress={selectedDAOGroup.coreAddress} />
                </Card>
              )}
            </Grid.Col>
            <Grid.Col span={6}>
              <Card
                icon={IconProposals}
                label='My Proposals'
                onAction={() => navigate({ pathname: pathname, search: `?expand=proposal` })}
              >
                <UserProposals show={!expand && !token} coreAddress={selectedDAOGroup.coreAddress} full={false} />
              </Card>
            </Grid.Col>
          </Grid>
        </>
      )}
    </Flex>
  )
}

export default MyParticipation
