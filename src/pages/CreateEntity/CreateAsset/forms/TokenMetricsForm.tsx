import { Box, theme, Typography } from 'modules/App/App.styles'
import React from 'react'
import { AddLink } from './TokenAttributesForm.styles'
import { FormInput, FormMetricRow, FormRow, FormWrapper } from './TokenMetricsForm.styles'

interface Props {
  metrics?: {
    name?: string
    prefix?: string
    suffix?: string
    source?: string
  }[]
  setMetrics: (metrics: any) => void
}

const TokenMetricsForm: React.FC<Props> = ({ metrics = [{}], setMetrics }): JSX.Element => {
  const handlAddMetric = (): void => setMetrics([...metrics, {}])
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
  const handleRemoveAttribute = (index: any): void => {
    if (metrics.length === 1) {
      setMetrics([{}])
    } else {
      setMetrics(metrics.filter((_, i) => index !== i))
    }
  }

  return (
    <FormWrapper>
      {metrics.map((metric, index) => (
        <FormMetricRow key={index}>
          <FormRow>
            <Typography
              color={theme.ixoColor2}
              fontWeight={400}
              fontSize='16px'
              lineHeight='24px'
              style={{ margin: 'auto 10px' }}
            >
              Example:
            </Typography>
            <Typography
              color={theme.ixoBlack}
              fontWeight={400}
              fontSize='16px'
              lineHeight='24px'
              style={{ margin: 'auto 10px' }}
            >
              $USD | 200 | Historical Price | (max)
            </Typography>
          </FormRow>
          <FormRow>
            <FormInput
              placeholder={'Prefix'}
              inputValue={metric?.prefix}
              handleChange={(value): void => handleUpdateMetric(index, { prefix: value })}
            />
            <Typography
              color={theme.ixoColor2}
              fontWeight={400}
              fontSize='16px'
              lineHeight='24px'
              style={{ margin: 'auto 10px' }}
            >
              #
            </Typography>
            <FormInput
              placeholder={'Metric'}
              inputValue={metric?.name}
              handleChange={(value): void => handleUpdateMetric(index, { name: value })}
            />
            <FormInput
              placeholder={'Suffix'}
              inputValue={metric?.suffix}
              handleChange={(value): void => handleUpdateMetric(index, { suffix: value })}
            />
          </FormRow>
          <FormRow>
            <Typography
              color={theme.ixoColor2}
              fontWeight={400}
              fontSize='16px'
              lineHeight='24px'
              style={{ margin: 'auto 10px' }}
            >
              # Source
            </Typography>
            <FormInput
              placeholder={'https:// '}
              inputValue={metric?.source}
              handleChange={(value): void => handleUpdateMetric(index, { source: value })}
            />
          </FormRow>
          <Box className='remove' onClick={(): void => handleRemoveAttribute(index)}>
            —
          </Box>
        </FormMetricRow>
      ))}

      <AddLink
        color={theme.ixoNewBlue}
        fontWeight={700}
        fontSize='12px'
        lineHeight='16px'
        onClick={handlAddMetric}
        style={{ marginLeft: 16 }}
      >
        + Add another Metric
      </AddLink>
    </FormWrapper>
  )
}

export default TokenMetricsForm
