import { useDisclosure } from '@mantine/hooks'
import { SignXEndpoints, SignXWallet } from '../impactsxmobile'
import { createContext, useState, ReactNode, useMemo, SetStateAction } from 'react'

export interface Wallet {
  [key: string]: any
  address: string
  did: string
  pubKey: Uint8Array
  keyType: string
}

export interface Transaction {
  transactionSessionHash?: string
  sequence: number
}

export interface WalletContextType {
  wallet: Wallet | null
  setWallet: (wallet: Wallet | null) => void
  opened: boolean
  open: () => void
  close: () => void
  mobile: MobileStateProps
  setMobile: React.Dispatch<SetStateAction<MobileStateProps>>
  signXWallet: SignXWallet
  CustomComponent: ReactNode
  rpcEndpoint: string
  transaction: Transaction
  setTransaction: React.Dispatch<SetStateAction<Transaction>>
}

export interface WalletProviderProps {
  children: ReactNode
  chainNetwork: string
  customComponent: ReactNode
  rpcEndpoint: string
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined)

export type MobileWalletDataProps = {
  hash?: string
  network?: string
  sessionHash?: string
  sitename?: string
  type?: string
  message?: string
}

export type MobileStateProps = {
  qr?: null | string
  timeout?: number
  transacting?: boolean
  data: null | MobileWalletDataProps
}

let signXWallet: SignXWallet

export const WalletProvider = ({ children, chainNetwork, customComponent, rpcEndpoint }: WalletProviderProps) => {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [opened, { open, close }] = useDisclosure(false)
  const [mobile, setMobile] = useState<MobileStateProps>({
    qr: null,
    timeout: 0,
    data: null,
  })
  const [transaction, setTransaction] = useState<Transaction>({
    transactionSessionHash: undefined,
    sequence: 0,
  })

  // Add methods to handle wallet connection, disconnection, etc.

  if (chainNetwork && !signXWallet) {
    signXWallet = new SignXWallet(chainNetwork as keyof typeof SignXEndpoints)
  }

  const providerValue = useMemo(
    () => ({
      wallet,
      setWallet,
      opened,
      open,
      close,
      mobile,
      setMobile,
      signXWallet,
      CustomComponent: customComponent,
      rpcEndpoint,
      transaction,
      setTransaction,
    }),
    [
      wallet,
      setWallet,
      opened,
      open,
      close,
      setMobile,
      mobile,
      signXWallet,
      customComponent,
      rpcEndpoint,
      transaction,
      setTransaction,
    ],
  )

  return <WalletContext.Provider value={providerValue}>{children}</WalletContext.Provider>
}
