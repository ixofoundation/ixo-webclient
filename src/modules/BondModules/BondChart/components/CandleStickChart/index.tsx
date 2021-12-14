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
// import { filterDates } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.actions'

export const ChartStyledHeader = styled(StyledHeader)<{dark: boolean}>`
  color: ${(props): string => props.dark ? 'white' : '#212529'};
`

export const StyledContainer = styled(Container)<{ dark: boolean }>`
  background: ${(props): string => props.dark ? 'linear-gradient(356.78deg, #002d42 2.22%, #012639 96.94%);' : 'linear-gradient(rgb(255, 255, 255) 0%, rgb(240, 243, 250) 100%);'};
  border: ${(props): string => props.dark ? '1px solid #0c3549' : '1px solid #49bfe0'};
`

interface Props {
  priceHistory: any
  transactions: any
  denom: string,
  isDark: boolean
}

const _options = {
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
  fill: {
    type: 'solid',
    opacity: 1,
  },
  tooltip: {},
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
    },
  },
  colors: ['#39C3E6', '#F89D28'],
  stroke: {
    width: 0,
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
    strokeDashArray: 1,
  },
  tooltip: {
    enabled: true,
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
  isDark
}): JSX.Element => {
  const [seriesData, setSeriesData] = useState([])
  const [seriesBarData, setSeriesBarData] = useState([])
  const [filterRange, setFilterRange] = useState(FilterRange.ALL)
  const [options, setOptions] = useState(_options)

  const xAxisDisplayFormat = (range, key): string => {
    switch (range) {
      case FilterRange.WEEK:
        return `${moment()
          .day('Sunday')
          .week(Number(key) + 1)
          .format('DD MMM YYYY')} ~ ${moment()
          .day('Saturday')
          .week(Number(key) + 1)
          .format('DD MMM YYYY')}`
      case FilterRange.ALL:
      case FilterRange.MONTH:
      case FilterRange.DAY:
        return key
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
        .filter(({ status }) => status === 'succeed')
        .filter(({ buySell }) => buySell === isBuy)
        .map(({ price }) => Number(price)),
    )
  }

  const generateSeriesData = (data): void => {
    const series = []

    for (let i = 0; i < data.length; i++) {
      const { period, date } = data[i]

      if (filterRange === FilterRange.ALL) {
        series.push({
          x: date,
          y: period[0].price,
        })
      } else {
        const open = generateStartPrice(period)
        const high = generateMaxPrice(period)
        const low = generateMinPrice(period)
        const close = generateEndPrice(period)

        series.push({
          x: date,
          y: [open, high, low, close],
        })
      }
    }

    setSeriesData(series)
  }

  const generateSeriesBarData = (data): void => {
    const seriesBarBuy = []
    const seriesBarSell = []

    for (let i = 0; i < data.length; i++) {
      const { period, date } = data[i]
      const periodSumBuyPrice = generateSumPrice(period, true)
      const periodSumSellPrice = generateSumPrice(period, false)

      seriesBarBuy.push({
        x: date,
        y: periodSumBuyPrice,
      })
      seriesBarSell.push({
        x: date,
        y: periodSumSellPrice,
      })
    }
    setSeriesBarData([seriesBarBuy, seriesBarSell])
  }

  const groupPriceHistory = (data, rangeType): any => {
    let dateFormat = ''
    let filteredData = data;
    const filter = {start: null, end: null};
    switch (rangeType) {
      case FilterRange.DAY:
        dateFormat = 'h:mm:ss a'
        filter.start = moment().startOf('day');
        filter.end = moment().endOf('day');
        break
      case FilterRange.WEEK:
        dateFormat = 'DD'
        filter.start = moment().startOf('week');
        filter.end = moment().endOf('week');
        break
      case FilterRange.MONTH:
        dateFormat = 'DD MMM YYYY'
        filter.start = moment().startOf('month');
        filter.end = moment().endOf('month');
        break
      case FilterRange.ALL:
      default:
        dateFormat = 'DD MMM YYYY h:mm:ss a'
        break
    }

    if(rangeType != FilterRange.ALL)
    {
      filteredData = _.filter(data, function(item) {
        const currentTime = moment(item.time, 'YYYY MM DD hh:mm:ss');
        return currentTime.isSameOrAfter(filter.start) && currentTime.isSameOrBefore(filter.end);
      });
      console.log(filteredData);
    }

    const grouppedData = _.groupBy(filteredData, ({ time }) =>
      moment(time).format(dateFormat),
    )
    return Object.entries(grouppedData).map(([key, value]) => ({
      date: xAxisDisplayFormat(rangeType, key),
      period: value,
    }))
  }

  useEffect(() => {
    if (priceHistory.length > 0) {
      generateSeriesData(groupPriceHistory(priceHistory, filterRange))
      generateSeriesBarData(groupPriceHistory(transactions, filterRange))
    }
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
            format: "MMM 'yy",
          },
        },
      })
    } else {
      setOptions(_options)
    }
  }, [filterRange])

  return (
    <Fragment>
      <ChartStyledHeader dark={isDark}> Price of {denom.toUpperCase()} </ChartStyledHeader>
      <StyledContainer dark={isDark} className="BondsWrapper_panel__chrome hide-on-mobile">
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
