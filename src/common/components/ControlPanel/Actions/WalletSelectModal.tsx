import React from 'react'
import styled from 'styled-components'

import IMG_wallet1 from 'assets/images/exchange/wallet1.svg'
import IMG_wallet2 from 'assets/images/exchange/wallet2.svg'
import IMG_wallet3 from 'assets/images/exchange/wallet3.svg'
import { WalletBox } from 'modules/Entities/SelectedEntity/EntityExchange/Trade/Trade.container.styles'

const Container = styled.div`
  position: relative;
  padding: 2rem;
  min-width: 30rem;
`

interface Props {
  handleSelect: (wallet: string) => void
}

const WalletSelectModal: React.FunctionComponent<Props> = ({
  handleSelect,
}) => {
  return (
    <Container>
      <div className="mx-4">
        <WalletBox onClick={(): void => handleSelect('walletconnect')}>
          <img src={IMG_wallet1} alt="wallet1" />
          <span>WalletConnect</span>
        </WalletBox>
        <WalletBox onClick={(): void => handleSelect('keplr')}>
          <img src={IMG_wallet2} alt="wallet2" />
          <span>Keplr</span>
        </WalletBox>
        <WalletBox onClick={(): void => handleSelect('keysafe')}>
          <img src={IMG_wallet3} alt="wallet3" />
          <span>ixo Keysafe</span>
        </WalletBox>
      </div>
    </Container>
  )
}

export default WalletSelectModal
