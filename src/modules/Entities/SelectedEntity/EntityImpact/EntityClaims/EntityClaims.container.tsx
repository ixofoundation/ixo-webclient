import React, { Dispatch } from 'react'
import { EntityClaim } from './types'
import {
  SectionTitle,
  FilterContainer,
  SearchBar,
  Divider,
  ClaimsContainer,
  AmountCardsContainer,
  ContentContainer,
  Layout,
  HeaderButton,
  TitleWrapper,
} from './EntityClaims.styles'
import AmountCard from './components/AmountCard'
import EntityClaimRecord from './components/EntityClaimRecord'
import { EntityClaimStatus } from './types'
import { RootState } from 'common/redux/types'
import { connect } from 'react-redux'
import * as entitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { Entity } from 'modules/Entities/SelectedEntity/types'
import ButtonSlider from 'common/components/ButtonSlider/ButtonSlider'
import { Button, ButtonTypes } from 'common/components/Form/Buttons'
import * as entityClaimsSelectors from './EntityClaims.selectors'
import ExpandableList from 'common/components/ExpandableList/ExpandableList'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { useLocation } from 'react-router-dom'

const ClaimStatusOrder = [
  EntityClaimStatus.Saved,
  EntityClaimStatus.Pending,
  EntityClaimStatus.Rejected,
  EntityClaimStatus.Approved,
  EntityClaimStatus.Disputed,
]

interface Props {
  claims: EntityClaim[]
  entity: Entity
  userDid: string
}

