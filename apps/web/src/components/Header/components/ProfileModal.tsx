import { customQueries } from '@ixo/impactxclient-sdk'
import { ReactComponent as AssetIcon } from 'assets/images/icon-asset.svg'
import { ReactComponent as BondIcon } from 'assets/images/icon-bond.svg'
import { ReactComponent as CoinsIcon } from 'assets/images/icon-coins-solid.svg'
import { ReactComponent as CopyIcon } from 'assets/images/icon-copy.svg'
import { ReactComponent as DisconnectIcon } from 'assets/images/icon-disconnect.svg'
import { ReactComponent as ImpactTokenIcon } from 'assets/images/icon-impact-token2.svg'
import { ReactComponent as WalletIcon } from 'assets/images/icon-wallet-solid.svg'
import BigNumber from 'bignumber.js'
import { FlexBox, ScrollBox, SvgBox } from 'components/App/App.styles'
import { BalanceCard } from 'components'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import { Avatar, TabButton } from 'pages/CurrentEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { truncateString } from 'utils/formatters'
import { successToast } from 'utils/toast'
import NativTokenViewModal from './NativeTokenViewModal'
import Cw20TokenViewModal from './Cw20TokenViewModal'
import { TokenType } from 'types/tokens'
import { useTheme } from 'styled-components'
import { IxoCoinCodexRelayerApi } from 'hooks/configs'

const ProfileModal: React.FC = () => {
  const theme: any = useTheme()
  const { address, name, cw20Tokens, nativeTokens, connectedWallet, disconnect } = useAccount()
  const [showAssetType, setShowAssetType] = useState('Coins')
  const [coinBalanceData, setCoinBalanceData] = useState<{
    [denom: string]: {
      type: TokenType
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

  useEffect(() => {
    if (nativeTokens.length > 0) {
      nativeTokens.forEach((token) => {
        setCoinBalanceData((pre) => ({
          ...pre,
          [token.denomOrAddress]: {
            type: TokenType.Native,
            balance: token.balance,
            network: 'IXO Network',
            coinDenom: token.symbol,
            coinMinimalDenom: token.denomOrAddress,
            coinImageUrl: token.imageUrl!,
            coinDecimals: token.decimals,
            lastPriceUsd: 0,
          },
        }))
        customQueries.currency
          .findTokenInfoFromDenom(token.denomOrAddress, true, IxoCoinCodexRelayerApi)
          .then((response) => {
            const { lastPriceUsd } = response
            setCoinBalanceData((pre) => ({
              ...pre,
              [token.denomOrAddress]: { ...pre[token.denomOrAddress], lastPriceUsd },
            }))
          })
      })
    }
    return () => {
      setCoinBalanceData((coinBalanceData) =>
        Object.fromEntries(Object.entries(coinBalanceData).filter(([key, value]) => value.type !== TokenType.Native)),
      )
    }
  }, [nativeTokens])

  useEffect(() => {
    if (cw20Tokens.length > 0) {
      cw20Tokens.forEach((item) => {
        setCoinBalanceData((pre) => ({
          ...pre,
          [item.denomOrAddress]: {
            type: TokenType.Cw20,
            balance: item.balance,
            network: 'IXO Network',
            coinDenom: item.symbol,
            coinMinimalDenom: item.denomOrAddress,
            coinImageUrl: item.imageUrl!,
            coinDecimals: item.decimals,
            lastPriceUsd: 0,
          },
        }))
      })
    }
  }, [cw20Tokens])

  return (
    <FlexBox $direction='column' $gap={8} width='100%' color={theme.ixoWhite}>
      <FlexBox width='100%' $direction='column' $alignItems='center' $gap={4}>
        <Avatar size={80} borderWidth={0} />
        <Typography size='2xl'>{name}</Typography>
      </FlexBox>

      <FlexBox width='100%' $direction='column' $gap={3}>
        <FlexBox $alignItems='center' $gap={2}>
          <SvgBox color={theme.ixoDarkBlue} $svgWidth={6} $svgHeight={6}>
            <WalletIcon />
          </SvgBox>
          <Typography>Wallet</Typography>
        </FlexBox>

        <FlexBox width='100%' $gap={3}>
          <FlexBox
            $flexGrow={1}
            height='56px'
            $borderRadius='8px'
            border={`1px solid ${theme.ixoDarkBlue}`}
            p={3}
            $justifyContent='space-between'
            $alignItems='center'
          >
            <FlexBox $gap={2} $alignItems='center'>
              <FlexBox width='32px' height='32px' $borderRadius='8px'>
                <img width={'100%'} height={'100%'} src={connectedWallet?.wallet.imageUrl} alt='' />
              </FlexBox>
              <Typography transform='capitalize'>{connectedWallet?.wallet.type}</Typography>
            </FlexBox>
            <FlexBox $alignItems='center' $gap={2}>
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
            $alignItems='center'
            $justifyContent='center'
            $borderRadius='8px'
            border={`1px solid ${theme.ixoNewBlue}`}
            p={3}
            color={theme.ixoNewBlue}
            $svgWidth={6}
            $svgHeight={6}
            cursor='pointer'
            onClick={disconnect}
          >
            <DisconnectIcon />
          </SvgBox>
        </FlexBox>
      </FlexBox>

      <FlexBox width='100%' $direction='column' $gap={4}>
        <FlexBox $gap={2}>
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
          <ScrollBox $direction='column' $gap={2} width='100%' height='250px' $overflowY='auto'>
            {Object.values(coinBalanceData)
              .filter((item) => new BigNumber(item.balance).isGreaterThan(new BigNumber(0)))
              .map((item, index) => (
                <BalanceCard key={index} {...item} onClick={() => setSelectedDenom(item.coinMinimalDenom)} />
              ))}
            {selectedAsset?.type === 'native' && (
              <NativTokenViewModal open={!!selectedAsset} token={selectedAsset} onClose={() => setSelectedDenom('')} />
            )}
            {selectedAsset?.type === 'cw20' && (
              <Cw20TokenViewModal open={!!selectedAsset} token={selectedAsset} onClose={() => setSelectedDenom('')} />
            )}
          </ScrollBox>
        )}
      </FlexBox>
    </FlexBox>
  )
}

export default ProfileModal
