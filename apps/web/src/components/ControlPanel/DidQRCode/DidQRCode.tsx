import React from 'react'
import { Card } from '../Card'
import { ReactComponent as QRCodeIcon } from 'assets/images/icon-qrcode.svg'
import useCurrentEntity from 'hooks/currentEntity'
import { Flex } from '@mantine/core'
import { QRCodeSVG } from 'qrcode.react'

const QrCode = ({ did }: { did: string }) => {
  const stringifiedData = JSON.stringify({ type: "project", did })
  return (
    <Flex>
      {' '}
      <QRCodeSVG
        value={stringifiedData}
        size={200}
        bgColor={'#ffffff'}
        fgColor={'#000000'}
        level={'Q'}
        style={{ padding: '20px', background: 'white', borderRadius: '20px' }}
      />
    </Flex>
  )
}

const DidQrCode: React.FC = () => {
  const { id } = useCurrentEntity()

  return (
    <Card
      icon={<QRCodeIcon />}
      title={"QR Code"}
      columns={1}
      items={ <Flex w={"100%"} justify={"center"}><QrCode did={id} /></Flex>}
    />
  )
}

export default DidQrCode
