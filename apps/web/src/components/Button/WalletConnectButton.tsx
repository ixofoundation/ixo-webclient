import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { truncateString } from 'utils/formatters'
import { successToast } from 'utils/toast'
import { ConnectButton } from './WalletConnectButton.styles'
import { useMantineTheme } from '@mantine/core'

interface Props {
  onClick: () => void
}

const WalletConnectButton: React.FC<Props> = ({ onClick }) => {
  const theme = useMantineTheme()
  const { address, name, connect, connectedWallet } = useAccount()
  const [isConnecting, setIsConnecting] = useState(false)

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
        await connect({})
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

  return !address ? (
    <ConnectButton onClick={onClick} disabled={isConnecting}>
      <Typography variant='secondary' size='md'>
        {isConnecting ? 'Connecting...' : 'Connect'}
      </Typography>
    </ConnectButton>
  ) : (
    <ConnectButton
      onClick={(e) => {
        e.preventDefault()
        onClick()
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
