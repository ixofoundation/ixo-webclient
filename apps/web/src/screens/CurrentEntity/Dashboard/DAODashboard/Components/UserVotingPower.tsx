import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useMemo } from 'react'
import PieChart from 'components/Widgets/PieChart'
import { useAccount } from 'hooks/account'
import { useMantineTheme } from '@mantine/core'
import { useCurrentEntityDAOGroup } from 'hooks/currentEntity'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useParams } from 'react-router-dom'

interface Props {
  show?: boolean
  coreAddress: string
  userAddress?: string
}

const UserVotingPower: React.FC<Props> = ({ show, coreAddress, userAddress }) => {
  const theme = useMantineTheme()
  const { address } = useAccount()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { daoGroups = {} } = useAppSelector(getEntityById(entityId))
  const { daoGroup } = useCurrentEntityDAOGroup(coreAddress, daoGroups)

  const isParticipating = useMemo(() => {
    return daoGroup.votingModule.members.some(({ addr }) => addr === (userAddress || address))
  }, [daoGroup.votingModule.members, address, userAddress])

  const userVotingPower = useMemo(() => {
    const totalWeight = daoGroup.votingModule.totalWeight
    const userWeight =
      daoGroup.votingModule.members.find((member) => member.addr === (userAddress || address))?.weight ?? 0

    const userVotingPower = userWeight / totalWeight
    return userVotingPower
  }, [userAddress, address, daoGroup])

  return show ? (
    <>
      {isParticipating ? (
        <FlexBox width='100%'>
          <PieChart
            data={[
              { name: 'Rest Voting Power', value: 1 - userVotingPower, color: theme.ixoDarkBlue },
              { name: 'My Voting Power', value: userVotingPower, color: theme.ixoNewBlue },
            ]}
            descriptor={
              <FlexBox $direction='column' $alignItems='center'>
                <Typography variant='secondary' size='3xl' weight='bold'>
                  {new Intl.NumberFormat('en-us', {
                    style: 'percent',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }).format(userVotingPower)}
                </Typography>
                <Typography size='sm'>voting power</Typography>
              </FlexBox>
            }
          />
        </FlexBox>
      ) : (
        <>
          <Typography variant='secondary' size='2xl' color='dark-blue'>
            You’re not part of this membership group.
          </Typography>
          {/* <Button
            variant='secondary'
            size='flex'
            height={40}
            textSize='base'
            textTransform='capitalize'
            textWeight='medium'
          >
            Apply
          </Button> */}
        </>
      )}
    </>
  ) : null
}

export default UserVotingPower
