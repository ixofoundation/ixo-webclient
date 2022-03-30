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
import { useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { formatCurrency } from 'modules/Account/Account.utils'

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

const _options: ApexOptions = {
  chart: {
    type: 'area',
    height: 290,
    id: 'price-history',
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
  fill: {
    opacity: 0.15,
  },
  dataLabels: {
    enabled: false,
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
    tickAmount: 'dataPoints',
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    min: 0,
    max: 10,
  },
  grid: {
    borderColor: '#436779',
    strokeDashArray: 2,
  },
  tooltip: {
    x: {
      show: true,
      formatter: (val, { dataPointIndex, w }): any => {
        try {
          const { config } = w
          const { series } = config
          const { data } = series[0]
          const item = data[dataPointIndex]
          return item.x
        } catch (e) {
          console.log(e)
          return val
        }
      },
    },
    y: {
      title: {
        formatter: (seriesName): string => 'Mean ' + seriesName,
      },
    },
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
      formatter: (val): string => moment(val).format('DD MMM YYYY HH:mm:ss'),
    },
  },
}

enum FilterRange {
  ALL = 'All',
  MONTH = 'M',
  WEEK = 'W',
  DAY = 'D',
}

const PriceHistoryChart: React.FunctionComponent = (): JSX.Element => {
  const {
    priceHistory,
    transactions,
    symbol: denom,
    reserveDenom,
  } = useSelector((state: RootState) => state.activeBond)

  const [seriesData, setSeriesData] = useState([])
  const [seriesBarData, setSeriesBarData] = useState([])
  const [filterRange, setFilterRange] = useState(FilterRange.ALL)
  const [options, setOptions] = useState(_options)

  function xAxisDisplayFormat(value): string {
    switch (filterRange) {
      case FilterRange.ALL:
        return moment(value).format('DD MMM YYYY')
      case FilterRange.MONTH:
        return moment(value).format('DD MMM YYYY')
      case FilterRange.WEEK:
        return moment(value).format('DD MMM YYYY HH:mm')
      case FilterRange.DAY:
        return moment(value).format('HH:mm')
      default:
        return ''
    }
  }

  const generateEmptyDates = (data): any => {
    const length = data.length

    switch (filterRange) {
      case FilterRange.ALL:
        if (length === 0) {
          return Array(10)
            .fill(undefined)
            .map((_, index) => ({
              time: new Date().getTime() - index * 1000 * 60 * 60 * 24,
              price: 0,
            }))
            .reverse()
        } else {
          const firstData = data[0]
          return [
            {
              ...firstData,
              time: moment(firstData.time).subtract(1, 'day').valueOf(),
            },
            ...data.map((item) => ({
              ...item,
              time: new Date(item.time).getTime(),
            })),
          ]
        }
      case FilterRange.MONTH:
        if (length === 0) {
          return Array(30)
            .fill(undefined)
            .map((_, index) => ({
              time: new Date().getTime() - index * 1000 * 60 * 60 * 24,
              price: 0,
            }))
            .reverse()
        } else {
          const series = []
          let minData = data[0]

          for (let i = 1; i <= 30; i++) {
            const pastTime = moment()
              .subtract(30 - i, 'day')
              .format('YYYY/MM/DD')

            const isExist = data.find(
              (item) => moment(item.time).diff(pastTime) === 0,
            )
            if (isExist) {
              minData = isExist
            } else {
              minData = {
                ...minData,
                time: pastTime,
              }
            }
            series.push(minData)
          }
          return series
        }
      case FilterRange.WEEK:
        if (length === 0) {
          return Array(5)
            .fill(undefined)
            .map((_, index) => ({
              time: new Date().getTime() - index * 1000 * 60 * 60 * 24,
              price: 0,
            }))
            .reverse()
        } else {
          const series = []
          let minData = data[0]

          for (let i = 1; i <= 5; i++) {
            const pastTime = moment()
              .subtract(5 - i, 'day')
              .format('YYYY/MM/DD')

            const isExist = data.find(
              (item) => moment(item.time).diff(pastTime) === 0,
            )
            if (isExist) {
              minData = isExist
            } else {
              minData = {
                ...minData,
                time: pastTime,
              }
            }
            series.push(minData)
          }
          return series
        }
      case FilterRange.DAY:
        if (length === 0) {
          return Array(24)
            .fill(undefined)
            .map((_, index) => ({
              time: new Date().getTime() - index * 1000 * 60 * 60,
              price: 0,
            }))
            .reverse()
        } else {
          const series = []
          let minData = data[0]

          for (let i = 1; i <= 24; i++) {
            const pastTime = moment()
              .subtract(24 - i, 'h')
              .format('YYYY/MM/DD-HH:[00]:[00]')

            const isExist = data.find(
              (item) => moment(item.time).diff(pastTime) === 0,
            )
            if (isExist) {
              minData = isExist
            } else {
              minData = {
                ...minData,
                time: pastTime,
              }
            }
            series.push(minData)
          }
          return series
        }
      default:
        return []
    }
  }

  const generateSeriesData = (data): void => {
    const series = []

    for (let i = 0; i < data.length; i++) {
      const { time, price } = data[i]
      series.push({
        x: moment(time).format('DD MMM YYYY HH:mm:ss'),
        y: Number(price),
      })
    }

    setSeriesData(series)
  }

  const generateSeriesBarData = (data): void => {
    const seriesBarBuy = []
    const seriesBarSell = []

    for (let i = 0; i < data.length; i++) {
      const { price, time, buySell } = data[i]

      seriesBarBuy.push({
        x: moment(time).format('DD MMM YYYY HH:mm:ss'),
        y: buySell ? Number(price) : 0,
      })
      seriesBarSell.push({
        x: moment(time).format('DD MMM YYYY HH:mm:ss'),
        y: buySell ? 0 : -Number(price),
      })
    }

    setSeriesBarData([seriesBarBuy, seriesBarSell])
  }

  const groupPriceHistory = (data, rangeType): any => {
    let filteredData = data
    let minDate
    let dateFormatter

    switch (rangeType) {
      case FilterRange.DAY:
        minDate = moment().subtract(1, 'day').format('YYYY MM DD HH:mm:ss')
        dateFormatter = (time): string =>
          moment(time).format('YYYY/MM/DD-HH:[00]:[00]')
        break
      case FilterRange.WEEK:
        minDate = moment().subtract(5, 'days').format('YYYY MM DD HH:mm:ss')
        dateFormatter = (time): string => moment(time).format('YYYY/MM/DD')
        break
      case FilterRange.MONTH:
        minDate = moment().subtract(1, 'months').format('YYYY MM DD HH:mm:ss')
        dateFormatter = (time): string => moment(time).format('YYYY/MM/DD')
        break
      case FilterRange.ALL:
      default:
        dateFormatter = (time): string =>
          moment(time).format('YYYY/MM/DD-HH:mm:ss')
        break
    }

    if (rangeType !== FilterRange.ALL) {
      filteredData = _.filter(data, function (item) {
        const currentTime = moment(item.time, 'YYYY MM DD HH:mm:ss')
        return currentTime.isSameOrAfter(minDate)
      })
    }

    const grouppedData = _.groupBy(filteredData, ({ time }) =>
      dateFormatter(time),
    )

    const meanData = Object.entries(grouppedData).map(([key, value]) => {
      const meanPrice = _.mean(value.map(({ price }) => Number(price)))
      return {
        time: key,
        price: meanPrice.toFixed(2), //  mean
      }
    })

    return generateEmptyDates(meanData)

    // return meanData
  }

  const groupTransactionHistory = (data, rangeType): any => {
    let filteredData = data
    let minDate

    switch (rangeType) {
      case FilterRange.DAY:
        minDate = moment().subtract(1, 'day').format('YYYY MM DD HH:mm:ss')
        break
      case FilterRange.WEEK:
        minDate = moment().subtract(5, 'days').format('YYYY MM DD HH:mm:ss')
        break
      case FilterRange.MONTH:
        minDate = moment().subtract(1, 'months').format('YYYY MM DD HH:mm:ss')
        break
      case FilterRange.ALL:
      default:
        break
    }

    if (rangeType !== FilterRange.ALL) {
      filteredData = _.filter(data, function (item) {
        const currentTime = moment(item.time, 'YYYY MM DD HH:mm:ss')
        return currentTime.isSameOrAfter(minDate)
      })
    }

    return filteredData
  }

  useEffect(() => {
    if (priceHistory.length > 0) {
      generateSeriesData(
        groupPriceHistory(
          priceHistory.map(({ price, time }) => ({
            time,
            price:
              denom !== 'xusd'
                ? formatCurrency({
                    amount: price,
                    denom: reserveDenom,
                  }).amount.toFixed(2)
                : price.toFixed(2),
          })),
          filterRange,
        ),
      )
      generateSeriesBarData(
        groupTransactionHistory(
          transactions
            .map((transaction) => ({
              time: transaction.timestamp,
              price: Number(transaction.quantity),
              buySell: transaction.buySell,
              status: transaction.status,
            }))
            .filter((tx) => tx.status === 'succeed'),
          filterRange,
        ),
      )
    }
    // eslint-disable-next-line
  }, [priceHistory, filterRange])

  useEffect(() => {
    setOptions({
      ..._options,
      xaxis: {
        ..._options.xaxis,
        labels: {
          ..._options.xaxis.labels,
          formatter: xAxisDisplayFormat,
        },
      },
      tooltip: {
        y: {
          title: {
            formatter: (seriesName): string => {
              if (filterRange === FilterRange.ALL) {
                return seriesName
              }
              return 'Mean ' + seriesName
            },
          },
        },
      },
    })
    // eslint-disable-next-line
  }, [filterRange])

  return (
    <Fragment>
      <ChartStyledHeader dark={true}>
        {' '}
        Price of {denom.toUpperCase()}{' '}
      </ChartStyledHeader>
      <StyledContainer
        dark={true}
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
            type={'area'}
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

export default PriceHistoryChart
