import { ApexOptions } from 'apexcharts'
// import { ChartContainer, FilterContainer, DateFilterContainer }from 'modules/BondModules/BondChart/components/CandleChart/Chart.styles'
// import { Button, ButtonTypes } from 'components/Form/Buttons'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { DashboardThemeContext } from './Dashboard'
interface Props {
  data: any
  token?: string
}

const Chart: React.FunctionComponent<Props> = ({ data: transactions }) => {
  const theme = useContext(DashboardThemeContext)

  const defaultSeriesData = [
    {
      x: new Date(),
      y: [0, 0, 0, 0],
    },
  ]

  const defaultSeriesDataLinear = [
    {
      x: new Date(),
      y: 0,
    },
  ]

  const defaultSeriesBar = [
    {
      name: 'volume',
      data: defaultSeriesDataLinear,
    },
  ]

  const defaultOptions: ApexOptions = {
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
      // responsive: true,
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
      type: 'datetime',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        color: '#D8DEEB',
      },
    },
    grid: {
      borderColor: theme.isDark ? '#436779' : '#D8DEEB',
      strokeDashArray: 2,
    },
    tooltip: {
      x: {
        format: '',
      },
    },
  }

  const defaultOptionsBar: ApexOptions = {
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
          min: new Date('20 Jan 2017').getTime(),
          max: new Date('10 Dec 2017').getTime(),
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
      type: 'datetime',
      axisBorder: {
        offsetX: 13,
        color: '#D8DEEB',
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
      borderColor: theme.isDark ? '#436779' : '#D8DEEB',
      strokeDashArray: 1,
    },
    tooltip: {
      x: {
        format: '',
      },
    },
  }

  const defaultSeries = [
    {
      data: defaultSeriesData,
    },
  ]

  const [series, setSeries] = useState(null)
  const [seriesBar, setseriesBar] = useState(null)
  const [options, setOptions] = useState<any>(defaultOptions)
  const [optionsBar] = useState<any>(defaultOptionsBar)
  const [chartInterval] = useState('D')

  const generateSeries = (): void => {
    const _series = []
    const _seriesBar = []
    const curDate = new Date()
    const len = 24
    for (let i = len - 1; i >= 0; i--) {
      let startDate: any = null
      let endDate: any = null
      switch (chartInterval) {
        case 'H':
          startDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), curDate.getHours() - i)
          endDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), curDate.getHours() - (i - 1))
          break
        case 'D':
          startDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - i)
          endDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - (i - 1))
          break
        case 'M':
          startDate = new Date(curDate.getFullYear(), curDate.getMonth() - i)
          endDate = new Date(curDate.getFullYear(), curDate.getMonth() - (i - 1))
          break
      }
      const enabledTXs = transactions
        .filter((tx: any) => {
          if (tx.status === 'failed') {
            return false
          }
          const date = new Date(tx.timestamp).getTime()
          if (date >= startDate && date < endDate) {
            return true
          }
          return false
        })
        .map((tx: any) => ({
          price: parseInt(tx.price),
          buySell: tx.buySell,
        }))
        .sort((tx1: any, tx2: any) => tx1.price > tx2.price)
      if (enabledTXs.length) {
        const len = enabledTXs.length
        const maxPrice = enabledTXs[0].price
        const minPrice = enabledTXs[len - 1].price
        let sum = 0
        enabledTXs.forEach((tx: any) => {
          sum += tx.buySell ? tx.price : -tx.price
        })
        _seriesBar.push({
          x: startDate,
          y: sum,
        })
        if (maxPrice >= 0 && minPrice >= 0) {
          _series.push({
            x: startDate,
            y: [minPrice, maxPrice, minPrice, maxPrice],
            description: {
              max: maxPrice,
              min: minPrice,
              volume: sum,
            },
          })
        } else {
          _series.push({
            x: startDate,
            y: [0, 0, 0, 0],
            description: {
              max: 0,
              min: 0,
              volume: 0,
            },
          })
        }
      } else {
        _seriesBar.push({
          x: startDate,
          y: 0,
        })

        _series.push({
          x: startDate,
          y: [0, 0, 0, 0],
          description: {
            max: 0,
            min: 0,
            volume: 0,
          },
        })
      }
    }
    setSeries([
      {
        data: _series,
      },
    ] as any)
    setseriesBar([
      {
        name: 'volume',
        data: _seriesBar,
      },
    ] as any)
  }

  useEffect(() => {
    if (transactions && transactions.length) {
      const tmp = options
      switch (chartInterval) {
        case 'H':
          tmp.tooltip.x.format = "hh:mm dd MMM 'yy"
          break
        case 'D':
          tmp.tooltip.x.format = "dd MMM 'yy"
          break
        case 'M':
          tmp.tooltip.x.format = "MMM 'yy"
          break
      }
      setOptions(tmp)
      setTimeout(() => {
        generateSeries()
      }, 500)
    } else {
      setSeries(defaultSeries as any)
      setseriesBar(defaultSeriesBar as any)
    }
    // eslint-disable-next-line
  }, [transactions, chartInterval])

  return (
    <Fragment>
      {series && <ReactApexChart options={options} series={series} type='candlestick' height={290} />}
      {seriesBar && <ReactApexChart options={optionsBar} series={seriesBar} type='bar' height={160} />}
      {/* <ChartContainer className="BondsWrapper_panel__chrome hide-on-mobile">
      <FilterContainer
          color={ '#39C3E6' }
          backgroundColor={ '#39C3E6' }
        >
          <DateFilterContainer>
            <Button
              type={ ButtonTypes.light }
              className={ `${chartInterval === 'H' ? 'active' : ''}` }
              onClick={():void => setChartInterval('H')}
            >
              H
            </Button>
            <Button
              type={ ButtonTypes.light }
              className={ `${chartInterval === 'D' ? 'active' : ''}` }
              onClick={():void => setChartInterval('D')}
            >
              D
            </Button>
            <Button
              type={ ButtonTypes.light }
              className={ `${chartInterval === 'M' ? 'active' : ''}` }
              onClick={():void => setChartInterval('M')}
            >
              M
            </Button>
            <Button
              type={ ButtonTypes.dark }
              className={ `${chartInterval === 'Y' ? 'active' : ''}` }
              onClick={():void => setChartInterval('Y')}
            >
              Y
            </Button>
          </DateFilterContainer>
        </FilterContainer>
        <div className="BondsWrapper_panel__content">
          {series ? (<ReactApexChart
            options={options}
            series={series}
            type="candlestick"
            height={290}
          />) : null}
          {seriesBar ? (<ReactApexChart
            options={optionsBar}
            series={seriesBar}
            type="bar"
            height={160}
          />) : null}
        </div>
      </ChartContainer> */}
    </Fragment>
  )
}

Chart.defaultProps = {
  token: 'EDU',
}

export default Chart
