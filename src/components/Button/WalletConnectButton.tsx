import { useWalletManager } from '@gssuper/cosmodal'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { truncateString } from 'utils/formatters'
import { successToast } from 'utils/toast'
import { ConnectButton } from './WalletConnectButton.styles'
import { useTheme } from 'styled-components'

interface Props {
  onClick: () => void
}

const WalletConnectButton: React.FC<Props> = ({ onClick }) => {
  const { address, name } = useAccount()
  const { connect } = useWalletManager()
  const theme: any = useTheme()

  return !address ? (
    <ConnectButton onClick={connect}>
      <Typography variant='secondary' size='md'>
        Connect
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
