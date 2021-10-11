import * as React from 'react'
import { Fragment, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import GaugeChart from 'react-gauge-chart'
import { StyledHeader } from '../AreaChart/Chart.styles'
import { setCornerRadius } from './chart.utils'
import {
  Container,
  GaugeContainer,
  InfoContainer,
  Header,
  BlockSection,
  BlockInfo,
  Footer,
  BlockInfoStatus,
  BlockInfoPercentage,
  BlockInfoAmount,
  gaugeStyle,
} from './index.style'

interface AlphaChartProps {
  percentage: number
}

const AlphaChart: React.FunctionComponent<AlphaChartProps> = () => {
  const options = {
    cornerRadius: 20,
    tooltips: {
      callbacks: {
        title: (): string => {
          return 'title must be modified'
        },
      },
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            fontColor: '#FFFFFF',
          },
        },
      ],
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            fontColor: '#2A7597',
          },
        },
      ],
    },
    legend: {
      align: 'end',
      labels: {
        usePointStyle: true,
        color: 'rgb(255, 99, 132)',
      },
    },
    responsive: true,
  }

  const data = {
    datasets: [
      {
        label: 'Negative',
        data: [1, 3, 5, 6, 3, 1, 8, 1],
        backgroundColor: '#ED9526',
      },
      {
        label: 'Positive',
        data: [1, 3, 5, 6, 3, 1, 8, 1],
        backgroundColor: '#00D2FF',
      },
      {
        label: 'Neutral',
        data: [1, 3, 5, 6, 3, 1, 8, 1],
        backgroundColor: '#04617A',
      },
      {
        label: 'Total Remainder',
        data: [10, 10, 10,10,10,10,10,10],
        backgroundColor: '#012D42',
      }
    ],
    labels: ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'],
  }

  useEffect(() => {
    setCornerRadius()
  }, [])

  return (
    <Fragment>
      <StyledHeader>Alpha Forecast</StyledHeader>
      <Container>
        <GaugeContainer>
          <Header className="text-white">Alpha Target</Header>
          {/* https://ej2.syncfusion.com/demos/?_gl=1*dl8fuv*_ga*MTg5ODI3MzAyMy4xNjMyMDc4NzYz*_ga_WC4JKKPHH0*MTYzMjA3ODc2Mi4xLjEuMTYzMjA3ODgwMC4w&_ga=2.235471173.530273628.1632078763-1898273023.1632078763#/material/circular-gauge/labels.html */}
          <GaugeChart
            id="gauge-chart1"
            style={gaugeStyle}
            nrOfLevels={3}
            arcsLength={[0.5, 0.2, 0.3]}
            colors={['#ED9526', '#01728F', '#00D2FF']}
            percent={0.71}
            needleColor={'#C3D0E5'}
            needleBaseColor={'#C3D0E5'}
          />
        </GaugeContainer>
        <InfoContainer>
          <Header className="text-white">
            All Stakeholders predict 72% likehood of a Positive Outcome
          </Header>
          <BlockSection>
            <BlockInfo
              className="d-flex flex-column align-items-center justify-content-around"
              color="#00D2FF"
            >
              <BlockInfoStatus color="#00D2FF">POSITIVE</BlockInfoStatus>
              <BlockInfoPercentage color="#00D2FF">68%</BlockInfoPercentage>
              <BlockInfoAmount>169,320 EDU</BlockInfoAmount>
            </BlockInfo>
            <BlockInfo
              className="d-flex flex-column align-items-center justify-content-around"
              color="#ED9526"
            >
              <BlockInfoStatus color="#ED9526">NETURAL</BlockInfoStatus>
              <BlockInfoPercentage color="#ED9526">68%</BlockInfoPercentage>
              <BlockInfoAmount>169,320 EDU</BlockInfoAmount>
            </BlockInfo>
            <BlockInfo
              className="d-flex flex-column align-items-center justify-content-around"
              color="#C3D0E5"
            >
              <BlockInfoStatus color="#C3D0E5">NETURAL</BlockInfoStatus>
              <BlockInfoPercentage color="#C3D0E5">68%</BlockInfoPercentage>
              <BlockInfoAmount>169,320 EDU</BlockInfoAmount>
            </BlockInfo>
          </BlockSection>
          <Footer>The total staked by all Stakeholders is 23,540 EDU</Footer>
        </InfoContainer>
      </Container>
      <Container className="mt-4 h-100">
        <InfoContainer>
          <Header className="text-white">
            Alpha Predictions (Weekly moving average)
          </Header>
          <Bar data={data} options={options} />
        </InfoContainer>
      </Container>
    </Fragment>
  )
}

export default AlphaChart
