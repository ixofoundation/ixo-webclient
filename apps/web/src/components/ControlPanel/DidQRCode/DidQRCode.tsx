import Image from 'next/image'
import React from 'react'
import { Card } from '../Card'
import { Button, Flex } from '@mantine/core'
import { QRCodeSVG } from 'qrcode.react'
import './DidQRCode.css'
import { useMantineTheme } from '@mantine/core'
import { Typography } from 'components/Typography'
import { useDisclosure } from '@mantine/hooks'
import { NavLink, useParams } from 'react-router-dom'
import { IconMobile } from 'components/IconPaths'
import { IconPlus } from 'components/IconPaths'

const QrCode = ({ did }: { did: string }) => {
  const stringifiedData = JSON.stringify({ type: 'project', did })
  const [opened, handlers] = useDisclosure()
  const theme = useMantineTheme()
  return (
    <Flex direction={'column'} align='center'>
      <Flex
        // add above props to style
        style={{
          borderColor: opened ? theme.colors.blue[5] : 'transparent',
          borderWidth: '1px',
          borderStyle: 'solid',
          cursor: 'pointer',
          borderRadius: '8px',
          '&:hover': {
            borderColor: theme.colors.blue[5],
          },
        }}
        bg={theme.colors.grey[100]}
        p={3}
        gap={2}
        align='center'
        onClick={handlers.toggle}
        w='100%'
      >
        <Image src={IconPlus} alt='Plus' width={5} height={5} color={theme.colors.blue[5]} />
        <Typography size='sm' color='black'>
          Add to Impacts X
        </Typography>
      </Flex>
      {opened && (
        <Flex direction='column' w='100%' align='center'>
          <QRCodeSVG
            value={stringifiedData}
            size={200}
            bgColor={'#ffffff'}
            fgColor={'#000000'}
            level={'Q'}
            style={{ padding: '20px', background: 'white', borderRadius: '20px' }}
          />
          <Button
            component={NavLink}
            to='https://play.google.com/store/apps/details/Impacts_X?id=com.ixo.mobile'
            target='_blank'
            rel='noopener noreferrer'
            w='100%'
            radius={6}
            bg={'blue'}
            fw={400}
            fz={'sm'}
          >
            Download Impacts X
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

const DidQrCode: React.FC = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  return <Card icon={IconMobile} title={'Mobile'} columns={1} items={<QrCode did={entityId} />} />
}

export default DidQrCode
