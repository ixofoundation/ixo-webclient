import { Box, FlexBox, GridContainer, SvgBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import styled from 'styled-components'
import CopyToClipboard from 'react-copy-to-clipboard'
import { ReactComponent as PieIcon } from 'assets/images/icon-pie.svg'
import { ReactComponent as ClaimIcon } from 'assets/images/icon-claim.svg'
import { ReactComponent as MultisigIcon } from 'assets/images/icon-multisig.svg'
import { ReactComponent as PaperIcon } from 'assets/images/icon-paper.svg'
import ThreeDot from 'assets/icons/ThreeDot'
import * as Toast from 'utils/toast'
import { truncateString } from 'utils/formatters'
import { STATUSES } from '../../Toolbar/Toolbar'
import { MemberDetailCard } from '../MemberDetailCard'

const Wrapper = styled(FlexBox)`
  &:hover {
    border-color: ${(props) => props.theme.ixoLightBlue};

    & > #three_dot {
      visibility: visible;
    }
  }
`

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
}

const MemberCard: React.FC<Props> = ({ member }): JSX.Element => {
  const { avatar, name, address, role, status, votingPower, staking, votes, proposals } = member
  const [detailView, setDetailView] = useState(false)

  const handleMemberClick = () => {
    console.log('handleMemberClick', "history.push('somewhere')")
  }

  return !detailView ? (
    <Wrapper
      minWidth='240px'
      width='100%'
      height={'320px'}
      direction='column'
      alignItems='center'
      justifyContent='space-between'
      borderRadius='12px'
      padding={6}
      background={'linear-gradient(180deg, #01273A 0%, #002D42 100%)'}
      cursor='pointer'
      borderWidth='2px'
      borderStyle='solid'
      borderColor={theme.ixoDarkBlue}
      transition='all .2s'
      position='relative'
      onClick={handleMemberClick}
    >
      <Box
        position='absolute'
        top='20px'
        left='20px'
        borderRadius='100%'
        width='12px'
        height='12px'
        background={STATUSES[status].color}
      />
      <Box
        id='three_dot'
        visibility='hidden'
        position='absolute'
        top={'16px'}
        right={'16px'}
        transition='all .2s'
        onClick={(event) => {
          setDetailView(true)
          event.stopPropagation()
        }}
      >
        <ThreeDot />
      </Box>

      <Box
        background={`url(${avatar}), ${theme.ixoGrey500}`}
        width='100px'
        height='100px'
        backgroundSize='contain'
        borderRadius='100%'
        borderColor='white'
        borderWidth='2px'
        borderStyle='solid'
      />

      <FlexBox direction='column' gap={2} width='100%' alignItems='center'>
        <CopyToClipboard text={address} onCopy={() => Toast.successToast(`Copied to clipboard`)}>
          <Typography
            size='lg'
            color='white'
            weight='medium'
            hover={{ underline: true }}
            title='Click to Copy'
            onClick={(event) => event.stopPropagation()}
          >
            {truncateString(name ?? address, 20)}
          </Typography>
        </CopyToClipboard>
        <Typography size='sm' color='light-blue' weight='medium'>
          {role}
        </Typography>
      </FlexBox>

      <GridContainer columns={2} columnGap={2} rowGap={2} width='100%'>
        <FlexBox alignItems='center' gap={2} lineHeight='0px'>
          <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoLightBlue}>
            <ClaimIcon />
          </SvgBox>
          <Typography size='sm' color='white' weight='medium'>
            {votingPower}%
          </Typography>
        </FlexBox>

        <FlexBox alignItems='center' gap={2} lineHeight='0px'>
          <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoLightBlue}>
            <PieIcon />
          </SvgBox>
          <Typography size='sm' color='white' weight='medium'>
            {new Intl.NumberFormat(undefined, {
              notation: 'compact',
              compactDisplay: 'short',
              minimumFractionDigits: 2,
            })
              .format(staking)
              .replace(/\D00$/, '')}
          </Typography>
        </FlexBox>

        <FlexBox alignItems='center' gap={2} lineHeight='0px'>
          <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoLightBlue}>
            <MultisigIcon />
          </SvgBox>
          <Typography size='sm' color='white' weight='medium'>
            {votes}
          </Typography>
        </FlexBox>

        <FlexBox alignItems='center' gap={2} lineHeight='0px'>
          <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoLightBlue}>
            <PaperIcon />
          </SvgBox>
          <Typography size='sm' color='white' weight='medium'>
            {proposals}
          </Typography>
        </FlexBox>
      </GridContainer>
    </Wrapper>
  ) : (
    <MemberDetailCard member={member} onClose={() => setDetailView(false)} />
  )
}

export default MemberCard
