// import { ReactComponent as ArrowLeftIcon } from 'assets/images/icon-arrow-left.svg'
import { ReactComponent as CopyIcon } from 'assets/images/icon-copy.svg'
import BigNumber from 'bignumber.js'
import { FlexBox, GridContainer, SvgBox } from 'components/App/App.styles'
import { DepositModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import { useQuery } from 'hooks/window'
import { Button } from 'pages/CreateEntity/Components'
import { Card } from 'pages/CurrentEntity/Components'
import React, { useMemo, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useTheme } from 'styled-components'
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
