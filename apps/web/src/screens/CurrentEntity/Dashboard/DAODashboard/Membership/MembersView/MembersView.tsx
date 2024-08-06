import Image from 'next/image'
import { Typography } from 'components/Typography'
import React, { Dispatch, SetStateAction } from 'react'
import { MemberCard } from './MemberCard'
import { MemberListItem } from './MemberListItem'
import { Box, Flex, Grid, Table, useMantineTheme } from '@mantine/core'
import useCurrentEntity from 'hooks/currentEntity'
import { useQuery } from 'hooks/window'
import { IconSortAtoz, IconSortZtoa, IconSortGtol, IconSortLtog, IconChevDown } from 'components/IconPaths'
import { createStyles } from '@mantine/emotion'

const useStyles = createStyles((theme) => ({
  sortItem: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    cursor: 'pointer',
  },
  icon: {
    width: 20,
    height: 20,
  },
  tableContainer: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 0.5rem',
  },
}))

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
  const theme = useMantineTheme()
  const { classes } = useStyles()
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
    <Flex className={classes.sortItem} onClick={onClick}>
      <Typography color={sort ? 'blue' : 'dark-blue'} size='lg'>
        {label}
      </Typography>
      <Box color={sort ? theme.colors.blue[5] : theme.colors.dark[7]}>
        {varType === 'string' && sort === 'desc' && (
          <Image src={IconSortZtoa} alt='SortZtoA' className={classes.icon} />
        )}
        {varType === 'string' && sort !== 'desc' && (
          <Image src={IconSortAtoz} alt='SortAtoZ' className={classes.icon} />
        )}
        {varType === 'number' && sort === 'desc' && (
          <Image src={IconSortGtol} alt='SortGtoL' className={classes.icon} />
        )}
        {varType === 'number' && sort !== 'desc' && (
          <Image src={IconSortLtog} alt='SortLtoG' className={classes.icon} />
        )}
      </Box>
    </Flex>
  )

  return (
    <Flex direction='column' w='100%' gap='md'>
      {view === 'panel' && (
        <>
          {members.length > 0 ? (
            <Flex align='center' gap='md'>
              {renderSortItem('Name', sort.name, 'string', () => handleSortClick('name'))}
              {renderSortItem('Voting Power', sort.votingPower, 'number', () => handleSortClick('votingPower'))}
              {selectedDAOGroup?.type === 'staking' &&
                renderSortItem('Staking', sort.staking, 'number', () => handleSortClick('staking'))}
              {renderSortItem('Votes', sort.votes, 'number', () => handleSortClick('votes'))}
              {renderSortItem('Proposals', sort.proposals, 'number', () => handleSortClick('proposals'))}
            </Flex>
          ) : (
            <Flex>
              <Typography size='2xl' color='dark-blue'>
                No members yet.
              </Typography>
            </Flex>
          )}

          <Grid>
            {members.map((member, index) => (
              <Grid.Col key={index} span={3}>
                <MemberCard
                  member={member}
                  selected={selectedMembers[member.addr]}
                  onSelectMember={(addr) =>
                    setSelectedMembers((selectedMembers) => ({ ...selectedMembers, [addr]: !selectedMembers[addr] }))
                  }
                />
              </Grid.Col>
            ))}
          </Grid>
        </>
      )}
      {view === 'list' && (
        <Table className={classes.tableContainer}>
          <thead>
            <tr>
              <th>
                <Box ml={8}>{renderSortItem('Name', sort.name, 'string', () => handleSortClick('name'))}</Box>
              </th>
              <th>
                {renderSortItem('Voting Power', sort.votingPower, 'number', () => handleSortClick('votingPower'))}
              </th>
              {selectedDAOGroup?.type === 'staking' && (
                <th>{renderSortItem('Staking', sort.staking, 'number', () => handleSortClick('staking'))}</th>
              )}
              <th>{renderSortItem('Votes', sort.votes, 'number', () => handleSortClick('votes'))}</th>
              <th>{renderSortItem('Proposals', sort.proposals, 'number', () => handleSortClick('proposals'))}</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </Table>
      )}
      {/* Commented out as per original code
      <Flex
        w="100%"
        align="center"
        justify="center"
        sx={{ cursor: 'pointer', borderRadius: theme.radius.md }}
        bg={theme.colors.dark[7]}
        p="sm"
      >
        <Box color={theme.white}>
          <Image src={IconChevDown} alt='ChevDown' className={classes.icon} />
        </Box>
      </Flex>
      */}
    </Flex>
  )
}

export default MembersView
