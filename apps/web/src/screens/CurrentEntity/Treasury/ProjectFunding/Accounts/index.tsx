//
import ArrowLeftIcon from 'assets/images/icon-arrow-left.svg'
import { customQueries } from '@ixo/impactxclient-sdk'

import CopyIcon from 'assets/images/icon-copy.svg'
import BigNumber from 'bignumber.js'
import { FlexBox, GridContainer, SvgBox } from 'components/App/App.styles'
import { DepositModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import { IxoCoinCodexRelayerApi } from 'hooks/configs'
import useCurrentEntity from 'hooks/currentEntity'
import { useQuery } from 'hooks/window'
import { GetBalances, GetTokenAsset } from 'lib/protocol'
import { Button } from 'screens/CreateEntity/Components'
import { Card } from 'screens/CurrentEntity/Components'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useTheme } from 'styled-components'
import { TDAOGroupModel } from 'types/entities'
import { determineChainFromAddress } from 'utils/account'
import { getDisplayAmount } from 'utils/currency'
import { truncateString } from 'utils/formatters'
import { successToast } from 'utils/toast'
import { Coins } from '../../Components/Coins'
import { Collections } from '../../Components/Collections'
import { ImpactTokens } from '../../Components/ImpactTokens'
import { Transactions } from '../../Components/Transactions'
import AccountsCard, { AccountTypeToIconMap } from '../../Components/AccountsCard'
import BalanceCard from '../../Components/BalanceCard'

export interface TTreasuryCoinModel {
  coinDenom: string
  coinImageUrl: string
  network: string
  lastPriceUsd: number
  balance: string
  address: string
}
export interface TTreasuryAccountModel {
  address: string
  name: string
  network: string
  type: string
  coins: { [denom: string]: TTreasuryCoinModel }
}

