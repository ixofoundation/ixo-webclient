import ThreeDot from 'assets/icons/ThreeDot'
import { Box, FlexBox, TableBodyItem, TableRow, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import styled from 'styled-components'
import { truncateString } from 'utils/formatters'
import { MemberDetailCard } from '../MemberDetailCard'

const Wrapper = styled(TableRow)`
  &:hover {
    outline-color: ${(props) => props.theme.ixoNewBlue};
    background: linear-gradient(180deg, #01273a 0%, #002d42 100%);

    & #three_dot {
      visibility: visible;
    }
  }
`

const DetailButton = styled.span`
  visibility: hidden;
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  transition: all 0.2s;
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

const MemberListItem: React.FC<Props> = ({ member }): JSX.Element => {
  const { avatar, name, address, votingPower, staking, votes, proposals } = member
  const [detailView, setDetailView] = useState(false)

  return (
    <Wrapper
      height={'66px'}
      borderRadius='12px'
      background={'transparent'}
      cursor='pointer'
      outlineWidth='2px'
      outlineStyle='solid'
      outlineColor={'transparent'}
      transition='all .2s'
      position='relative'
      px={8}
      py={1}
    >
      <TableBodyItem>
        <FlexBox alignItems='center' gap={5} marginLeft={8}>
          <Box
            background={`url(${avatar}), ${theme.ixoGrey500}`}
            width='50px'
            height='50px'
            backgroundSize='contain'
            borderRadius='100%'
            borderColor='white'
            borderWidth='2px'
            borderStyle='solid'
          />
          <Typography color='white' size='lg' weight='medium'>
            {truncateString(name ?? address, 20)}
          </Typography>
        </FlexBox>
      </TableBodyItem>
      <TableBodyItem>
        <Typography color='white' size='lg' weight='medium'>
          {votingPower} %
        </Typography>
      </TableBodyItem>
      <TableBodyItem>
        <Typography color='white' size='lg' weight='medium'>
          {new Intl.NumberFormat(undefined, {
            notation: 'compact',
            compactDisplay: 'short',
            minimumFractionDigits: 2,
          })
            .format(staking)
            .replace(/\D00$/, '')}
        </Typography>
      </TableBodyItem>
      <TableBodyItem>
        <Typography color='white' size='lg' weight='medium'>
          {votes}
        </Typography>
      </TableBodyItem>
      <TableBodyItem>
        <Typography color='white' size='lg' weight='medium'>
          {proposals}
        </Typography>
      </TableBodyItem>

      <TableBodyItem>
        <DetailButton id='three_dot' onClick={() => setDetailView(true)}>
          <ThreeDot />
        </DetailButton>
        {detailView && (
          <Box position='absolute' top='0px' right='0px' zIndex={100}>
            <MemberDetailCard member={member} onClose={() => setDetailView(false)} />
          </Box>
        )}
      </TableBodyItem>
    </Wrapper>
  )
}

export default MemberListItem
