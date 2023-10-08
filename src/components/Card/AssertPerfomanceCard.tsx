import { FlexBox } from 'components/App/App.styles'
import { Card, CardProps } from './Card'
import { AssetPerformanceBarChart } from 'components/BarChart'
import { Button } from 'components'
import { useTheme } from 'styled-components'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { getCookingSessions } from 'api/netlify/getCookingSessions'
import _ from 'lodash'

export type AssetPerformanceCardProps = Omit<CardProps, 'children'> & {
  did?: string
  externalId: string
  creator?: string
}

const buttons = ['Cooking Time', 'Fuel Usage', 'Time Saved', 'Health Benefits']

export const AssetPerformanceCard = ({
  width = '100%',
  height = '100%',
  did,
  externalId,
  ...props
}: AssetPerformanceCardProps) => {
  const theme = useTheme() as any
  const [cookingSessions, setCookingSessions] = useState<any>()

  useEffect(() => {
    getCookingSessions(externalId).then((response) => {
      const aggregatedData: any[] = []

      // Iterate through each data point
      response.data.content.forEach((item: any) => {
        const week = moment(item.startDateTime).week()
        const month = moment(item.startDateTime).format('MMM')

        const dateFormat = `${month}-${week}`
        // Check if the week is already in the aggregated data
        const existingWeekData = _.find(aggregatedData, { date: dateFormat })

        if (existingWeekData) {
          existingWeekData.duration += Math.ceil(item.duration / 60) // Add to existing week data
        } else {
          aggregatedData.push({ date: dateFormat, duration: Math.ceil(item.duration / 60), month, week }) // Create new entry for the week
        }
      })

      setCookingSessions(aggregatedData)
    })
  }, [externalId, setCookingSessions])

  return (
    <Card width={width} height={height} {...props} position='relative'>
      <FlexBox gap={4} my={4}>
        {buttons.map((button) => (
          <Button
            key={button}
            size='sm'
            buttonBackground={theme.ixoNavyBlue}
            textColor={theme.ixoNewBlue}
            borderColor={theme.ixoNewBlue}
            active={button === buttons[0]}
          >
            {button}
          </Button>
        ))}{' '}
      </FlexBox>
      <AssetPerformanceBarChart data={cookingSessions} />
    </Card>
  )
}
