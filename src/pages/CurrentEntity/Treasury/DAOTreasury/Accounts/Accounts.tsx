// import { ReactComponent as ArrowLeftIcon } from 'assets/images/icon-arrow-left.svg'
import { ReactComponent as CopyIcon } from 'assets/images/icon-copy.svg'
import { FlexBox, GridContainer, SvgBox } from 'components/App/App.styles'
import { DepositModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import useCurrentDao from 'hooks/currentDao'
import useCurrentEntity from 'hooks/currentEntity'
import { useQuery } from 'hooks/window'
import { Button } from 'pages/CreateEntity/Components'
import { Card } from 'pages/CurrentEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useHistory } from 'react-router-dom'
import { DaoGroup } from 'redux/currentEntity/dao/currentDao.types'
import { useTheme } from 'styled-components'
import { truncateString } from 'utils/formatters'
import { successToast } from 'utils/toast'
import { Coins } from '../../Components/Coins'
import { Collections } from '../../Components/Collections'
import { ImpactTokens } from '../../Components/ImpactTokens'
import { Transactions } from '../../Components/Transactions'
import AccountsCard, { AccountTypeToIconMap } from './AccountsCard/AccountsCard'
import BalanceCard from './BalanceCard/BalanceCard'

const Accounts: React.FC = () => {
  const theme: any = useTheme()
  const history = useHistory()
  const { getQuery } = useQuery()
  const expand: string | undefined = getQuery('expand')
  const { accounts: entityAccounts, linkedAccounts } = useCurrentEntity()
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

  const [selectedAccount, setSelectedAccount] = useState<
    { address: string; name: string; network: string; type: string; balance: string } | undefined
  >(undefined)

  const [depositModalOpen, setDepositModalOpen] = useState(false)

  const Icon = useMemo(() => AccountTypeToIconMap[selectedAccount?.type || ''], [selectedAccount])

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
                network: 'ixo Network',
                balance: '0',
              },
            }))
          }),
        )
      })()
    }
    return () => {
      setAccounts((accounts) =>
        Object.fromEntries(Object.entries(accounts).filter(([key, value]) => value.type !== 'entity')),
      )
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
                network: 'ixo Network',
                balance: '0',
              },
            }))
          }),
        )
      })()
    }
    return () => {
      setAccounts((accounts) =>
        Object.fromEntries(Object.entries(accounts).filter(([key, value]) => value.type !== 'group')),
      )
    }
  }, [daoGroups])

  useEffect(() => {
    if (linkedAccounts.length > 0) {
      ;(async () => {
        await Promise.all(
          linkedAccounts.map((account) => {
            setAccounts((accounts) => ({
              ...accounts,
              [account.id]: {
                address: account.id,
                name: truncateString(account.id, 15),
                type: 'linked',
                network: account.relationship,
                balance: '0',
              },
            }))
            return ''
          }),
        )
      })()
      return () => {
        setAccounts((accounts) =>
          Object.fromEntries(Object.entries(accounts).filter(([key, value]) => value.type !== 'linked')),
        )
      }
    }
  }, [linkedAccounts])

  return (
    <FlexBox direction='column' gap={6} width='100%' color='white'>
      <GridContainer columns={2} gridGap={6} width='100%'>
        <BalanceCard account={selectedAccount} />

        <AccountsCard
          accounts={accounts}
          onSelect={(address: string) => {
            setSelectedAccount(accounts[address])
          }}
        />
      </GridContainer>

      {selectedAccount ? (
        <>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between' gap={2}>
            <FlexBox alignItems='center' gap={2}>
              <Typography variant='secondary' size='2xl' transform='capitalize'>
                {selectedAccount.name} Account
              </Typography>
              <FlexBox alignItems='center' gap={2} px={2} py={1} borderRadius='100px' background={theme.ixoDarkBlue}>
                {Icon && (
                  <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoWhite}>
                    <Icon />
                  </SvgBox>
                )}
                <Typography>{selectedAccount.type} account</Typography>
              </FlexBox>
            </FlexBox>
            <Button
              variant='secondary'
              onClick={() => setDepositModalOpen(true)}
              size='flex'
              height={40}
              textSize='base'
              textTransform='capitalize'
              textWeight='medium'
            >
              Deposit
            </Button>
          </FlexBox>
          <CopyToClipboard text={selectedAccount.address} onCopy={() => successToast(`Copied to clipboard`)}>
            <FlexBox alignItems='center' gap={2} onClick={(e) => e.stopPropagation()} cursor='pointer'>
              <Typography variant='secondary' color='blue' hover={{ underline: true }}>
                {truncateString(selectedAccount.address, 20, 'middle')}
              </Typography>
              <SvgBox color={theme.ixoNewBlue} svgWidth={6} svgHeight={6}>
                <CopyIcon />
              </SvgBox>
            </FlexBox>
          </CopyToClipboard>

          {/* Grid Layout  */}
          <GridContainer columns={2} gridGap={6} width='100%' style={expand ? { display: 'none' } : {}}>
            <FlexBox>
              <Card
                label='Coins'
                onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=coins` })}
              >
                <Coins address={selectedAccount.address} />
              </Card>
            </FlexBox>
            <FlexBox>
              <Card
                label='Impact Tokens'
                onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=impact_tokens` })}
              >
                <ImpactTokens address={selectedAccount.address} />
              </Card>
            </FlexBox>
            <FlexBox>
              <Card
                label='Collections'
                onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=collections` })}
              >
                <Collections address={selectedAccount.address} />
              </Card>
            </FlexBox>
            <FlexBox>
              <Card
                label='Transactions'
                onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=transactions` })}
              >
                <Transactions address={selectedAccount.address} />
              </Card>
            </FlexBox>
          </GridContainer>

          {/* Coins expanded view */}
          {/* <FlexBox width='100%' style={expand !== 'coins' ? { display: 'none' } : {}}>
            <Card label='Coins' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
              <Coins address={selectedAccount.address} />
            </Card>
          </FlexBox> */}

          {/* Impact Tokens expanded view */}
          {/* <FlexBox width='100%' style={expand !== 'impact_tokens' ? { display: 'none' } : {}}>
            <Card label='Impact Tokens' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
              <ImpactTokens address={selectedAccount.address} />
            </Card>
          </FlexBox> */}

          {/* Collections expanded view */}
          {/* <FlexBox width='100%' style={expand !== 'collections' ? { display: 'none' } : {}}>
            <Card label='Collections' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
              <Collections address={selectedAccount.address} />
            </Card>
          </FlexBox> */}

          {/* Transactions expanded view */}
          {/* <FlexBox width='100%' style={expand !== 'transactions' ? { display: 'none' } : {}}>
            <Card label='Transactions' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
              <Transactions address={selectedAccount.address} />
            </Card>
          </FlexBox> */}
          {selectedAccount.address && depositModalOpen && (
            <DepositModal recipient={selectedAccount.address} open={depositModalOpen} setOpen={setDepositModalOpen} />
          )}
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
