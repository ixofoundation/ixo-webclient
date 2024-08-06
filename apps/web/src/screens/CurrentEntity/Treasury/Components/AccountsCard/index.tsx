import Image from 'next/image'
import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import { Table } from 'components/Table'
import CurrencyFormat from 'react-currency-format'
import { truncateString } from 'utils/formatters'
import CopyToClipboard from 'react-copy-to-clipboard'
import { successToast } from 'utils/toast'
import Tooltip from 'components/Tooltip/Tooltip'
import { capitalize } from 'lodash'
import { TTreasuryAccountModel, TTreasuryCoinModel } from '../../InvestmentFunding/Accounts'
import BigNumber from 'bignumber.js'
import { renderTableHeader } from 'components/Table/Table'
import { IconCopy, IconEntityAccount, IconGroupAccount, IconLinkedAccount } from 'components/IconPaths'
import { Flex, useMantineTheme } from '@mantine/core'
import { TableWrapper } from 'components'

export const AccountTypeToIconMap = {
  group: IconGroupAccount,
  entity: IconEntityAccount,
  linked: IconLinkedAccount,
}

interface Props {
  accounts: { [address: string]: TTreasuryAccountModel }
  onSelect: (address: string) => void
}

const AccountsCard: React.FC<Props> = ({ accounts, onSelect }) => {
  const theme = useMantineTheme()
  const columns = [
    {
      Header: renderTableHeader('Name'),
      accessor: 'name',
      renderCell: (cell: any) => {
        const name = cell.value
        const address = cell.row.original?.address
        const type = cell.row.original?.type
        const Icon = AccountTypeToIconMap[type]

        return (
          <Flex align='center' gap={2} p={4}>
            <Flex direction='column' gap={4}>
              <Flex align='center' gap={2}>
                {Icon && <Icon />}
                <Typography variant='secondary' size='2xl'>
                  {name || truncateString(address, 10, 'middle')}
                </Typography>
              </Flex>

              <CopyToClipboard text={address} onCopy={() => successToast(`Copied to clipboard`)}>
                <Flex align='center' gap={2} onClick={(e) => e.stopPropagation()}>
                  <Typography variant='secondary' color='blue' hover={{ underline: true }}>
                    {truncateString(address, 20, 'middle')}
                  </Typography>

                  <Image src={IconCopy} alt='Copy' width={5} height={5} color={theme.colors.blue[5]} />
                </Flex>
              </CopyToClipboard>
            </Flex>
          </Flex>
        )
      },
    },
    {
      Header: renderTableHeader('Value', 'flex-end'),
      accessor: 'coins',
      renderCell: (cell: any) => {
        const balance = Object.values(cell.value as { [denom: string]: TTreasuryCoinModel }).reduce(
          (acc, cur) => new BigNumber(cur.balance).times(cur.lastPriceUsd).plus(new BigNumber(acc)).toFixed(2),
          '0',
        )
        const network = cell.row.original?.network
        return (
          <Flex h='100%' direction='column' justify='space-between' align='end' p={4}>
            <Typography size='2xl'>
              <CurrencyFormat prefix='$' displayType={'text'} value={balance} thousandSeparator decimalScale={2} />
            </Typography>
            <Typography color='dark-blue'>{network}</Typography>
          </Flex>
        )
      },
    },
  ]
  const [filter, setFilter] = useState({
    group: true,
    entity: true,
    linked: true,
  })

  const handleRowClick = (state: any) => () => {
    onSelect(state.original.address)
  }

  return (
    <Flex
      pos='relative'
      direction='column'
      gap={8}
      p={8}
      bg='#012D41'
      style={{ borderRadius: '12px' }}
      color={theme.colors.white[5]}
    >
      {/* Header */}
      <Flex>
        <Typography variant='secondary' size='2xl'>
          Accounts
        </Typography>
      </Flex>

      <Flex pos='absolute' top={'110px'} left={'0px'} w='100%' justify='center' gap={2}>
        {Object.entries(AccountTypeToIconMap).map(([key, Icon]) => (
          <Tooltip key={key} text={capitalize(key) + ' accounts'}>
            <Icon />
          </Tooltip>
        ))}
      </Flex>

      <TableWrapper>
        <Table
          columns={columns}
          data={Object.values(accounts).filter(({ type }) => filter[type])}
          getRowProps={(state) => {
            return {
              style: { height: 100, cursor: 'pointer' },
              onClick: handleRowClick(state),
            }
          }}
          getCellProps={() => ({ style: { background: '#023044' } })}
        />
      </TableWrapper>
    </Flex>
  )
}

export default AccountsCard
