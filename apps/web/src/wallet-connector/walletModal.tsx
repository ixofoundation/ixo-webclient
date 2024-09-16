import { Modal, MantineProvider, Flex, Text, Loader } from '@mantine/core'
import { useWallet } from './hooks'
import { QRCodeSVG } from 'qrcode.react'
import { ConnectModal } from './components/connectModal'
import { friendlyModalTitles } from './utils'
import Lottie from 'react-lottie'
import pendingAnimation from './assets/animations/pending.json'

const TransactModal = () => {
  const { mobile, transaction } = useWallet()

  return (
    <Flex w='100%' h='100%' justify='center' align='center' direction='column' gap='20px'>
      {/* <TimeLeft timeout={mobile?.timeout || 0} /> */}
      {mobile.data && (
        <>
          <Flex>
            <Text style={{ color: 'white' }}>Scan this QR code with your Impacts X mobile app</Text>
          </Flex>
          <QRCodeSVG
            value={JSON.stringify(mobile.data)}
            size={250}
            bgColor={'#ffffff'}
            fgColor={'#000000'}
            level={'Q'}
            style={{ padding: '20px', background: 'white', borderRadius: '20px' }}
            imageSettings={{
              src: '/assets/oval-x-icon.png',
              x: undefined,
              y: undefined,
              height: 30,
              width: 30,
              excavate: true,
            }}
          />
        </>
      )}
    </Flex>
  )
}

const SequenceTransactionModal = () => {
  return (
    <Flex w='100%' h='100%' justify='center' align='center' direction='column' gap='20px'>
      {/* <TimeLeft timeout={mobile?.timeout || 0} /> */}
      <Flex>
        <Text style={{ color: 'white' }}>Keep the Impacts X mobile app open for additional transactions</Text>
      </Flex>
      <Lottie
        height={120}
        width={120}
        options={{
          loop: true,
          autoplay: true,
          animationData: pendingAnimation,
        }}
      />
    </Flex>
  )
}

export const WalletModal = () => {
  const { opened, close, mobile } = useWallet()

  const isConnectModal = mobile.data?.type === 'SIGN_X_LOGIN'
  const isTransactModal = mobile.data?.type === 'SIGN_X_TRANSACT'
  const isSequenceTransactionModal = mobile.data?.type === 'SIGN_X_TRANSACT_SESSION'

  return (
    <MantineProvider>
      <Modal
        styles={{
          header: {
            backgroundColor: '#01273A',
          },
          body: {
            backgroundColor: '#01273A',
          },
          title: {
            color: 'white',
          },
        }}
        radius='lg'
        size={'md'}
        padding='xl'
        opened={opened}
        onClose={close}
        title={friendlyModalTitles(mobile.data?.type ?? '')}
      >
        {isConnectModal && <ConnectModal />}
        {isTransactModal && <TransactModal />}
        {isSequenceTransactionModal && <SequenceTransactionModal />}
      </Modal>
    </MantineProvider>
  )
}
