import { FlexBox, SvgBox } from 'components/CoreEntry/App.styles'
import { Table } from 'components/Table'
import { renderTableHeader } from 'components/Table/Table'
import { Typography } from 'components/Typography'
import React, { useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'

import { useValidators } from 'hooks/validator'
import CurrencyFormat from 'react-currency-format'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import StakingModal from 'components/ControlPanel/Actions/StakingModal'
import { useAccount } from 'hooks/account'
import { useIxoConfigs } from 'hooks/configs'
import { Dropdown } from 'screens/CreateEntity/Components'
import { BondStatus } from 'cosmjs-types/cosmos/staking/v1beta1/staking'
import { Flex } from '@mantine/core'

const TableWrapper = styled(FlexBox)`
  color: white;
  width: 100%;

  table {
    width: 100%;
    border-spacing: 0 8px;
    border-collapse: separate;

    th,
    td {
      height: inherit;
      overflow: hidden;
    }

    tbody > tr {
      outline-style: solid;
      outline-width: 1px;
      outline-color: transparent;
      transition: all 0.2s;

      & > td:first-child {
      }
      & > td:last-child {
        width: 250px;
      }

      &:hover {
        outline-color: ${(props) => props.theme.ixoNewBlue};
      }
    }
  }
`

const Validators: React.FC = () => {
  const theme: any = useTheme()
  const { address } = useAccount()
  const { validators, getValidators } = useValidators()
  const { convertToDenom } = useIxoConfigs()

  const [selectedValidatorStatus, setSelectedValidatorStatus] = useState(BondStatus.BOND_STATUS_BONDED)
  const [selectedValidator, setSelectedValidator] = useState('')

  const [sort, setSort] = useState<{ [key: string]: 'asc' | 'desc' | undefined }>({
    name: 'asc',
    description: undefined,
    votingPower: undefined,
    commission: undefined,
    delegation: undefined,
  })

  const sortedValidators = useMemo(() => {
    const [sortBy, order] = Object.entries(sort).find(([, value]) => value) ?? ['name', 'asc']

    return validators.sort((a, b) => {
      switch (sortBy) {
        case 'name':
        default:
          if (order === 'desc') return String(b?.moniker || '').localeCompare(String(a?.moniker || ''))
          return String(a?.moniker || '').localeCompare(String(b?.moniker || ''))
        case 'description':
          if (order === 'desc') return String(b?.description || '').localeCompare(String(a?.description || ''))
          return String(a?.description || '').localeCompare(String(b?.description || ''))
        case 'votingPower':
          if (order === 'desc') return Number(b?.votingPower) - Number(a?.votingPower)
          return Number(a?.votingPower) - Number(b?.votingPower)
        case 'commission':
          if (order === 'desc') return Number(b?.commission) - Number(a?.commission)
          return Number(a?.commission) - Number(b?.commission)
        case 'delegation':
          if (order === 'desc') return Number(b.delegation?.amount || '0') - Number(a.delegation?.amount || '0')
          return Number(a.delegation?.amount || '0') - Number(b.delegation?.amount || '0')
      }
    })
  }, [sort, validators])

  const onValidatorSelect = (address: string) => () => {
    setSelectedValidator(address)
  }

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

  const columns = useMemo(
    () => [
      {
        Header: renderTableHeader('Validator', 'center'),
        accessor: 'logo',
        renderCell: (cell: any) => {
          const logo = cell.value
          return (
            <FlexBox width='100%' $justifyContent='center' p={4}>
              <img src={logo} alt='' width={48} />
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Name', undefined, {
          direction: sort.name,
          onClick: () => handleSortClick('name'),
        }),
        accessor: 'moniker',
        renderCell: (cell: any) => {
          const name = cell.value
          return (
            <FlexBox $direction='column' p={4}>
              <Typography size='base' weight='bold'>
                {name}
              </Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Mission', undefined, {
          direction: sort.description,
          onClick: () => handleSortClick('description'),
        }),
        accessor: 'description',
        renderCell: (cell: any) => {
          const description = cell.value
          return (
            <FlexBox $direction='column' p={4}>
              <Typography>{description}</Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Voting Power', undefined, {
          direction: sort.votingPower,
          onClick: () => handleSortClick('votingPower'),
        }),
        accessor: 'votingPower',
        renderCell: (cell: any) => {
          const votingPower = cell.value
          return (
            <FlexBox $direction='column' p={4}>
              <Typography>
                <CurrencyFormat displayType='text' value={votingPower} thousandSeparator />
              </Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Commission', undefined, {
          direction: sort.commission,
          onClick: () => handleSortClick('commission'),
        }),
        accessor: 'commission',
        renderCell: (cell: any) => {
          const commission = cell.value
          return (
            <FlexBox $direction='column' p={4}>
              <Typography>{commission}%</Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('My Delegation', undefined, {
          direction: sort.delegation,
          onClick: () => handleSortClick('delegation'),
        }),
        accessor: 'address',
        renderCell: (cell: any) => {
          const address = cell.value
          const microDelegation = cell.row.original?.delegation
          const microReward = cell.row.original?.reward

          const delegation = convertToDenom(microDelegation)
          const reward = convertToDenom(microReward)

          return (
            <FlexBox $justifyContent='flex-end' $alignItems='stretch' width='250px' height='100%'>
              <FlexBox
                height='100%'
                $direction='column'
                $justifyContent='center'
                $alignItems='center'
                p={4}
                background={theme.ixoNavyBlue}
                style={{ flex: 1 }}
              >
                <Typography weight='bold'>
                  <CurrencyFormat
                    displayType='text'
                    value={delegation?.amount || 0}
                    thousandSeparator
                    decimalScale={2}
                    suffix=' IXO'
                  />
                </Typography>
                <Typography size='md'>
                  (
                  <CurrencyFormat
                    displayType='text'
                    value={reward?.amount || 0}
                    decimalScale={2}
                    thousandSeparator
                    prefix='+'
                  />
                  )
                </Typography>
              </FlexBox>
              <SvgBox
                width='60px'
                height='100%'
                $justifyContent='center'
                $alignItems='center'
                background={theme.ixoMediumBlue}
                color='white'
                hover={{ color: theme.ixoNewBlue }}
                onClick={onValidatorSelect(address)}
              >
                <img src='/assets/images/icon-assistant.svg' />
              </SvgBox>
            </FlexBox>
          )
        },
      },
    ],
    [sort, convertToDenom, theme],
  )

  return (
    <>
      <TableWrapper
        width='100%'
        $direction='column'
        $borderRadius='4px'
        border={`1px solid #0C3549`}
        background='linear-gradient(180deg, #012639 0%, #002D42 97.29%)'
        $boxShadow='0px 2px 10px 0px rgba(0, 0, 0, 0.18)'
        p={4}
      >
        <Flex w={'100%'} justify={'flex-end'}>
          <Dropdown
            options={[
              { text: 'Active', value: BondStatus.BOND_STATUS_BONDED as unknown as string },
              { text: 'Jailed', value: '4' },
              { text: 'Inactive', value: BondStatus.BOND_STATUS_UNBONDED as unknown as string },
            ]}
            value={selectedValidatorStatus}
            onChange={(event) => setSelectedValidatorStatus(event.target.value as unknown as BondStatus)}
            wrapperStyle={{ width: 200, height: 48 }}
          />
        </Flex>
        <Table
          columns={columns}
          data={
            Number(selectedValidatorStatus) === 4
              ? sortedValidators.filter((validator) => validator.jailed)
              : sortedValidators.filter(
                  (validator) => Number(validator.status) === Number(selectedValidatorStatus) && !validator.jailed,
                )
          }
          getRowProps={() => ({
            style: { height: 70, cursor: 'pointer' },
          })}
          getCellProps={() => ({ style: { background: '#023044' } })}
        />
      </TableWrapper>
      <ModalWrapper
        isModalOpen={!!selectedValidator}
        header={{
          title: 'My Stake',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={() => {
          setSelectedValidator('')
          getValidators()
        }}
      >
        <StakingModal
          accountAddress={address!}
          defaultValidator={sortedValidators.find((validator) => validator.address === selectedValidator)}
        />
      </ModalWrapper>
    </>
  )
}
export default Validators
