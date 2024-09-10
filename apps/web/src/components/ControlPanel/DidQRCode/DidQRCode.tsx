import React from 'react'

import MobileIcon from 'assets/images/icon-mobile.svg'
import { Button, Flex } from '@mantine/core'
import { QRCodeSVG } from 'qrcode.react'

import PlusIcon from 'assets/images/icon-plus.svg'
import './DidQRCode.css'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { useTheme } from 'styled-components'
import { Typography } from 'components/Typography'
import { useDisclosure } from '@mantine/hooks'
import { NavLink, useParams } from 'react-router-dom'
import { ActionCard } from 'components/ActionCard'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'

const QrCode = ({ did }: { did: string }) => {
  const stringifiedData = JSON.stringify({ type: 'project', did })
  const [opened, handlers] = useDisclosure()
  const theme = useTheme()
  return (
    <Flex direction={'column'} align='center'>
      <FlexBox
        $borderRadius='8px'
        background={theme.ixoGrey100}
        p={3}
        $gap={2}
        $alignItems='center'
        $borderColor={opened ? theme.ixoNewBlue : 'transparent'}
        $borderWidth={'1px'}
        $borderStyle={'solid'}
        hover={{ $borderColor: theme.ixoNewBlue }}
        onClick={handlers.toggle}
        cursor={'pointer'}
        width='100%'
      >
        <SvgBox $svgWidth={5} $svgHeight={5} color={theme.ixoBlack}>
          <PlusIcon />
        </SvgBox>
        <Typography size='sm' color='black'>
          Add to Impacts X
        </Typography>
      </FlexBox>
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
  const { type } = useAppSelector(getEntityById(entityId))

  if (type !== 'project') return null
  return (
    <ActionCard title='Mobile' icon={<MobileIcon />} editable={false}>
      <QrCode did={entityId} />
    </ActionCard>
  )
}

export default DidQrCode
