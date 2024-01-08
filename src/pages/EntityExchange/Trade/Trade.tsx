import React, { useEffect } from 'react'
import AssetStakingCard from 'components/Entities/EntitiesExplorer/Components/EntityCard/AssetCard/AssetStakingCard'
import { TermsOfUseType } from 'types/entities'
import { TradeWrapper, CardHeader, CardBody, WalletBox, TradePanel, AssetCardWrapper } from './Trade.styles'
import IMG_wallet2 from 'assets/images/icon-keplr.svg'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { NavLink, useHistory } from 'react-router-dom'
import { Flex } from '@mantine/core'
import { useAccount } from 'hooks/account'

const Trade = ({ currentEntity }: Pick<RootState, 'currentEntity'>) => {
  const history = useHistory()
  const { address } = useAccount()

  useEffect(() => {
    if (address) {
      history.push('/exchange/trade/swap/wallet/keplr')
    }
  }, [address, history])

  return (
    <TradeWrapper>
      <div className='d-flex'>
        <AssetCardWrapper>
          {currentEntity && (
            <>
              <CardHeader>&nbsp;</CardHeader>
              <AssetStakingCard
                did={currentEntity?.id || ''}
                name={currentEntity?.profile?.name || ''}
                logo={currentEntity?.profile?.logo || ''}
                image={currentEntity?.profile?.image || ''}
                sdgs={[]}
                description={currentEntity?.profile?.description || ''}
                badges={[]}
                version={''}
                termsType={TermsOfUseType.PayPerUse}
                isExplorer={false}
                link={`/entity/${currentEntity?.id || ''}/overview`}
              />
            </>
          )}
        </AssetCardWrapper>
        <TradePanel width='40%'>
          <Flex w='100%' direction='column'>
            <CardHeader>Connect My Wallet</CardHeader>
            <CardBody>
              <NavLink style={{ textDecoration: 'none' }} to={{ pathname: '/exchange/trade/swap/wallet/keplr' }}>
                <WalletBox>
                  <img src={IMG_wallet2} alt='wallet2' />
                  <span style={{ color: 'white' }}>Keplr</span>
                </WalletBox>
              </NavLink>
            </CardBody>
          </Flex>
        </TradePanel>
        <AssetCardWrapper />
      </div>
    </TradeWrapper>
  )
}

const mapStateToProps = (state: RootState): any => ({
  selectedEntity: state.selectedEntity,
})

export default connect(mapStateToProps)(Trade)
