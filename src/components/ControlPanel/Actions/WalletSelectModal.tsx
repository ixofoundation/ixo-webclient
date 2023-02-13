import React, { useState, useEffect } from 'react'
import * as keplr from 'lib/keplr/keplr'
import styled from 'styled-components'
// import IMG_wallet1 from 'assets/images/icon-walletconnect.svg'
import IMG_wallet2 from 'assets/images/icon-keplr.svg'
import IMG_wallet3 from 'assets/images/icon-keysafe.svg'
import { WalletBox } from 'components/Entities/SelectedEntity/EntityExchange/Trade/Swap.styles'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import keysafe from 'lib/keysafe/keysafe'
import { deviceWidth } from 'constants/device'
import { selectAccountSelectedWallet } from 'redux/account/account.selectors'
import { WalletType } from 'redux/account/account.types'
import { chooseWalletAction, setKeplrWallet } from 'redux/account/account.actions'

const Container = styled.div`
  position: relative;
  padding: 2rem;
  width: 30rem;
  max-width: 100%;

  @media (max-width: ${deviceWidth.mobile}px) {
    padding: 0.5rem;
  }
`

interface Props {
  handleSelect: (type: string, address: string) => void
  availableWallets: string[]
}

const WalletSelectModal: React.FunctionComponent<Props> = ({ handleSelect, availableWallets }) => {
  const dispatch = useAppDispatch()
  const [walletType, setWalletType] = useState<string | null>(null)
  const { address } = useAppSelector((state) => state.account)
  const selectedWallet = useAppSelector(selectAccountSelectedWallet)

  const handleWalletSelect = async (type: string): Promise<void> => {
    switch (type) {
      case WalletType.Keysafe:
        setWalletType(WalletType.Keysafe)
        if (address) {
          handleSelect(type, address)
        } else {
          keysafe.popupKeysafe()
        }
        dispatch(chooseWalletAction(WalletType.Keysafe))
        break
      case WalletType.Keplr:
        {
          setWalletType(WalletType.Keplr)
          const [accounts, offlineSigner] = await keplr.connectAccount()
          handleSelect(type, accounts[0].address)
          dispatch(chooseWalletAction(WalletType.Keplr))
          dispatch(setKeplrWallet(accounts[0].address, offlineSigner))
        }
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (address && walletType === WalletType.Keysafe) {
      handleSelect(walletType!, address)
    }
    // eslint-disable-next-line
  }, [address, walletType])

  if (selectedWallet) {
    handleSelect(selectedWallet, '')
    return null
  }

  return (
    <Container>
      <div className='mx-4'>
        {/* <WalletBox
          onClick={(): Promise<void> => handleWalletSelect('walletconnect')}
        >
          <img src={IMG_wallet1} alt="wallet1" />
          <span>WalletConnect</span>
        </WalletBox> */}
        {availableWallets.includes(WalletType.Keplr) && keplr.checkExtensionAndBrowser() && (
          <WalletBox onClick={(): Promise<void> => handleWalletSelect(WalletType.Keplr)}>
            <img src={IMG_wallet2} alt='wallet2' />
            <span>Keplr</span>
          </WalletBox>
        )}
        {availableWallets.includes(WalletType.Keysafe) && keysafe && (
          <WalletBox onClick={(): Promise<void> => handleWalletSelect(WalletType.Keysafe)}>
            <img src={IMG_wallet3} alt='wallet3' />
            <span>ixo Keysafe</span>
          </WalletBox>
        )}
      </div>
    </Container>
  )
}

export default WalletSelectModal
