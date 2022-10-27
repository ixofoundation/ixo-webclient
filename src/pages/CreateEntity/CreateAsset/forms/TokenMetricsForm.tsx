import React from 'react'
import { FormWrapper } from './TokenMetricsForm.styles'

interface Props {
  metrics: {
    prefix: string
    metric: string
    suffix: string
    source: string
  }
  setMetrics: (metrics) => void
}

const TokenMetricsForm: React.FC<Props> = (): JSX.Element => {
  return <FormWrapper></FormWrapper>
}

export default TokenMetricsForm
