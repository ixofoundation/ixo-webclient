import * as React from 'react';
import GaugeChart from 'react-gauge-chart'
import { Container, GaugeContainer, InfoContainer, Header, BlockSection, BlockInfo, Footer, BlockInfoStatus, BlockInfoPercentage, BlockInfoAmount, gaugeStyle } from './index.style'

interface AlphaChartProps {
  percentage: number
}

const AlphaChart: React.FunctionComponent<AlphaChartProps> = (props) => {
  return (
    <Container>
      <GaugeContainer>
        <GaugeChart id="gauge-chart1" style={gaugeStyle} />;
      </GaugeContainer>
      <InfoContainer>
        <Header className="text-white">All Stakeholders predict 72% likehood of a Positive Outcome</Header>
        <BlockSection>
          <BlockInfo className="d-flex flex-column align-items-center justify-content-around" color="#00D2FF">
            <BlockInfoStatus color="#00D2FF">POSITIVE</BlockInfoStatus>
            <BlockInfoPercentage color="#00D2FF">68%</BlockInfoPercentage>
            <BlockInfoAmount>169,320 EDU</BlockInfoAmount>
          </BlockInfo>
          <BlockInfo className="d-flex flex-column align-items-center justify-content-around" color="#ED9526">
            <BlockInfoStatus color="#ED9526">NEGATIVE</BlockInfoStatus>
            <BlockInfoPercentage color="#ED9526">68%</BlockInfoPercentage>
            <BlockInfoAmount>169,320 EDU</BlockInfoAmount>
          </BlockInfo>
          <BlockInfo className="d-flex flex-column align-items-center justify-content-around" color="#C3D0E5">
            <BlockInfoStatus color="#C3D0E5">NETURAL</BlockInfoStatus>
            <BlockInfoPercentage color="#C3D0E5">68%</BlockInfoPercentage>
            <BlockInfoAmount>169,320 EDU</BlockInfoAmount>
          </BlockInfo>
        </BlockSection>
        <Footer>The total staked by all Stakeholders is 23,540 EDU</Footer>
      </InfoContainer>
    </Container>
  )
};

export default AlphaChart;
