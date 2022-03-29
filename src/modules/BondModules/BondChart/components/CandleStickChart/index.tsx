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
import styled from 'styled-components'
import { ApexOptions } from 'apexcharts'
// import { filterDates } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.actions'

export const ChartStyledHeader = styled(StyledHeader)<{ dark: boolean }>`
  color: ${(props): string => (props.dark ? 'white' : '#212529')};
`

export const StyledContainer = styled(Container)<{ dark: boolean }>`
  background: ${(props): string =>
    props.dark
      ? 'linear-gradient(356.78deg, #002d42 2.22%, #012639 96.94%);'
      : 'linear-gradient(rgb(255, 255, 255) 0%, rgb(240, 243, 250) 100%);'};
  border: ${(props): string =>
    props.dark ? '1px solid #0c3549' : '1px solid #49bfe0'};
`

interface Props {
  priceHistory: any
  transactions: any
  denom: string
  isDark: boolean
}

const _options: ApexOptions = {
  chart: {
    type: 'candlestick',
    height: 290,
    id: 'price-candlestick',
    toolbar: {
      show: false,
    },
    animations: {
      enabled: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: '#2A7597',
    redrawOnParentResize: true,
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#39C3E6',
        downward: '#F89D28',
      },
    },
  },
  colors: ['#39C3E6'],
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      color: '#436779',
    },
    type: 'category',
    categories: [],
    tickAmount: 15,
  },
  yaxis: {
    min: 0,
  },
  grid: {
    borderColor: '#436779',
    strokeDashArray: 2,
  },
  fill: {
    type: 'solid',
    opacity: 1,
  },
}

