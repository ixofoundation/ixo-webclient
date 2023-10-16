import { FlexBox } from 'components/App/App.styles'
import { Card, CardProps } from './Card'
import { AssetPerformanceBarChart } from 'components/BarChart'
import { useTheme } from 'styled-components'
import { useEffect, useMemo, useState } from 'react'
import { getCookingSessions } from 'api/netlify/getCookingSessions'
import { Button } from '@mantine/core'
import { logger } from 'utils/logger'
import { getFuelUsage } from 'api/netlify/getFuelUsage'

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
  const [cookingSessions, setCookingSessions] = useState<any[]>([])
  const [activeButton, setActiveButton] = useState<string>(buttons[0])
  const [fuelUsageData, setFuelUsageData] = useState<any[]>([])

  useEffect(() => {
    if (activeButton === 'Cooking Time') {
      getCookingSessions(externalId)
        .then(({ data, error }) => {
          if (data) {
            return setCookingSessions(data)
          }
          if (error) {
            return logger.logError(error as unknown as Error, { fileName: 'AssetPerformanceCard.tsx', lineNumber: 40 })
          }
        })
        .catch(console.log)
    } else if (activeButton === 'Fuel Usage') {
      getFuelUsage(externalId)
        .then(({ data, error }) => {
          if (data) {
            setFuelUsageData(data)
          }
          if (error) {
            return logger.logError(error as unknown as Error, { fileName: 'AssetPerformanceCard.tsx', lineNumber: 52 })
          }
        })
        .catch(console.log)
    }
    // ... other conditions for Time Saved, Health Benefits
  }, [externalId, activeButton])

  const getChartData = useMemo(() => {
    if (!cookingSessions) return null

    switch (activeButton) {
      case 'Cooking Time':
        return cookingSessions
      case 'Fuel Usage':
        return fuelUsageData
      default:
        return []
    }
  }, [cookingSessions, fuelUsageData, activeButton])

  return (
    <Card width={width} height={height} {...props} position='relative'>
      <FlexBox gap={4} my={4}>
        {buttons.map((button) => (
          <Button
            key={button}
            size='sm'
            bg={theme.ixoNavyBlue}
            style={{
              borderColor: button === activeButton ? theme.ixoNewBlue : theme.ixoNavyBlue,
              color: theme.ixoNewBlue,
            }}
            onClick={() => setActiveButton(button)}
          >
            {button}
          </Button>
        ))}{' '}
      </FlexBox>
      <AssetPerformanceBarChart data={getChartData} chart={activeButton} />
    </Card>
  )
}
