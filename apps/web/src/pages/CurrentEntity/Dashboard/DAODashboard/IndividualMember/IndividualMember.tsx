import clxs from 'classnames'
import { FlexBox, GridContainer, GridItem, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useQuery } from 'hooks/window'
import React, { useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AssetDetailCard, Card } from '../../../Components'
import { Groups, UserStakes, UserVotingPower, UserProposals } from '../Components'
import ArrowLeftIcon from 'assets/images/icon-arrow-left.svg'
import StakesIcon from 'assets/images/icon-stakes.svg'
import ProposalsIcon from 'assets/images/icon-proposals.svg'
import PieIcon from 'assets/images/icon-pie.svg'
import { truncateString } from 'utils/formatters'
import CopyToClipboard from 'react-copy-to-clipboard'
import CopyIcon from 'assets/images/icon-copy.svg'
import * as Toast from 'utils/toast'
import { useTheme } from 'styled-components'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'

const IndividualMember: React.FC = () => {
  const theme: any = useTheme()
  const { address = '', entityId = '' } = useParams<{ address: string, entityId: string }>()
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
    <FlexBox $direction='column' $gap={6} width='100%' color='white'>
      <Groups daoController={daoController} entityId={entityId}/>

      {selectedDAOGroup && (
        <>
          <Typography variant='secondary' size='4xl' weight='normal' color='white'>
            {selectedDAOGroup.config.name}
          </Typography>
          <FlexBox $alignItems='center' $gap={2}>
            <Typography variant='secondary' size='2xl' weight='normal' color='dark-blue'>
              {truncateString(address, 20, 'middle')}
            </Typography>
            <CopyToClipboard text={address} onCopy={() => Toast.successToast(null, `Copied to clipboard`)}>
              <SvgBox color={theme.ixoDarkBlue} cursor='pointer' hover={{ color: theme.ixoNewBlue }}>
                <CopyIcon />
              </SvgBox>
            </CopyToClipboard>
          </FlexBox>

          {/* expand === 'token' */}
          {selectedDAOGroup.type === 'staking' && (
            <Card
              className={clxs({ 'd-none': expand !== 'token' })}
              icon={<StakesIcon />}
              label='Stakes'
              actionIcon={<ArrowLeftIcon />}
              onAction={() => navigate(-1)}
            >
              <UserStakes show={expand === 'token'} coreAddress={selectedDAOGroup.coreAddress} userAddress={address} />
            </Card>
          )}
          {/* expand === 'votingPower' */}
          {selectedDAOGroup.type === 'membership' && (
            <Card
              className={clxs({ 'd-none': expand !== 'votingPower' })}
              icon={<PieIcon />}
              label='Voting Power'
              actionIcon={<ArrowLeftIcon />}
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
            icon={<ProposalsIcon />}
            label='Proposals'
            actionIcon={<ArrowLeftIcon />}
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
          <GridContainer
            className={clxs({ 'd-none': expand || token })}
            $gridTemplateAreas={`"a a b b"`}
            $gridTemplateColumns={'1fr 1fr 1fr 1fr'}
            $gridTemplateRows={'repeat(1, minmax(330px, auto))'}
            $gridGap={6}
            width='100%'
          >
            <GridItem $gridArea='a'>
              {selectedDAOGroup.type === 'staking' && (
                <Card
                  icon={<StakesIcon />}
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
                  icon={<PieIcon />}
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
            </GridItem>
            <GridItem $gridArea='b'>
              <Card
                icon={<ProposalsIcon />}
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
            </GridItem>
            {/* <GridItem $gridArea='c'>
              <UserActivity />
            </GridItem> */}
          </GridContainer>
        </>
      )}
    </FlexBox>
  )
}

export default IndividualMember
