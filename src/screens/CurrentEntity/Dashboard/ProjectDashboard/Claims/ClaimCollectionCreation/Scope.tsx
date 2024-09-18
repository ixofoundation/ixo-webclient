import { FlexBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { Button, DateRangePicker, InputWithLabel } from 'screens/CreateEntity/Components'
import React, { useMemo, useState } from 'react'
import { useTheme } from 'styled-components'

interface Props {
  hidden?: boolean
  onSubmit: (payload: { startDate: string; endDate: string; quota: string }) => void
  onCancel?: () => void
}
const ClaimCollectionCreationScopeStep: React.FC<Props> = ({ hidden, onSubmit, onCancel }) => {
  const theme: any = useTheme()
  const [period, setPeriod] = useState({ startDate: '', endDate: '' })
  const [quota, setQuota] = useState('')
  const disabled = useMemo(() => !period.startDate || !quota, [period, quota])

  if (hidden) {
    return null
  }

  return (
    <FlexBox $direction='column'>
      <FlexBox $direction='column' $gap={9} width={deviceWidth.tablet + 'px'} mb={40}>
        <Typography variant='secondary' size='base'>
          Set up the scope of the Claim Collection
        </Typography>

        <FlexBox $direction='column' $gap={6}>
          <Typography>Period</Typography>
          <FlexBox $gap={6}>
            <DateRangePicker
              id='protocol'
              startDate={period.startDate || ''}
              endDate={period.endDate || ''}
              openDirection='down'
              onChange={(startDate, endDate) => {
                setPeriod({ startDate, endDate })
              }}
              input
            />
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' height='1px' background={theme.ixoGrey300} />

        <FlexBox $direction='column' $gap={6}>
          <Typography>Target</Typography>
          <FlexBox $gap={6}>
            <InputWithLabel
              name='quota'
              height={'48px'}
              inputValue={quota}
              label={'Max Submission'}
              handleChange={(quota: string): void => setQuota(quota)}
            />
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' height='1px' background={theme.ixoGrey300} />
      </FlexBox>

      <FlexBox $gap={5}>
        <Button variant='secondary' onClick={onCancel}>
          Back
        </Button>
        <Button
          variant='primary'
          disabled={disabled}
          onClick={() => onSubmit({ startDate: period.startDate, endDate: period.endDate, quota })}
        >
          Continue
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default ClaimCollectionCreationScopeStep
