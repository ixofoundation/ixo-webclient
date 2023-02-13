import {
  Box,
  FlexBox,
  GridContainer,
  SvgBox,
  TableBody,
  TableContainer,
  TableHead,
  TableHeadItem,
  TableRow,
  theme,
} from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import { MemberCard } from './MemberCard'
import { MemberListItem } from './MemberListItem'
import { ReactComponent as SortAtoZIcon } from 'assets/images/icon-sort-atoz.svg'
import { ReactComponent as SortZtoAIcon } from 'assets/images/icon-sort-ztoa.svg'
import { ReactComponent as SortLtoGIcon } from 'assets/images/icon-sort-ltog.svg'
import { ReactComponent as SortGtoLIcon } from 'assets/images/icon-sort-gtol.svg'
import { ReactComponent as ChevDownIcon } from 'assets/images/icon-chev-down.svg'

interface Props {
  view: 'panel' | 'list'
  members: any[]
}
const MembersView: React.FC<Props> = ({ view, members }): JSX.Element => {
  const [sort, setSort] = useState<{ [key: string]: 'asc' | 'desc' | undefined }>({
    name: 'asc',
    votingPower: undefined,
    staking: undefined,
    votes: undefined,
    proposals: undefined,
  })

  const sortedMembers = members
    .sort((a, b) => {
      if (sort.name === 'asc') return a.name?.localeCompare(b.name)
      if (sort.name === 'desc') return b.name?.localeCompare(a.name)
      return 0
    })
    .sort((a, b) => {
      if (sort.votingPower === 'asc') return a.votingPower - b.votingPower
      if (sort.votingPower === 'desc') return b.votingPower - a.votingPower
      return 0
    })
    .sort((a, b) => {
      if (sort.staking === 'asc') return a.staking - b.staking
      if (sort.staking === 'desc') return b.staking - a.staking
      return 0
    })
    .sort((a, b) => {
      if (sort.votes === 'asc') return a.votes - b.votes
      if (sort.votes === 'desc') return b.votes - a.votes
      return 0
    })
    .sort((a, b) => {
      if (sort.proposals === 'asc') return a.proposals - b.proposals
      if (sort.proposals === 'desc') return b.proposals - a.proposals
      return 0
    })

  const handleSortClick = (key: string) => {
    setSort((sort) => {
      let newSortForKey: 'asc' | 'desc' | undefined = undefined
      switch (sort[key]) {
        case 'asc':
          newSortForKey = 'desc'
          break
        case 'desc':
        default:
          newSortForKey = 'asc'
          break
      }
      return { [key]: newSortForKey }
    })
  }

  const renderSortItem = (
    label: string,
    sort: 'asc' | 'desc' | undefined,
    varType: 'string' | 'number',
    onClick: () => void,
  ): JSX.Element => (
    <FlexBox alignItems='center' gap={2} onClick={onClick} cursor='pointer'>
      <Typography color={sort ? 'blue' : 'dark-blue'} size='lg'>
        {label}
      </Typography>
      <SvgBox color={sort ? theme.ixoNewBlue : theme.ixoDarkBlue}>
        {varType === 'string' && sort === 'desc' && <SortZtoAIcon />}
        {varType === 'string' && sort !== 'desc' && <SortAtoZIcon />}
        {varType === 'number' && sort === 'desc' && <SortGtoLIcon />}
        {varType === 'number' && sort !== 'desc' && <SortLtoGIcon />}
      </SvgBox>
    </FlexBox>
  )

  return (
    <FlexBox direction='column' width='100%' gap={8}>
      {view === 'panel' && (
        <>
          <FlexBox alignItems='center' gap={8}>
            {renderSortItem('Name', sort.name, 'string', () => handleSortClick('name'))}
            {renderSortItem('Voting Power', sort.votingPower, 'number', () => handleSortClick('votingPower'))}
            {renderSortItem('Staking', sort.staking, 'number', () => handleSortClick('staking'))}
            {renderSortItem('Votes', sort.votes, 'number', () => handleSortClick('votes'))}
            {renderSortItem('Proposals', sort.proposals, 'number', () => handleSortClick('proposals'))}
          </FlexBox>

          <GridContainer columns={5} width='100%' columnGap={4} rowGap={4}>
            {sortedMembers.map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </GridContainer>
        </>
      )}
      {view === 'list' && (
        <TableContainer width='100%' borderCollapse={'separate'} borderSpacing='0 0.5rem'>
          <TableHead>
            <TableRow>
              <TableHeadItem>
                <Box marginLeft={8}>{renderSortItem('Name', sort.name, 'string', () => handleSortClick('name'))}</Box>
              </TableHeadItem>
              <TableHeadItem>
                {renderSortItem('Voting Power', sort.votingPower, 'number', () => handleSortClick('votingPower'))}
              </TableHeadItem>
              <TableHeadItem>
                {renderSortItem('Staking', sort.staking, 'number', () => handleSortClick('staking'))}
              </TableHeadItem>
              <TableHeadItem>
                {renderSortItem('Votes', sort.votes, 'number', () => handleSortClick('votes'))}
              </TableHeadItem>
              <TableHeadItem>
                {renderSortItem('Proposals', sort.proposals, 'number', () => handleSortClick('proposals'))}
              </TableHeadItem>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedMembers.map((member, index) => (
              <MemberListItem key={index} member={member} />
            ))}
          </TableBody>
        </TableContainer>
      )}
      <FlexBox
        width='100%'
        alignItems='center'
        justifyContent='center'
        cursor='pointer'
        borderRadius='8px'
        background={theme.ixoDarkBlue}
        padding={4}
      >
        <SvgBox color={theme.ixoWhite}>
          <ChevDownIcon />
        </SvgBox>
      </FlexBox>
    </FlexBox>
  )
}

export default MembersView
