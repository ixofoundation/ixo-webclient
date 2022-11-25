import React, { Dispatch } from 'react'
import { RootState } from 'common/redux/types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import CardBoard from './CardBoard/CardBoard'
import { Spinner } from 'common/components/Spinner'
import { getClaim } from 'modules/Entities/SelectedEntity/EntityImpact/EvaluateClaim/EvaluateClaim.actions'
import { Claim } from 'modules/Entities/SelectedEntity/EntityImpact/EvaluateClaim/types'
import * as singleClaimSelectors from 'modules/Entities/SelectedEntity/EntityImpact/EvaluateClaim/EvaluateClaim.selectors'
import * as entitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import * as entityClaimsSelectors from 'modules/Entities/SelectedEntity/EntityImpact/EntityClaims/EntityClaims.selectors'
import {
  EntityClaim,
  EntityClaimStatus,
  EntityClaimColorSchema,
} from 'modules/Entities/SelectedEntity/EntityImpact/EntityClaims/types'
import { Layout, PageTitle, PageInfoContainer, StatusLabel, CardBoardWrapper } from './EntityToc.styles'

interface Props {
  claim: Claim
  entityDid: string
  claimTemplateDid: string
  claims: EntityClaim[]
  isLoading: boolean
  handleGetClaim: (claimId: string, projectDid: string, claimTemplateDid: string) => void
}

class EntityToc extends React.Component<Props> {
  componentDidMount(): void {
    const { handleGetClaim, entityDid, claimTemplateDid } = this.props
    const claimId = this.getLatestTocClaimId()
    handleGetClaim(claimId, entityDid, claimTemplateDid)
  }

  getLatestTocClaimId = (): string => {
    const { claims } = this.props
    const approved = claims.filter((claim) => claim.status === EntityClaimStatus.Approved)
    if (approved.length) {
      return approved[approved.length - 1].claimId
    }

    const pending = claims.filter((claim) => claim.status === EntityClaimStatus.Pending)

    if (pending.length) {
      return pending[pending.length - 1].claimId
    }

    return null!
  }

  render(): JSX.Element {
    const { claim, isLoading, entityDid } = this.props

    if (isLoading) {
      return (
        <Layout>
          <div className='pt-5'>
            <Spinner info='Loading claim...' transparentBg />
          </div>
        </Layout>
      )
    }

    const boardData = _(claim.items)
      .groupBy('attribute')
      .map((items, attribute) => ({ [attribute.substring(attribute.lastIndexOf('/') + 1)]: items }))
      .value()

    return (
      <Layout>
        <PageTitle>
          Theory of Change
          <PageInfoContainer>
            <span>Version: 1.0</span>
            <span>
              <Link to={`/projects/${entityDid}/detail/claims?type=TheoryOfChange`}>
                Date: {moment(claim.dateTime).format('DD/MM/YYYY')}
              </Link>
            </span>
            <span>
              Status:{' '}
              <StatusLabel style={{ color: EntityClaimColorSchema[claim.__v] }}>
                {Object.keys(EntityClaimStatus)[claim.__v]}
              </StatusLabel>
            </span>
          </PageInfoContainer>
        </PageTitle>
        <CardBoardWrapper>
          <CardBoard data={boardData}></CardBoard>
        </CardBoardWrapper>
      </Layout>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  entityDid: entitySelectors.selectEntityDid(state),
  claims: entityClaimsSelectors.selectEntityClaims(state),
  claimTemplateDid: entitySelectors.selectEntityClaimTemplateId(state),
  claim: singleClaimSelectors.selectClaim(state),
  isLoading: singleClaimSelectors.selectIsLoading(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetClaim: (claimId: string, projectDid: string, claimTemplateDid: string): void =>
    dispatch(getClaim(claimId, projectDid, claimTemplateDid)),
})
export default connect(mapStateToProps, mapDispatchToProps)(EntityToc)
