import { useWalletManager } from '@gssuper/cosmodal'
import { contracts, customQueries } from '@ixo/impactxclient-sdk'
import { ReactComponent as AssetIcon } from 'assets/images/icon-asset.svg'
import { ReactComponent as BondIcon } from 'assets/images/icon-bond.svg'
import { ReactComponent as CoinsIcon } from 'assets/images/icon-coins-solid.svg'
import { ReactComponent as CopyIcon } from 'assets/images/icon-copy.svg'
import { ReactComponent as DisconnectIcon } from 'assets/images/icon-disconnect.svg'
import { ReactComponent as ImpactTokenIcon } from 'assets/images/icon-impact-token2.svg'
import { ReactComponent as WalletIcon } from 'assets/images/icon-wallet-solid.svg'
import BigNumber from 'bignumber.js'
import { FlexBox, SvgBox, theme } from 'components/App/App.styles'
import BalanceCard from 'components/Card/BalanceCard'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import { Avatar, TabButton } from 'pages/CurrentEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { DaoGroup } from 'redux/currentEntity/dao/currentDao.types'
import { selectStakingGroups } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import { truncateString } from 'utils/formatters'
import { successToast } from 'utils/toast'
import CoinViewModal from './CoinViewModal'

const ProfileModal: React.FC = () => {
  const { connectedWallet, disconnect } = useWalletManager()
  const { address, name, balances, cwClient } = useAccount()
  const stakingGroups = useAppSelector(selectStakingGroups)
  const [showAssetType, setShowAssetType] = useState('Coins')
  const [coinBalanceData, setCoinBalanceData] = useState<{
    [denom: string]: {
      type: string // cw20 | native
      balance: string
      network: string
      coinDenom: string
      coinMinimalDenom: string
      coinImageUrl: string
      coinDecimals: number
      lastPriceUsd: number
    }
  }>({})
  const [selectedDenom, setSelectedDenom] = useState<string>('')
  const selectedAsset = useMemo(
    () => (selectedDenom ? coinBalanceData[selectedDenom] : undefined),
    [selectedDenom, coinBalanceData],
  )

  console.log({ stakingGroups })

  useEffect(() => {
    if (balances.length > 0) {
      balances.forEach(({ amount, denom }) => {
        /**
         * @description find token info from currency list via sdk
         */
        const token = customQueries.currency.findTokenFromDenom(denom)

        if (token) {
          customQueries.currency.findTokenInfoFromDenom(token.coinDenom).then((response) => {
            const { coinName, lastPriceUsd } = response
            const displayAmount: number = convertMicroDenomToDenomWithDecimals(amount, token.coinDecimals)
            const payload = {
              type: 'native',
              balance: new BigNumber(displayAmount).toFormat(2),
              network: `${coinName.toUpperCase()} Network`,
              coinDenom: token.coinDenom,
              coinMinimalDenom: token.coinMinimalDenom,
              coinImageUrl: token.coinImageUrl!,
              coinDecimals: token.coinDecimals,
              lastPriceUsd,
            }
            setCoinBalanceData((pre) => ({ ...pre, [payload.coinDenom]: payload }))
          })
        }
      })
    }
  }, [balances])

  useEffect(() => {
    if (stakingGroups.length > 0) {
      //
      stakingGroups.forEach((stakingGroup: DaoGroup) => {
        //
        const {
          token,
          votingModule: { votingModuleAddress },
        } = stakingGroup
        if (token) {
          const payload = {
            type: 'cw20',
            balance: '',
            network: ``,
            coinDenom: token.tokenInfo.symbol,
            coinMinimalDenom: token.config.token_address,
            coinImageUrl: (token.marketingInfo?.logo !== 'embedded' && token.marketingInfo.logo?.url) || '',
            coinDecimals: token.tokenInfo.decimals,
            lastPriceUsd: 0,
          }

          const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
            cwClient,
            votingModuleAddress,
          )

          ;(async () => {
            const tokenContract = await daoVotingCw20StakedClient.tokenContract()
            const cw20BaseClient = new contracts.Cw20Base.Cw20BaseQueryClient(cwClient, tokenContract)
            const { balance: microBalance } = await cw20BaseClient.balance({ address })
            const balance = convertMicroDenomToDenomWithDecimals(microBalance, token.tokenInfo.decimals)

            setCoinBalanceData((pre) => ({
              ...pre,
              [payload.coinDenom]: {
                ...(pre[payload.coinDenom] ?? {}),
                ...{ balance: new BigNumber(balance).toFormat(2) },
              },
            }))
          })()

          setCoinBalanceData((pre) => ({
            ...pre,
            [payload.coinDenom]: { ...(pre[payload.coinDenom] ?? {}), ...payload },
          }))
        }
        return ''
      })
      return () => {
        setCoinBalanceData((coinBalanceData) =>
          Object.fromEntries(Object.entries(coinBalanceData).filter(([key, value]) => value.type === 'native')),
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakingGroups])

  return (
    <FlexBox direction='column' gap={8} width='100%' color={theme.ixoWhite}>
      <FlexBox width='100%' direction='column' alignItems='center' gap={4}>
        <Avatar size={80} borderWidth={0} />
        <Typography size='2xl'>{name}</Typography>
      </FlexBox>

      <FlexBox width='100%' direction='column' gap={3}>
        <FlexBox alignItems='center' gap={2}>
          <SvgBox color={theme.ixoDarkBlue} svgWidth={6} svgHeight={6}>
            <WalletIcon />
          </SvgBox>
          <Typography>Wallet</Typography>
        </FlexBox>

        <FlexBox width='100%' gap={3}>
          <FlexBox
            flexGrow={1}
            height='56px'
            borderRadius='8px'
            border={`1px solid ${theme.ixoDarkBlue}`}
            p={3}
            justifyContent='space-between'
            alignItems='center'
          >
            <FlexBox gap={2} alignItems='center'>
              <FlexBox width='32px' height='32px' borderRadius='8px'>
                <img width={'100%'} height={'100%'} src={connectedWallet?.wallet.imageUrl} alt='' />
              </FlexBox>
              <Typography transform='capitalize'>{connectedWallet?.wallet.type}</Typography>
            </FlexBox>
            <FlexBox alignItems='center' gap={2}>
              <Typography>{truncateString(address, 20, 'middle')}</Typography>
              <CopyToClipboard text={address} onCopy={() => successToast(null, `Copied to clipboard`)}>
                <SvgBox color={theme.ixoDarkBlue} hover={{ color: theme.ixoNewBlue }} cursor='pointer'>
                  <CopyIcon />
                </SvgBox>
              </CopyToClipboard>
            </FlexBox>
          </FlexBox>
          <SvgBox
            width='56px'
            height='56px'
            alignItems='center'
            justifyContent='center'
            borderRadius='8px'
            border={`1px solid ${theme.ixoNewBlue}`}
            p={3}
            color={theme.ixoNewBlue}
            svgWidth={6}
            svgHeight={6}
            cursor='pointer'
            onClick={disconnect}
          >
            <DisconnectIcon />
          </SvgBox>
        </FlexBox>
      </FlexBox>

      <FlexBox width='100%' direction='column' gap={4}>
        <FlexBox gap={2}>
          <TabButton
            preIcon={<CoinsIcon />}
            textSize='base'
            active={showAssetType === 'Coins'}
            onClick={() => setShowAssetType('Coins')}
          >
            Coins
          </TabButton>
          <TabButton preIcon={<ImpactTokenIcon />} textSize='base'>
            Impact Tokens
          </TabButton>
          <TabButton preIcon={<AssetIcon />} textSize='base'>
            Assets
          </TabButton>
          <TabButton preIcon={<BondIcon />} textSize='base'>
            Bonds
          </TabButton>
        </FlexBox>

        {showAssetType === 'Coins' && (
          <FlexBox direction='column' gap={2} width='100%' height='250px' overflowY='auto'>
            {Object.values(coinBalanceData).map((item) => (
              <BalanceCard key={item.coinDenom} {...item} onClick={() => setSelectedDenom(item.coinDenom)} />
            ))}
            {selectedAsset && (
              <CoinViewModal open={!!selectedAsset} token={selectedAsset} onClose={() => setSelectedDenom('')} />
            )}
          </FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  )
}

export default ProfileModal
