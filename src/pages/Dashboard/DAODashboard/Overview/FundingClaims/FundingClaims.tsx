import React from 'react'
import { Card } from '../../Components'
import { Box, FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { CircleProgressbar } from 'components/Widgets/CircleProgressbar/CircleProgressbar'
import { Typography } from 'components/Typography'
import { ReactComponent as CheckIcon } from 'assets/images/icon-check-in-circle.svg'
import { ReactComponent as ExpandIcon } from 'assets/images/icon-expand.svg'

interface Props {
  tbd?: any
}

const FundingClaims: React.FC<Props> = (): JSX.Element => {
  const StatusBox = ({ color }: { color: string }): JSX.Element => (
    <Box width='12px' height='12px' background={color} borderRadius='100%' />
  )
  return (
    <Card icon={<CheckIcon />} label='Funding Claims'>
      <FlexBox width='100%' alignItems='center' justifyContent='space-between' gap={6} color='white' px={10}>
        <FlexBox direction='column' gap={2} whiteSpace='nowrap'>
          <FlexBox alignItems='center' gap={5}>
            <StatusBox color={theme.approved} />
            <Typography size='md'>
              <Typography weight='bold'>{567}</Typography> claims approved
            </Typography>
          </FlexBox>
          <FlexBox alignItems='center' gap={5}>
            <StatusBox color={theme.pending} />
            <Typography size='md'>
              <Typography weight='bold'>{362}</Typography> claims pending approval
            </Typography>
          </FlexBox>
          <FlexBox alignItems='center' gap={5}>
            <StatusBox color={theme.rejected} />
            <Typography size='md'>
              <Typography weight='bold'>{58}</Typography> claims rejected
            </Typography>
          </FlexBox>
          <FlexBox alignItems='center' gap={5}>
            <StatusBox color={theme.disputed} />
            <Typography size='md'>
              <Typography weight='bold'>{0}</Typography> claims disputed
            </Typography>
          </FlexBox>
          <FlexBox alignItems='center' gap={5}>
            <StatusBox color={theme.remained} />
            <Typography size='md'>
              <Typography weight='bold'>{0}</Typography> claims remaining
            </Typography>
          </FlexBox>

          <FlexBox alignItems='center' justifyContent='space-between' width='100%'>
            <Typography variant='secondary' size='lg'>
              Outcomes Contracts
            </Typography>
            <SvgBox svgWidth={4.5}>
              <ExpandIcon />
            </SvgBox>
          </FlexBox>

          <FlexBox ml={8}>
            <Typography size='md'>
              <Typography weight='bold'>{23}</Typography> Active Contracts
            </Typography>
          </FlexBox>

          <FlexBox ml={8}>
            <Typography size='md'>
              <Typography weight='bold'>{5}</Typography> Completed Contracts
            </Typography>
          </FlexBox>
        </FlexBox>

        <CircleProgressbar
          totalNeeded={1298}
          approved={987}
          pending={100}
          rejected={50}
          result={
            <Typography variant='secondary' size='4xl'>
              <strong>
                {new Intl.NumberFormat(undefined, {
                  notation: 'compact',
                  compactDisplay: 'short',
                  minimumFractionDigits: 2,
                  currency: 'USD',
                  style: 'currency',
                })
                  .format(987)
                  .replace(/\D00$/, '')}
              </strong>
              /
              {new Intl.NumberFormat(undefined, {
                notation: 'compact',
                compactDisplay: 'short',
                minimumFractionDigits: 2,
                currency: 'USD',
                style: 'currency',
              })
                .format(1298)
                .replace(/\D00$/, '')}
            </Typography>
          }
          descriptor={
            <FlexBox direction='column' alignItems='center' gap={1}>
              <Typography size='sm'>payments awarded for</Typography>
              <Typography size='sm' weight='bold'>
                {23} Contracts
              </Typography>
            </FlexBox>
          }
        />
      </FlexBox>
    </Card>
  )
}

export default FundingClaims
