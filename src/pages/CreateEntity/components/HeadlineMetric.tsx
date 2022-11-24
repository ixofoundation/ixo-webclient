import { theme, Typography } from 'modules/App/App.styles'
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
  background: ${(props): string => props.theme.ixoLightGrey};
  margin-bottom: 6px;
`

const HeadlineMetric: React.FC = (): JSX.Element => {
  return (
    <HeadlineMetricWrapper>
      <HeadlineMetricBar />
      <Typography
        color={theme.ixoLightGrey2}
        fontWeight={700}
        fontSize="14px"
        lineHeight="16px"
      >
        Headline Metric
      </Typography>
    </HeadlineMetricWrapper>
  )
}

export default HeadlineMetric
