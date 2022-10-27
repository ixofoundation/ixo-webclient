import { theme, Typography } from 'modules/App/App.styles'
import React from 'react'
import { FormInput, FormRow, FormWrapper } from './TokenMetricsForm.styles'

interface Props {
  metrics: {
    prefix: string
    metric: string
    suffix: string
    source: string
  }
  setMetrics: (metrics) => void
}

const TokenMetricsForm: React.FC<Props> = ({
  metrics,
  setMetrics,
}): JSX.Element => {
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

      <FormRow style={{ justifyContent: 'space-between' }}>
        <FormInput
          placeholder={'Prefix'}
          inputValue={metrics.prefix}
          handleChange={(value): void =>
            setMetrics((prev) => ({ ...prev, prefix: value }))
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
          inputValue={metrics.metric}
          handleChange={(value): void =>
            setMetrics((prev) => ({ ...prev, metric: value }))
          }
        />
        <FormInput
          placeholder={'Suffix'}
          inputValue={metrics.suffix}
          handleChange={(value): void =>
            setMetrics((prev) => ({ ...prev, suffix: value }))
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
          inputValue={metrics.source}
          handleChange={(value): void =>
            setMetrics((prev) => ({ ...prev, source: value }))
          }
        />
      </FormRow>
    </FormWrapper>
  )
}

export default TokenMetricsForm
