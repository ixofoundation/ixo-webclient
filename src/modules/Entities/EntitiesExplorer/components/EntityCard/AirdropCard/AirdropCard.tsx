import * as React from 'react'
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
import { useDispatch } from 'react-redux'
import { getEntity } from 'modules/Entities/SelectedEntity/SelectedEntity.actions'

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

  > div {
    width: 50%;
    background: #ffffff;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: #39C3E6;

    &:first-child {
      color: black;
      background-color: white;
    }
  }
`

const DataCard: React.FunctionComponent<Props> = ({
  did,
  name,
  logo,
  image,
  sdgs,
}) => {
  const dispatch = useDispatch()

  const handleCardClick = () => {
    dispatch(getEntity(did));
  }

  return (
    <CardContainer
      style={{ maxWidth: '300px', marginBottom: 0 }}
    >
      <CardLink
        to={{
          pathname: `/projects/${did}/overview`,
        }}
        onClick={handleCardClick}
        style={{ borderRadius: 8, overflow: 'hidden' }}
      >
        <CardTop>
          <CardTopContainer
            style={{
              background: `url(${require('assets/images/exchange/ixo-logo.svg')}) 10px 10px no-repeat, url(${image})`,
              backgroundSize: `auto, cover`,
              height: '10.5rem',
            }}
          >
            <SDGIcons sdgs={sdgs} />
            <Description>
            </Description>
          </CardTopContainer>
        </CardTop>
        <CardBottom style={{ color: 'black' }}>
          <div className='row'>
            <div className='col-6 align-items-center d-flex'>
              <SDG>
                <div>Airdrop</div>
                <div>IXO</div>
              </SDG>
            </div>
            <div className='col-6 text-right'>
              <Logo src={logo} />
            </div>
          </div>
          <MainContent style={{ margin: '0.5rem 0' }}>
            <Title style={{ marginBottom: 0 }}>Find a Rhino Challenge</Title>
            <div style={{ color: '#828E94', fontSize: 13, fontWeight: 400 }}>
              Mission 1
            </div>
          </MainContent>
          <div style={{ marginBottom: '0.5rem' }}>
            <ProgressBar
              total={5000}
              approved={1200}
              rejected={0}
              height={9}
              activeBarColor='linear-gradient(270deg, #00D2FF 50%, #036784 100%)'
            />
          </div>
          <div style={{ fontSize: 12, fontWeight: 400 }}>
            <span style={{ fontWeight: 700, color: '#00D2FF' }}>
              {`1,200/5,000 IXO Available`}
            </span>
          </div>
          <div className='d-flex align-items-center'>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#DDD9D9' }}>100 IXO</div>
          </div>
          <div className='d-flex align-items-center justify-content-between'>
            <div>
              <div style={{ color: '#01283B', fontSize: 16, fontWeight: 400 }}>
                Reward
              </div>
              <div style={{ fontSize: 13, color: '#7D8498', fontWeight: 400 }}>
                Time Remaining   34 hrs 12 mins<br />
                Start date 12/12/21   End date 12/12/21
              </div>
            </div>
          </div>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default DataCard