const optionsBar: ApexOptions = {
  chart: {
    height: 160,
    type: 'bar',
    redrawOnParentResize: true,
    foreColor: '#2A7597',
    animations: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      colors: {
        ranges: [
          {
            from: -100,
            to: 0,
            color: '#F89D28',
          },
          {
            from: 1,
            to: 100,
            color: '#39C3E6',
          },
        ],
      },
    },
  },
  colors: ['#39C3E6', '#F89D28'],
  stroke: {
    width: 0,
  },
  xaxis: {
    type: 'category',
    categories: [],
    axisBorder: {
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
  tooltip: {
    x: {
      show: true,
      format: 'DD MMM YYYY h:mm:ss a',
    },
  },
}

enum FilterRange {
  ALL = 'All',
  MONTH = 'M',
  WEEK = 'W',
  DAY = 'D',
}

const CandleStickChart: React.FunctionComponent<Props> = ({
  priceHistory,
  transactions,
  denom,
  isDark,
}): JSX.Element => {
  const [seriesData, setSeriesData] = useState([])
  const [seriesBarData, setSeriesBarData] = useState([])
  const [filterRange, setFilterRange] = useState(FilterRange.ALL)
  const [options, setOptions] = useState(_options)

  function xAxisDisplayFormat(value): string {
    switch (filterRange) {
      case FilterRange.ALL:
        return moment.utc(value).format('DD MMM YYYY')
      case FilterRange.MONTH:
        return moment.utc(value).format('MMM YYYY')
      case FilterRange.WEEK:
        return moment.utc(value).format('DD MMM YYYY')
      case FilterRange.DAY:
        return moment.utc(value).format('h:mm:ss a')
      default:
        return ''
    }
  }

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
  const generateSumPrice = (data, isBuy): number => {
    return _.sum(
      data
        .filter(({ buySell }) => buySell === isBuy)
        .map(({ price }) => Number(price)),
    )
  }

  const generateEmptyDates = (data, limit = 15): any => {
    const length = data.length
    const emptyDates = []

    if (length > 0 && length < limit) {
      let meanInterval = 60 * 60
      if (length > 1) {
        const lastPeriodTime = data[length - 1].period[0].time
        const firstPeriodTime = data[0].period[0].time
        meanInterval = Math.round(
          moment(lastPeriodTime).diff(moment(firstPeriodTime)) / length,
        )
      }

      const diffLength = limit - length
      for (let i = 0; i < diffLength; i++) {
        emptyDates.push(
          new Date(data[0].period[0].time).getTime() - meanInterval * (i + 1),
        )
      }
    }
    return emptyDates.reverse()
  }

  const generateSeriesData = (data): void => {
    const series = []

    const emptyDates = generateEmptyDates(data)

    if (filterRange === FilterRange.ALL) {
      emptyDates.forEach((date) => {
        series.push({
          x: new Date(date).toString(),
          y: 0,
        })
      })
    } else {
      emptyDates.forEach((date) => {
        series.push({
          x: new Date(date).toString(),
          y: [],
        })
      })
    }

    if (filterRange === FilterRange.ALL) {
      for (let i = 0; i < data.length; i++) {
        const { period } = data[i]
        series.push({
          x: period[0].time,
          y: period[0].price,
        })
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        const { period } = data[i]
        let open, high, low, close

        if (i === 0) {
          open = generateStartPrice(period)
          high = generateMaxPrice(period)
          low = generateMinPrice(period)
          close = generateEndPrice(period)
        } else {
          const { period: prevPeriod } = data[i - 1]
          open = generateEndPrice(prevPeriod)
          high = generateMaxPrice(period)
          low = generateMinPrice(period)
          close = generateEndPrice(period)
        }

        series.push({
          x: new Date(period[0].time).toString(),
          y: [open, high, low, close],
        })
      }
    }

    setSeriesData(series)
  }

  const generateSeriesBarData = (data): void => {
    const seriesBarBuy = []
    const seriesBarSell = []

    const emptyDates = generateEmptyDates(data)

    emptyDates.forEach((date) => {
      seriesBarBuy.push({
        x: new Date(date).toLocaleDateString(),
        y: 0,
      })
      seriesBarSell.push({
        x: new Date(date).toLocaleDateString(),
        y: 0,
      })
    })

    for (let i = 0; i < data.length; i++) {
      const { period } = data[i]
      const periodSumBuyPrice = generateSumPrice(period, true)
      const periodSumSellPrice = generateSumPrice(period, false)

      seriesBarBuy.push({
        x: new Date(period[0].time).toLocaleDateString(),
        y: periodSumBuyPrice,
      })
      seriesBarSell.push({
        x: new Date(period[0].time).toLocaleDateString(),
        y: -periodSumSellPrice,
      })
    }

    setSeriesBarData([seriesBarBuy, seriesBarSell])
  }

  const groupPriceHistory = (data, rangeType): any => {
    let dateFormatter
    let filteredData = data
    let minDate

    switch (rangeType) {
      case FilterRange.DAY:
        dateFormatter = (time): string => moment(time).format('h:mm:ss a')
        minDate = moment.utc().subtract(1, 'day').format('YYYY MM DD hh:mm:ss')
        break
      case FilterRange.WEEK:
        dateFormatter = (time): string =>
          moment(time).format('YYYY').toString() +
          '-' +
          moment(time).week().toString()
        minDate = moment
          .utc()
          .subtract(1, 'months')
          .format('YYYY MM DD hh:mm:ss')
        break
      case FilterRange.MONTH:
        dateFormatter = (time): string => moment(time).format('MMM YYYY')
        minDate = moment
          .utc()
          .subtract(1, 'years')
          .format('YYYY MM DD hh:mm:ss')
        break
      case FilterRange.ALL:
      default:
        dateFormatter = (time): string =>
          moment(time).format('DD MMM YYYY h:mm:ss a')
        break
    }

    if (rangeType !== FilterRange.ALL) {
      filteredData = _.filter(data, function (item) {
        const currentTime = moment(item.time, 'YYYY MM DD hh:mm:ss')
        return currentTime.isSameOrAfter(minDate)
      })
    }

    const grouppedData = _.groupBy(filteredData, ({ time }) =>
      dateFormatter(time),
    )
    return Object.entries(grouppedData).map(([key, value]) => ({
      date: key,
      period: value,
    }))
  }

  useEffect(() => {
    if (priceHistory.length > 0) {
      generateSeriesData(groupPriceHistory(priceHistory, filterRange))
      generateSeriesBarData(groupPriceHistory(transactions, filterRange))
    }
    // eslint-disable-next-line
  }, [priceHistory, filterRange])

  useEffect(() => {
    if (filterRange === FilterRange.ALL) {
      setOptions({
        ..._options,
        chart: {
          ..._options.chart,
          type: 'area',
        },
        fill: {
          ..._options.fill,
          opacity: 0.15,
        },
        tooltip: {
          ..._options.tooltip,
          x: {
            show: true,
            format: 'DD MMM YYYY',
          },
        },
        xaxis: {
          ..._options.xaxis,
          labels: {
            formatter: xAxisDisplayFormat,
          },
        },
      })
    } else {
      setOptions({
        ..._options,
        chart: {
          ..._options.chart,
        },
        xaxis: {
          ..._options.xaxis,
          labels: {
            formatter: xAxisDisplayFormat,
          },
        },
        tooltip: {
          custom: function ({ seriesIndex, dataPointIndex, w }): string {
            const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]
            const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
            const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
            const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]
            return (
              '<div class="apexcharts-tooltip-candlestick p-2">' +
              '<div>Open: <span class="value">' +
              o +
              '</span></div>' +
              '<div>High: <span class="value">' +
              h +
              '</span></div>' +
              '<div>Low: <span class="value">' +
              l +
              '</span></div>' +
              '<div>Close: <span class="value">' +
              c +
              '</span></div>' +
              '</div>'
            )
          },
        },
      })
    }

    // eslint-disable-next-line
  }, [filterRange])

  return (
    <Fragment>
      <ChartStyledHeader dark={isDark}>
        {' '}
        Price of {denom.toUpperCase()}{' '}
      </ChartStyledHeader>
      <StyledContainer
        dark={isDark}
        className="BondsWrapper_panel__chrome hide-on-mobile"
      >
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
              className={cx({ active: filterRange === FilterRange.MONTH })}
              onClick={(): void => setFilterRange(FilterRange.MONTH)}
            >
              {FilterRange.MONTH}
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
              className={cx({ active: filterRange === FilterRange.DAY })}
              onClick={(): void => setFilterRange(FilterRange.DAY)}
            >
              {FilterRange.DAY}
            </Button>
          </DateFilterContainer>
        </FilterContainer>
        <div className="BondsWrapper_panel">
          <ReactApexChart
            options={options}
            series={[
              {
                name: 'price',
                data: seriesData,
              },
            ]}
            type={filterRange !== FilterRange.ALL ? 'candlestick' : 'area'}
            height={290}
          />
          {filterRange !== FilterRange.ALL && (
            <ReactApexChart
              options={optionsBar}
              series={[
                {
                  name: 'Buy',
                  data: seriesBarData[0],
                },
                {
                  name: 'Sell',
                  data: seriesBarData[1],
                },
              ]}
              type="bar"
              height={160}
            />
          )}
        </div>
      </StyledContainer>
    </Fragment>
  )
}

export default CandleStickChart
