import { ReactComponent as AssetIcon } from '/public/assets/images/icon-asset.svg'
import { ReactComponent as BondIcon } from '/public/assets/images/icon-bond.svg'
import { ReactComponent as CoinsIcon } from '/public/assets/images/icon-coins-solid.svg'
import { ReactComponent as CopyIcon } from '/public/assets/images/icon-copy.svg'
import { ReactComponent as DisconnectIcon } from '/public/assets/images/icon-disconnect.svg'
import { ReactComponent as ImpactTokenIcon } from '/public/assets/images/icon-impact-token2.svg'
import { ReactComponent as WalletIcon } from '/public/assets/images/icon-wallet-solid.svg'
import { FlexBox, ScrollBox, SvgBox } from 'components/App/App.styles'
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
import { useMantineTheme } from '@mantine/core'
import { TokensTableColumns, TokensTableWrapper } from 'screens/MyAccount/MyPortfolioPage/BalanceView/NativeTokensCard'
import { Table } from 'components/Table'
import { friendlyWalletNames } from '@ixo-webclient/wallet-connector'
import XIcon from '/public/assets/images/x-icon.svg'

const ProfileModal: React.FC = () => {
  const theme = useMantineTheme()
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
              <FlexBox width='32px' height='32px' $borderRadius='100%'>
                <img width={'100%'} height={'100%'} src={connectedWallet?.wallet.imageUrl ?? XIcon} alt='' />
              </FlexBox>
              <Typography transform='capitalize'>{friendlyWalletNames(connectedWallet?.wallet.type ?? '')}</Typography>
            </FlexBox>
            <FlexBox $alignItems='center' $gap={2}>
              <Typography>{truncateString(address, 20, 'middle')}</Typography>
              <CopyToClipboard text={address} onCopy={() => successToast(null, `Copied to clipboard`)}>
                <SvgBox color={theme.ixoDarkBlue} hover={{ color: theme.colors.blue[5] }} cursor='pointer'>
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
            border={`1px solid ${theme.colors.blue[5]}`}
            p={3}
            color={theme.colors.blue[5]}
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
