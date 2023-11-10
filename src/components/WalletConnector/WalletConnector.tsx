import React, { useEffect } from 'react'
import { Text, Tabs, Flex } from '@mantine/core'
import { QRCodeSVG } from 'qrcode.react'
import useSignX from 'hooks/signX'
import { useDispatch } from 'react-redux'
import { connectAction } from 'redux/account/account.actions'
import { WALLET_STORE_LOCAL_STORAGE_KEY } from 'hooks/configs'
import Logo from 'assets/images/oval-x-icon.png'
import { ReactComponent as KeplrIcon } from 'assets/images/icon-keplr.svg'
import { ReactComponent as ImpactXIcon } from 'assets/images/x-icon.svg'
import { WalletType } from 'types/wallet'

const ImpactXMobile = () => {
  const { loginData, loginSuccess, loginError } = useSignX()
  const dispatch = useDispatch()

  useEffect(() => {
    if (loginSuccess) {
      console.log({ loginSuccess })
      dispatch(
        connectAction({ ...loginSuccess, publicKey: loginSuccess.pubKey, wallet: { type: WalletType.ImpactXMobile } }),
      )
      localStorage.setItem(WALLET_STORE_LOCAL_STORAGE_KEY, 'connected')
    }
  }, [loginSuccess])

  console.log({ loginData })

  useEffect(() => {
    if (loginError) {
      console.error('Login error:', loginError)
      // Handle the error, e.g., show an error message to the user
    }
  }, [loginError])

  return (
    <Flex w='100%' h='100%' justify='center' align='center'>
      {loginData && (
        <QRCodeSVG
          value={JSON.stringify(loginData)}
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

export const WalletConnector = () => {
  return (
    <Tabs orientation='vertical' variant='pills' w={'650px'} h='500px'>
      <Flex direction='column'>
        <Text color='white' size='xl' weight={'bold'} mb={30}>
          Connect Wallet
        </Text>
        <Tabs.List>
          <Tabs.Tab value='Keplr' icon={<KeplrIcon scale={0.5} height={40} width={40} />}>
            <Text color='white' size='md' weight='bolder' style={{}}>
              Keplr
            </Text>{' '}
          </Tabs.Tab>
          <Tabs.Tab value='ImpactX' icon={<ImpactXIcon scale={2} height={40} width={40} />}>
            <Text color='white' size='md' weight='bolder'>
              ImpactsX Mobile
            </Text>{' '}
          </Tabs.Tab>
        </Tabs.List>
      </Flex>

      <Tabs.Panel value='Keplr' p='xs'>
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value='ImpactX' p='xs'>
        <ImpactXMobile />
      </Tabs.Panel>
    </Tabs>
  )
}
