import { useCallback, useState, useEffect } from 'react'
import { SignX } from '@ixo/signx-sdk'

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

  return { loginData, loginSuccess, loginError }
}
