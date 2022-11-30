import React from 'react'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { useAccount } from 'redux/account/account.hooks'
import { WalletType } from 'redux/account/account.types'
import { useIxoKeysafe } from 'lib/keysafe/keysafe'
import { useKeplr } from 'lib/keplr/keplr'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const ChooseWalletModal: React.FC<Props> = ({ open, setOpen }): JSX.Element => {
  const { chooseWallet } = useAccount()
  const keplr = useKeplr()
  const keysafe = useIxoKeysafe()

  const handleChooseWallet = async (type: WalletType): Promise<void> => {
    switch (type) {
      case WalletType.Keplr:
        if (await keplr.connect()) {
          chooseWallet(WalletType.Keplr)
          setOpen(false)
        }
        break
      case WalletType.Keysafe:
        if (await keysafe.connect()) {
          chooseWallet(WalletType.Keysafe)
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
    >
      <ul>
        <li onClick={(): Promise<void> => handleChooseWallet(WalletType.Keplr)}>{WalletType.Keplr}</li>
        {keysafe.getKeysafe() && (
          <li onClick={(): Promise<void> => handleChooseWallet(WalletType.Keysafe)}>{WalletType.Keysafe}</li>
        )}
      </ul>
    </ModalWrapper>
  )
}

export default ChooseWalletModal