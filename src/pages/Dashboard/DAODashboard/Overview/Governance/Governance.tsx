import React from 'react'
import { Card } from '../Components'
import { Box, FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { ReactComponent as GovernanceIcon } from 'assets/images/icon-governance.svg'
import { ReactComponent as SandClockIcon } from 'assets/images/icon-sandclock-fill.svg'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'

interface Props {
  tbd?: any
}

const Governance: React.FC<Props> = (): JSX.Element => {
  return (
    <Card icon={<GovernanceIcon />} label='Governance'>
      <FlexBox width='100%' direction='column' alignItems='center' gap={1}>
        <Typography color='blue' size='5xl'>
          {(3).toLocaleString()}
        </Typography>
        <Typography color='white'>Open Proposals</Typography>
      </FlexBox>

      <FlexBox direction='column' alignItems='center' width='100%' gap={2}>
        <FlexBox borderRadius='4px' background='#012131' gap={2} p={4} direction='column' width='100%'>
          <FlexBox alignItems='center' gap={2.5}>
            <Box>
              <FlexBox
                borderRadius='4px'
                background='#033C50'
                justifyContent='center'
                alignItems='center'
                minWidth='32px'
                height='32px'
              >
                <Typography color='blue' size='md'>
                  #{5}
                </Typography>
              </FlexBox>
            </Box>
            <Typography color='blue' weight='bold' size='md'>
              Next up
            </Typography>
          </FlexBox>

          <Box mb={3}>
            <Typography size='sm' color='white'>
              Extend the project end-date to Sep 2020
            </Typography>
          </Box>

          <FlexBox width='100%' gap={3} alignItems='center'>
            <SvgBox color={theme.ixoNewBlue}>
              <SandClockIcon />
            </SvgBox>
            <ProgressBar
              height={8}
              total={100}
              approved={50}
              rejected={0}
              activeBarColor={theme.ixoNewBlue}
              barColor={theme.ixoDarkBlue}
            />
          </FlexBox>
        </FlexBox>
        <FlexBox>
          <Typography size='sm' color='dark-blue'>
            <Typography size='sm' weight='bold' color='blue'>
              5d 6h 23m
            </Typography>{' '}
            before voting closes
          </Typography>
        </FlexBox>
      </FlexBox>
    </Card>
  )
}

export default Governance
