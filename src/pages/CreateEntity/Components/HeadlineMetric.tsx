import { Typography } from 'components/Typography'
import React from 'react'
import styled from 'styled-components'

const HeadlineMetricWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const HeadlineMetricBar = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 50px;
  background: ${(props): string => props.theme.ixoGrey100};
  margin-bottom: 6px;
`

const HeadlineMetric: React.FC = (): JSX.Element => {
  return (
    <HeadlineMetricWrapper>
      <HeadlineMetricBar />
      <Typography color='gray-2' weight='bold' size='md'>
        Headline Metric
      </Typography>
    </HeadlineMetricWrapper>
  )
}

export default HeadlineMetric
