import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import { excerptText } from 'common/utils/formatters'
import {
  CardContainer,
  CardLink,
  CardBottom,
  MainContent,
  Title,
  Logo,
  Description,
  CardTop,
  CardTopContainer,
} from '../EntityCard.styles'
import { TermsOfUseType } from 'modules/Entities/types'
import SDGIcons from '../SDGIcons/SDGIcons'
import { ProgressBar } from 'common/components/ProgressBar'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'common/redux/types'
import { excerptText } from 'common/utils/formatters'
import { getInflation, getTotalStaked, getTotalSupply } from 'modules/Entities/SelectedEntity/EntityExchange/EntityExchange.actions'

const chainID = process.env.REACT_APP_CHAIN_ID

interface Props {
  did: string
  name: string
  logo: string
  sdgs: string[]
  image: string
  description: string
  termsType: TermsOfUseType
  badges: string[]
  version: string
  isExplorer?: boolean
}

const SDG = styled.div`
  border-radius: 0.25rem;
  overflow: hidden;
  min-width: 8.25rem;
  height: 1rem;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.15);
  color: black;
  font-size: 9px;
  font-weight: 400;
  display: flex;
  border: 1px solid #39c3e6;

  > div {
    width: 50%;
    background: #ffffff;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #39c3e6;

    &:first-child {
      color: black;
      border-right: 1px solid #39c3e6;
    }
  }
`

const DataCard: React.FunctionComponent<Props> = ({
  name,
  image,
  sdgs,
  description,
  isExplorer = true,
}) => {
  const dispatch = useDispatch()
  const { Inflation, TotalSupply, TotalStaked } = useSelector(
    (state: RootState) => state.selectedEntityExchange,
  )
  const [APY, setAPY] = useState<string>('0')

  useEffect(() => {
    dispatch(getInflation())
    dispatch(getTotalSupply())
    dispatch(getTotalStaked())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (Inflation !== 0 && TotalSupply !== 0 && TotalStaked !== 0) {
      setAPY(((Inflation * TotalStaked) / TotalSupply).toFixed(2))
    }
  }, [Inflation, TotalSupply, TotalStaked])

  return (
    <CardContainer
      className={isExplorer ? 'col-xl-3 col-md-4 col-sm-12 col-12' : ''}
      style={
        isExplorer
          ? { padding: '0 0.5rem' }
          : { maxWidth: '300px', marginBottom: 0 }
      }
    >
      <CardLink
        to={{
          pathname: ``,
        }}
        style={{ borderRadius: 8, overflow: 'hidden' }}
      >
        <CardTop>
          <CardTopContainer
            style={{
              background: ` url(${require('assets/images/exchange/ixo-logo.svg')}) 10px 10px no-repeat,
                            url(${image}),
                            url(${require('assets/images/ixo-placeholder-large.jpg')})`,
              backgroundSize: `auto, cover`,
              height: '10.5rem',
            }}
          >
            <SDGIcons sdgs={sdgs} />
            <Description>
              <p>{excerptText(description, 20)}</p>
            </Description>
          </CardTopContainer>
        </CardTop>
        <CardBottom style={{ color: 'black' }}>
          <div className="row">
            <div className="col-6 align-items-center d-flex">
              <SDG>
                <div>Staking</div>
                <div>{chainID.toUpperCase()}</div>
              </SDG>
            </div>
            <div className="col-6 text-right">
              <Logo
                src={require('assets/images/exchange/impact-internet.svg')}
              />
            </div>
          </div>
          <MainContent style={{ margin: '0.5rem 0' }}>
            <Title style={{ marginBottom: 0 }}>
              {chainID.indexOf('impact') > 0 ? 'Impact Hub' : 'Pandora'}
            </Title>
            <div style={{ color: '#828E94', fontSize: 13, fontWeight: 400 }}>
              Internet of{' '}
              {chainID.indexOf('impact') > 0 ? 'Impact Hub' : 'Pandora'}
            </div>
          </MainContent>
          <div style={{ marginBottom: '0.5rem' }}>
            <ProgressBar
              total={TotalSupply}
              approved={TotalStaked}
              rejected={0}
              height={9}
              activeBarColor="linear-gradient(270deg, #00D2FF 50%, #036784 100%)"
            />
          </div>
          <div style={{ fontSize: 12, fontWeight: 400 }}>
            <span style={{ fontWeight: 700, color: '#00D2FF' }}>
              {((TotalStaked / TotalSupply) * 100).toFixed(2)}% Staked
            </span>
          </div>
          <div className="d-flex align-items-center">
            <div style={{ fontSize: 28, fontWeight: 700 }}>
              {excerptText(name, 1)}
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <div style={{ color: '#01283B', fontSize: 16, fontWeight: 400 }}>
                {APY}% APY
              </div>
              <div style={{ fontSize: 13, color: '#7D8498', fontWeight: 400 }}>
                Staking Reward
              </div>
            </div>
          </div>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default DataCard
