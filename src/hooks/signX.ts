import { useCallback, useState, useEffect } from 'react'
import { SignX } from '@ixo/signx-sdk'
import { toHex } from '@cosmjs/encoding'
import { AccountState } from 'redux/account/account.types'
import { createRegistry } from '@ixo/impactxclient-sdk'
import { useDisclosure } from '@mantine/hooks'

// Initialize the SignX client outside of the hook to avoid reinitialization on every render
const signXClient = new SignX({
  endpoint: 'https://signx.devnet.ixo.earth',
  sitename: 'IXO Portfolio Manager',
  network: 'devnet',
})

export default function useSignX() {
  const [loginData, setLoginData] = useState<any>(null)
  const [loginSuccess, setLoginSuccess] = useState<any>(null)
  const [loginError, setLoginError] = useState<any>(null)
  const [transactionInProgress, setTransactionInProgress] = useState(false)
  const [transactionQRData, setTransactionQRData] = useState<any>(null)
  const [transactionSuccess, setTransactionSuccess] = useState<any>(null)
  const [opened, handlers] = useDisclosure(false)

  // Define the event handlers
  const handleLoginSuccess = useCallback((response) => {
    setLoginSuccess(response.data)
  }, [])

  const handleLoginError = useCallback((error) => {
    setLoginError(error?.message || 'Login error')
  }, [])

  // initialise signX
  useEffect(() => {
    console.log('logging in signX')
    signXClient
      .login({
        pollingInterval: 2000,
      })
      .then((loginResponse) => setLoginData(loginResponse))
      .catch((error) => setLoginError(error || 'Unexpected login error'))
  }, [])

  // Attach the event listeners once when the component mounts
  useEffect(() => {
    signXClient.on('SIGN_X_LOGIN_SUCCESS', handleLoginSuccess)
    signXClient.on('SIGN_X_LOGIN_ERROR', handleLoginError)

    // Clean up the event listeners when the component unmounts
    return () => {
      signXClient.off('SIGN_X_LOGIN_SUCCESS', handleLoginSuccess)
      signXClient.off('SIGN_X_LOGIN_ERROR', handleLoginError)
    }
  }, [handleLoginSuccess, handleLoginError])

  useEffect(() => {
    if (transactionInProgress) {
      signXClient.on('SIGN_X_TRANSACT_SUCCESS', (data) => {
        setTransactionSuccess(data)
      })

      signXClient.on('SIGN_X_TRANSACT_ERROR', (error) => {
        console.error('Transaction Error:', error)
      })
    }

    return () => {
      signXClient.on('SIGN_X_TRANSACT_SUCCESS', (data) => {
        console.log('Transaction Success:', data)
      })

      signXClient.on('SIGN_X_TRANSACT_ERROR', (error) => {
        console.error('Transaction Error:', error)
      })
    }
  }, [transactionInProgress])

  const startTransaction = async ({
    address,
    did,
    pubKey,
    msgs = {},
    memo = '',
  }: Pick<AccountState, 'address' | 'did' | 'pubKey'> & { msgs: any; memo: any }) => {
    setTransactionInProgress(true)
    const registry = createRegistry()
    const data = {
      address: address,
      did: did,
      pubkey: pubKey,
      timestamp: new Date().toISOString(),
      txBodyHex: toHex(registry.encodeTxBody({ messages: msgs as any, memo })),
    }
    const transactRequest = await signXClient.transact(data)
    setTransactionQRData(transactRequest)
  }

  return {
    loginData,
    loginSuccess,
    loginError,
    startTransaction,
    transactionQRData,
    transactionSuccess,
    timeout: signXClient.timeout,
    signXClient,
    opened,
    handlers,
  }
}
