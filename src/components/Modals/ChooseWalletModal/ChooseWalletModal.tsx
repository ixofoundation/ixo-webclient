import React from 'react'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { useAccount } from 'hooks/account'
import { useKeplr } from 'lib/keplr/keplr'
import KeplrIcon from 'assets/images/icon-keplr.svg'
import { Container, WalletBox } from './styles'
import { Typography } from 'components/Typography'
import { WalletType } from '@gssuper/cosmodal'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const ChooseWalletModal: React.FC<Props> = ({ open, setOpen }): JSX.Element => {
  const { chooseWallet } = useAccount()
  const keplr = useKeplr()

  const isKeplrInstalled: boolean = keplr.getKeplr()

  const handleChooseWallet = async (type: WalletType): Promise<void> => {
    switch (type) {
      case WalletType.Keplr:
        if (await keplr.connect()) {
          chooseWallet(WalletType.Keplr)
          setOpen(false)
        }
        break
      default:
        break
    }
  }

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Choose Wallet',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
      zIndex={999}
    >
      <Container>
        {isKeplrInstalled && (
          <WalletBox onClick={(): Promise<void> => handleChooseWallet(WalletType.Keplr)}>
            <img src={KeplrIcon} alt='keplr' />
            <span>{WalletType.Keplr}</span>
          </WalletBox>
        )}
        {!isKeplrInstalled && <Typography color='white'>{`No wallets installed`}</Typography>}
      </Container>
    </ModalWrapper>
  )
}

export default ChooseWalletModal
