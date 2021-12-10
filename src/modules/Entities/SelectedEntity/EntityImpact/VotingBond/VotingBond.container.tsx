import BigNumber from 'bignumber.js'
import StakeToVoteModal from 'common/components/ControlPanel/Actions/StakeToVoteModal'
import WalletSelectModal from 'common/components/ControlPanel/Actions/WalletSelectModal'
import {
  Button, SectionTitle, SectionTitleContainer, Tiles
} from 'common/components/Dashboard'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import { RootState } from 'common/redux/types'
import { getBalanceNumber } from 'common/utils/currency.utils'
import { thousandSeparator } from 'common/utils/formatters'
import { getAccount } from 'modules/Account/Account.actions'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { selectUserBalances } from 'modules/Account/Account.selectors'
import { formatCurrency, tokenBalance } from 'modules/Account/Account.utils'
import { UserInfo } from 'modules/Account/types'
import { getBalances, getPriceHistory, getTransactionsByBondDID } from 'modules/BondModules/bond/bond.actions'
import { selectBalanceProps, selectPriceHistory, selectTransactionProps } from 'modules/BondModules/bond/bond.selectors'
import CandleStickChart from 'modules/BondModules/BondChart/components/CandleStickChart'
import BondTable from 'modules/BondModules/BondTable'
import * as entitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import React, { useEffect, useMemo, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px 40px;
  background: #f0f3f9;
  font-family: Roboto Condensed;
  font-weight: normal;
  padding-bottom: 100px;
`

export const ChartContainer = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, #f3f6fc 97.29%);
  box-shadow: 0px 4px 25px #e1e5ec;
  border-radius: 4px;
  padding: 35px;
`

const Icon = styled.div<{ bgColor: string }>`
  width: 2.5rem;
  height: 1.8rem;
  background: ${({ bgColor }): any => bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
`
interface Props {
  match: any
  bondDid: string
  userAddress: string
  userInfo: UserInfo
}

const VotingBond: React.FunctionComponent<Props> = ({
  // match,
  bondDid,
  userAddress,
  // userInfo,
}) => {
  const dispatch = useDispatch()
  const transactions: any = useSelector(selectTransactionProps) ?? [];
  const priceHistory: any = useSelector(selectPriceHistory) ?? [];
  const activeBond: any = useSelector(selectBalanceProps) ?? {};
  const balances: any = useSelector(selectUserBalances) ?? [];
  const [votingPower, setVotingPower] = useState(0)
  const [reserve, setReserve] = useState(0)
  const [stakeToVoteModalOpen, setStakeToVoteModalOpen] = useState(false)
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [walletType, setWalletType] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [modalTitle, setModalTitle] = useState('')
  const [selectedEntity, setSelectedEntity] = useState({ goal: '1000' })
  const [selectedHeader, setSelectedHeader] = useState('voting-price');
  const balance = tokenBalance(balances, activeBond.symbol)

  const formattedTarget = Number(
    selectedEntity.goal
      .split(' ')
      .pop()
      .replace(/[^\w\s]/gi, ''),
  )

  const myStakeInfo = `${(
    (getBalanceNumber(new BigNumber(balance.amount)) /
      activeBond.myStake.amount || 0) * 100
  ).toFixed(2)}%`

  const bondCapitalInfo = `${(
    (activeBond.capital.amount / formattedTarget || 0) * 100
  ).toFixed(2)}% of Funding Target`

  const reserveInfo = `${(
    (activeBond.reserve.amount / activeBond.capital.amount || 0) * 100
  ).toFixed(2)}% of Capital raise`

  const totalBondSupply = 100000

  useEffect(() => {
    dispatch(getAccount(userAddress))
    dispatch(getBalances(bondDid))
    dispatch(getTransactionsByBondDID(bondDid))
    dispatch(getPriceHistory(bondDid))
  }, [])

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const sum = transactions
        .filter((transaction) => transaction.buySell)
        .map((transaction) => transaction.amount)
        .reduce((total, entry) => total + entry)
      setVotingPower(sum)
    }
  }, [transactions])

  const tiles = useMemo(() => {
    return [
      {
        title: `${activeBond.price.denom?.toUpperCase()} to Vote`,
        subtle: 'Per Reward Share',
        value: activeBond.price.amount.toFixed(
          activeBond.price.amount >= 1 ? 2 : 6,
        ),
        to: '#',
        icon: <Icon bgColor="#39C3E6">{activeBond.price.denom?.toUpperCase()}</Icon>,
      },
      {
        title: 'My Share',
        subtle: myStakeInfo,
        value: activeBond.myStake.amount,
        icon: <Icon bgColor="#39C3E6">{activeBond.myStake.denom?.toUpperCase()}</Icon>,
      },
      {
        title: 'My Yield',
        subtle: bondCapitalInfo,
        value: activeBond.capital.amount.toFixed(2),
        icon: <Icon bgColor="#85AD5C">{(activeBond.reserveDenom === 'uixo'
        ? 'ixo'
        : activeBond.reserveDenom
      ).toUpperCase()}</Icon>,
      },
      {
        title: 'My Votes',
        subtle: reserveInfo,
        value: activeBond.reserve.amount.toFixed(2),
        icon: <Icon bgColor="#39C3E6">{(activeBond.reserveDenom === 'uixo'
        ? 'ixo'
        : activeBond.reserveDenom
      ).toUpperCase()}</Icon>,
      },
      {
        title: 'All Votes',
        subtle: `${new BigNumber(reserve)
          .dividedBy(totalBondSupply)
          .toNumber()
          .toFixed(2)}% of Target Outcome`,
        value: thousandSeparator(reserve.toFixed(2)),
        icon: <Icon bgColor="#39C3E6">{activeBond.symbol?.toUpperCase()}</Icon>,
      },
    ]
  }, [activeBond])

  const handleWalletSelect = (
    walletType: string,
    accountAddress: string,
  ): void => {
    setWalletType(walletType)
    setSelectedAddress(accountAddress)
    setWalletModalOpen(false)

    setStakeToVoteModalOpen(true)
    setModalTitle('Stake to Vote')
  }

  const handleStakeToVote = (): void => {
    setWalletModalOpen(true)
  }

  return (
    <div>
      <Tiles tiles={tiles} />
      <CandleStickChart
        priceHistory={
          priceHistory.map(({ price, time }) => ({
            time,
            price: formatCurrency({
              amount: price,
              denom: activeBond.reserveDenom,
            }).amount.toFixed(2),
          }))}
        transactions={
          transactions.map((transaction) => ({
            time: transaction.timestamp,
            price: Number(transaction.quantity),
            buySell: transaction.buySell,
            status: transaction.status,
          }))}
        denom={activeBond.myStake.denom}
        isDark={false}
      />
      <SectionTitleContainer>
        <SectionTitle>Voting Activity</SectionTitle>
        <Button onClick={handleStakeToVote}>Stake to VOTE</Button>
      </SectionTitleContainer>
      <BondTable selectedHeader={selectedHeader} isDark={false} isStake={true} activeBond={activeBond}/>
      <ModalWrapper
        isModalOpen={stakeToVoteModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setStakeToVoteModalOpen(false)}
      >
        <StakeToVoteModal
          walletType={walletType}
          accountAddress={selectedAddress}
          handleMethodChange={setModalTitle}
        />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={walletModalOpen}
        header={{
          title: 'Select Wallet',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setWalletModalOpen(false)}
      >
        <WalletSelectModal
          handleSelect={handleWalletSelect}
          availableWallets={['keysafe', 'keplr']}
        />
      </ModalWrapper>
    </div>
  )
}

const mapStateToProps = (state: RootState): any => ({
  bondDid: entitySelectors.selectEntityBondDid(state),
  userAddress: accountSelectors.selectUserAddress(state),
  userInfo: accountSelectors.selectUserInfo(state),
})

export default connect(mapStateToProps)(VotingBond)
