import PolygonIcon from 'assets/images/polygon-icon.svg'
import XIcon from 'assets/images/x-icon.svg'
import CreatePaymentContractModal from 'components/ControlPanel/Actions/CreatePaymentContractModal'
import CreatePaymentTemplateModal from 'components/ControlPanel/Actions/CreatePaymentTemplateModal'
import MakePaymentModal from 'components/ControlPanel/Actions/MakePaymentModal'
import WalletSelectModal from 'components/ControlPanel/Actions/WalletSelectModal'
import { DashboardThemeContext, ThemeContext } from 'components/Dashboard/Dashboard'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { selectEntityDid } from 'redux/selectedEntity/selectedEntity.selectors'
import { selectPaymentCoins } from 'redux/configs/configs.selectors'
import React, { FunctionComponent, useContext, useState } from 'react'
import { useAppSelector } from 'redux/hooks'
import styled from 'styled-components'

interface ValueProps {
  value: string
  contractId?: string
  preIcon?: boolean
}

const ValueComponentContainer = styled.div<{ theme: ThemeContext }>`
  background: ${({ theme }): string => (theme.isDark ? '#143F54' : '#e9edf5')};
  // padding-left: 2em;
  position: relative;
`

const StyledValueContainer = styled.div`
  padding: 0.8em 4em 0.8em 0;
  align-items: center;
  flex-direction: column;
  display: flex;
  img {
    margin-right: 1em;
  }
  span {
    line-height: 120%;
  }
`

const StyledEyeContainer = styled.div<{ theme: ThemeContext }>`
  position: absolute;
  cursor: pointer;
  height: 100%;
  right: 0;
  top: 0;
  background-color: ${({ theme }): string => (theme.isDark ? '#107591' : '#e9edf5')};
  width: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 3px solid transparent;
`

const ValueCell: FunctionComponent<ValueProps> = ({ value, contractId, preIcon = true }) => {
  const paymentCoins = useAppSelector(selectPaymentCoins)
  const entityDid = useAppSelector(selectEntityDid)
  const theme = useContext(DashboardThemeContext)
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [walletType, setWalletType] = useState<string | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)
  const [createPaymentTemplateModalOpen, setCreatePaymentTemplateModalOpen] = useState(false)
  const [createPaymentContractModalOpen, setCreatePaymentContractModalOpen] = useState(false)
  const [makePaymentModalOpen, setMakePaymentModalOpen] = useState(false)
  const handleWalletSelect = (walletType: string, accountAddress: string): void => {
    setWalletType(walletType)
    setSelectedAddress(accountAddress)
    setWalletModalOpen(false)
    setMakePaymentModalOpen(true)
    setModalTitle('Make a Payment')
  }

  return (
    <>
      <ValueComponentContainer theme={theme}>
        <StyledValueContainer>
          {preIcon && <img alt='' src={XIcon} />}
          <span>{value.match(/(.*) (\(\d+\))/)![1]}</span>
          <span>{value.match(/(.*) (\(\d+\))/)![2]}</span>
        </StyledValueContainer>
        <StyledEyeContainer theme={theme} onClick={(): void => setWalletModalOpen(true)}>
          <img alt='' src={PolygonIcon} />
        </StyledEyeContainer>
      </ValueComponentContainer>
      <ModalWrapper
        isModalOpen={walletModalOpen}
        header={{
          title: 'Select Wallet',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setWalletModalOpen(false)}
      >
        <WalletSelectModal handleSelect={handleWalletSelect} availableWallets={['keysafe', 'keplr']} />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={createPaymentTemplateModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setCreatePaymentTemplateModalOpen(false)}
      >
        <CreatePaymentTemplateModal entityDid={entityDid!} paymentCoins={paymentCoins as any} />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={createPaymentContractModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setCreatePaymentContractModalOpen(false)}
      >
        <CreatePaymentContractModal entityDid={entityDid!} paymentCoins={paymentCoins as any} />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={makePaymentModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setMakePaymentModalOpen(false)}
      >
        <MakePaymentModal
          entityDid={entityDid!}
          accountAddress={selectedAddress!}
          walletType={walletType!}
          contractId={contractId!}
          handleCreateTemplate={(): void => {
            setMakePaymentModalOpen(false)
            setModalTitle('Create a Payment Template')
            setCreatePaymentTemplateModalOpen(true)
          }}
          handleCreateContract={(): void => {
            setMakePaymentModalOpen(false)
            setModalTitle('Create a Payment Contract')
            setCreatePaymentContractModalOpen(true)
          }}
          handleCancelContract={(): void => {
            setMakePaymentModalOpen(false)
          }}
        />
      </ModalWrapper>
    </>
  )
}

export default ValueCell
