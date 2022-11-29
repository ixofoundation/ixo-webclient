import { RootState } from 'redux/types'
// import { createSelector } from 'reselect'

// TODO - this data will come from state and we will use reselect to select relevant data
export const selectChartData = (state: RootState): any => ({
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
})