const EntityClaims: React.FunctionComponent<Props> = ({
  entity,
  claims,
  userDid,
}) => {
  const query = new URLSearchParams(useLocation().search)

  const claimTemplates = entity.entityClaims.items
  const claimTemplateIds = claimTemplates.map((item) => item['@id'])
  const [filter, setFilter] = React.useState({
    status: query.get('status') ? query.get('status') : null,
    query: '',
    all: true,
    claimTemplateId: '',
  })
  const handleClaimTemplateClick = (claimTemplateId): void => {
    if (claimTemplateId === filter.claimTemplateId) {
      setFilter({
        ...filter,
        claimTemplateId: '',
      })

      return
    }

    setFilter({
      ...filter,
      claimTemplateId,
    })
  }

  const handleRenderSectionTittle = (status, count): JSX.Element => {
    let title = ''

    switch (status) {
      case EntityClaimStatus.Pending:
        title = `Claims Pending Approval (${count})`
        break
      case EntityClaimStatus.Approved:
        title = `Claims Approved (${count})`
        break
      case EntityClaimStatus.Disputed:
        title = `Disputed Claims (${count})`
        break
      case EntityClaimStatus.Rejected:
        title = `Claims Rejected (${count})`
        break
      default:
        title = `Saved Claims (${count})`
    }

    return <SectionTitle>{title}</SectionTitle>
  }

  const filterClaims = (claims, filterByStatus = false): EntityClaim[] => {
    let filtered = [...claims]
    if (filter.status && !filterByStatus) {
      filtered = filtered.filter((claim) => claim.status === filter.status)
    }

    if (filter.query) {
      const query = filter.query.toLowerCase()
      filtered = filtered.filter((claim) =>
        claim.claimId.toLowerCase().includes(query),
      )
    }

    if (!filter.all) {
      filtered = filtered.filter((claim) => claim.saDid === userDid)
    }

    if (filter.claimTemplateId) {
      filtered = filtered.filter(
        (claim) => claim.claimTemplateId === filter.claimTemplateId,
      )
    }
    return filtered
  }

  const handleRenderClaimsPerStatus = (status, key): JSX.Element => {
    const claimsHasStatus = filterClaims(claims)
      .filter((claim) => claim.status === status)
      .map((claim) => {
        let templateTitle = claimTemplates[0]?.title
        if (claim.claimTemplateId) {
          const templateIndex = claimTemplateIds.indexOf(claim.claimTemplateId)
          templateTitle = claimTemplates[templateIndex]?.title
        }
        return { templateTitle, ...claim }
      })
    return (
      <div key={key}>
        {!filter.status && status !== EntityClaimStatus.Saved && <Divider />}
        {!filter.status &&
          handleRenderSectionTittle(status, claimsHasStatus.length)}
        <ClaimsContainer>
          <ExpandableList limit={6}>
            {claimsHasStatus.map((claim, key) => {
              return (
                <EntityClaimRecord
                  claim={claim}
                  detailPath={`/projects/${entity.did}/detail/claims/${claim.claimId}`}
                  key={key}
                />
              )
            })}
          </ExpandableList>
        </ClaimsContainer>
      </div>
    )
  }

  const handleRenderClaims = (): JSX.Element[] => {
    return ClaimStatusOrder.map((status, key) => {
      return handleRenderClaimsPerStatus(status, key)
    })
  }

  const handleStatusClick = (status: EntityClaimStatus): void => {
    if (filter.status === status) {
      filter.status = null
      setFilter(Object.assign({}, { ...filter, status: null }))

      return
    }

    setFilter(Object.assign({}, { ...filter, status }))
  }

  const handleRenderAmountCards = (): JSX.Element[] => {
    return ClaimStatusOrder.map((status, key) => {
      return (
        <AmountCard
          amount={
            filterClaims(claims, true).filter(
              (claim) => claim.status === status,
            ).length
          }
          status={status}
          key={`status-${key}`}
          onClick={(): void => handleStatusClick(status)}
          isActive={filter.status === status}
        ></AmountCard>
      )
    })
  }

  const handleRenderTitle = (): JSX.Element => {
    let title = ''
    switch (filter.status) {
      case EntityClaimStatus.Pending:
        title = 'Claims Pending'
        break
      case EntityClaimStatus.Approved:
        title = 'Claims Approved'
        break
      case EntityClaimStatus.Rejected:
        title = 'Claims Rejected'
        break
      case EntityClaimStatus.Saved:
        title = 'Claims Saved'
        break
      case EntityClaimStatus.Disputed:
        title = 'Claims Disputed'
        break
      default:
        title = 'All Claims'
    }

    return <TitleWrapper>{title}</TitleWrapper>
  }

  const handleQueryChange = (event): void => {
    setFilter(Object.assign({}, { ...filter, query: event.target.value }))
  }

  return (
    <Layout>
      <ContentContainer>
        <SectionTitle className="mb-4 d-flex align-items-center">
          {handleRenderTitle()}
          <div className="d-flex ml-5">
            <HeaderButton
              className={`${filter.all ? 'active' : ''}`}
              onClick={(): void =>
                setFilter(Object.assign({}, { ...filter, all: true }))
              }
            >
              All Claims
            </HeaderButton>
            <HeaderButton
              className={`${!filter.all ? 'active' : ''} ml-3`}
              onClick={(): void =>
                setFilter(Object.assign({}, { ...filter, all: false }))
              }
            >
              My Claims
            </HeaderButton>
          </div>
          <SearchBar placeholder="Search Claims" onChange={handleQueryChange} />
        </SectionTitle>
        <AmountCardsContainer>{handleRenderAmountCards()}</AmountCardsContainer>
        <FilterContainer>
          <ButtonSlider light>
            {claimTemplates.map((claimTemplate, key) => (
              <Button
                type={ButtonTypes.light}
                onClick={(): void =>
                  handleClaimTemplateClick(claimTemplate['@id'])
                }
                disabled={false}
                key={key}
                className={
                  claimTemplate['@id'] === filter.claimTemplateId
                    ? 'active'
                    : ''
                }
              >
                {claimTemplate.title}
              </Button>
            ))}
          </ButtonSlider>
        </FilterContainer>
        {handleRenderClaims()}
      </ContentContainer>
    </Layout>
  )
}

const mapStateToProps = (state: RootState): any => ({
  entity: entitySelectors.selectSelectedEntity(state),
  claims: entityClaimsSelectors.selectEntityClaims(state),
  userDid: accountSelectors.selectUserDid(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({})

export default connect(mapStateToProps, mapDispatchToProps)(EntityClaims)
