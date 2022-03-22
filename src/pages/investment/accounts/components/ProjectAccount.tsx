import React from 'react';
import styled from 'styled-components'
import ReactApexChart from 'react-apexcharts'

export interface ProjectAccountProps {
  children?: React.ReactNode
  count: number
  selected?: boolean
  onSelect: () => void
}

interface InfoWrapperProps {
  currency: string
  amount: number
  subLabel: string
  size: number
}

interface InfoWrapperContainerProps {
  size: number
}

interface ContainerProps {
  selected?: boolean
}

const Container = styled.div<ContainerProps>`
  background: linear-gradient(356.78deg, #002D42 2.22%, #012639 96.94%);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.180339);
  border-radius: 4px;
  border: ${(props) => props.selected ? '1px solid #39C3E6' : 'none' };
  height: 100%;
  padding: 20px 20px 0 20px;
`

const InfoWrapperContainer = styled.div<InfoWrapperContainerProps>`
  color: white;
  font-weight: bold;
  .main {
    font-size: ${props => props.size * 16 }px;
    line-height: initial;
  }
  .sub {
    font-size: 12px;
    color: ${props => props.size === 2 ? 'white': '#436779'};
    line-height: initial;
  }
`


const StyledLabel = styled.label`
  background: #107591;
  border-radius: 6px;
  color: white;
  letter-spacing: 0.3px;
  text-align: center;
  font-weight: bold;
`

const series = [{
  name: "Desktops",
  data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
}]

const options: any = {
  chart: {
    type: 'line',
    zoom: {
      enabled: false
    },
    toolbar: {
      show: false
    },
    sparkline: {
      enabled: true
    }
  },
  colors: ["#107591"],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 2
  },
  grid: {
    show: false
  },
  yaxis: {
    show: false
  },
  xaxis: {
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    }
  }
}


const InfoWrapper = ({currency, amount, subLabel, size}: InfoWrapperProps) => (
  <InfoWrapperContainer size={size}>
    <div className="main">{`${currency} ${amount}`} </div>
    <div className="sub">{subLabel}</div>
  </InfoWrapperContainer>
)

export default function ProjectAccount ({count, selected, onSelect}: ProjectAccountProps): JSX.Element {
  const bigColWidth = count > 2 ? 12 : 6
  const smallColWidth = count > 2 ? 6 : 3;
  return (
    <Container className="container" selected={selected} onClick={() => onSelect()}>
      <div className="row m-0">
        <StyledLabel className="p-1 pl-2 pr-2">xEUR</StyledLabel>
      </div>
      <div className="row m-0">
        <div className={`col-${bigColWidth}`}>
          <InfoWrapper currency="xEUR" amount={230.75} subLabel="USD 286.32" size={2} />
        </div>
        <div className={`col-${smallColWidth} mt-2`}>
          <InfoWrapper currency="xEUR" amount={230.75} subLabel="USD 286.32" size={1} />
        </div>
        <div className={`col-${smallColWidth} mt-2`}>
          <InfoWrapper currency="xEUR" amount={230.75} subLabel="USD 286.32" size={1} />
        </div>
        <div className="col-12 mb-2">
          <ReactApexChart options={options} series={series} type="line" height="100px" />
        </div>
      </div>
    </Container>
  );
}
