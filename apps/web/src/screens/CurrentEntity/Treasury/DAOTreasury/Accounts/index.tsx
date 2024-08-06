import Image from 'next/image'
import BigNumber from 'bignumber.js'
import { DepositModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import { useQuery } from 'hooks/window'
import { Button } from 'screens/CreateEntity/Components'
import { Card } from 'screens/CurrentEntity/Components'
import React, { useMemo, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Flex, Grid, useMantineTheme } from '@mantine/core'
import { truncateString } from 'utils/formatters'
import { successToast } from 'utils/toast'
import { Coins } from '../../Components/Coins'
import { Collections } from '../../Components/Collections'
import { ImpactTokens } from '../../Components/ImpactTokens'
import { Transactions } from '../../Components/Transactions'
import AccountsCard, { AccountTypeToIconMap } from '../../Components/AccountsCard'
import BalanceCard from '../../Components/BalanceCard'
import { useCurrentEntityTreasury } from 'hooks/treasury/useCurrentEntityTreasury'
import { useParams } from 'react-router-dom'
import { IconArrowLeft, IconCopy } from 'components/IconPaths'

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
  const theme = useMantineTheme()
  const { getQuery } = useQuery()
  const expand: string | undefined = getQuery('expand')
  const { entityId = '' } = useParams<{ entityId: string }>()

  const accounts = useCurrentEntityTreasury({ entityId })

  const [selectedAccount, setSelectedAccount] = useState<TTreasuryAccountModel | undefined>(undefined)
  const [depositModalOpen, setDepositModalOpen] = useState(false)

  console.log({ accounts, selectedAccount })

  const Icon = useMemo(() => AccountTypeToIconMap[selectedAccount?.type || ''], [selectedAccount])

  const availableValue = useMemo(
    () =>
      Object.values(accounts)
        .flatMap((account) => (account.coins ? Object.values(account.coins) : []))
        .reduce(
          (total, coin) =>
            new BigNumber(total).plus(new BigNumber(coin?.balance ?? '0').times(coin?.lastPriceUsd ?? '0')).toFixed(2),
          '0',
        ),
    [accounts],
  )

  return (
    <Flex direction='column' gap={6} w='100%' color='white'>
      <Grid columns={2} gutter={6} w='100%'>
        <BalanceCard availableValue={availableValue} stakedValue={'0.00'} />

        <AccountsCard
          accounts={accounts}
          onSelect={(address: string) => {
            setSelectedAccount(accounts[address])
          }}
        />
      </Grid>

      {selectedAccount ? (
        <>
          <Flex w='100%' align='center' justify='space-between' gap={2}>
            <Flex align='center' gap={2}>
              <Typography variant='secondary' size='2xl' transform='capitalize'>
                {selectedAccount.name}
              </Typography>
              <Flex align='center' gap={2} px={2} py={1} bg={theme.colors.blue[5]} style={{ borderRadius: '100px' }}>
                {Icon && <Icon />}
                <Typography>{selectedAccount.type} account</Typography>
              </Flex>
            </Flex>
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
          </Flex>
          <CopyToClipboard text={selectedAccount.address} onCopy={() => successToast(`Copied to clipboard`)}>
            <Flex align='center' gap={2} onClick={(e) => e.stopPropagation()} style={{ cursor: 'pointer' }}>
              <Typography variant='secondary' color='blue' hover={{ underline: true }}>
                {truncateString(selectedAccount.address, 20, 'middle')}
              </Typography>
              <Image src={IconCopy} alt='Copy' width={5} height={5} color={theme.colors.blue[5]} />
            </Flex>
          </CopyToClipboard>

          {/* Grid Layout  */}
          <Grid columns={2} gutter={6} w='100%' style={expand ? { display: 'none' } : {}}>
            <Flex>
              <Card
                label='Coins'
                // onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=coins` })}
              >
                <Coins coins={selectedAccount.coins} />
              </Card>
            </Flex>
            <Flex>
              <Card
                label='Impact Tokens'
                // onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=impact_tokens` })}
              >
                <ImpactTokens address={selectedAccount.address} />
              </Card>
            </Flex>
            <Flex>
              <Card
                label='Collections'
                // onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=collections` })}
              >
                <Collections address={selectedAccount.address} />
              </Card>
            </Flex>
            <Flex>
              <Card
                label='Transactions'
                // onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=transactions` })}
              >
                <Transactions address={selectedAccount.address} />
              </Card>
            </Flex>
          </Grid>

          {/* Coins expanded view */}
          {/* <Flex width='100%' style={expand !== 'coins' ? { display: 'none' } : {}}>
            <Card label='Coins' actionIcon={<Image src={IconArrowLeft} alt='ArrowLeft' width={5} height={5} color={theme.colors.blue[5]} />} onAction={() => history.goBack()}>
              <Coins address={selectedAccount.address} />
            </Card>
          </Flex> */}

          {/* Impact Tokens expanded view */}
          {/* <Flex width='100%' style={expand !== 'impact_tokens' ? { display: 'none' } : {}}>
            <Card label='Impact Tokens' actionIcon={<Image src={IconArrowLeft} alt='ArrowLeft' width={5} height={5} color={theme.colors.blue[5]} />} onAction={() => history.goBack()}>
              <ImpactTokens address={selectedAccount.address} />
            </Card>
          </Flex> */}

          {/* Collections expanded view */}
          {/* <Flex width='100%' style={expand !== 'collections' ? { display: 'none' } : {}}>
            <Card label='Collections' actionIcon={<Image src={IconArrowLeft} alt='ArrowLeft' width={5} height={5} color={theme.colors.blue[5]} />} onAction={() => history.goBack()}>
              <Collections address={selectedAccount.address} />
            </Card>
          </Flex> */}

          {/* Transactions expanded view */}
          {/* <Flex width='100%' style={expand !== 'transactions' ? { display: 'none' } : {}}>
            <Card label='Transactions' actionIcon={<Image src={IconArrowLeft} alt='ArrowLeft' width={5} height={5} color={theme.colors.blue[5]} />} onAction={() => history.goBack()}>
              <Transactions address={selectedAccount.address} />
            </Card>
          </Flex> */}
          {selectedAccount.address && depositModalOpen && (
            <DepositModal recipient={selectedAccount.address} open={depositModalOpen} setOpen={setDepositModalOpen} />
          )}
        </>
      ) : (
        <Flex w='100%' justify='center' color={theme.colors.blue[5]}>
          <Typography variant='secondary' size='2xl'>
            Select an Account to View
          </Typography>
        </Flex>
      )}
    </Flex>
  )
}

export default Accounts
