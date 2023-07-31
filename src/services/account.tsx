import { contracts, createSigningClient, customQueries, utils } from '@ixo/impactxclient-sdk'
import { CheckIidDoc, RPC_ENDPOINT } from 'lib/protocol'
import { useAccount } from 'hooks/account'
import { useEffect } from 'react'
import { SigningCosmWasmClient, CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { useWalletManager } from '@gssuper/cosmodal'
import base58 from 'bs58'
import { useAppSelector } from 'redux/hooks'
import { selectStakingGroups } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import { Cw20Token, NativeToken, TokenType } from 'types/tokens'
import { claimAvailable } from 'utils/tokenClaim'
import { plus } from 'utils/currency'
import { TDAOGroupModel } from 'types/protocol'

let nativeBalanceTimer: NodeJS.Timer | null = null
let cw20BalanceTimer: NodeJS.Timer | null = null

const AccountUpdateService = (): JSX.Element | null => {
  const {
    did,
    address,
    balances,
    cwClient,
    updateBalances,
    updateNativeTokens,
    updateCw20Tokens,
    updateName,
    updateAddress,
    updatePubKey,
    chooseWallet,
    updateSigningClient,
    updateCosmWasmClient,
    updateCWClient,
    updateRegistered,
    updateDid,
  } = useAccount()
  const { connectedWallet } = useWalletManager()
  const stakingGroups = useAppSelector(selectStakingGroups)

  useEffect(() => {
    const getIidDoc = async (): Promise<void> => {
      if (await CheckIidDoc(did)) {
        updateRegistered(true)
      } else {
        updateRegistered(false)
      }
    }
    if (did) {
      getIidDoc()
    }
    // eslint-disable-next-line
  }, [did])

  useEffect(() => {
    if (!address) {
      chooseWallet(undefined)
    } else {
      updateBalances()
      nativeBalanceTimer = setInterval(() => {
        updateBalances()
      }, 1000 * 60)
      return () => {
        clearInterval(nativeBalanceTimer!)
        nativeBalanceTimer = null
      }
    }
    // eslint-disable-next-line
  }, [address])

  useEffect(() => {
    if (balances.length > 0) {
      const update = () => {
        balances.forEach(({ amount, denom }) => {
          /**
           * @description find token info from currency list via sdk
           */
          const token = customQueries.currency.findTokenFromDenom(denom)

          if (token) {
            const displayAmount = convertMicroDenomToDenomWithDecimals(amount, token.coinDecimals).toString()
            const payload: NativeToken = {
              type: TokenType.Native,
              balance: displayAmount,
              symbol: token.coinDenom,
              denomOrAddress: token.coinMinimalDenom,
              imageUrl: token.coinImageUrl!,
              decimals: token.coinDecimals,
            }
            updateNativeTokens({ [payload.denomOrAddress]: payload })
          }
        })
      }

      update()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balances, address])

  useEffect(() => {
    if (stakingGroups.length > 0 && address) {
      const update = () => {
        stakingGroups.forEach((stakingGroup: TDAOGroupModel) => {
          const {
            token,
            coreAddress,
            votingModule: { votingModuleAddress },
          } = stakingGroup

          if (token) {
            ;(async () => {
              const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
                cwClient,
                votingModuleAddress,
              )
              const stakingContract = await daoVotingCw20StakedClient.stakingContract()
              const tokenContract = await daoVotingCw20StakedClient.tokenContract()
              const cw20StakeClient = new contracts.Cw20Stake.Cw20StakeQueryClient(cwClient, stakingContract)
              const { value: microStakedValue } = await cw20StakeClient.stakedValue({ address })
              const { claims } = await cw20StakeClient.claims({ address })
              const microUnstakingValue = claims
                .filter((claim) => !claimAvailable(claim, 0)) //  TODO: TBD blockHeight
                .reduce((acc, cur) => plus(acc, cur.amount), '0')
              const microClaimableValue = claims
                .filter((claim) => claimAvailable(claim, 0)) //  TODO: TBD blockHeight
                .reduce((acc, cur) => plus(acc, cur.amount), '0')

              const cw20BaseClient = new contracts.Cw20Base.Cw20BaseQueryClient(cwClient, tokenContract)
              const { balance: microBalance } = await cw20BaseClient.balance({ address })
              const balance = convertMicroDenomToDenomWithDecimals(microBalance, token.tokenInfo.decimals)
              const stakedValue = convertMicroDenomToDenomWithDecimals(microStakedValue, token.tokenInfo.decimals)
              const unstakingValue = convertMicroDenomToDenomWithDecimals(microUnstakingValue, token.tokenInfo.decimals)
              const claimableValue = convertMicroDenomToDenomWithDecimals(microClaimableValue, token.tokenInfo.decimals)

              const payload: Cw20Token = {
                groupContract: coreAddress,
                type: TokenType.Cw20,
                symbol: token.tokenInfo.symbol,
                denomOrAddress: token.config.token_address,
                imageUrl: (token.marketingInfo?.logo !== 'embedded' && token.marketingInfo.logo?.url) || '',
                decimals: token.tokenInfo.decimals,
                balance: balance.toString(),
                staked: stakedValue.toString(),
                unbonding: unstakingValue.toString(),
                claimable: claimableValue.toString(),
              }
              updateCw20Tokens({ [payload.denomOrAddress]: payload })
            })()
          }
        })
      }

      update()
      cw20BalanceTimer = setInterval(() => {
        update()
      }, 1000 * 60)
      return () => {
        clearInterval(cw20BalanceTimer!)
        cw20BalanceTimer = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakingGroups, address])

  useEffect(() => {
    if (connectedWallet) {
      const { wallet, name, address, publicKey, offlineSigner } = connectedWallet
      const pubKey = base58.encode(publicKey.data)
      const did = utils.did.generateSecpDid(pubKey)

      updateName(name)
      updateAddress(address)
      updatePubKey(pubKey)
      updateDid(did)
      chooseWallet(wallet.type)

      createSigningClient(RPC_ENDPOINT!, offlineSigner).then(updateSigningClient)
      SigningCosmWasmClient.connectWithSigner(RPC_ENDPOINT!, offlineSigner).then(updateCosmWasmClient)
    } else {
      updateName('')
      updateAddress('')
      updatePubKey('')
      updateDid('')
      chooseWallet(undefined)
      updateSigningClient(undefined)
      updateCosmWasmClient(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedWallet])

  useEffect(() => {
    CosmWasmClient.connect(RPC_ENDPOINT!).then(updateCWClient)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default AccountUpdateService
