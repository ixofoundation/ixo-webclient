import Image from 'next/image'
import { Flex } from '@mantine/core'
import { Typography } from 'components/Typography'
import React, { useEffect, useState } from 'react'

import { useMantineTheme } from '@mantine/core'
import GroupCard from './GroupCard'
import { TDAOGroupModel } from 'types/entities'
import { IconSortGtol, IconSortLtog } from 'components/IconPaths'

type GroupProps = {
  daoGroups:
    | {
        [address: string]: TDAOGroupModel
      }
    | undefined
}

const SortDirections = ({ direction }: { direction: boolean }) => {
  const theme = useMantineTheme()
  return direction ? (
    <Image src={IconSortGtol} alt='SortGToL' width={5} height={5} color={theme.colors.blue[5]} />
  ) : (
    <Image src={IconSortLtog} alt='SortLToG' width={5} height={5} color={theme.colors.blue[5]} />
  )
}

const Groups = ({ daoGroups }: GroupProps) => {
  const theme = useMantineTheme()
  const daoGroupsArr = Object.values(daoGroups ?? {})

  const [sortBy, setSortBy] = useState<'members' | 'treasury' | 'proposals' | 'type'>('members')
  const [sortDirection, setSortDirection] = useState(true)

  useEffect(() => {
    setSortDirection(true)
  }, [sortBy])

  const renderFilters = () => (
    <Flex gap={32} align={'center'}>
      <Flex
        gap={4}
        align={'center'}
        style={{ color: sortBy === 'members' ? theme.colors.blue[5] : theme.colors.gray[5], cursor: 'pointer' }}
        onClick={() => (sortBy === 'members' ? setSortDirection((v) => !v) : setSortBy('members'))}
      >
        <Typography size='lg'>Members</Typography>
        {sortBy === 'members' && <SortDirections direction={sortDirection} />}
      </Flex>

      <Flex
        gap={4}
        align={'center'}
        style={{ color: sortBy === 'treasury' ? theme.colors.blue[5] : theme.colors.gray[5], cursor: 'pointer' }}
        onClick={() => (sortBy === 'treasury' ? setSortDirection((v) => !v) : setSortBy('treasury'))}
      >
        <Typography size='lg'>Treasury</Typography>
        {sortBy === 'treasury' && <SortDirections direction={sortDirection} />}
      </Flex>

      <Flex
        gap={4}
        align={'center'}
        style={{ color: sortBy === 'proposals' ? theme.colors.blue[5] : theme.colors.gray[5], cursor: 'pointer' }}
        onClick={() => (sortBy === 'proposals' ? setSortDirection((v) => !v) : setSortBy('proposals'))}
      >
        <Typography size='lg'>Proposals</Typography>
        {sortBy === 'proposals' && <SortDirections direction={sortDirection} />}
      </Flex>

      <Flex
        gap={4}
        align={'center'}
        style={{ color: sortBy === 'type' ? theme.colors.blue[5] : theme.colors.gray[5], cursor: 'pointer' }}
        onClick={() => (sortBy === 'type' ? setSortDirection((v) => !v) : setSortBy('type'))}
      >
        <Typography size='lg'>Type</Typography>
        {sortBy === 'type' && <SortDirections direction={sortDirection} />}
      </Flex>
    </Flex>
  )

  const renderGrouops = () => (
    <Flex w='100%' gap={16}>
      {daoGroupsArr.map((daoGroup, index) => (
        <GroupCard key={index} daoGroup={daoGroup ?? {}} />
      ))}
    </Flex>
  )

  return (
    <Flex direction={'column'} w={'100%'} gap={24}>
      <Typography variant='secondary' size='2xl'>
        Groups
      </Typography>

      <Flex direction={'column'} w={'100%'} gap={20}>
        {renderFilters()}
        {renderGrouops()}
      </Flex>
    </Flex>
  )
}

export default Groups
