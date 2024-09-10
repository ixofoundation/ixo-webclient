import React from 'react'
import { Card } from '../../../../Components'
import { Box, FlexBox, GridContainer, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'

import FundingIcon from 'assets/images/icon-funding.svg'

import CaretUpIcon from 'assets/images/icon-caret-up.svg'
import { useTheme } from 'styled-components'

interface Props {
  daoId: string
  groupAddresses: string[]
}

const TreasuryPool: React.FC<Props> = ({ daoId, groupAddresses }): JSX.Element => {
  const theme: any = useTheme()
  const totalCw20Balances = 0

  return (
    <Card icon={<FundingIcon />} label='Treasury Accounts'>
      <FlexBox width='100%' $alignItems='center' $direction='column' $gap={1}>
        <Box position='relative'>
          <Typography color='blue' size='5xl'>
            {new Intl.NumberFormat(undefined, {
              notation: 'compact',
              compactDisplay: 'short',
              minimumFractionDigits: 2,
              currency: 'USD',
              style: 'currency',
            })
              .format(totalCw20Balances)
              .replace(/\D00$/, '')}
          </Typography>
          <FlexBox position='absolute' top='50%' left='100%' transform='translate(0.5rem, -50%)' $alignItems='center'>
            <Typography color='green'>
              {new Intl.NumberFormat('en-US', {
                signDisplay: 'exceptZero',
              }).format(0)}
              %
            </Typography>
            <SvgBox color={theme.ixoGreen} $svgWidth={5} $svgHeight={5}>
              <CaretUpIcon />
            </SvgBox>
          </FlexBox>
        </Box>
        <Typography variant='secondary' color='white'>
          Treasury Assets
        </Typography>
        <FlexBox $gap={2.5} mt={2}>
          {[].map((asset: any) => (
            <img key={asset.name} width={24} height={24} src={asset.logoUrl} alt={asset.name} />
          ))}
        </FlexBox>
      </FlexBox>

      <FlexBox width='100%' $direction='column' $alignItems='center' $gap={2}>
        <GridContainer width='100%' columns={3} $gridGap={5}>
          <FlexBox
            $borderRadius='4px'
            background='#012131'
            py={5}
            px={2}
            $direction='column'
            $alignItems='center'
            $justifyContent='center'
            $gap={1}
          >
            <Typography size='md' color='blue' weight='bold'>
              Incoming
            </Typography>
            <Typography size='md' color='white' weight='bold'>
              {new Intl.NumberFormat(undefined, {
                notation: 'compact',
                compactDisplay: 'short',
                minimumFractionDigits: 2,
                currency: 'USD',
                style: 'currency',
              })
                .format(245430)
                .replace(/\D00$/, '')}
            </Typography>
          </FlexBox>

          <FlexBox
            $borderRadius='4px'
            background='#012131'
            py={5}
            px={2}
            $direction='column'
            $alignItems='center'
            $justifyContent='center'
            $gap={1}
          >
            <Typography size='md' color='blue' weight='bold'>
              Incoming
            </Typography>
            <Typography size='md' color='white' weight='bold'>
              {new Intl.NumberFormat(undefined, {
                notation: 'compact',
                compactDisplay: 'short',
                minimumFractionDigits: 2,
                currency: 'USD',
                style: 'currency',
              })
                .format(245430)
                .replace(/\D00$/, '')}
            </Typography>
          </FlexBox>

          <FlexBox
            $borderRadius='4px'
            background='#012131'
            py={5}
            px={2}
            $direction='column'
            $alignItems='center'
            $justifyContent='center'
            $gap={1}
          >
            <Typography size='md' color='blue' weight='bold'>
              Pending Approval
            </Typography>
            <Typography size='md' color='white' weight='bold'>
              {new Intl.NumberFormat(undefined, {
                notation: 'compact',
                compactDisplay: 'short',
                minimumFractionDigits: 2,
                currency: 'USD',
                style: 'currency',
              })
                .format(245430)
                .replace(/\D00$/, '')}
            </Typography>
          </FlexBox>
        </GridContainer>
      </FlexBox>
    </Card>
  )
}

export default TreasuryPool
