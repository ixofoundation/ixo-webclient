import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

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

export class Charts extends Component {
  render(): JSX.Element {
    return (
      <div className="BondsWrapper_panel__chrome">
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
      </div>
    )
  }
}
