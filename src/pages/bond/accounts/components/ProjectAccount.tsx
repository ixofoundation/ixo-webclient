import React from 'react'
import styled from 'styled-components'
import ReactApexChart from 'react-apexcharts'
import { Currency } from 'types/models'
import { displayTokenAmount } from 'common/utils/currency.utils'

export interface ProjectAccountProps {
  children?: React.ReactNode
  count: number
  selected?: boolean
  onSelect: () => void
  balance?: Currency
  locked?: boolean
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
  background: linear-gradient(356.78deg, #002d42 2.22%, #012639 96.94%);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.180339);
  border-radius: 4px;
  border: ${(props) => (props.selected ? '1px solid #39C3E6' : 'none')};
  height: 100%;
  padding: 20px 20px 0 20px;
  cursor: pointer;
`

const InfoWrapperContainer = styled.div<InfoWrapperContainerProps>`
  font-family: ${(props: any): string => props.theme.fontRobotoRegular};
  color: white;
  letter-spacing: 0.3px;
  .main {
    font-size: ${(props) => props.size * 16}px;
    line-height: initial;
  }
  .sub {
    font-size: 12px;
    color: ${(props) => (props.size === 2 ? 'white' : '#436779')};
    line-height: initial;
  }
`

const StyledLabel = styled.label`
  min-width: 60px;
  background: #107591;
  border-radius: 6px;
  color: white;
  letter-spacing: 0.3px;
  text-align: center;
  font-weight: normal;
`

const series = [
  {
    name: 'Desktops',
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  },
]

const options = {
  chart: {
    type: 'line',
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  colors: ['#107591'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
    width: 2,
  },
  grid: {
    show: false,
  },
  yaxis: {
    show: false,
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
}

const InfoWrapper = ({
  currency,
  amount,
  subLabel,
  size,
}: InfoWrapperProps) => (
  <InfoWrapperContainer size={size}>
    <div className="main">{`${currency} ${displayTokenAmount(amount)}`} </div>
    <div className="sub">{subLabel}</div>
  </InfoWrapperContainer>
)

export default function ProjectAccount({
  count,
  selected,
  onSelect,
  balance: { denom = 'xEUR', amount = 230.75 },
  locked = true,
}: ProjectAccountProps): JSX.Element {
  const bigColWidth = count > 2 ? 12 : 6
  const smallColWidth = count > 2 ? 6 : 3
  return (
    <Container
      className="container px-1"
      selected={selected}
      onClick={() => onSelect()}
    >
      <div className="row m-0">
        <div className={`col-12`}>
          <StyledLabel className="px-2">{denom}</StyledLabel>
        </div>
      </div>
      <div className="row m-0">
        <div className={`col-${bigColWidth}`}>
          <InfoWrapper
            currency={denom}
            amount={amount}
            subLabel="USD 1"
            size={2}
          />
        </div>
        {locked && (
          <>
            <div className={`col-${smallColWidth} mt-2`}>
              <InfoWrapper
                currency={denom}
                amount={amount}
                subLabel="USD 1"
                size={1}
              />
            </div>
            <div className={`col-${smallColWidth} mt-2`}>
              <InfoWrapper
                currency={denom}
                amount={amount}
                subLabel="USD 1"
                size={1}
              />
            </div>
          </>
        )}
        <div className="col-12 mb-2">
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height="100px"
          />
        </div>
      </div>
    </Container>
  )
}
