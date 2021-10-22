import React, { useState, useEffect } from 'react'
import * as keplr from 'common/utils/keplr'
import styled from 'styled-components'

// import IMG_wallet1 from 'assets/images/exchange/wallet1.svg'
import IMG_wallet2 from 'assets/images/exchange/wallet2.svg'
import IMG_wallet3 from 'assets/images/exchange/wallet3.svg'
import { WalletBox } from 'modules/Entities/SelectedEntity/EntityExchange/Trade/Trade.container.styles'
import { RootState } from 'common/redux/types'
import { useSelector } from 'react-redux'
import keysafe from 'common/keysafe/keysafe'

const Container = styled.div`
  position: relative;
  padding: 2rem;
  min-width: 30rem;
`

interface Props {
  handleSelect: (type: string, address: string) => void
}

const WalletSelectModal: React.FunctionComponent<Props> = ({
  handleSelect,
}) => {
  const [walletType, setWalletType] = useState<string>(null)
  const { address } = useSelector((state: RootState) => state.account)

  const handleWalletSelect = async (type: string): Promise<void> => {
    switch (type) {
      case 'keysafe':
        setWalletType('keysafe')
        if (address) {
          handleSelect(type, address)
        } else {
          keysafe.popupKeysafe()
        }
        break
      case 'keplr':
        {
          setWalletType('keplr')
          const [accounts] = await keplr.connectAccount()
          handleSelect(type, accounts[0].address)
        }
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (address && walletType === 'keysafe') {
      handleSelect(walletType, address)
    }
  }, [address, walletType])

  return (
    <Container>
      <div className="mx-4">
        {/* <WalletBox
          onClick={(): Promise<void> => handleWalletSelect('walletconnect')}
        >
          <img src={IMG_wallet1} alt="wallet1" />
          <span>WalletConnect</span>
        </WalletBox> */}
        {keplr.checkExtensionAndBrowser() && (
          <WalletBox onClick={(): Promise<void> => handleWalletSelect('keplr')}>
            <img src={IMG_wallet2} alt="wallet2" />
            <span>Keplr</span>
          </WalletBox>
        )}
        {keysafe && (
          <WalletBox
            onClick={(): Promise<void> => handleWalletSelect('keysafe')}
          >
            <img src={IMG_wallet3} alt="wallet3" />
            <span>ixo Keysafe</span>
          </WalletBox>
        )}
      </div>
    </Container>
  )
}

export default WalletSelectModal
