import { Box, FlexBox, SvgBox, theme } from 'components/App/App.styles'
import React from 'react'
import { Card } from '../Components'
import { Typography } from 'components/Typography'
import { ReactComponent as ProfileIcon } from 'assets/images/icon-profile.svg'
import { ReactComponent as CaretUpIcon } from 'assets/images/icon-caret-up.svg'

interface Props {
  tbd?: any
}

const Membership: React.FC<Props> = (): JSX.Element => {
  return (
    <Card icon={<ProfileIcon />} label='Membership'>
      <FlexBox width='100%' alignItems='center' direction='column' gap={1}>
        <Box position='relative'>
          <Typography color='blue' size='5xl'>
            {(1204).toLocaleString()}
          </Typography>
          <FlexBox position='absolute' top='50%' left='100%' transform='translate(0.5rem, -50%)' alignItems='center'>
            <Typography color='green'>+0.14%</Typography>
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
              {(1023).toLocaleString()} Approved
            </Typography>
          </FlexBox>
          <FlexBox alignItems='center' gap={5}>
            <Box borderRadius='100%' width='12px' height='12px' background={theme.ixoNewBlue} />
            <Typography variant='secondary' color='white'>
              {(123).toLocaleString()} Pending
            </Typography>
          </FlexBox>
          <FlexBox alignItems='center' gap={5}>
            <Box borderRadius='100%' width='12px' height='12px' background={theme.ixoRed} />
            <Typography variant='secondary' color='white'>
              {(58).toLocaleString()} Inactive
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Card>
  )
}

export default Membership
