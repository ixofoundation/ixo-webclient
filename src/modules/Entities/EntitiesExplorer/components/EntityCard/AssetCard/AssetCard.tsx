import * as React from 'react'
import styled from 'styled-components'
import { excerptText } from 'common/utils/formatters'
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
    color: black;

    &:first-child {
      background: #7c2740;
      color: #fff;
    }
  }
`

const DataCard: React.FunctionComponent<Props> = ({
  did,
  name,
  logo,
  image,
  sdgs,
  description,
  isExplorer = true
}) => {
  return (
    <CardContainer
      className={isExplorer ? "col-xl-3 col-md-4 col-sm-12 col-12" : ""}
      style={isExplorer ? { padding: '0 0.5rem' } : { maxWidth: '300px' }}
    >
      <CardLink
        to={{
          pathname: `/projects/${did}/overview`,
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
                <div>Impact Token</div>
                <div>Biodiversity</div>
              </SDG>
            </div>
            <div className="col-6 text-right">
              <Logo src={logo} />
            </div>
          </div>
          <MainContent style={{ margin: '0.5rem 0' }}>
            <Title style={{ marginBottom: 0 }}>{excerptText(name, 10)}</Title>
            <div style={{ color: '#828E94', fontSize: 13, fontWeight: 400 }}>
              Umgeni Park, South Africa
            </div>
          </MainContent>
          <div style={{ marginBottom: '0.5rem' }}>
            <ProgressBar
              total={1000}
              approved={412}
              rejected={0}
              height={9}
              activeBarColor="linear-gradient(270deg, #6FCF97 50%, #036784 100%)"
            />
          </div>
          <div style={{ fontSize: 12, fontWeight: 400 }}>
            <span style={{ fontWeight: 700, color: '#00D2FF' }}>412</span>/1000
            shares of Future Breeding Revenue
          </div>
          <div className="d-flex align-items-center">
            <div style={{ fontSize: 28, fontWeight: 700 }}>
              1<span style={{ color: '#7D8498' }}>/8</span>
            </div>
            <div
              style={{
                fontSize: 14,
                color: '#01283B',
                fontWeight: 400,
                paddingTop: '0.5rem',
                marginLeft: '0.5rem',
              }}
            >
              #02
            </div>
            <svg
              width="14"
              height="17"
              viewBox="0 0 14 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft: 'auto' }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.3529 16.0806H2.18052C1.39956 16.0806 0.766602 15.4171 0.766602 14.5991V6.89662C0.766602 6.07834 1.39956 5.41513 2.18052 5.41513H2.45269V5.12452H2.46165C2.46259 2.33884 4.61834 0.0805664 7.27721 0.0805664C9.93678 0.0805664 12.0697 2.33958 12.0697 5.12625C12.0697 5.22822 12.0734 5.32279 12.0737 5.41513H12.3527C13.1336 5.41513 13.7666 6.07834 13.7666 6.89662V14.5991C13.7668 15.4174 13.1341 16.0806 12.3529 16.0806ZM7.28687 1.85908C5.56873 1.85908 4.17602 3.31834 4.17531 5.1181H4.16942V5.41513H10.3845V5.39168C10.3925 5.30575 10.3987 5.21686 10.3987 5.11933C10.3984 3.31884 9.00524 1.85908 7.28687 1.85908ZM12.0784 7.79242C12.0784 7.46501 11.8251 7.19982 11.5128 7.19982H3.02203C2.70979 7.19982 2.45646 7.46501 2.45646 7.79242V13.7132C2.45646 14.0406 2.70979 14.3058 3.02203 14.3058H11.5128C11.8251 14.3058 12.0784 14.0403 12.0784 13.7132V7.79242ZM7.40446 12.5196H7.12168C6.73261 12.5196 6.41731 12.1892 6.41731 11.7816V9.73415C6.41731 9.32649 6.73261 8.99612 7.12168 8.99612H7.40446C7.79352 8.99612 8.10882 9.32649 8.10882 9.73415V11.7816C8.10906 12.1892 7.79352 12.5196 7.40446 12.5196Z"
                fill="#7D8498"
              />
            </svg>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <div style={{ color: '#01283B', fontSize: 16, fontWeight: 400 }}>
                Verified Live and Well
              </div>
              <div style={{ fontSize: 13, color: '#7D8498', fontWeight: 400 }}>
                By MIT 31/12/2022
              </div>
            </div>
            <div style={{ fontWeight: 500, fontSize: 28, color: '#01283B' }}>
              $410
            </div>
          </div>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default DataCard