const Accounts: React.FC = () => {
  const theme: any = useTheme()
  const { getQuery } = useQuery()
  const expand: string | undefined = getQuery('expand')
  const { accounts: entityAccounts, linkedAccounts, daoGroups } = useCurrentEntity()

  const [accounts, setAccounts] = useState<{
    [address: string]: TTreasuryAccountModel
  }>({})

  const [selectedAccount, setSelectedAccount] = useState<TTreasuryAccountModel | undefined>(undefined)

  const [depositModalOpen, setDepositModalOpen] = useState(false)

  const Icon = useMemo(() => AccountTypeToIconMap[selectedAccount?.type || ''], [selectedAccount])

  const availableValue = useMemo(
    () =>
      Object.values(accounts)
        .flatMap((account) => (account.coins ? Object.values(account.coins) : []))
        .reduce(
          (total, coin) => new BigNumber(total).plus(new BigNumber(coin.balance).times(coin.lastPriceUsd)).toFixed(2),
          '0',
        ),
    [accounts],
  )

  // entityAccounts
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
                coins: {},
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

  // groupAccounts
  useEffect(() => {
    if (Object.keys(daoGroups).length > 0) {
      ;(async () => {
        await Promise.all(
          Object.values(daoGroups).map(async (daoGroup: TDAOGroupModel) => {
            setAccounts((accounts) => ({
              ...accounts,
              [daoGroup.coreAddress]: {
                address: daoGroup.coreAddress,
                name: daoGroup.config.name,
                type: 'group',
                network: 'ixo Network',
                coins: {},
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

  // linkedAccounts
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
                coins: {},
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

  const updateNativeTokenBalances = useCallback(async (address: string): Promise<TTreasuryCoinModel[]> => {
    if (!address) {
      return []
    }
    const chainInfo = await determineChainFromAddress(address)
    if (!chainInfo) {
      return []
    }

    const balances = await GetBalances(address, chainInfo.rpc)

    const coins: TTreasuryCoinModel[] = (await Promise.all(
      await balances
        .map(async ({ amount, denom }) => {
          const token = await GetTokenAsset(denom)
          const tokenInfo = await customQueries.currency.findTokenInfoFromDenom(
            token.coinMinimalDenom,
            true,
            IxoCoinCodexRelayerApi,
          )
          if (!tokenInfo) {
            return undefined
          }
          const { coinName, lastPriceUsd } = tokenInfo
          const payload = {
            address,
            balance: getDisplayAmount(amount, token.coinDecimals),
            network: `${coinName.toUpperCase()}`,
            coinDenom: token.coinDenom,
            coinImageUrl: token.coinImageUrl!,
            lastPriceUsd,
          }
          return payload
        })
        .filter((v) => v !== undefined),
    )) as TTreasuryCoinModel[]
    return coins
  }, [])

  useEffect(() => {
    Object.values(accounts).forEach((account) => {
      updateNativeTokenBalances(account.address).then((coins: TTreasuryCoinModel[]) => {
        coins.forEach((coin) => {
          setAccounts((v) => ({
            ...v,
            [coin.address]: {
              ...v[coin.address],
              coins: { ...(v[coin.address]?.coins ?? {}), [coin.coinDenom]: coin },
            },
          }))
        })
      })
    })
    return () => {
      //
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(Object.keys(accounts))])

  return (
    <FlexBox $direction='column' $gap={6} width='100%' color='white'>
      <GridContainer columns={2} $gridGap={6} width='100%'>
        <BalanceCard availableValue={availableValue} stakedValue={'0.00'} />

        <AccountsCard
          accounts={accounts}
          onSelect={(address: string) => {
            setSelectedAccount(accounts[address])
          }}
        />
      </GridContainer>

      {selectedAccount ? (
        <>
          <FlexBox width='100%' $alignItems='center' $justifyContent='space-between' $gap={2}>
            <FlexBox $alignItems='center' $gap={2}>
              <Typography variant='secondary' size='2xl' transform='capitalize'>
                {selectedAccount.name} Account
              </Typography>
              <FlexBox $alignItems='center' $gap={2} px={2} py={1} $borderRadius='100px' background={theme.ixoDarkBlue}>
                {Icon && (
                  <SvgBox $svgWidth={6} $svgHeight={6} color={theme.ixoWhite}>
                    <Icon />
                  </SvgBox>
                )}
                <Typography>{selectedAccount.type} account</Typography>
              </FlexBox>
            </FlexBox>
            {selectedAccount.type !== 'linked' && (
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
            )}
          </FlexBox>
          <CopyToClipboard text={selectedAccount.address} onCopy={() => successToast(`Copied to clipboard`)}>
            <FlexBox $alignItems='center' $gap={2} onClick={(e) => e.stopPropagation()} cursor='pointer'>
              <Typography variant='secondary' color='blue' hover={{ underline: true }}>
                {truncateString(selectedAccount.address, 20, 'middle')}
              </Typography>
              <SvgBox color={theme.ixoNewBlue} $svgWidth={6} $svgHeight={6}>
                <CopyIcon />
              </SvgBox>
            </FlexBox>
          </CopyToClipboard>

          {/* Grid Layout  */}
          <GridContainer columns={2} $gridGap={6} width='100%' style={expand ? { display: 'none' } : {}}>
            <FlexBox>
              <Card label='Coins'>
                <Coins coins={selectedAccount.coins} />
              </Card>
            </FlexBox>
            <FlexBox>
              <Card label='Impact Tokens'>
                <ImpactTokens address={selectedAccount.address} />
              </Card>
            </FlexBox>
            <FlexBox>
              <Card label='Collections'>
                <Collections address={selectedAccount.address} />
              </Card>
            </FlexBox>
            <FlexBox>
              <Card label='Transactions'>
                <Transactions address={selectedAccount.address} />
              </Card>
            </FlexBox>
          </GridContainer>

          {selectedAccount.address && depositModalOpen && (
            <DepositModal recipient={selectedAccount.address} open={depositModalOpen} setOpen={setDepositModalOpen} />
          )}
        </>
      ) : (
        <FlexBox width='100%' $justifyContent='center' color={theme.ixoDarkBlue}>
          <Typography variant='secondary' size='2xl'>
            Select an Account to View
          </Typography>
        </FlexBox>
      )}
    </FlexBox>
  )
}

export default Accounts
