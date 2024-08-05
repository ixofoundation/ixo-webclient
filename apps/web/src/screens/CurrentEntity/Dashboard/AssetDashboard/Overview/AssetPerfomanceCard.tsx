import { FlexBox } from 'components/App/App.styles'
import { useEffect, useMemo, useState } from 'react'
import { getCookingSessions } from 'api/netlify/getCookingSessions'
import { Button, Flex } from '@mantine/core'
import { logger } from 'utils/logger'
import { getFuelUsage } from 'api/netlify/getFuelUsage'
import { Card } from 'screens/CurrentEntity/Components'
import { AssetPerformanceChart } from './AssetPerformanceChart'
import { mantineThemeColors } from 'styles/mantine'

export type AssetPerformanceCardProps = {
  label: string
  icon?: JSX.Element
  did?: string
  externalId: string
  creator?: string
}

const buttons = ['Usage', 'Fuel', 'Time', 'Costs']

export const AssetPerformanceCard = ({ label, icon, did, externalId }: AssetPerformanceCardProps) => {
  const [cookingSessions, setCookingSessions] = useState<any[]>([])
  const [fuelUsageData, setFuelUsageData] = useState<any[]>([])
  const [cookingTimeData, setCookingTimeData] = useState<any[]>([])
  const [costsData, setCostsData] = useState<any[]>([])
  const [activeButton, setActiveButton] = useState<string>(buttons[0])

  useEffect(() => {
    if (activeButton === 'Usage') {
      getCookingSessions(externalId)
        .then(({ data, error }) => {
          if (data) {
            return setCookingSessions(data)
          }
          if (error) {
            return logger.logError(error as unknown as Error, { fileName: 'AssetPerformanceCard.tsx' })
          }
        })
        .catch(console.log)
    } else if (activeButton === 'Fuel') {
      getFuelUsage(externalId)
        .then(({ data, error }) => {
          if (data) {
            setFuelUsageData(data)
          }
          if (error) {
            return logger.logError(error as unknown as Error, { fileName: 'AssetPerformanceCard.tsx' })
          }
        })
        .catch(console.log)
    } else if (activeButton === 'Time') {
      getCookingSessions(externalId)
        .then(({ data, error }) => {
          if (data) {
            return setCookingTimeData(data.map((v) => ({ ...v, duration: (v.duration * 15) / 60 })))
          }
          if (error) {
            return logger.logError(error as unknown as Error, { fileName: 'AssetPerformanceCard.tsx' })
          }
        })
        .catch(console.log)
    } else if (activeButton === 'Costs') {
      getFuelUsage(externalId)
        .then(({ data, error }) => {
          if (data) {
            return setCostsData(data.map((v: any) => ({ ...v, duration: v.duration * 0.26 })))
          }
          if (error) {
            return logger.logError(error as unknown as Error, { fileName: 'AssetPerformanceCard.tsx' })
          }
        })
        .catch(console.log)
    }
  }, [externalId, activeButton])

  const getChartData = useMemo(() => {
    if (!cookingSessions) return null

    switch (activeButton) {
      case 'Usage':
        return cookingSessions
      case 'Fuel':
        return fuelUsageData
      case 'Time':
        return cookingTimeData
      case 'Costs':
        return costsData
      default:
        return []
    }
  }, [cookingSessions, fuelUsageData, cookingTimeData, costsData, activeButton])

  return (
    <Card label={label} icon={icon}>
      <Flex direction={'column'} w='100%' h='100%'>
        <FlexBox width='100%' $gap={4} my={4}>
          {buttons.map((button) => (
            <Button
              key={button}
              size='sm'
              bg={mantineThemeColors['ixo-blue'][8]}
              style={{
                borderColor:
                  button === activeButton ? mantineThemeColors['ixo-blue'][6] : mantineThemeColors['ixo-blue'][8],
                color: mantineThemeColors['ixo-blue'][6],
              }}
              onClick={() => setActiveButton(button)}
            >
              {button}
            </Button>
          ))}
        </FlexBox>
        <AssetPerformanceChart data={getChartData} chart={activeButton} />
      </Flex>
    </Card>
  )
}
