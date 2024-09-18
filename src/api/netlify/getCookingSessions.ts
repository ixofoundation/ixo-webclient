import axios, { AxiosResponse } from 'axios'
import _ from 'lodash'
import moment from 'moment'
import { STOVE_PERIODS } from 'types/stove'
import { datesFromPeriod } from 'utils/supamoto'

interface Session {
  startDateTime: string
  duration: number
}

interface AggregatedData {
  date: string
  duration: number
  month: string
  week: number
}

export const getCookingSessions = async (
  deviceId: number | string,
): Promise<{ data: AggregatedData[] | null; error: any }> => {
  try {
    const { startDateISOString, endDateISOString } = datesFromPeriod(STOVE_PERIODS.all)

    const response: AxiosResponse<{ content: Session[] }> = await axios.get('/.netlify/functions/getCookingSessions', {
      params: { startDate: startDateISOString, endDate: endDateISOString, deviceId },
    })

    const aggregatedData: AggregatedData[] = response.data.content
      .map((item) => {
        const week = moment(item.startDateTime).week()
        const month = moment(item.startDateTime).format('MMM')
        const dateFormat = moment(item.startDateTime).format('YYYY-MM-DD')
        return { date: dateFormat, duration: Math.ceil(item.duration / 60), month, week }
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
