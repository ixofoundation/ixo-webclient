import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Table } from 'components/Table'
import { renderTableHeader } from 'components/Table/Table'
import { Typography } from 'components/Typography'
import React, { useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { ReactComponent as AssistantIcon } from 'assets/images/icon-assistant.svg'
import { useValidators } from 'hooks/validator'
import CurrencyFormat from 'react-currency-format'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import StakingModal from 'components/ControlPanel/Actions/StakingModal'
import { useAccount } from 'hooks/account'
import { useIxoConfigs } from 'hooks/configs'
import { Dropdown } from 'pages/CreateEntity/Components'
import { BondStatus } from 'cosmjs-types/cosmos/staking/v1beta1/staking'

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

  const onValidatorSelect = (address: string) => () => {
    setSelectedValidator(address)
  }

  const columns = useMemo(
    () => [
      {
        Header: renderTableHeader('Validator', 'center'),
        accessor: 'logo',
        renderCell: (cell: any) => {
          const logo = cell.value
          return (
            <FlexBox width='100%' justifyContent='center' p={4}>
              <img src={logo} alt='' width={48} />
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Name'),
        accessor: 'moniker',
        renderCell: (cell: any) => {
          const name = cell.value
          return (
            <FlexBox direction='column' p={4}>
              <Typography size='base' weight='bold'>
                {name}
              </Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Mission'),
        accessor: 'description',
        renderCell: (cell: any) => {
          const description = cell.value
          return (
            <FlexBox direction='column' p={4}>
              <Typography>{description}</Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Voting Power'),
        accessor: 'votingPower',
        renderCell: (cell: any) => {
          const votingPower = cell.value
          return (
            <FlexBox direction='column' p={4}>
              <Typography>
                <CurrencyFormat displayType='text' value={votingPower} thousandSeparator />
              </Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('Commission'),
        accessor: 'commission',
        renderCell: (cell: any) => {
          const commission = cell.value
          return (
            <FlexBox direction='column' p={4}>
              <Typography>{commission}%</Typography>
            </FlexBox>
          )
        },
      },
      {
        Header: renderTableHeader('My Delegation'),
        accessor: 'address',
        renderCell: (cell: any) => {
          const address = cell.value
          const microDelegation = cell.row.original?.delegation
          const microReward = cell.row.original?.reward

          const delegation = convertToDenom(microDelegation)
          const reward = convertToDenom(microReward)

          return (
            <FlexBox justifyContent='flex-end' alignItems='stretch' width='250px' height='100%'>
              <FlexBox
                height='100%'
                direction='column'
                justifyContent='center'
                alignItems='center'
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
                justifyContent='center'
                alignItems='center'
                background={theme.ixoMediumBlue}
                color='white'
                hover={{ color: theme.ixoNewBlue }}
                onClick={onValidatorSelect(address)}
              >
                <AssistantIcon />
              </SvgBox>
            </FlexBox>
          )
        },
      },
    ],
    [theme, convertToDenom],
  )

  return (
    <>
      <TableWrapper
        width='100%'
        direction='column'
        borderRadius='4px'
        border={`1px solid #0C3549`}
        background='linear-gradient(180deg, #012639 0%, #002D42 97.29%)'
        boxShadow='0px 2px 10px 0px rgba(0, 0, 0, 0.18)'
        p={4}
      >
        <Dropdown
          options={[
            { text: 'Bonded', value: BondStatus.BOND_STATUS_BONDED as unknown as string },
            { text: 'UnBonded', value: BondStatus.BOND_STATUS_UNBONDED as unknown as string },
            { text: 'UnBonding', value: BondStatus.BOND_STATUS_UNBONDING as unknown as string },
          ]}
          value={selectedValidatorStatus}
          onChange={(event) => setSelectedValidatorStatus(event.target.value as unknown as BondStatus)}
          style={{ width: 200, height: 48 }}
        />
        <Table
          columns={columns}
          data={validators.filter((validator) => Number(validator.status) === Number(selectedValidatorStatus))}
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
          defaultValidator={validators.find((validator) => validator.address === selectedValidator)}
        />
      </ModalWrapper>
    </>
  )
}
export default Validators
