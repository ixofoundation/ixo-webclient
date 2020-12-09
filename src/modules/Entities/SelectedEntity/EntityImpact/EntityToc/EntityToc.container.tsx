import React from 'react'
import moment from 'moment'

import CardBoard from './CardBoard/CardBoard'

import {
  Layout,
  PageTitle,
  PageInfoContainer,
  StatusLabel,
  CardBoardWrapper
} from './EntityToc.styles'

const EntityToc: React.FunctionComponent = ({}) => {
  return (
    <Layout>
      <PageTitle>
        Theory of Change

        <PageInfoContainer>
          <span>
            Version: 1.0
          </span>
          <span>
            Date: { moment().format('d/m/Y') }
          </span>
          <span>
            Status: <StatusLabel>Approved</StatusLabel>
          </span>
        </PageInfoContainer>
      </PageTitle>
      <CardBoardWrapper>
        <CardBoard>
        </CardBoard>
      </CardBoardWrapper>
    </Layout>
  )
}

export default EntityToc;