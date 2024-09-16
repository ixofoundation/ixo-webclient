import { Flex } from '@mantine/core'
import { Typography } from 'components/Typography'
import React, { useEffect, useState } from 'react'

import { SvgBox } from 'components/CoreEntry/App.styles'
import { useTheme } from 'styled-components'
import GroupCard from './GroupCard'
import { TDAOGroupModel } from 'types/entities'

type GroupProps = {
  daoGroups:
    | {
        [address: string]: TDAOGroupModel
      }
    | undefined
}
const Groups = ({ daoGroups }: GroupProps) => {
  const theme: any = useTheme()
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
        style={{ color: sortBy === 'members' ? theme.ixoNewBlue : theme.ixoDarkBlue, cursor: 'pointer' }}
        onClick={() => (sortBy === 'members' ? setSortDirection((v) => !v) : setSortBy('members'))}
      >
        <Typography size='lg'>Members</Typography>
        {sortBy === 'members' && (
          <SvgBox $svgWidth={4.5} $svgHeight={4.5}>
            {sortDirection && <img src='/assets/images/icon-sort-gtol.svg' />}
            {!sortDirection && <img src='/assets/images/icon-sort-ltog.svg' />}
          </SvgBox>
        )}
      </Flex>

      <Flex
        gap={4}
        align={'center'}
        style={{ color: sortBy === 'treasury' ? theme.ixoNewBlue : theme.ixoDarkBlue, cursor: 'pointer' }}
        onClick={() => (sortBy === 'treasury' ? setSortDirection((v) => !v) : setSortBy('treasury'))}
      >
        <Typography size='lg'>Treasury</Typography>
        {sortBy === 'treasury' && (
          <SvgBox $svgWidth={4.5} $svgHeight={4.5}>
            {sortDirection && <img src='/assets/images/icon-sort-gtol.svg' />}
            {!sortDirection && <img src='/assets/images/icon-sort-ltog.svg' />}
          </SvgBox>
        )}
      </Flex>

      <Flex
        gap={4}
        align={'center'}
        style={{ color: sortBy === 'proposals' ? theme.ixoNewBlue : theme.ixoDarkBlue, cursor: 'pointer' }}
        onClick={() => (sortBy === 'proposals' ? setSortDirection((v) => !v) : setSortBy('proposals'))}
      >
        <Typography size='lg'>Proposals</Typography>
        {sortBy === 'proposals' && (
          <SvgBox $svgWidth={4.5} $svgHeight={4.5}>
            {sortDirection && <img src='/assets/images/icon-sort-gtol.svg' />}
            {!sortDirection && <img src='/assets/images/icon-sort-ltog.svg' />}
          </SvgBox>
        )}
      </Flex>

      <Flex
        gap={4}
        align={'center'}
        style={{ color: sortBy === 'type' ? theme.ixoNewBlue : theme.ixoDarkBlue, cursor: 'pointer' }}
        onClick={() => (sortBy === 'type' ? setSortDirection((v) => !v) : setSortBy('type'))}
      >
        <Typography size='lg'>Type</Typography>
        {sortBy === 'type' && (
          <SvgBox $svgWidth={4.5} $svgHeight={4.5}>
            {sortDirection && <img src='/assets/images/icon-sort-gtol.svg' />}
            {!sortDirection && <img src='/assets/images/icon-sort-ltog.svg' />}
          </SvgBox>
        )}
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
