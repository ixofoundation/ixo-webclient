import { Anchor, Avatar, Button, Flex, NumberFormatter } from '@mantine/core'
import { SvgBox } from 'components/App/App.styles'
import Table, { renderTableHeader } from 'components/Table/Table'
import { Typography } from 'components/Typography'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { mantineThemeColors } from 'styles/mantine'
import { ReactComponent as ExternalLinkIcon } from 'assets/images/icon-external-link-alt-solid.svg'
import { useQuery } from 'hooks/window'
import { useNavigate, useParams } from 'react-router-dom'
import { useCurrentEntityDAOGroup, useCurrentEntityDAOGroupToken } from 'hooks/currentEntity'
import BigNumber from 'bignumber.js'
import { truncateString } from 'utils/formatters'
import CopyToClipboard from 'react-copy-to-clipboard'
import { successToast } from 'utils/toast'
import { useAccount } from 'hooks/account'
import { useGetUserIids } from 'graphql/iid'
import { contracts } from '@ixo/impactxclient-sdk'
import { queryMultipleContracts } from 'utils/multiContractCall'
import { DaoVotingCw20StakedQueryClient } from 'adapters/DaoVotingCw20StakedAdapter'
import { Member } from 'types/dao'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'
import { CSVLink } from 'react-csv'

const TableWrapper = styled.div`
  color: white;
  width: 100%;

  table {
    width: 100%;
    border-spacing: 0 8px;
    border-collapse: separate;

    th,
    td {
      height: inherit;
    }

    tbody > tr {
      border-radius: 8px;
      outline-style: solid;
      outline-width: 1px;
      outline-color: transparent;
      transition: all 0.2s;

      & > td:first-child {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }
      & > td:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }
  }
`

