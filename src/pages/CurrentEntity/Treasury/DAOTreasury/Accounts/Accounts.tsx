import { FlexBox, GridContainer, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useQuery } from 'hooks/window'
import { Card } from 'pages/CurrentEntity/Components'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import BalanceCard from './BalanceCard/BalanceCard'
import { Coins } from '../../Components/Coins'
import { Collections } from '../../Components/Collections'
import { ImpactTokens } from '../../Components/ImpactTokens'
import { Transactions } from '../../Components/Transactions'
import { ReactComponent as ArrowLeftIcon } from 'assets/images/icon-arrow-left.svg'
import AccountsCard from './AccountsCard/AccountsCard'
import useCurrentEntity from 'hooks/currentEntity'
import useCurrentDao from 'hooks/currentDao'
import { DaoGroup } from 'redux/currentEntity/dao/currentDao.types'

const Accounts: React.FC = () => {
  const history = useHistory()
  const { getQuery } = useQuery()
  const expand: string | undefined = getQuery('expand')
  const { accounts: entityAccounts } = useCurrentEntity()
  const { daoGroups } = useCurrentDao()

  const [accounts, setAccounts] = useState<{
    [address: string]: {
      address: string
      name: string
      network: string
      type: string //  entity | group | linked
      balance: string
    }
  }>({})

  const [selectedAcccount, setSelectedAccount] = useState<
    { address: string; name: string; network: string; type: string; balance: string } | undefined
  >(undefined)

  useEffect(() => {
    if (entityAccounts.length > 0) {
      ;(async () => {
        await Promise.all(
          entityAccounts.map(async (account) => {
            setAccounts((accounts) => ({
              ...accounts,
              [account.address]: {
                address: account.address,
                name: account.name,
                type: 'entity',
                network: 'ixo',
                balance: '0',
              },
            }))
          }),
        )
      })()
    }
    return () => {
      //
    }
  }, [entityAccounts])

  useEffect(() => {
    if (Object.keys(daoGroups).length > 0) {
      ;(async () => {
        await Promise.all(
          Object.values(daoGroups).map(async (daoGroup: DaoGroup) => {
            setAccounts((accounts) => ({
              ...accounts,
              [daoGroup.coreAddress]: {
                address: daoGroup.coreAddress,
                name: daoGroup.config.name,
                type: 'group',
                network: 'ixo',
                balance: '0',
              },
            }))
          }),
        )
      })()
    }
    return () => {
      //
    }
  }, [daoGroups])

  return (
    <FlexBox direction='column' gap={6} width='100%' color='white'>
      <GridContainer columns={2} gridGap={6} width='100%'>
        <BalanceCard account={selectedAcccount} />

        <AccountsCard
          accounts={accounts}
          onSelect={(address: string) => {
            setSelectedAccount(accounts[address])
          }}
        />
      </GridContainer>

      {selectedAcccount ? (
        <>
          <FlexBox>
            <Typography variant='secondary' size='2xl' transform='capitalize'>
              {selectedAcccount?.name} Account
            </Typography>
          </FlexBox>

          {/* Grid Layout  */}
          <GridContainer columns={2} gridGap={6} width='100%' style={expand ? { display: 'none' } : {}}>
            <FlexBox>
              <Card
                label='Coins'
                onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=coins` })}
              >
                <Coins address={selectedAcccount.address} />
              </Card>
            </FlexBox>
            <FlexBox>
              <Card
                label='Impact Tokens'
                onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=impact_tokens` })}
              >
                <ImpactTokens address={selectedAcccount.address} />
              </Card>
            </FlexBox>
            <FlexBox>
              <Card
                label='Collections'
                onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=collections` })}
              >
                <Collections address={selectedAcccount.address} />
              </Card>
            </FlexBox>
            <FlexBox>
              <Card
                label='Transactions'
                onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=transactions` })}
              >
                <Transactions address={selectedAcccount.address} />
              </Card>
            </FlexBox>
          </GridContainer>

          {/* Coins expanded view */}
          <FlexBox width='100%' style={expand !== 'coins' ? { display: 'none' } : {}}>
            <Card label='Coins' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
              <Coins address={selectedAcccount.address} />
            </Card>
          </FlexBox>

          {/* Impact Tokens expanded view */}
          <FlexBox width='100%' style={expand !== 'impact_tokens' ? { display: 'none' } : {}}>
            <Card label='Impact Tokens' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
              <ImpactTokens address={selectedAcccount.address} />
            </Card>
          </FlexBox>

          {/* Collections expanded view */}
          <FlexBox width='100%' style={expand !== 'collections' ? { display: 'none' } : {}}>
            <Card label='Collections' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
              <Collections address={selectedAcccount.address} />
            </Card>
          </FlexBox>

          {/* Transactions expanded view */}
          <FlexBox width='100%' style={expand !== 'transactions' ? { display: 'none' } : {}}>
            <Card label='Transactions' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
              <Transactions address={selectedAcccount.address} />
            </Card>
          </FlexBox>
        </>
      ) : (
        <FlexBox width='100%' justifyContent='center' color={theme.ixoDarkBlue}>
          <Typography variant='secondary' size='2xl'>
            Select Account to view details
          </Typography>
        </FlexBox>
      )}
    </FlexBox>
  )
}

export default Accounts
