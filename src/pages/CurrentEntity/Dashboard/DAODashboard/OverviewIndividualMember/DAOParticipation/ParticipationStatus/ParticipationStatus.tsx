import React, { useState } from 'react'
import { FlexBox, GridContainer, SvgBox } from 'components/App/App.styles'
import { ReactComponent as PieIcon } from 'assets/images/icon-pie.svg'
import { ReactComponent as MultisigIcon } from 'assets/images/icon-multisig.svg'
import { ReactComponent as ClaimIcon } from 'assets/images/icon-claim.svg'
import { ReactComponent as PaperIcon } from 'assets/images/icon-paper.svg'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'

const StatusItem = ({
  icon,
  label,
  value,
}: {
  icon: JSX.Element
  label: string
  value: string | number
}): JSX.Element => {
  const theme: any = useTheme()
  const [hover, setHover] = useState(false)
  return (
    <FlexBox
      alignItems='center'
      justifyContent='space-between'
      cursor='pointer'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <FlexBox alignItems='center' gap={2}>
        <SvgBox color={hover ? theme.ixoNewBlue : theme.ixoDarkBlue} svgWidth={6} svgHeight={6}>
          {icon}
        </SvgBox>
        <Typography size='lg' color={hover ? 'blue' : 'black'}>
          {label}
        </Typography>
      </FlexBox>
      <Typography size='lg' color={hover ? 'blue' : 'black'}>
        {value}
      </Typography>
    </FlexBox>
  )
}

interface Props {
  authority: number
  participationRate: number
  votingPower: number
  proposals: number
}

const ParticipationStatus: React.FC<Props> = ({
  authority,
  participationRate,
  votingPower,
  proposals,
}): JSX.Element => {
  const theme: any = useTheme()
  return (
    <FlexBox
      width='100%'
      background='white'
      borderColor={theme.ixoGrey300}
      borderStyle='solid'
      borderWidth='1px'
      padding={7.5}
      borderRadius='12px'
      direction='column'
      gap={3}
    >
      <Typography weight='medium' size='2xl'>
        Status
      </Typography>

      <GridContainer columns={2} columnGap={25} rowGap={2} width='100%'>
        <StatusItem icon={<PieIcon />} label='Authority' value={authority + '%'} />
        <StatusItem icon={<MultisigIcon />} label='Participation Rate' value={participationRate + '%'} />
        <StatusItem icon={<ClaimIcon />} label='Voting Power' value={votingPower + '%'} />
        <StatusItem icon={<PaperIcon />} label='Proposals Submitted' value={proposals} />
      </GridContainer>
    </FlexBox>
  )
}

export default ParticipationStatus
