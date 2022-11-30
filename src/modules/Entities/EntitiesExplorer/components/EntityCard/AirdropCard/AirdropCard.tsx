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
import { ProgressBar } from 'components/ProgressBar'
import { useDispatch } from 'react-redux'
import { getEntity } from 'redux/selectedEntity/selectedEntity.actions'

const SubTitle = styled.div`
  color: #828e94;
  font-size: 13px;
  font-weight: 400;
`

const Rewards = styled.div`
  & > span:first-child {
    color: #ddd9d9;
    font-size: 28px;
    font-weight: 700;
  }

  & > span:last-child {
    color: #01283b;
    font-size: 16px;
    font-weight: 400;
  }
`

const Status = styled.div`
  font-size: 13px;
  color: #7d8498;
  font-weight: 400;

  & > strong {
    color: #01283b;
  }
`

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
    background-color: ${(props): string => props.theme.highlight.light};

    &:first-child {
      color: black;
      background-color: white;
    }
  }
`

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

const DataCard: React.FunctionComponent<Props> = ({ did, name, logo, image, sdgs }) => {
  const dispatch = useDispatch()

  const handleCardClick = (): void => {
    dispatch(getEntity(did) as any)
  }

  return (
    <CardContainer style={{ maxWidth: '300px', marginBottom: 0 }}>
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
              background: `url(${require('assets/tokens/ixo.svg')}) 10px 10px no-repeat, url(${image})`,
              backgroundSize: `auto, cover`,
              height: '10.5rem',
            }}
          >
            <SDGIcons sdgs={sdgs} />
            <Description></Description>
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
            <Title style={{ marginBottom: 0 }}>{name}</Title>
            <SubTitle>Mission 1</SubTitle>
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
          <div style={{ fontSize: 12 }}>
            <span style={{ fontWeight: 700, color: '#00D2FF' }}>{`1,200/5,000 IXO Available`}</span>
          </div>
          <Rewards className='d-flex flex-column'>
            <span>100 IXO</span>
            <span>Reward</span>
          </Rewards>
          <Status>
            Time Remaining <strong>34</strong> hrs <strong>12</strong> mins
            <br />
            Start date <strong>12/12/21</strong> End date <strong>12/12/21</strong>
          </Status>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default DataCard
