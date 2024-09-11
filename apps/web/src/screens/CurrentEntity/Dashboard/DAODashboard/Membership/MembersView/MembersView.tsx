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
} from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { Dispatch, SetStateAction } from 'react'
import { MemberCard } from './MemberCard'
import { MemberListItem } from './MemberListItem'








import { useTheme } from 'styled-components'
import useCurrentEntity from 'hooks/currentEntity'
import { useQuery } from 'hooks/window'
//


interface Props {
  view: 'panel' | 'list'
  members: any[]
  sort: { [key: string]: 'asc' | 'desc' | undefined }
  setSort: (sort: any) => void
  selectedMembers: { [key: string]: boolean }
  setSelectedMembers: Dispatch<SetStateAction<{ [key: string]: boolean }>>
}
const MembersView: React.FC<Props> = ({
  view,
  members,
  sort,
  setSort,
  selectedMembers,
  setSelectedMembers,
}): JSX.Element => {
  const theme: any = useTheme()
  const { getQuery } = useQuery()
  const selectedGroup = getQuery('selectedGroup')
  const { daoGroups } = useCurrentEntity()
  const selectedDAOGroup = daoGroups[selectedGroup]

  const handleSortClick = (key: string) => {
    setSort((sort: any) => {
      let newSortForKey: 'asc' | 'desc' | undefined
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
    <FlexBox $alignItems='center' $gap={2} onClick={onClick} cursor='pointer'>
      <Typography color={sort ? 'blue' : 'dark-blue'} size='lg'>
        {label}
      </Typography>
      <SvgBox color={sort ? theme.ixoNewBlue : theme.ixoDarkBlue}>
        {varType === 'string' && sort === 'desc' && <img src="/assets/images/icon-sort-ztoa.svg"  />}
        {varType === 'string' && sort !== 'desc' && <img src="/assets/images/icon-sort-atoz.svg"  />}
        {varType === 'number' && sort === 'desc' && <img src="/assets/images/icon-sort-gtol.svg"  />}
        {varType === 'number' && sort !== 'desc' && <img src="/assets/images/icon-sort-ltog.svg"  />}
      </SvgBox>
    </FlexBox>
  )

  return (
    <FlexBox $direction='column' width='100%' $gap={8}>
      {view === 'panel' && (
        <>
          {members.length > 0 ? (
            <FlexBox $alignItems='center' $gap={8}>
              {renderSortItem('Name', sort.name, 'string', () => handleSortClick('name'))}
              {renderSortItem('Voting Power', sort.votingPower, 'number', () => handleSortClick('votingPower'))}
              {selectedDAOGroup?.type === 'staking' &&
                renderSortItem('Staking', sort.staking, 'number', () => handleSortClick('staking'))}
              {renderSortItem('Votes', sort.votes, 'number', () => handleSortClick('votes'))}
              {renderSortItem('Proposals', sort.proposals, 'number', () => handleSortClick('proposals'))}
            </FlexBox>
          ) : (
            <FlexBox>
              <Typography size='2xl' color='dark-blue'>
                No members yet.
              </Typography>
            </FlexBox>
          )}

          <GridContainer columns={5} width='100%' $columnGap={4} $rowGap={4}>
            {members.map((member, index) => (
              <MemberCard
                key={index}
                member={member}
                selected={selectedMembers[member.addr]}
                onSelectMember={(addr) =>
                  setSelectedMembers((selectedMembers) => ({ ...selectedMembers, [addr]: !selectedMembers[addr] }))
                }
              />
            ))}
          </GridContainer>
        </>
      )}
      {view === 'list' && (
        <TableContainer width='100%' borderCollapse={'separate'} borderSpacing='0 0.5rem'>
          <TableHead>
            <TableRow>
              <TableHeadItem>
                <Box $marginLeft={8}>{renderSortItem('Name', sort.name, 'string', () => handleSortClick('name'))}</Box>
              </TableHeadItem>
              <TableHeadItem>
                {renderSortItem('Voting Power', sort.votingPower, 'number', () => handleSortClick('votingPower'))}
              </TableHeadItem>
              {selectedDAOGroup?.type === 'staking' && (
                <TableHeadItem>
                  {renderSortItem('Staking', sort.staking, 'number', () => handleSortClick('staking'))}
                </TableHeadItem>
              )}
              <TableHeadItem>
                {renderSortItem('Votes', sort.votes, 'number', () => handleSortClick('votes'))}
              </TableHeadItem>
              <TableHeadItem>
                {renderSortItem('Proposals', sort.proposals, 'number', () => handleSortClick('proposals'))}
              </TableHeadItem>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member, index) => (
              <MemberListItem
                key={index}
                member={member}
                selected={selectedMembers[member.addr]}
                onSelectMember={(addr) =>
                  setSelectedMembers((selectedMembers) => ({ ...selectedMembers, [addr]: !selectedMembers[addr] }))
                }
              />
            ))}
          </TableBody>
        </TableContainer>
      )}
      {/* <FlexBox
        width='100%'
        $alignItems='center'
        $justifyContent='center'
        cursor='pointer'
        $borderRadius='8px'
        background={theme.ixoDarkBlue}
        padding={4}
      >
        <SvgBox color={theme.ixoWhite}>
          <img src="/assets/images/icon-chev-down.svg"  />
        </SvgBox>
      </FlexBox> */}
    </FlexBox>
  )
}

export default MembersView
