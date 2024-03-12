import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'
import { STOVE_PERIODS } from 'types/stove'
import { datesFromPeriod } from 'utils/supamoto'

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

export const getFuelUsage = async (deviceId: number | string) => {
  try {
    const { startDateISOString, endDateISOString } = datesFromPeriod(STOVE_PERIODS.all)

    const { data } = await axios.get('/.netlify/functions/getPelletPurchases', {
      params: { startDate: startDateISOString, endDate: endDateISOString, deviceId },
    })

    const aggregatedData = data.content
      .map((item: any) => {
        const week = moment(item.dateTime).week()
        const month = moment(item.dateTime).format('MMM')
        const dateFormat = moment(item.dateTime).format('YYYY-MM-DD')
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
