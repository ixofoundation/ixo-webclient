import Image from 'next/image'
import { Typography } from 'components/Typography'
import React, { useEffect, useState } from 'react'
import { Button, RangeInput, Switch } from 'screens/CreateEntity/Components'
import { Box, Flex, useMantineTheme } from '@mantine/core'
import { IconTimes } from 'components/IconPaths'
import { IconProfile } from 'components/IconPaths'

interface Props {
  member: {
    avatar?: string
    name?: string
    role?: string
    staking?: number
    votes?: number
    proposals?: number
    status?: 'approved' | 'pending' | 'rejected'
    verified?: boolean
    administrator?: boolean
    assignedAuthority?: number

    addr: string
    weight: number
    votingPower?: number
  }
  onClose: () => void
}

const MemberDetailCard: React.FC<Props> = ({ member, onClose }): JSX.Element => {
  const theme = useMantineTheme()
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
    <Flex
      miw='240px'
      w='100%'
      h='320px'
      p={5}
      direction={'column'}
      justify={'space-between'}
      gap={4.5}
      bg='white'
      style={{ borderRadius: '12px', borderWidth: '2px', borderStyle: 'solid', borderColor: 'white' }}
      onClick={(event) => event.stopPropagation()}
    >
      <Flex w='100%' align='center' justify='space-between'>
        <Image src={IconProfile} alt='Profile' width={5} height={5} color={theme.colors.blue[5]} />
        <Image src={IconTimes} alt='Times' width={5} height={5} color={theme.colors.blue[5]} />
      </Flex>

      <Flex direction='column' gap={3} w='100%'>
        <Flex w='100%' justify='space-between' align='center'>
          <Typography size='md'>Approved</Typography>
          <Switch
            size='sm'
            value={status === 'approved'}
            onChange={() =>
              setStatus((status) => (status === 'rejected' ? 'approved' : status === 'approved' ? 'rejected' : status))
            }
          />
        </Flex>

        <Flex w='100%' justify='space-between' align='center'>
          <Typography size='md'>Verified</Typography>
          <Switch size='sm' value={verified!} onChange={setVerified} />
        </Flex>

        <Flex w='100%' justify='space-between' align='center'>
          <Typography size='md'>Administrator</Typography>
          <Switch size='sm' value={administrator!} onChange={setAdministrator} />
        </Flex>

        <Flex w='100%' justify='space-between' align='center'>
          <Typography size='md' color='blue'>
            Remove
          </Typography>
        </Flex>

        <Flex w='100%' justify='space-between' align='center'>
          <Typography size='md'>Voting Power</Typography>
          <Typography size='md' weight='bold'>
            {new Intl.NumberFormat('en-us', {
              style: 'percent',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }).format(votingPower ?? 0)}
          </Typography>
        </Flex>

        <Flex w='100%' justify='space-between' align='center'>
          <Typography size='md'>Assigned Authority</Typography>
          <Box
            style={{
              borderRadius: '6px',
              background: theme.colors.gray[3],
              paddingLeft: '1.5px',
              paddingRight: '1.5px',
            }}
          >
            <Typography size='md' weight='bold' color='blue'>
              {assignedAuthority ?? 0}%
            </Typography>
          </Box>
        </Flex>

        <Flex w='100%'>
          <RangeInput value={assignedAuthority ?? 0} onChange={setAssignedAuthority} />
        </Flex>
      </Flex>

      <Flex w='100%'>
        <Button size='sm' onClick={handleSign} style={{ width: '100%' }}>
          <Typography weight='bold' color='white' transform='none'>
            Sign and apply
          </Typography>
        </Button>
      </Flex>
    </Flex>
  )
}

export default MemberDetailCard
