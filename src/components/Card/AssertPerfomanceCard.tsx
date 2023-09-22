import { FlexBox } from 'components/App/App.styles'
import { Card, CardProps } from './Card'
import { HorizontalLine } from 'components/HorizontalLine'
import { CopyIcon } from 'components/Icons'
import { AssetPerformanceBarChart } from 'components/BarChart'
import { Button } from 'components'
import { useTheme } from 'styled-components'

export type AssetPerformanceCardProps = Omit<CardProps, 'children'> & {
  did?: string
  creator?: string
  data: Array<Record<string, string | number>>
}

const buttons = ['Cooking Time', 'Fuel Usage', 'Time Saved', 'Health Benefits']

export const AssetPerformanceCard = ({
  width = '100%',
  height = '100%',
  did,
  data,
  ...props
}: AssetPerformanceCardProps) => {
  const theme = useTheme() as any
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
      <AssetPerformanceBarChart data={data} />
    </Card>
  )
}
