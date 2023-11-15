import { getKeplrChainInfo } from '@ixo/cosmos-chain-resolver'
import { ChainInfo } from '@keplr-wallet/types'
import { Flex, Loader } from '@mantine/core'
import { WALLET_STORE_LOCAL_STORAGE_KEY, chainNetwork } from 'hooks/configs'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { connectAction } from 'redux/account/account.actions'
import { getConnectedWalletInfo } from 'utils/account'
import { errorToast } from 'utils/toast'
import { KeplrExtensionWallet } from 'wallets/keplr/extension'

export const KeplrConnect = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const connect = async (): Promise<void> => {
    try {
      const chainInfo = await getKeplrChainInfo('impacthub', chainNetwork)
      chainInfo.rest = process.env.REACT_APP_GAIA_URL || chainInfo.rest
      const wallet = KeplrExtensionWallet
      const walletClient = await wallet.getClient(chainInfo as ChainInfo)
      if (!walletClient) {
        throw new Error('Failed to retrieve wallet client.')
      }
      const connectedWallet = await getConnectedWalletInfo(wallet, walletClient, chainInfo as ChainInfo)
      dispatch(connectAction(connectedWallet))
      localStorage.setItem(WALLET_STORE_LOCAL_STORAGE_KEY, 'connected')
    } catch (e: any) {
      console.error('connect wallet', e)
      errorToast('Connecting wallet', e.message)
    }
  }

  useEffect(() => {
    setLoading(true)
    connect().then(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Flex w='100%' h='100%' justify='center' align='center'>
        <Loader />
      </Flex>
    )
  }

  return null
}
