import React, { Fragment, useEffect, useMemo, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { StyledHeader, Container } from './index.styles'
import _ from 'lodash'

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
    type: 'datetime',
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
    custom: (opts): any => {
      const desc =
        opts.ctx.w.config.series[opts.seriesIndex].data[opts.dataPointIndex]
          .description
      let text = "<div style='padding: 10px;'>"
      text += 'MaxPrice : ' + desc.max + '<br>'
      text += 'MinPrice : ' + desc.min + '<br>'
      text += 'Volume : ' + desc.volume + '<br>'
      text += '</div>'
      return text
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
    type: 'datetime',
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

const CandleStickChart: React.FunctionComponent<Props> = ({
  data,
  denom,
}): JSX.Element => {
  const [seriesData, setSeriesData] = useState([])
  const [seriesBarData, setSeriesBarData] = useState([])

  const series = useMemo(
    () => [
      {
        data: seriesData,
      },
    ],
    [seriesData],
  )

  const seriesBar = useMemo(
    () => [
      {
        // data: data.map(({ price, time }) => ({ x: time, y: price })),
        data: seriesBarData,
      },
    ],
    [seriesBarData],
  )

  const generateAvgPrice = (): number => {
    return _.mean(data.map(({ price }) => Number(price)))
  }

  const generateSeriesData = (): void => {
    const chartData = []

    for (let i = 1; i < data.length; i++) {
      const current = data[i]

      chartData.push({
        x: current.time,
        y: [],
      })
    }

    setSeriesData(chartData)
  }

  const generateSeriesBarData = (): void => {
    const chartData = []
    const meanPrice = generateAvgPrice()

    for (let i = 1; i < data.length; i++) {
      const current = data[i]

      chartData.push({
        x: current.time,
        y: current.price - meanPrice,
      })
    }
    setSeriesBarData(chartData)
  }

  useEffect(() => {
    if (data.length > 0) {
      generateSeriesData()
      generateSeriesBarData()
    }
  }, [data])

  return (
    <Fragment>
      <StyledHeader>Price of {denom.toUpperCase()}</StyledHeader>
      <Container>
        <div className="BondsWrapper_panel__content">
          <ReactApexChart
            options={options}
            series={series}
            type="candlestick"
            height={290}
          />
          <ReactApexChart
            options={optionsBar}
            series={seriesBar}
            type="bar"
            height={160}
          />
        </div>
      </Container>
    </Fragment>
  )
}

export default CandleStickChart
