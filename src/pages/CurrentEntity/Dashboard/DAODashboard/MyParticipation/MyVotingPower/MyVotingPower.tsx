import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import { useCurrentDaoGroup } from 'hooks/currentDao'
import { Button } from 'pages/CreateEntity/Components'
import React, { useMemo } from 'react'

interface Props {
  coreAddress: string
}

const MyVotingPower: React.FC<Props> = ({ coreAddress }) => {
  const { address } = useAccount()
  const { daoGroup } = useCurrentDaoGroup(coreAddress)

  const isParticipating = useMemo(
    () => daoGroup.votingModule.members.some(({ addr }) => addr === address),
    [daoGroup.votingModule.members, address],
  )

  return (
    <>
      {isParticipating ? (
        <FlexBox>asd</FlexBox>
      ) : (
        <Typography variant='secondary' size='2xl' color='dark-blue'>
          You’re not part of this membership group.
        </Typography>
      )}
      <Button
        variant='secondary'
        size='flex'
        height={40}
        textSize='base'
        textTransform='capitalize'
        textWeight='medium'
      >
        Apply
      </Button>
    </>
  )
}

export default MyVotingPower
