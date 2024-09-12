import { friendlyWalletNames } from 'wallet-connector'
import { ActionIcon, Avatar, Flex, Stack } from '@mantine/core'

import { SvgBox } from 'components/CoreEntry/App.styles'
import Tooltip from 'components/Tooltip/Tooltip'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useTheme } from 'styled-components'
import { truncateString } from 'utils/formatters'
import { successToast } from 'utils/toast'

const HeadLine: React.FC = () => {
  const theme: any = useTheme()
  const { address, name, connectedWallet, disconnect } = useAccount()

  return (
    <Flex gap={16} align={'center'} justify={'space-between'}>
      <Flex align={'center'} gap={16}>
        <Avatar src={null} alt='no image here' size={80} radius={100} />
        <Stack gap={4}>
          <Typography size='2xl'>{name}</Typography>
          <CopyToClipboard onCopy={() => successToast(null, `Copied to clipboard`)} text={connectedWallet?.did || ''}>
            <Flex justify='center' align='center' gap={8}>
              <Typography>{truncateString(connectedWallet?.did || '', 20, 'middle')}</Typography>
              <SvgBox
                $svgWidth={6}
                $svgHeight={6}
                color={theme.ixoDarkBlue}
                hover={{ color: theme.ixoNewBlue }}
                cursor='pointer'
              >
                <img src='/assets/images/icon-copy.svg' />
              </SvgBox>
            </Flex>
          </CopyToClipboard>
        </Stack>
      </Flex>
      <Flex align={'center'} gap={12}>
        <Flex
          w={400}
          h={40}
          py={8}
          px={12}
          justify={'space-between'}
          align={'center'}
          style={{ border: `1px solid ${theme.ixoNewBlue}` }}
        >
          <Flex align={'center'} gap={8}>
            {connectedWallet?.wallet.imageUrl && (
              <Flex w={24} h={24} style={{ borderRadius: 8 }}>
                <img width={'100%'} height={'100%'} src={connectedWallet.wallet.imageUrl} alt='' />
              </Flex>
            )}
            <Typography>{friendlyWalletNames(connectedWallet?.wallet.type || '')}</Typography>
          </Flex>
          <Flex align={'center'} gap={8}>
            <Typography>{truncateString(address, 20, 'middle')}</Typography>
            <CopyToClipboard text={address} onCopy={() => successToast(null, `Copied to clipboard`)}>
              <SvgBox
                $svgWidth={6}
                $svgHeight={6}
                color={theme.ixoDarkBlue}
                hover={{ color: theme.ixoNewBlue }}
                cursor='pointer'
              >
                <img src='/assets/images/icon-copy.svg' />
              </SvgBox>
            </CopyToClipboard>
          </Flex>
        </Flex>
        <Tooltip text={'Disconnect'} width='100px'>
          <ActionIcon
            size={40}
            variant='outline'
            c={'blue'}
            radius={0}
            style={{ borderColor: theme.ixoNewBlue }}
            onClick={disconnect}
          >
            <img src='/assets/images/icon-disconnect.svg' />
          </ActionIcon>
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default HeadLine