const Shareholders: React.FC = () => {
  const navigate = useNavigate()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { getQuery } = useQuery()
  const selectedGroup: string = getQuery('selectedGroup')
  const { daoGroups = {} } = useAppSelector(getEntityById(entityId))
  const { members, totalWeight, daoGroup } = useCurrentEntityDAOGroup(selectedGroup, daoGroups)
  const { tokenTotalSupply, tokenDecimals } = useCurrentEntityDAOGroupToken(selectedGroup, daoGroups)
  const { cwClient } = useAccount()
  const { data: users } = useGetUserIids()

  const userAddresses: string[] = useMemo(() => {
    const mp = new Map()
    ;(
      users
        .map((user) => user.verificationMethod?.find((vm) => vm.type === 'CosmosAccountAddress')?.blockchainAccountID)
        .filter(Boolean) as string[]
    ).forEach((user: string) => {
      mp.set(user, user)
    })
    return [...mp.values()]
  }, [users])

  const [usersWithTokenBalances, setUsersWithTokenBalances] = useState<Member[]>([])

  useEffect(() => {
    ;(async () => {
      if (daoGroup && cwClient && userAddresses.length > 0) {
        const daoVotingCw20StakedClient = new DaoVotingCw20StakedQueryClient(
          cwClient as any,
          daoGroup.votingModule.votingModuleAddress,
        )

        const tokenContractRequest = daoVotingCw20StakedClient.tokenContractRequest()
        const [tokenContract] = await queryMultipleContracts([tokenContractRequest])

        const cw20BaseClient = new contracts.Cw20Base.Cw20BaseQueryClient(cwClient, tokenContract)

        const usersWithTokenBalances: Member[] = []

        await Promise.all(
          userAddresses.map(async (address) => {
            const { balance } = await cw20BaseClient.balance({ address })
            if (Number(balance)) {
              usersWithTokenBalances.push({ addr: address, weight: Number(balance) })
            }
          }),
        )

        setUsersWithTokenBalances(usersWithTokenBalances)
      }
    })()
  }, [daoGroup, userAddresses, cwClient])

  const columns = useMemo(
    () => [
      {
        Header: renderTableHeader('Owner'),
        accessor: 'addr',
        renderCell: (cell: any) => {
          const addr = cell.value
          return (
            <Flex p={16} align={'center'} gap={16}>
              <Avatar variant='light' src={null} radius={'xl'} />
              <Flex direction={'column'} gap={4}>
                <CopyToClipboard text={addr} onCopy={() => successToast(`Copied to clipboard`)}>
                  <Typography size='base' hover={{ underline: true }}>
                    {truncateString(addr, 20)}
                  </Typography>
                </CopyToClipboard>
              </Flex>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Shares'),
        accessor: 'weight',
        renderCell: (cell: any) => {
          const weight = new BigNumber(cell.value).dividedBy(10 ** tokenDecimals).toNumber()
          return (
            <Flex p={16} direction={'column'} gap={4}>
              <Typography>{weight.toLocaleString()}</Typography>
              <Typography size='md'>$0.00</Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Ownership'),
        accessor: 'ownership',
        renderCell: (cell: any) => {
          const ownership = cell.value
          return (
            <Flex p={16} direction={'column'} gap={4}>
              <Typography>
                {new Intl.NumberFormat(undefined, {
                  style: 'percent',
                  maximumFractionDigits: 6,
                }).format(ownership)}
              </Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Bonded'),
        accessor: 'bonded',
        renderCell: (cell: any) => {
          const weight = cell.row.original?.weight
          const bonded = new BigNumber(cell.value).dividedBy(10 ** tokenDecimals).toString()
          const bondedPercent = new BigNumber(cell.value).dividedBy(weight).toNumber()
          return (
            <Flex p={16} direction={'column'} gap={4}>
              <Typography>{bonded}</Typography>
              <Typography size='md'>
                {new Intl.NumberFormat(undefined, {
                  style: 'percent',
                  maximumFractionDigits: 6,
                }).format(bondedPercent)}
              </Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('Voting Power'),
        accessor: 'votingPower',
        renderCell: (cell: any) => {
          const votingPower = cell.value
          return (
            <Flex p={16} direction={'column'} gap={4}>
              <Typography>
                {new Intl.NumberFormat(undefined, {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(votingPower)}
              </Typography>
            </Flex>
          )
        },
      },
      {
        Header: renderTableHeader('History'),
        accessor: 'history',
        renderCell: (cell: any) => {
          const addr = cell.row.original?.addr
          return (
            <Flex p={16} direction={'column'} gap={4}>
              <Anchor href={`${process.env.REACT_APP_BLOCK_SCAN_URL}/accounts/${addr}`} target='_blank'>
                <SvgBox $svgWidth={6} $svgHeight={6} color={mantineThemeColors['ixo-blue'][6]} cursor='pointer'>
                  <ExternalLinkIcon />
                </SvgBox>
              </Anchor>
            </Flex>
          )
        },
      },
    ],
    [tokenDecimals],
  )

  const shareholders = useMemo(() => {
    const mp = new Map()
    usersWithTokenBalances.forEach((user) => {
      mp.set(user.addr, { ...user })
    })
    members.forEach((member) => {
      mp.set(member.addr, { ...(mp.get(member.addr) ?? { addr: member.addr }), bonded: member.weight })
    })
    return [...mp.values()]
      .map((user) => {
        const { addr, weight = 0, bonded = 0 } = user
        return {
          addr: addr,
          weight: new BigNumber(weight).plus(bonded).toString(),
          ownership: tokenTotalSupply
            ? new BigNumber(new BigNumber(weight).plus(bonded)).dividedBy(tokenTotalSupply).toFixed()
            : 0,
          votingPower: totalWeight ? new BigNumber(bonded).dividedBy(totalWeight).toString() : 0,
          bonded: bonded,
        }
      })
      .sort((a, b) => new BigNumber(b.weight).minus(a.weight).toNumber())
  }, [usersWithTokenBalances, members, totalWeight, tokenTotalSupply])

  const csvHeaders = useMemo(
    () => [
      { label: 'Owner', key: 'addr' },
      { label: 'Shares', key: 'weight' },
      { label: 'Ownership', key: 'ownership' },
      { label: 'Bonded', key: 'bonded' },
      { label: 'Voting Power', key: 'votingPower' },
    ],
    [],
  )

  const { unallocatedShares, bondedShares } = useMemo(() => {
    const allocatedShares = shareholders.reduce((pre, cur) => new BigNumber(pre).plus(cur.weight).toString(), '0')
    const unallocatedShares = new BigNumber(tokenTotalSupply || 0).minus(allocatedShares).toString()
    const bondedShares = shareholders.reduce((pre, cur) => new BigNumber(pre).plus(cur.bonded).toString(), '0')
    return { allocatedShares, unallocatedShares, bondedShares }
  }, [shareholders, tokenTotalSupply])

  useEffect(() => {
    if (!selectedGroup) {
      navigate(`/entity/${entityId}/dashboard/overview`)
    }
  }, [entityId, navigate, selectedGroup])

  return (
    <Flex w='100%' direction='column' gap={24}>
      <Flex>
        <Typography variant='secondary' size='2xl'>
          Summary
        </Typography>
      </Flex>

      <Flex w={'100%'} gap={16}>
        <Flex w='100%' p={20} gap={12} direction={'column'} style={{ borderRadius: 8 }} bg={'#053549'}>
          <Typography variant='secondary' size='lg'>
            Issued
          </Typography>
          <Typography variant='primary' size='2xl'>
            <NumberFormatter
              value={new BigNumber(tokenTotalSupply || 0).dividedBy(10 ** tokenDecimals).toString()}
              thousandSeparator
            />
          </Typography>
        </Flex>
        <Flex w='100%' p={20} gap={12} direction={'column'} style={{ borderRadius: 8 }} bg={'#053549'}>
          <Typography variant='secondary' size='lg'>
            Unallocated
          </Typography>
          <Typography variant='primary' size='2xl'>
            <NumberFormatter
              value={new BigNumber(unallocatedShares).dividedBy(10 ** tokenDecimals).toString()}
              thousandSeparator
            />
          </Typography>
        </Flex>
        <Flex w='100%' p={20} gap={12} direction={'column'} style={{ borderRadius: 8 }} bg={'#053549'}>
          <Typography variant='secondary' size='lg'>
            Shareholders
          </Typography>
          <Typography variant='primary' size='2xl'>
            <NumberFormatter value={shareholders.length} thousandSeparator />
          </Typography>
        </Flex>
        <Flex w='100%' p={20} gap={12} direction={'column'} style={{ borderRadius: 8 }} bg={'#053549'}>
          <Typography variant='secondary' size='lg'>
            Bonded Shares
          </Typography>
          <Typography variant='primary' size='2xl'>
            {new Intl.NumberFormat(undefined, {
              style: 'percent',
              maximumFractionDigits: 6,
            }).format(new BigNumber(bondedShares).dividedBy(tokenTotalSupply || 0).toNumber())}
          </Typography>
        </Flex>
      </Flex>

      <Flex w='100%' align={'center'} justify={'space-between'}>
        <Typography variant='secondary' size='2xl'>
          Shareholder List
        </Typography>
        <CSVLink data={shareholders} headers={csvHeaders} filename={`${daoGroup.config.name} shareholders`}>
          <Button variant='outline' c={'white'} style={{ borderColor: mantineThemeColors['ixo-blue'][6] }}>
            Download CSV
          </Button>
        </CSVLink>
      </Flex>

      <TableWrapper>
        <Table
          columns={columns}
          data={shareholders}
          getRowProps={(state) => ({
            style: { height: 70, cursor: 'pointer' },
          })}
          getCellProps={() => ({ style: { background: '#023044' } })}
        />
      </TableWrapper>
    </Flex>
  )
}

export default Shareholders
