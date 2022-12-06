import React from 'react'
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
import AmountCard from './Components/AmountCard'
import EntityClaimRecord from './Components/EntityClaimRecord'
import { EntityClaimStatus, EntityClaim } from './types'
import { RootState } from 'redux/types'
import { connect, useDispatch } from 'react-redux'
import * as entitySelectors from 'redux/selectedEntity/selectedEntity.selectors'
import { Entity } from 'redux/selectedEntity/selectedEntity.types'
import { Button, ButtonTypes } from 'components/Form/Buttons'
import ExpandableList from 'components/ExpandableList/ExpandableList'
import * as accountSelectors from 'redux/account/account.selectors'
import { useLocation } from 'react-router-dom'
import { AgentRole } from 'redux/account/account.types'
import { getEntityClaims } from '../../../../../redux/selectedEntity/selectedEntity.actions'

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
  userRole: AgentRole
}

const EntityClaims: React.FunctionComponent<Props> = ({ entity, claims, userDid, userRole }) => {
  const query = new URLSearchParams(useLocation().search)
  const dispatch = useDispatch()

  const claimTemplates = entity.entityClaims.items
  const claimTemplateIds = claimTemplates.map((item: any) => item['@id'])
  const [filter, setFilter] = React.useState({
    status: query.get('status') ? query.get('status') : null,
    query: '',
    all: true,
    claimTemplateId: '',
  })

  React.useEffect(() => {
    dispatch(getEntityClaims() as any)
    // eslint-disable-next-line
  }, [])

  const handleClaimTemplateClick = (claimTemplateId: any): void => {
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

  const handleRenderSectionTittle = (status: any, count: any): JSX.Element => {
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

  const filterClaims = (claims: any, filterByStatus = false): EntityClaim[] => {
    let filtered = [...claims]
    if (filter.status && !filterByStatus) {
      filtered = filtered.filter((claim) => claim.status === filter.status)
    }

    if (filter.query) {
      const query = filter.query.toLowerCase()
      filtered = filtered.filter((claim) => claim.claimId.toLowerCase().includes(query))
    }

    if (!filter.all) {
      filtered = filtered.filter((claim) => claim.saDid === userDid)
    }

    if (filter.claimTemplateId) {
      filtered = filtered.filter((claim) => claim.claimTemplateId === filter.claimTemplateId)
    }
    return filtered
  }

  const handleRenderClaimsPerStatus = (status: any, key: any): JSX.Element => {
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
        {!filter.status && handleRenderSectionTittle(status, claimsHasStatus.length)}
        <ClaimsContainer>
          <ExpandableList limit={6}>
            {claimsHasStatus.map((claim, key) => {
              const isMyClaim = userDid === claim.saDid
              const isSA = userRole === AgentRole.ServiceProvider
              const canView = !isSA || isMyClaim
              return (
                <EntityClaimRecord
                  claim={claim}
                  detailPath={canView ? `/projects/${entity.did}/detail/claims/${claim.claimId}` : undefined!}
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
          amount={filterClaims(claims, true).filter((claim) => claim.status === status).length}
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

  const handleQueryChange = (event: any): void => {
    setFilter(Object.assign({}, { ...filter, query: event.target.value }))
  }

  return (
    <Layout>
      <ContentContainer>
        <SectionTitle className='mb-4 d-flex align-items-center'>
          {handleRenderTitle()}
          <div className='d-flex ml-5'>
            <HeaderButton
              className={`${filter.all ? 'active' : ''}`}
              onClick={(): void => setFilter(Object.assign({}, { ...filter, all: true }))}
            >
              All Claims
            </HeaderButton>
            <HeaderButton
              className={`${!filter.all ? 'active' : ''} ml-3`}
              onClick={(): void => setFilter(Object.assign({}, { ...filter, all: false }))}
            >
              My Claims
            </HeaderButton>
          </div>
          <SearchBar placeholder='Search Claims' onChange={handleQueryChange} />
        </SectionTitle>
        <AmountCardsContainer>{handleRenderAmountCards()}</AmountCardsContainer>
        <FilterContainer>
          {claimTemplates.map((claimTemplate: any, key: any) => (
            <Button
              type={ButtonTypes.light}
              onClick={(): void => handleClaimTemplateClick(claimTemplate['@id'])}
              disabled={false}
              key={key}
              className={claimTemplate['@id'] === filter.claimTemplateId ? 'active' : ''}
            >
              {claimTemplate.title}
            </Button>
          ))}
        </FilterContainer>
        {handleRenderClaims()}
      </ContentContainer>
    </Layout>
  )
}

const mapStateToProps = (state: RootState): any => ({
  entity: entitySelectors.selectSelectedEntity(state),
  claims: entitySelectors.selectEntityRootClaims(state),
  userDid: accountSelectors.selectUserDid(state),
  userRole: entitySelectors.selectUserRole(state),
})

const mapDispatchToProps = (): any => ({})

export default connect(mapStateToProps, mapDispatchToProps)(EntityClaims)