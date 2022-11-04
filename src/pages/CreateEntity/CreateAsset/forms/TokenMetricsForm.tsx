import { theme, Typography } from 'modules/App/App.styles'
import React from 'react'
import {
  FormInput,
  FormMetricRow,
  FormRow,
  FormWrapper,
} from './TokenMetricsForm.styles'

interface Props {
  metrics?: {
    name?: string
    prefix?: string
    suffix?: string
    source?: string
  }[]
  setMetrics: (metrics) => void
}

const TokenMetricsForm: React.FC<Props> = ({
  metrics = [{}],
  setMetrics,
}): JSX.Element => {
  const handleUpdateMetric = (metricIdx: number, obj: object): void => {
    setMetrics(
      metrics.map((_, index) => {
        if (metricIdx === index) {
          return { ..._, ...obj }
        }
        return { ..._ }
      }),
    )
  }

  return (
    <FormWrapper>
      <FormRow style={{ justifyContent: 'space-between' }}>
        <Typography
          color={theme.ixoColor2}
          fontWeight={400}
          fontSize="16px"
          lineHeight="24px"
          style={{ margin: 'auto 10px' }}
        >
          Example:
        </Typography>
        <Typography
          color={theme.ixoBlack}
          fontWeight={400}
          fontSize="16px"
          lineHeight="24px"
          style={{ margin: 'auto 10px' }}
        >
          $USD | 200 | Historical Price | (max)
        </Typography>
      </FormRow>

      {metrics.map((metric, index) => (
        <FormMetricRow key={index}>
          <FormRow style={{ justifyContent: 'space-between' }}>
            <FormInput
              placeholder={'Prefix'}
              inputValue={metric?.prefix}
              handleChange={(value): void =>
                handleUpdateMetric(index, { prefix: value })
              }
            />
            <Typography
              color={theme.ixoColor2}
              fontWeight={400}
              fontSize="16px"
              lineHeight="24px"
              style={{ margin: 'auto 10px' }}
            >
              #
            </Typography>
            <FormInput
              placeholder={'Metric'}
              inputValue={metric?.name}
              handleChange={(value): void =>
                handleUpdateMetric(index, { name: value })
              }
            />
            <FormInput
              placeholder={'Suffix'}
              inputValue={metric?.suffix}
              handleChange={(value): void =>
                handleUpdateMetric(index, { suffix: value })
              }
            />
          </FormRow>

          <FormRow style={{ justifyContent: 'space-between' }}>
            <Typography
              color={theme.ixoColor2}
              fontWeight={400}
              fontSize="16px"
              lineHeight="24px"
              style={{ margin: 'auto 10px' }}
            >
              # Source
            </Typography>
            <FormInput
              placeholder={'https:// '}
              inputValue={metric?.source}
              handleChange={(value): void =>
                handleUpdateMetric(index, { source: value })
              }
            />
          </FormRow>
        </FormMetricRow>
      ))}
    </FormWrapper>
  )
}

export default TokenMetricsForm
