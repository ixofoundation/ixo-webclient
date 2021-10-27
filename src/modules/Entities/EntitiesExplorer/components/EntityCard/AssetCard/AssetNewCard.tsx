import * as React from 'react'
import { Moment } from 'moment'
import styled from 'styled-components'
import { excerptText, thousandSeparator } from 'common/utils/formatters'
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
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { useEffect } from 'react'
import { getInflation, getTotalStaked, getTotalSupply } from 'modules/Entities/SelectedEntity/EntityExchange/EntityExchange.actions'

const chainID = process.env.REACT_APP_CHAIN_ID

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
  dateCreated?: Moment
  isExplorer?: boolean
}

const DataCard: React.FunctionComponent<Props> = ({
  // did,
  name,
  logo,
  image,
  sdgs,
  description,
  dateCreated,
  isExplorer = true,
}) => {
  const dispatch = useDispatch()
  const { Inflation, TotalSupply, TotalStaked } = useSelector(
    (state: RootState) => state.selectedEntityExchange,
  )

  useEffect(() => {
    dispatch(getInflation())
    dispatch(getTotalSupply())
    dispatch(getTotalStaked())
    // eslint-disable-next-line
  }, [])

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
              backgroundImage: `url(${image}),url(${require('assets/images/ixo-placeholder-large.jpg')})`,
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
                <div>Network Token</div>
                <div>{chainID.toUpperCase()}</div>
              </SDG>
            </div>
            <div className="col-6 text-right">
              <Logo src={logo} />
            </div>
          </div>
          <MainContent style={{ margin: '0.5rem 0' }}>
            <Title style={{ marginBottom: 0, fontWeight: 900 }}>
              {excerptText(name, 10)}
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
            &nbsp;{(Inflation * 100).toFixed(0)}% Inflation
          </div>
          <div className="d-flex align-items-center">
            <div style={{ fontSize: 28, fontWeight: 700 }}>
              {thousandSeparator(TotalSupply.toFixed(0), ',')}
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <div style={{ color: '#01283B', fontSize: 16, fontWeight: 400 }}>
                Total Supply
              </div>
              <div style={{ fontSize: 13, color: '#7D8498', fontWeight: 400 }}>
                Genesis • {dateCreated.format('DD/MM/YYYY')}
              </div>
            </div>
            <div style={{ fontWeight: 500, fontSize: 28, color: '#01283B' }}>
              <svg
                width="27"
                height="24"
                viewBox="0 0 27 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.9635 3.20516C16.9635 4.89497 15.5578 6.26482 13.8238 6.26482C12.0898 6.26482 10.6841 4.89497 10.6841 3.20516C10.6841 1.51536 12.0898 0.145508 13.8238 0.145508C15.5578 0.145508 16.9635 1.51536 16.9635 3.20516ZM13.8238 4.50368C14.5597 4.50368 15.1563 3.92231 15.1563 3.20516C15.1563 2.48801 14.5597 1.90665 13.8238 1.90665C13.0879 1.90665 12.4913 2.48801 12.4913 3.20516C12.4913 3.92231 13.0879 4.50368 13.8238 4.50368Z"
                  fill="#143F54"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26.8233 20.0858C26.8233 21.7756 25.4176 23.1455 23.6836 23.1455C21.9496 23.1455 20.5439 21.7756 20.5439 20.0858C20.5439 18.396 21.9496 17.0262 23.6836 17.0262C25.4176 17.0262 26.8233 18.396 26.8233 20.0858ZM23.6836 21.3844C24.4196 21.3844 25.0161 20.803 25.0161 20.0858C25.0161 19.3687 24.4196 18.7873 23.6836 18.7873C22.9477 18.7873 22.3512 19.3687 22.3512 20.0858C22.3512 20.803 22.9477 21.3844 23.6836 21.3844Z"
                  fill="#143F54"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.10263 20.0858C7.10263 21.7756 5.69694 23.1455 3.96294 23.1455C2.22893 23.1455 0.823242 21.7756 0.823242 20.0858C0.823242 18.396 2.22893 17.0262 3.96294 17.0262C5.69694 17.0262 7.10263 18.396 7.10263 20.0858ZM3.96294 21.3844C4.69885 21.3844 5.29542 20.803 5.29542 20.0858C5.29542 19.3687 4.69885 18.7873 3.96294 18.7873C3.22703 18.7873 2.63046 19.3687 2.63046 20.0858C2.63046 20.803 3.22703 21.3844 3.96294 21.3844Z"
                  fill="#143F54"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29572 16.386L11.1485 6.2337L12.7241 7.09631L6.87131 17.2486L5.29572 16.386Z"
                  fill="#143F54"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.6631 17.2395L15.1558 6.98753L16.7568 6.17072L22.2642 16.4227L20.6631 17.2395Z"
                  fill="#143F54"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.93323 19.4012H19.8789V21.1624H7.93323V19.4012Z"
                  fill="#143F54"
                />
              </svg>
            </div>
          </div>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default DataCard
