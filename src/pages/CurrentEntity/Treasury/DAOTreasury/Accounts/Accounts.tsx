// import { ReactComponent as ArrowLeftIcon } from 'assets/images/icon-arrow-left.svg'
import { contracts, customQueries } from '@ixo/impactxclient-sdk'
import { ReactComponent as CopyIcon } from 'assets/images/icon-copy.svg'
import BigNumber from 'bignumber.js'
import { FlexBox, GridContainer, SvgBox } from 'components/App/App.styles'
import { DepositModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import { IxoCoinCodexRelayerApi } from 'hooks/configs'
import useCurrentEntity from 'hooks/currentEntity'
import { useQuery } from 'hooks/window'
import { GetBalances } from 'lib/protocol'
import { Button } from 'pages/CreateEntity/Components'
import { Card } from 'pages/CurrentEntity/Components'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useTheme } from 'styled-components'
import { TDAOGroupModel } from 'types/entities'
import { determineChainFromAddress } from 'utils/account'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import { getDisplayAmount } from 'utils/currency'
import { truncateString } from 'utils/formatters'
import { errorToast, successToast } from 'utils/toast'
import { Coins } from '../../Components/Coins'
import { Collections } from '../../Components/Collections'
import { ImpactTokens } from '../../Components/ImpactTokens'
import { Transactions } from '../../Components/Transactions'
import AccountsCard, { AccountTypeToIconMap } from './AccountsCard/AccountsCard'
import BalanceCard from './BalanceCard/BalanceCard'

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
  const { cwClient } = useAccount()
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

  const updateNativeTokenBalance = useCallback(async (address: string): Promise<TTreasuryCoinModel> => {
    return new Promise((resolve, reject) => {
      if (!address) {
        reject()
        return
      }
      determineChainFromAddress(address).then((chainInfo) => {
        const { rpc } = chainInfo

        GetBalances(address, rpc)
          .then((balances) => {
            balances.forEach(({ amount, denom }) => {
              /**
               * @description find token info from currency list via sdk
               */
              const token = customQueries.currency.findTokenFromDenom(denom)

              if (token) {
                customQueries.currency
                  .findTokenInfoFromDenom(token.coinMinimalDenom, true, IxoCoinCodexRelayerApi)
                  .then((response) => {
                    if (!response) {
                      throw new Error('Not found')
                    }
                    const { coinName, lastPriceUsd } = response
                    const payload = {
                      address,
                      balance: getDisplayAmount(amount, token.coinDecimals),
                      network: `${coinName.toUpperCase()}`,
                      coinDenom: token.coinDenom,
                      coinImageUrl: token.coinImageUrl!,
                      lastPriceUsd,
                    }
                    resolve(payload)
                  })
                  .catch((e) => {
                    console.error(e)
                    reject()
                  })
              }
            })
          })
          .catch((e) => {
            errorToast('Error', e.toString())
            reject()
          })
      })
    })
  }, [])

  const updateCw20TokenBalance = useCallback(
    async (address): Promise<TTreasuryCoinModel> => {
      const daoGroup = daoGroups[address]
      const type = daoGroup?.type
      const votingModuleAddress = daoGroup?.votingModule.votingModuleAddress

      if (type === 'membership' || !votingModuleAddress) {
        throw new Error('')
      }
      const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
        cwClient,
        votingModuleAddress,
      )

      const stakingContract = await daoVotingCw20StakedClient.stakingContract()
      const cw20StakeClient = new contracts.Cw20Stake.Cw20StakeQueryClient(cwClient, stakingContract)
      const { total: microTotalValue } = await cw20StakeClient.totalValue()

      const tokenContract = await daoVotingCw20StakedClient.tokenContract()
      const cw20BaseClient = new contracts.Cw20Base.Cw20BaseQueryClient(cwClient, tokenContract)
      const tokenInfo = await cw20BaseClient.tokenInfo()
      const marketingInfo = await cw20BaseClient.marketingInfo()
      const totalValue = convertMicroDenomToDenomWithDecimals(microTotalValue, tokenInfo.decimals).toString()

      const payload = {
        address,
        coinDenom: tokenInfo.symbol,
        network: 'IXO',
        balance: totalValue,
        coinImageUrl: marketingInfo?.logo !== 'embedded' ? marketingInfo.logo?.url ?? '' : '',
        lastPriceUsd: 0,
      }
      return payload
    },
    [cwClient, daoGroups],
  )

  useEffect(() => {
    Object.values(accounts).forEach((account) => {
      updateNativeTokenBalance(account.address).then((coin: TTreasuryCoinModel) => {
        setAccounts((v) => ({
          ...v,
          [coin.address]: { ...v[coin.address], coins: { ...v[coin.address].coins, [coin.coinDenom]: coin } },
        }))
      })
      updateCw20TokenBalance(account.address).then((coin: TTreasuryCoinModel) => {
        setAccounts((v) => ({
          ...v,
          [coin.address]: { ...v[coin.address], coins: { ...(v[coin.address]?.coins ?? {}), [coin.coinDenom]: coin } },
        }))
      })
    })
    return () => {
      //
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(Object.keys(accounts))])

  return (
    <FlexBox direction='column' gap={6} width='100%' color='white'>
      <GridContainer columns={2} gridGap={6} width='100%'>
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
                // onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=coins` })}
              >
                <Coins coins={selectedAccount.coins} />
              </Card>
            </FlexBox>
            <FlexBox>
              <Card
                label='Impact Tokens'
                // onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=impact_tokens` })}
              >
                <ImpactTokens address={selectedAccount.address} />
              </Card>
            </FlexBox>
            <FlexBox>
              <Card
                label='Collections'
                // onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=collections` })}
              >
                <Collections address={selectedAccount.address} />
              </Card>
            </FlexBox>
            <FlexBox>
              <Card
                label='Transactions'
                // onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=transactions` })}
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
