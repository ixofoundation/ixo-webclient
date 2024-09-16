'use client'
import { ApexOptions } from 'apexcharts'
import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'
import { BaseBondingCurvePanel } from './BaseBondingCurve.styles'

const options: ApexOptions = {
  chart: {
    type: 'line',
    id: 'base-bonding-curve',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    redrawOnParentResize: true,
  },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  colors: ['#00D2FF'],
  xaxis: {
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
    min: 0,
    forceNiceScale: true,
    decimalsInFloat: 2,
    labels: {
      show: false,
    },
  },
  tooltip: {
    enabled: false,
  },
}

const BaseBondingCurve: React.FunctionComponent = () => {
  const data = useMemo(() => {
    return new Array(100).fill(0).map((_, index) => {
      return {
        x: index * 0.01,
        y: Math.sqrt(index * 0.01),
      }
    })
  }, [])

  return (
    <BaseBondingCurvePanel>
      <ReactApexChart
        options={options}
        series={[
          {
            name: 'bonding',
            data: data,
          },
        ]}
        type={'line'}
      />
    </BaseBondingCurvePanel>
  )
}

export default BaseBondingCurve
