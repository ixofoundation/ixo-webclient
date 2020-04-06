import React from 'react'
import { Line } from 'react-chartjs-2'
import { ChartContainer } from './Chart.styles'

interface Props {
  data: any
}

export const Chart: React.FunctionComponent<Props> = ({ data }) => {
  console.log(data)
  return (
    <ChartContainer className="BondsWrapper_panel__chrome hide-on-mobile">
      <div className="BondsWrapper_panel__content">
        <b>Charts</b>
        <Line
          data={data}
          width={100}
          height={500}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    </ChartContainer>
  )
}
