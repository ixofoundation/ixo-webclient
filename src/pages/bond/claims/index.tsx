import ButtonSlider from 'components/ButtonSlider/ButtonSlider'
import ExpandableList from 'components/ExpandableList/ExpandableList'
import { Button, ButtonTypes } from 'components/Form/Buttons'
import { selectUserDid } from 'redux/account/account.selectors'
import { selectPaymentClaims, selectSelectedEntity } from 'redux/selectedEntity/selectedEntity.selectors'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import AmountCard from './components/AmountCard'
import EntityClaimRecord from './components/EntityClaimRecord'
import {
  AmountCardsContainer,
  ClaimsContainer,
  ContentContainer,
  Divider,
  FilterContainer,
  HeaderButton,
  Layout,
  SearchBar,
  SectionTitle,
  TitleWrapper,
} from './index.style'
import { EntityClaim, EntityClaimStatus } from './types'

const ClaimStatusOrder = [
  EntityClaimStatus.Saved,
  EntityClaimStatus.Pending,
  EntityClaimStatus.Rejected,
  EntityClaimStatus.Approved,
  EntityClaimStatus.Disputed,
]

const Claims: React.FunctionComponent = () => {
  const entity = useSelector(selectSelectedEntity)
  const claims = useSelector(selectPaymentClaims)
  const userDid = useSelector(selectUserDid)
  const query = new URLSearchParams(useLocation().search)

  const claimTemplates = entity.entityClaims.items
  const claimTemplateIds = claimTemplates.map((item: any) => item['@id'])
  const [filter, setFilter] = useState({
    status: query.get('status') ? query.get('status') : null,
    query: '',
    all: true,
    claimTemplateId: '',
  })
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

  const filterClaims = (claims: any): EntityClaim[] => {
    let filtered = [...claims]
    if (filter.status) {
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
          amount={filterClaims(claims).filter((claim) => claim.status === status).length}
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
          <ButtonSlider light>
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
          </ButtonSlider>
        </FilterContainer>
        {handleRenderClaims()}
      </ContentContainer>
    </Layout>
  )
}

export default Claims
