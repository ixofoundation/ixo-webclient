import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { truncateString } from 'utils/formatters'
import { successToast } from 'utils/toast'
import { ConnectButton } from './WalletConnectButton.styles'
import { useTheme } from 'styled-components'
import { WALLET_STORE_LOCAL_STORAGE_KEY } from 'hooks/configs'
import { useHistory } from 'react-router-dom'

interface Props {
  onClick: () => void
}

const WalletConnectButton: React.FC<Props> = ({ onClick }) => {
  const theme: any = useTheme()
  const history = useHistory()
  const { address, name, registered, connect, connectedWallet } = useAccount()
  const [isConnecting, setIsConnecting] = useState(false)

  const onConnect = async () => {
    setIsConnecting(true)
    await connect()
    setIsConnecting(false)
  }

  // Keystore change event listener.
  useEffect(() => {
    if (
      // Only run this on a browser.
      typeof window === 'undefined' ||
      // Only run this if we are connected to a wallet that has a keystore chang
      // event specified.
      !connectedWallet?.wallet.windowKeystoreRefreshEvent
    ) {
      return
    }

    const { windowKeystoreRefreshEvent } = connectedWallet.wallet

    const listener = async (event: Event) => {
      // Reconnect to wallet, since name/address may have changed.
      if (connectedWallet) {
        setIsConnecting(true)
        await connect()
        setIsConnecting(false)
      }
    }

    // Add event listener.
    window.addEventListener(windowKeystoreRefreshEvent, listener)

    // Remove event listener on clean up.
    return () => {
      window.removeEventListener(windowKeystoreRefreshEvent, listener)
    }
  }, [connectedWallet, connect])

  // Autoconnect
  useEffect(() => {
    ;(async () => {
      if (localStorage && localStorage.getItem(WALLET_STORE_LOCAL_STORAGE_KEY)) {
        setIsConnecting(true)
        await connect()
        setIsConnecting(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return !address ? (
    <ConnectButton onClick={onConnect} disabled={isConnecting}>
      <Typography variant='secondary' size='md'>
        {isConnecting ? 'Connecting...' : 'Connect'}
      </Typography>
    </ConnectButton>
  ) : (
    <ConnectButton
      onClick={(e) => {
        e.preventDefault()
        if (registered) {
          history.push('/myaccount')
        } else {
          onClick()
        }
      }}
    >
      <Typography variant='secondary' size='md' color={theme?.blocks?.header?.textColor}>
        {truncateString(name, 8, 'end')}
      </Typography>

      <CopyToClipboard text={address} onCopy={() => successToast(`Copied to clipboard`)}>
        <Typography variant='secondary' size='xs' hover={{ underline: true }} onClick={(e) => e.stopPropagation()}>
          {truncateString(address, 20)}
        </Typography>
      </CopyToClipboard>
    </ConnectButton>
  )
}

export default WalletConnectButton
