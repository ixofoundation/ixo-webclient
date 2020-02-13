// eslint-disable-next-line
export interface IWeb3Proxy {
  createEthProjectWallet: (projectDid: string) => void
  getProjectWalletAddress: (projectDid: string) => Promise<string>
  fundEthProjectWallet: (
    projectWalletAddress: string,
    accountAddress: string,
    ixoAmount: string,
  ) => void
}
