import React, { Fragment, useEffect, useState } from 'react'
import cx from 'classnames'
import ReactApexChart from 'react-apexcharts'
import _ from 'lodash'
import moment from 'moment'
import { Button, ButtonTypes } from 'common/components/Form/Buttons'
import {
  StyledHeader,
  Container,
  FilterContainer,
  DateFilterContainer,
} from './index.styles'

interface Props {
  data: any
  denom: string
}

const options = {
  chart: {
    type: 'candlestick',
    height: 290,
    id: 'candles',
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
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#39C3E6',
        downward: '#F89D28',
      },
    },
  },
  xaxis: {
    type: 'text',
    axisBorder: {
      show: false,
    },
    axisTicks: {
      color: '#436779',
    },
  },
  grid: {
    borderColor: '#436779',
    strokeDashArray: 2,
  },
  tooltip: {
    x: {
      show: true,
      format: "MMM 'yy",
    },
  },
}

const optionsBar = {
  chart: {
    height: 160,
    type: 'bar',
    brush: {
      enabled: true,
      target: 'candles',
    },
    redrawOnParentResize: true,
    selection: {
      enabled: true,
      xaxis: {
        // min: new Date().getTime() - 8 * 3600 * 100,
        // max: new Date().getTime(),
      },
      fill: {
        color: '#C4C4C4',
        opacity: 0.1,
      },
      stroke: {
        color: '#0D47A1',
      },
    },
    foreColor: '#2A7597',
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      columnWidth: '80%',
      colors: {
        ranges: [
          {
            from: -1000,
            to: 0,
            color: '#F89D28',
          },
          {
            from: 1,
            to: 10000,
            color: '#39C3E6',
          },
        ],
      },
    },
  },
  stroke: {
    width: 0,
  },
  xaxis: {
    type: 'text',
    axisBorder: {
      offsetX: 13,
      color: '#436779',
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  grid: {
    borderColor: '#436779',
    strokeDashArray: 1,
  },
}

enum FilterRange {
  ALL = 'All',
  MONTH = 'M',
  WEEK = 'W',
  DAY = 'D',
}

const CandleStickChart: React.FunctionComponent<Props> = ({
  data: priceHistory,
  denom,
}): JSX.Element => {
  const [seriesData, setSeriesData] = useState([])
  const [seriesBarData, setSeriesBarData] = useState([])
  const [filterRange, setFilterRange] = useState(FilterRange.ALL)

  const weekDisplayFormat = (week): string =>
    `${moment()
      .day('Sunday')
      .week(Number(week) + 1)
      .format('DD MMM YYYY')} ~ ${moment()
      .day('Saturday')
      .week(Number(week) + 1)
      .format('DD MMM YYYY')}`

  const generateMinPrice = (data): number => {
    return _.min(data.map(({ price }) => Number(price)))
  }
  const generateMaxPrice = (data): number => {
    return _.max(data.map(({ price }) => Number(price)))
  }
  const generateStartPrice = (data): number => {
    return _.first(data.map(({ price }) => Number(price)))
  }
  const generateEndPrice = (data): number => {
    return _.last(data.map(({ price }) => Number(price)))
  }
  const generateAvgPrice = (data): number => {
    return _.mean(data.map(({ price }) => Number(price)))
  }

  const generateSeriesData = (data): void => {
    const series = []

    for (let i = 0; i < data.length; i++) {
      const { period, date } = data[i]
      const open = generateStartPrice(period)
      const high = generateMaxPrice(period)
      const low = generateMinPrice(period)
      const close = generateEndPrice(period)

      series.push({
        x: date,
        y: [open, high, low, close],
      })
    }

    setSeriesData(series)
  }

  const generateSeriesBarData = (data): void => {
    const seriesBar = []
    const meanPrice = generateAvgPrice(priceHistory)

    for (let i = 0; i < data.length; i++) {
      const { period, date } = data[i]
      const periodMeanPrice = generateAvgPrice(period)

      seriesBar.push({
        x: date,
        y: periodMeanPrice - meanPrice,
      })
    }
    setSeriesBarData(seriesBar)
  }

  const groupPriceHistory = (data, rangeType): any => {
    let dateFormat = ''
    switch (rangeType) {
      case FilterRange.DAY:
        dateFormat = 'DD MMM YYYY'
        break
      case FilterRange.WEEK:
        dateFormat = 'WW'
        break
      case FilterRange.MONTH:
        dateFormat = 'MMM YYYY'
        break
      case FilterRange.ALL:
      default:
        dateFormat = 'DD MMM YYYY h:mm:ss a'
        break
    }

    const grouppedData = _.groupBy(data, ({ time }) =>
      moment(time).format(dateFormat),
    )
    return Object.entries(grouppedData).map(([key, value]) => ({
      date: rangeType === FilterRange.WEEK ? weekDisplayFormat(key) : key,
      period: value,
    }))
  }

  useEffect(() => {
    if (priceHistory.length > 0) {
      const data = groupPriceHistory(priceHistory, filterRange)

      generateSeriesData(data)
      generateSeriesBarData(data)
    }
  }, [priceHistory, filterRange])

  return (
    <Fragment>
      <StyledHeader>Price of {denom.toUpperCase()}</StyledHeader>
      <Container className="BondsWrapper_panel__chrome hide-on-mobile">
        <FilterContainer color={'#39C3E6'} backgroundColor={'#39C3E6'}>
          <DateFilterContainer>
            <Button
              type={ButtonTypes.dark}
              className={cx({ active: filterRange === FilterRange.ALL })}
              onClick={(): void => setFilterRange(FilterRange.ALL)}
            >
              {FilterRange.ALL}
            </Button>
            <Button
              type={ButtonTypes.dark}
              className={cx({ active: filterRange === FilterRange.DAY })}
              onClick={(): void => setFilterRange(FilterRange.DAY)}
            >
              {FilterRange.DAY}
            </Button>
            <Button
              type={ButtonTypes.dark}
              className={cx({ active: filterRange === FilterRange.WEEK })}
              onClick={(): void => setFilterRange(FilterRange.WEEK)}
            >
              {FilterRange.WEEK}
            </Button>
            <Button
              type={ButtonTypes.dark}
              className={cx({ active: filterRange === FilterRange.MONTH })}
              onClick={(): void => setFilterRange(FilterRange.MONTH)}
            >
              {FilterRange.MONTH}
            </Button>
          </DateFilterContainer>
        </FilterContainer>
        <div className="BondsWrapper_panel__content">
          <ReactApexChart
            options={options}
            series={[
              {
                data: seriesData,
              },
            ]}
            type="candlestick"
            height={290}
          />
          <ReactApexChart
            options={optionsBar}
            series={[
              {
                data: seriesBarData,
              },
            ]}
            type="bar"
            height={160}
          />
        </div>
      </Container>
    </Fragment>
  )
}

export default CandleStickChart
