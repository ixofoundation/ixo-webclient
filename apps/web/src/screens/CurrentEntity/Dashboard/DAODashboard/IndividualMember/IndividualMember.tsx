import Image from 'next/image'
import clxs from 'classnames'
import { Typography } from 'components/Typography'
import { useQuery } from 'hooks/window'
import React, { useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AssetDetailCard, Card } from '../../../Components'
import { Groups, UserStakes, UserVotingPower, UserProposals } from '../Components'
import { truncateString } from 'utils/formatters'
import CopyToClipboard from 'react-copy-to-clipboard'
import * as Toast from 'utils/toast'
import { Flex, Grid, useMantineTheme } from '@mantine/core'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'
import { IconPie } from 'components/IconPaths'
import { IconStakes } from 'components/IconPaths'
import { IconArrowLeft } from 'components/IconPaths'
import { IconProposals } from 'components/IconPaths'
import { IconCopy } from 'components/IconPaths'

const IndividualMember: React.FC = () => {
  const theme = useMantineTheme()
  const { address = '', entityId = '' } = useParams<{ address: string; entityId: string }>()
  const navigate = useNavigate()
  const { state, pathname } = useLocation()
  const { daoGroups = {}, verificationMethod } = useAppSelector(getEntityById(entityId))
  const { getQuery } = useQuery()
  const token: string | undefined = getQuery('token')
  const expand: string | undefined = getQuery('expand')
  const selectedGroup = getQuery('selectedGroup')
  const selectedDAOGroup = daoGroups[selectedGroup]
  const tokenDetail: any = state

  const daoController: string = useMemo(
    () =>
      Object.values(daoGroups)
        .map((v) => v.coreAddress)
        .find((addr) => verificationMethod.some((v) => v.id.includes(addr))) || '',
    [daoGroups, verificationMethod],
  )

  return (
    <Flex direction='column' gap={6} w='100%' color='white'>
      <Groups daoController={daoController} entityId={entityId} />

      {selectedDAOGroup && (
        <>
          <Typography variant='secondary' size='4xl' weight='normal' color='white'>
            {selectedDAOGroup.config.name}
          </Typography>
          <Flex align='center' gap={2}>
            <Typography variant='secondary' size='2xl' weight='normal' color='dark-blue'>
              {truncateString(address, 20, 'middle')}
            </Typography>
            <CopyToClipboard text={address} onCopy={() => Toast.successToast(null, `Copied to clipboard`)}>
              <Image src={IconCopy} alt='Copy' width={5} height={5} color={theme.colors.blue[5]} />
            </CopyToClipboard>
          </Flex>

          {/* expand === 'token' */}
          {selectedDAOGroup.type === 'staking' && (
            <Card
              className={clxs({ 'd-none': expand !== 'token' })}
              icon={IconStakes}
              label='Stakes'
              actionIcon={
                <Image src={IconArrowLeft} alt='ArrowLeft' width={5} height={5} color={theme.colors.blue[5]} />
              }
              onAction={() => navigate(-1)}
            >
              <UserStakes show={expand === 'token'} coreAddress={selectedDAOGroup.coreAddress} userAddress={address} />
            </Card>
          )}
          {/* expand === 'votingPower' */}
          {selectedDAOGroup.type === 'membership' && (
            <Card
              className={clxs({ 'd-none': expand !== 'votingPower' })}
              icon={IconPie}
              label='Voting Power'
              actionIcon={
                <Image src={IconArrowLeft} alt='ArrowLeft' width={5} height={5} color={theme.colors.blue[5]} />
              }
              onAction={() => navigate(-1)}
            >
              <UserVotingPower
                show={expand === 'votingPower'}
                coreAddress={selectedDAOGroup.coreAddress}
                userAddress={address}
              />
            </Card>
          )}
          {/* expand === 'proposal' */}
          <Card
            className={clxs({ 'd-none': expand !== 'proposal' })}
            icon={IconProposals}
            label='Proposals'
            actionIcon={<Image src={IconArrowLeft} alt='ArrowLeft' width={5} height={5} color={theme.colors.blue[5]} />}
            onAction={() => navigate(-1)}
          >
            <UserProposals
              show={expand === 'proposal'}
              coreAddress={selectedDAOGroup.coreAddress}
              userAddress={address}
            />
          </Card>
          {/* token && tokenDetail */}
          {selectedDAOGroup.type === 'staking' && (
            <AssetDetailCard show={token && tokenDetail} {...tokenDetail} userAddress={address} />
          )}
          {/* !expand && !token */}
          <Grid className={clxs({ 'd-none': expand || token })} columns={4} gutter={6} w='100%'>
            <Grid.Col span={6}>
              {selectedDAOGroup.type === 'staking' && (
                <Card
                  icon={IconStakes}
                  label='Stakes'
                  onAction={() => navigate({ pathname: pathname, search: `?expand=token` })}
                >
                  <UserStakes
                    show={!expand && !token}
                    coreAddress={selectedDAOGroup.coreAddress}
                    userAddress={address}
                  />
                </Card>
              )}

              {selectedDAOGroup.type === 'membership' && (
                <Card
                  icon={IconPie}
                  label='Voting Power'
                  onAction={() => navigate({ pathname: pathname, search: `?expand=votingPower` })}
                >
                  <UserVotingPower
                    show={!expand && !token}
                    coreAddress={selectedDAOGroup.coreAddress}
                    userAddress={address}
                  />
                </Card>
              )}
            </Grid.Col>
            <Grid.Col span={6}>
              <Card
                icon={IconProposals}
                label='Proposals'
                onAction={() => navigate({ pathname: pathname, search: `?expand=proposal` })}
              >
                <UserProposals
                  show={!expand && !token}
                  coreAddress={selectedDAOGroup.coreAddress}
                  userAddress={address}
                  full={false}
                />
              </Card>
            </Grid.Col>
            {/* <GridItem $gridArea='c'>
              <UserActivity />
            </Grid.Col> */}
          </Grid>
        </>
      )}
    </Flex>
  )
}

export default IndividualMember
