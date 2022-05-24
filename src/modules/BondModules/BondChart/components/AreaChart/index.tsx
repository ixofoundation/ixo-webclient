import React, { Fragment } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Button, ButtonTypes } from 'common/components/Form/Buttons'
import DateRangeSelector from 'common/components/JsonForm/CustomWidgets/DateRangeSelector/DateRangeSelector'

import {
  ChartContainer,
  StyledHeader,
  RangeDateWrapper,
  FilterContainer,
  DateFilterContainer,
} from './Chart.styles'

interface Props {
  data: any
  token?: string
  lineColor: string
  mainColor: string
  backgroundColor: string
  header?: string
}

export const Chart: React.FunctionComponent<Props> = ({
  data,
  lineColor,
  mainColor,
  backgroundColor,
  header,
}) => {
  const options: any = {
    chart: {
      type: 'area',
      height: 290,
      id: 'area',
      toolbar: {
        autoSelected: 'pan',
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: '#2A7597',
      redrawOnParentResize: true,
    },
    plotOptions: {},
    xaxis: {
      type: 'datetime',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        color: '#436779',
        show: false,
      },
    },
    grid: {
      borderColor: '#436779',
      strokeDashArray: 2,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    // grid: {
    //   borderColor: '#436779',
    //   strokeDashArray: 2,
    // },
    fill: {
      type: 'solid',
      colors: [mainColor],
      opacity: 0.15,
    },
    colors: [lineColor],
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
  }

  const [chartInterval, setChartInterval] = React.useState('All')

  return (
    <Fragment>
      <StyledHeader>{header}</StyledHeader>
      <ChartContainer className="BondsWrapper_panel__chrome hide-on-mobile">
        <FilterContainer color={lineColor} backgroundColor={backgroundColor}>
          <div className="d-flex align-items-center">
            <Button type={ButtonTypes.dark}>History</Button>
            <RangeDateWrapper>
              <DateRangeSelector
                id="date"
                value=""
                onChange={(value): void =>
                  console.log('ffffffffffffffffffffff', value)
                }
                onBlur={(id, value): void =>
                  console.log('ffffffffffffffffffff', id, value)
                }
                onFocus={(id, value): void =>
                  console.log('ffffffffffffffffffff', id, value)
                }
              />
            </RangeDateWrapper>
          </div>
          <DateFilterContainer>
            <Button
              type={ButtonTypes.dark}
              className={`${chartInterval === 'H' ? 'active' : ''}`}
              onClick={(): void => setChartInterval('H')}
            >
              H
            </Button>
            <Button
              type={ButtonTypes.dark}
              className={`${chartInterval === 'D' ? 'active' : ''}`}
              onClick={(): void => setChartInterval('D')}
            >
              D
            </Button>
            <Button
              type={ButtonTypes.dark}
              className={`${chartInterval === 'M' ? 'active' : ''}`}
              onClick={(): void => setChartInterval('M')}
            >
              M
            </Button>
            <Button
              type={ButtonTypes.dark}
              className={`${chartInterval === 'Y' ? 'active' : ''}`}
              onClick={(): void => setChartInterval('Y')}
            >
              Y
            </Button>
            <Button
              type={ButtonTypes.dark}
              className={`${chartInterval === 'All' ? 'active' : ''}`}
              onClick={(): void => setChartInterval('All')}
            >
              ALL
            </Button>
          </DateFilterContainer>
        </FilterContainer>
        <div className="BondsWrapper_panel__content">
          <ReactApexChart
            options={options}
            series={data}
            type="area"
            height={290}
          />
        </div>
      </ChartContainer>
    </Fragment>
  )
}

Chart.defaultProps = {
  token: 'EDU',
}

export default Chart
