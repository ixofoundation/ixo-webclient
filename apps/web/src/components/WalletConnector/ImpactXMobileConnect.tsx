import React, { useEffect } from 'react'
import { Flex } from '@mantine/core'
import { QRCodeSVG } from 'qrcode.react'
import useSignX from 'hooks/signX'
import Logo from 'assets/images/oval-x-icon.png'
import { useAccount } from 'hooks/account'

export const ImpactXMobile = () => {
  const { connect } = useAccount()
  const { loginData, loginSuccess, loginError } = useSignX()

  useEffect(() => {
    if (loginSuccess) {
      connect({ impactXData: loginData })
    }
  }, [loginSuccess, connect, loginData])

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
