import { Box, FlexBox, SvgBox, theme } from 'components/App/App.styles'
import React from 'react'
import { Card } from '../../Components'
import { Typography } from 'components/Typography'
import { ReactComponent as ProfileIcon } from 'assets/images/icon-profile.svg'
import { ReactComponent as CaretUpIcon } from 'assets/images/icon-caret-up.svg'
import useCurrentDao from 'hooks/useCurrentDao'

interface Props {
  groupAddresses?: string[]
}

const Membership: React.FC<Props> = ({ groupAddresses = [] }): JSX.Element => {
  const { getMembersByAddresses } = useCurrentDao()
  const membersByAddresses = getMembersByAddresses(groupAddresses)

  const numOfMembers = membersByAddresses.length
  // TODO:
  const approveds = 0
  const pendings = 0
  const rejecteds = 0
  const dayChanges = 0
  return (
    <Card icon={<ProfileIcon />} label='Membership'>
      <FlexBox width='100%' alignItems='center' direction='column' gap={1}>
        <Box position='relative'>
          <Typography color='blue' size='5xl'>
            {numOfMembers.toLocaleString()}
          </Typography>
          <FlexBox position='absolute' top='50%' left='100%' transform='translate(0.5rem, -50%)' alignItems='center'>
            <Typography color='green'>
              {new Intl.NumberFormat('en-US', {
                signDisplay: 'exceptZero',
              }).format(dayChanges)}
              %
            </Typography>
            <SvgBox color={theme.ixoGreen} svgWidth={5} svgHeight={5}>
              <CaretUpIcon />
            </SvgBox>
          </FlexBox>
        </Box>
        <Typography variant='secondary' color='white'>
          Group Members
        </Typography>
      </FlexBox>

      <FlexBox width='100%' justifyContent='center'>
        <FlexBox direction='column' gap={3}>
          <FlexBox alignItems='center' gap={5}>
            <Box borderRadius='100%' width='12px' height='12px' background={theme.ixoGreen} />
            <Typography variant='secondary' color='white'>
              {approveds.toLocaleString()} Approved
            </Typography>
          </FlexBox>
          <FlexBox alignItems='center' gap={5}>
            <Box borderRadius='100%' width='12px' height='12px' background={theme.ixoNewBlue} />
            <Typography variant='secondary' color='white'>
              {pendings.toLocaleString()} Pending
            </Typography>
          </FlexBox>
          <FlexBox alignItems='center' gap={5}>
            <Box borderRadius='100%' width='12px' height='12px' background={theme.ixoRed} />
            <Typography variant='secondary' color='white'>
              {rejecteds.toLocaleString()} Inactive
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Card>
  )
}

export default Membership
