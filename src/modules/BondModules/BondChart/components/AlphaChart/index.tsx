import { ApexOptions } from 'apexcharts'
import { RootState } from 'common/redux/types'
import * as React from 'react'
import moment from 'moment'
import { Fragment, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useSelector } from 'react-redux'
// import GaugeChart from 'react-gauge-chart'
import { StyledHeader } from '../AreaChart/Chart.styles'
import {
  Container,
  // GaugeContainer,
  InfoContainer,
  // Header,
  // BlockSection,
  // BlockInfo,
  // Footer,
  // BlockInfoStatus,
  // BlockInfoPercentage,
  // BlockInfoAmount,
  // gaugeStyle,
} from './index.style'

interface AlphaChartProps {
  percentage: number
}
const options: ApexOptions = {
  chart: {
    height: 280,
    type: 'area',
    foreColor: '#2A7597',
  },
  dataLabels: {
    enabled: false,
  },
  colors: ['#39C3E6'],
  fill: {
    opacity: 0.15,
  },
  grid: {
    borderColor: '#436779',
    strokeDashArray: 2,
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      color: '#436779',
    },
  },
}
// const series = [
//   {
//     name: 'Alpha',
//     data: [0.2, 0.3, 0.4, 0.2, 0.6, 0.5, 0.2],
//   },
// ]

const AlphaChart: React.FunctionComponent<AlphaChartProps> = () => {
  const { alphaHistory } = useSelector(
    (state: RootState) => state.activeBond,
  )
  const [series, setSeries] = React.useState([])

  useEffect(() => {
    if (alphaHistory.length > 0) {
      setSeries(alphaHistory.map(({ alpha, time }) => ({ x: moment(time).format('DD MMM YYYY HH:mm:ss'), y: alpha })))
    }
  }, [alphaHistory])

  // function renderAlphaTarget() {
  //   return (
  //     <GaugeContainer>
  //       <Header className="text-white">Alpha Target</Header>
  //       {/* https://ej2.syncfusion.com/demos/?_gl=1*dl8fuv*_ga*MTg5ODI3MzAyMy4xNjMyMDc4NzYz*_ga_WC4JKKPHH0*MTYzMjA3ODc2Mi4xLjEuMTYzMjA3ODgwMC4w&_ga=2.235471173.530273628.1632078763-1898273023.1632078763#/material/circular-gauge/labels.html */}
  //       <GaugeChart
  //         id="gauge-chart1"
  //         style={gaugeStyle}
  //         nrOfLevels={3}
  //         arcsLength={[0.5, 0.2, 0.3]}
  //         colors={['#ED9526', '#01728F', '#00D2FF']}
  //         percent={0.71}
  //         needleColor={'#C3D0E5'}
  //         needleBaseColor={'#C3D0E5'}
  //       />
  //     </GaugeContainer>
  //   )
  // }

  // function renderInfoContainer() {
  //   return (
  //     <InfoContainer>
  //       <Header className="text-white">
  //         All Stakeholders predict 72% likehood of a Positive Outcome
  //       </Header>
  //       <BlockSection>
  //         <BlockInfo
  //           className="d-flex flex-column align-items-center justify-content-around"
  //           color="#00D2FF"
  //         >
  //           <BlockInfoStatus color="#00D2FF">POSITIVE</BlockInfoStatus>
  //           <BlockInfoPercentage color="#00D2FF">68%</BlockInfoPercentage>
  //           <BlockInfoAmount>169,320 EDU</BlockInfoAmount>
  //         </BlockInfo>
  //         <BlockInfo
  //           className="d-flex flex-column align-items-center justify-content-around"
  //           color="#ED9526"
  //         >
  //           <BlockInfoStatus color="#ED9526">NETURAL</BlockInfoStatus>
  //           <BlockInfoPercentage color="#ED9526">68%</BlockInfoPercentage>
  //           <BlockInfoAmount>169,320 EDU</BlockInfoAmount>
  //         </BlockInfo>
  //         <BlockInfo
  //           className="d-flex flex-column align-items-center justify-content-around"
  //           color="#C3D0E5"
  //         >
  //           <BlockInfoStatus color="#C3D0E5">NETURAL</BlockInfoStatus>
  //           <BlockInfoPercentage color="#C3D0E5">68%</BlockInfoPercentage>
  //           <BlockInfoAmount>169,320 EDU</BlockInfoAmount>
  //         </BlockInfo>
  //       </BlockSection>
  //       <Footer>The total staked by all Stakeholders is 23,540 EDU</Footer>
  //     </InfoContainer>
  //   )
  // }

  return (
    <Fragment>
      <StyledHeader>Alpha</StyledHeader>
      {/* <Container>
        {renderAlphaTarget()}
        {renderInfoContainer()}
      </Container> */}
      <Container className="mt-4 h-100">
        <InfoContainer>
          {/* <Header className="text-white">
            Alpha Predictions (Weekly moving average)
          </Header> */}
          <ReactApexChart
            options={options}
            type="area"
            height={290}
            series={[
              {
                name: 'alpha',
                data: series,
              },
            ]}
          />
        </InfoContainer>
      </Container>
    </Fragment>
  )
}

export default AlphaChart
