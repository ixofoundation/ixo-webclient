import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { deviceWidth } from '../../../../lib/commonData'

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(66, 203, 234,0.2)',
      borderColor: 'rgba(66, 203, 234,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(66, 203, 234,0.4)',
      hoverBorderColor: 'rgba(66, 203, 234,1)',
      data: [50, 75, 150, 140, 200, 180, 200],
      fill: 'origin',
    },
  ],
}

const ChartStyles = styled.div`
  @media (max-width: ${deviceWidth.tablet}px) {
    display: none;
  }
`

export class Charts extends Component {
  render(): JSX.Element {
    return (
      <ChartStyles className="BondsWrapper_panel__chrome hide-on-mobile">
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
      </ChartStyles>
    )
  }
}
