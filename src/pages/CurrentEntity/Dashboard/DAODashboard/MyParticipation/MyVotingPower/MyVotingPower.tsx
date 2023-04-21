import { FlexBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useCurrentDaoGroup } from 'hooks/currentDao'
import { Button } from 'pages/CreateEntity/Components'
import React from 'react'
import PieChart from 'components/Widgets/PieChart/PieChart'

interface Props {
  show?: boolean
  coreAddress: string
}

const MyVotingPower: React.FC<Props> = ({ show, coreAddress }) => {
  const { isParticipating, myVotingPower } = useCurrentDaoGroup(coreAddress)

  return show ? (
    <>
      {isParticipating ? (
        <FlexBox width='100%'>
          <PieChart
            data={[
              { name: 'Rest Voting Power', value: 1 - myVotingPower, color: theme.ixoDarkBlue },
              { name: 'My Voting Power', value: myVotingPower, color: theme.ixoNewBlue },
            ]}
            descriptor={
              <FlexBox direction='column' alignItems='center'>
                <Typography variant='secondary' size='3xl' weight='bold'>
                  {new Intl.NumberFormat('en-us', {
                    style: 'percent',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }).format(myVotingPower ?? 0)}
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
      )}
    </>
  ) : null
}

export default MyVotingPower
