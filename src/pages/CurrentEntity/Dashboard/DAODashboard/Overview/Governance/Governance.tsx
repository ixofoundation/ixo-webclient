import React, { useMemo } from 'react'
import { Card } from '../../Components'
import { Box, FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { ReactComponent as GovernanceIcon } from 'assets/images/icon-governance.svg'
import { ReactComponent as SandClockIcon } from 'assets/images/icon-sandclock-fill.svg'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import useCurrentDao from 'hooks/currentDao'
import { expirationAtTimeToSecondsFromNow, secondsToWdhms } from 'utils/conversions'

interface Props {
  daoId: string
  groupAddresses: string[]
}

const Governance: React.FC<Props> = ({ daoId, groupAddresses }): JSX.Element => {
  const { getProposalsByAddresses } = useCurrentDao()
  const proposals = getProposalsByAddresses(groupAddresses)
  const latestProposal = [...proposals].pop()

  const id = latestProposal?.id ?? 0
  const title = latestProposal?.proposal.title
  const description = latestProposal?.proposal.description
  const votingPeriod = (latestProposal?.proposal as any).max_voting_period ?? 0

  const [proposalEndString, secondsFromNow] = useMemo(() => {
    if (!latestProposal?.proposal.expiration) {
      return ['', 0]
    }
    if (latestProposal?.proposal.status !== 'open') {
      return ['Completed', 0]
    }

    if ('at_time' in latestProposal.proposal.expiration) {
      const secondsFromNow = expirationAtTimeToSecondsFromNow(latestProposal.proposal.expiration)
      // Type check, but should never happen.
      if (secondsFromNow === undefined) {
        return ['', 0]
      }

      if (secondsFromNow <= 0) {
        return ['Completed', 0]
      } else {
        return [secondsToWdhms(secondsFromNow), secondsFromNow]
      }
    }
    return ['', 0]
    // Not much we can say about proposals that expire at a block
    // height / never.
  }, [latestProposal?.proposal.expiration, latestProposal?.proposal.status])

  return (
    <Card icon={<GovernanceIcon />} label='Governance'>
      <FlexBox width='100%' direction='column' alignItems='center' gap={1}>
        <Typography color='blue' size='5xl'>
          {proposals.length.toLocaleString()}
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
                  #{id}
                </Typography>
              </FlexBox>
            </Box>
            <Typography color='blue' weight='bold' size='md'>
              {title}
            </Typography>
          </FlexBox>

          <Box mb={3}>
            <Typography size='sm' color='white'>
              {description}
            </Typography>
          </Box>

          <FlexBox width='100%' gap={3} alignItems='center'>
            <SvgBox color={theme.ixoNewBlue}>
              <SandClockIcon />
            </SvgBox>
            <ProgressBar
              height={8}
              total={votingPeriod}
              approved={votingPeriod - secondsFromNow}
              rejected={0}
              activeBarColor={theme.ixoNewBlue}
              barColor={theme.ixoDarkBlue}
            />
          </FlexBox>
        </FlexBox>
        <FlexBox>
          <Typography size='sm' color='dark-blue'>
            <Typography size='sm' weight='bold' color='blue'>
              {proposalEndString}
            </Typography>{' '}
            before voting closes
          </Typography>
        </FlexBox>
      </FlexBox>
    </Card>
  )
}

export default Governance
