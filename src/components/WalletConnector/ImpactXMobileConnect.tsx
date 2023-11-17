import React, { useEffect, useState } from 'react'
import { Box, Flex, Progress, Text } from '@mantine/core'
import { QRCodeSVG } from 'qrcode.react'
import useSignX from 'hooks/signX'
import Logo from 'assets/images/oval-x-icon.png'
import { useAccount } from 'hooks/account'
import { useDispatch } from 'react-redux'
import { connectAction } from 'redux/account/account.actions'
import { WalletType } from 'types/wallet'
import { WALLET_STORE_LOCAL_STORAGE_KEY } from 'hooks/configs'
import { useTheme } from 'styled-components'

export function TimeLeft({ timeout }: { timeout: number }) {
  // Convert timeout to seconds for ease of display
  const [timeLeft, setTimeLeft] = useState(timeout / 1000)
  const [percent, setPercent] = useState(100)
  const theme = useTheme() as any

  useEffect(() => {
    // Only set the interval if there is time left
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1 // Decrementing by 1 second
          return newTime > 0 ? newTime : 0 // Ensure time doesn't go below zero
        })
      }, 1000) // Interval set to 1 second

      return () => clearInterval(interval)
    }
  }, [timeLeft])

  useEffect(() => {
    // Update percent based on time left
    setPercent((timeLeft / (timeout / 1000)) * 100)
  }, [timeLeft, timeout])

  return (
    <Flex direction='column' align='center' gap='5px' w='100%'>
      <Box sx={{ flex: '1', alignSelf: 'stretch' }}>
        <Progress value={percent} color={theme.ixoNewBlue} size='4px' />
      </Box>
      <Text color={theme.ixoNewBlue}>Time left: {timeLeft}s</Text>
    </Flex>
  )
}

export const ImpactXMobile = () => {
  const { connect } = useAccount()
  const dispatch = useDispatch()
  const { loginData, loginSuccess, loginError, timeout } = useSignX()

  console.log({ timeout })
  useEffect(() => {
    if (loginSuccess) {
      dispatch(
        connectAction({
          ...loginSuccess,
          publicKey: loginSuccess.pubKey,
          wallet: { type: WalletType.ImpactXMobile },
        }),
      )
      localStorage.setItem(
        WALLET_STORE_LOCAL_STORAGE_KEY,
        JSON.stringify({
          ...loginSuccess,
          publicKey: loginSuccess.pubKey,
          wallet: { type: WalletType.ImpactXMobile },
        }),
      )
    }
  }, [loginSuccess, connect, loginData, dispatch])

  useEffect(() => {
    if (loginError) {
      console.error('Login error:', loginError)
      // Handle the error, e.g., show an error message to the user
    }
  }, [loginError])

  return (
    <Flex w='100%' h='100%' justify='center' align='center' direction='column' gap='20px'>
      <Flex>
        <Text>Scan this QR code with your Impacts X Mobile app</Text>
      </Flex>
      <TimeLeft timeout={timeout} />
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
