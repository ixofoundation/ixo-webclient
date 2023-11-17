import { SegmentedControl } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'
import { useTheme } from 'styled-components'

type SegmentedSwitchProps = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

export default function SegmentedSwitch({ value, setValue }: Readonly<SegmentedSwitchProps>) {
  const theme = useTheme() as any
  return (
    <SegmentedControl
      value={value}
      w='100%'
      data-testid='assets-role-switch'
      onChange={setValue}
      data={[
        {
          label: 'mobile',
          value: 'mobile',
        },
        {
          label: 'desktop',
          value: 'desktop',
        },
      ]}
      styles={{
        root: {
          backgroundColor: theme.ixoNavyBlue,
          padding: '0px',
          color: 'white',
          height: '30px',
        },
        controlActive: {
          backgroundColor: theme.ixoNewBlue,
          color: 'white',
          '[data-active]': {
            color: 'white',
          },
        },
        indicator: {
          backgroundColor: theme.ixoNewBlue,
          color: 'white',
        },
        input: {
          color: 'white',
        },
      }}
      radius={20}
      mb='sm'
    />
  )
}
