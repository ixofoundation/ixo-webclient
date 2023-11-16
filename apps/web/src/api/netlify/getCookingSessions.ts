import axios, { AxiosResponse } from 'axios'
import _ from 'lodash'
import moment from 'moment'

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

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const getCookingSessions = async (
  deviceId: number | string,
): Promise<{ data: AggregatedData[] | null; error: any }> => {
  try {
    const startDate = new Date(new Date().getFullYear(), 0, 1)
    const endDate = new Date(new Date().getFullYear(), 11, 31)

    const formattedStartDate = formatDate(startDate)
    const formattedEndDate = formatDate(endDate)

    const response: AxiosResponse<{ content: Session[] }> = await axios.get('/.netlify/functions/getCookingSessions', {
      params: { startDate: formattedStartDate, endDate: formattedEndDate, deviceId },
    })

    const aggregatedData: AggregatedData[] = response.data.content
      .map((item) => {
        const week = moment(item.startDateTime).week()
        const month = moment(item.startDateTime).format('MMM')
        const dateFormat = `${month}-${week}`
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
