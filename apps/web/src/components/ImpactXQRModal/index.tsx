import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Flex } from '@mantine/core'
import Logo from 'assets/images/oval-x-icon.png'
import { QRCodeSVG } from 'qrcode.react'

type ImpactXQRModalProps = {
  data: Record<string, any>
}
export const ImpactXQRModal = ({ data }: ImpactXQRModalProps) => {
  return (
    <Flex w='100%' h='100%' justify='center' align='center'>
      {data && (
        <QRCodeSVG
          value={JSON.stringify(data)}
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
  )
}
