import { Flex, Modal, Text } from '@mantine/core'
import { TimeLeft } from './ImpactXMobileConnect'
import useSignX from 'hooks/signX'
import { useAccount } from 'hooks/account'
import Logo from 'assets/images/oval-x-icon.png'
import { QRCodeSVG } from 'qrcode.react'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'

export const ExecuteTransactionModal = () => {
  const { connectedWallet, pubKey } = useAccount()
  //   const { address, did } = connectedWallet!
  const { timeout, startTransaction, transactionQRData, signXClient, opened, handlers } = useSignX()

  // Render the modal with handlers
  return (
    <Modal opened={opened} onClose={handlers.close}>
      <Flex w='100%' h='100%' justify='center' align='center' direction='column' gap='20px'>
        <Flex>
          <Text>Scan this QR code with your Impacts X Mobile app</Text>
        </Flex>
        <TimeLeft timeout={timeout} />
        {transactionQRData && (
          <QRCodeSVG
            value={JSON.stringify(transactionQRData)}
            size={250}
            bgColor={'#ffffff'}
            fgColor={'#000000'}
            level={'Q'}
            style={{ padding: '20px', background: 'white', borderRadius: '20px' }}
            imageSettings={{
              src: Logo,
              x: undefined,
              y: undefined,
              height: 30,
              width: 30,
              excavate: true,
            }}
          />
        )}
      </Flex>
    </Modal>
  )
}
