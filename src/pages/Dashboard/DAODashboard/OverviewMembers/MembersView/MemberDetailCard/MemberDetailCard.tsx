import { Box, FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useEffect, useState } from 'react'
import { ReactComponent as ProfileIcon } from 'assets/images/icon-profile.svg'
import { ReactComponent as TimesIcon } from 'assets/images/icon-times.svg'
import { Button, RangeInput, Switch } from 'pages/CreateEntity/Components'

interface Props {
  member: {
    avatar?: string
    name?: string
    address: string
    role: string
    votingPower: number
    staking: number
    votes: number
    proposals: number
    status: 'approved' | 'pending' | 'rejected'
    verified: boolean
    administrator: boolean
    assignedAuthority: number
  }
  onClose: () => void
}

const MemberDetailCard: React.FC<Props> = ({ member, onClose }): JSX.Element => {
  const [status, setStatus] = useState(member.status)
  const [verified, setVerified] = useState(member.verified)
  const [administrator, setAdministrator] = useState(member.administrator)
  const [assignedAuthority, setAssignedAuthority] = useState(member.assignedAuthority)
  const [votingPower, setVotingPower] = useState(member.votingPower)

  useEffect(() => {
    setStatus(member.status)
  }, [member.status])
  useEffect(() => {
    setVerified(member.verified)
  }, [member.verified])
  useEffect(() => {
    setAdministrator(member.administrator)
  }, [member.administrator])
  useEffect(() => {
    setAssignedAuthority(member.assignedAuthority)
  }, [member.assignedAuthority])
  useEffect(() => {
    setVotingPower(member.votingPower)
  }, [member.votingPower])

  const handleSign = (): void => {
    //
  }

  return (
    <FlexBox
      minWidth='240px'
      width='100%'
      height='320px'
      padding={5}
      direction={'column'}
      justifyContent={'space-between'}
      gap={4.5}
      background='white'
      borderRadius='12px'
      borderWidth='2px'
      borderStyle='solid'
      borderColor='white'
    >
      <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
        <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoNewBlue}>
          <ProfileIcon />
        </SvgBox>

        <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoBlack} cursor='pointer' onClick={onClose}>
          <TimesIcon />
        </SvgBox>
      </FlexBox>

      <FlexBox direction='column' gap={3} width='100%'>
        <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
          <Typography size='md'>Approved</Typography>
          <Switch
            size='sm'
            value={status === 'approved'}
            onChange={() =>
              setStatus((status) =>
                status === 'rejected' ? 'approved' : status === 'approved' ? 'rejected' : 'rejected',
              )
            }
          />
        </FlexBox>

        <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
          <Typography size='md'>Verified</Typography>
          <Switch size='sm' value={verified} onChange={setVerified} />
        </FlexBox>

        <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
          <Typography size='md'>Administrator</Typography>
          <Switch size='sm' value={administrator} onChange={setAdministrator} />
        </FlexBox>

        <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
          <Typography size='md' color='blue'>
            Remove
          </Typography>
        </FlexBox>

        <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
          <Typography size='md'>Voting Power</Typography>
          <Typography size='md' weight='bold'>
            {votingPower}%
          </Typography>
        </FlexBox>

        <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
          <Typography size='md'>Assigned Authority</Typography>
          <Box borderRadius='6px' background={theme.ixoGrey300} paddingLeft={1.5} paddingRight={1.5}>
            <Typography size='md' weight='bold' color='blue'>
              {assignedAuthority}%
            </Typography>
          </Box>
        </FlexBox>

        <FlexBox width='100%'>
          <RangeInput value={assignedAuthority} onChange={setAssignedAuthority} />
        </FlexBox>
      </FlexBox>

      <FlexBox width='100%'>
        <Button size='sm' onClick={handleSign} style={{ width: '100%' }}>
          <Typography weight='bold' color='white' transform='none'>
            Sign and apply
          </Typography>
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default MemberDetailCard
