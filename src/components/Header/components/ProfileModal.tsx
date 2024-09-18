import { FlexBox, ScrollBox, SvgBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import { Avatar, TabButton } from 'screens/CurrentEntity/Components'
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { truncateString } from 'utils/formatters'
import { successToast } from 'utils/toast'
import NativeTokenViewModal from './NativeTokenViewModal'
import Cw20TokenViewModal from './Cw20TokenViewModal'
import { Cw20Token, NativeToken, TokenType } from 'types/tokens'
import { useTheme } from 'styled-components'
import { TokensTableColumns, TokensTableWrapper } from 'screens/MyAccount/MyPortfolioPage/BalanceView/NativeTokensCard'
import { Table } from 'components/Table'
import { friendlyWalletNames } from 'wallet-connector'

const ProfileModal: React.FC = () => {
  const theme: any = useTheme()
  const { address, name, cw20Tokens, nativeTokens, connectedWallet, disconnect } = useAccount()
  const tokens = [...nativeTokens, ...cw20Tokens.filter((v) => Number(v.balance) > 0)]
  const [showAssetType, setShowAssetType] = useState('Coins')
  const [selectedToken, setSelectedToken] = useState<NativeToken | Cw20Token | undefined>(undefined)

  const handleRowClick = (state: any) => () => {
    const original: NativeToken | Cw20Token = state.original

    setSelectedToken(original)
  }

  return (
    <FlexBox $direction='column' $gap={8} width='100%' color={theme.ixoWhite}>
      <FlexBox width='100%' $direction='column' $alignItems='center' $gap={4}>
        <Avatar size={80} borderWidth={0} />
        <Typography size='2xl'>{name}</Typography>
      </FlexBox>

      <FlexBox width='100%' $direction='column' $gap={3}>
        <FlexBox $alignItems='center' $gap={2}>
          <SvgBox color={theme.ixoDarkBlue} $svgWidth={6} $svgHeight={6}>
            <img src='/assets/images/icon-wallet-solid.svg' />
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
              <FlexBox width='32px' height='32px' $borderRadius='100%'>
                <img width={'100%'} height={'100%'} src={connectedWallet?.wallet.imageUrl ?? XIcon} alt='' />
              </FlexBox>
              <Typography transform='capitalize'>{friendlyWalletNames(connectedWallet?.wallet.type ?? '')}</Typography>
            </FlexBox>
            <FlexBox $alignItems='center' $gap={2}>
              <Typography>{truncateString(address, 20, 'middle')}</Typography>
              <CopyToClipboard text={address} onCopy={() => successToast(null, `Copied to clipboard`)}>
                <SvgBox color={theme.ixoDarkBlue} hover={{ color: theme.ixoNewBlue }} cursor='pointer'>
                  <img src='/assets/images/icon-copy.svg' />
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
            <img src='/assets/images/icon-disconnect.svg' />
          </SvgBox>
        </FlexBox>
      </FlexBox>

      <FlexBox width='100%' $direction='column' $gap={4}>
        <FlexBox $gap={2}>
          <TabButton
            preIcon={<img src='/assets/images/icon-coins-solid.svg' />}
            textSize='base'
            active={showAssetType === 'Coins'}
            onClick={() => setShowAssetType('Coins')}
          >
            Coins
          </TabButton>
          <TabButton preIcon={<img src='/assets/images/icon-impact-token2.svg' />} textSize='base'>
            Impact Tokens
          </TabButton>
          <TabButton preIcon={<img src='/assets/images/icon-asset.svg' />} textSize='base'>
            Assets
          </TabButton>
          <TabButton preIcon={<img src='/assets/images/icon-bond.svg' />} textSize='base'>
            Bonds
          </TabButton>
        </FlexBox>

        {showAssetType === 'Coins' && (
          <ScrollBox $direction='column' $gap={2} width='100%' height='250px' $overflowY='auto'>
            <TokensTableWrapper>
              <Table
                columns={TokensTableColumns}
                data={tokens}
                getRowProps={(state) => ({
                  style: { height: 70, cursor: 'pointer' },
                  onClick: handleRowClick(state),
                })}
                getCellProps={() => ({ style: { background: '#023044' } })}
              />
            </TokensTableWrapper>
            {selectedToken?.type === TokenType.Native && (
              <NativeTokenViewModal
                open={!!selectedToken}
                token={selectedToken}
                onClose={() => setSelectedToken(undefined)}
              />
            )}
            {selectedToken?.type === TokenType.Cw20 && (
              <Cw20TokenViewModal
                open={!!selectedToken}
                token={selectedToken as Cw20Token}
                onClose={() => setSelectedToken(undefined)}
              />
            )}
          </ScrollBox>
        )}
      </FlexBox>
    </FlexBox>
  )
}

export default ProfileModal
