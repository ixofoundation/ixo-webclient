import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'

// interface Session {
//   startDateTime: string
//   duration: number
// }

interface AggregatedData {
  date: string
  duration: number
  month: string
  week: number
}

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
export const getFuelUsage = async (deviceId: number | string) => {
  try {
    const startDate = new Date(new Date().getFullYear(), 0, 1)
    const endDate = new Date(new Date().getFullYear(), 11, 31)

    const formattedStartDate = formatDate(startDate)
    const formattedEndDate = formatDate(endDate)

    const { data } = await axios.get('/.netlify/functions/getPelletPurchases', {
      params: { startDate: formattedStartDate, endDate: formattedEndDate, deviceId },
    })

    const aggregatedData = data.content
      .map((item: any) => {
        const week = moment(item.dateTime).week()
        const month = moment(item.dateTime).format('MMM')
        const dateFormat = `${month}-${week}`
        return { date: dateFormat, duration: item.pelletsAmount, month, week }
      })
      .reduce((acc: AggregatedData[], current: AggregatedData) => {
        const existingWeekData = _.find(acc, { date: current.date })

        if (existingWeekData) {
          existingWeekData.duration += current.duration
        } else {
          acc.push(current)
        }

        return acc
      }, [])

    return { data: aggregatedData, error: null }
  } catch (error) {
    return { data: null, error }
  }
}
