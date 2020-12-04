import React, { Dispatch } from 'react'
import { EntityClaim } from './types'
import { LayoutWrapper } from 'common/components/Wrappers/LayoutWrapper'
import { SectionTitle, FilterContainer, SearchBar, Divider, ClaimsContainer, AmountCardsContainer, ContentContainer } from './EntityClaims.styles'
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
import EntityImpactLayout from '../EntityImpact.container'

const ClaimStatusOrder = [EntityClaimStatus.Saved, EntityClaimStatus.Pending, EntityClaimStatus.Rejected, EntityClaimStatus.Approved, EntityClaimStatus.Disputed]

interface Props {
  match: any
  claims: EntityClaim[]
  entity: Entity
}

const EntityClaims: React.FunctionComponent<Props> = ({ match, entity, claims }) => {
  const claimTemplates = entity.entityClaims.items

  const handleClaimTemplateClick = ():void => {
    return;
  }

  /* const claims = [
    {
      date: new Date('2020-11-25T16:03:17.730Z'),
      saDid: "did:sov:CYCc2xaJKrp8Yt947Nc6jd",
      status: "0",
      claimId: "449688c31f037561cb2c58568b15450613349c1594fbd76e42cc17087f6433e3",
      location: {
        lat: "18.4241° E",
        long: "33.9249° S"
      }
    },
    {
      date: new Date('2020-11-25T16:03:17.730Z'),
      saDid: "did:sov:CYCc2xaJKrp8Yt947Nc6jd",
      status: "1",
      claimId: "449688c31f037561cb2c58568b15450613349c1594fbd76e42cc17087f6433e3",
      location: {
        lat: "18.4241° E",
        long: "33.9249° S"
      }
    },
    {
      date: new Date('2020-11-25T16:03:17.730Z'),
      saDid: "did:sov:CYCc2xaJKrp8Yt947Nc6jd",
      status: "3",
      claimId: "449688c31f037561cb2c58568b15450613349c1594fbd76e42cc17087f6433e3",
      location: {
        lat: "18.4241° E",
        long: "33.9249° S"
      }
    },
    {
      date: new Date('2020-11-25T16:03:17.730Z'),
      saDid: "did:sov:CYCc2xaJKrp8Yt947Nc6jd",
      status: "2",
      claimId: "449688c31f037561cb2c58568b15450613349c1594fbd76e42cc17087f6433e3",
      location: {
        lat: "18.4241° E",
        long: "33.9249° S"
      }
    },
    {
      date: new Date('2020-11-25T16:03:17.730Z'),
      saDid: "did:sov:CYCc2xaJKrp8Yt947Nc6jd",
      status: "4",
      claimId: "449688c31f037561cb2c58568b15450613349c1594fbd76e42cc17087f6433e3",
      location: {
        lat: "18.4241° E",
        long: "33.9249° S"
      }
    },
    {
      date: new Date('2020-11-25T16:03:17.730Z'),
      saDid: "did:sov:CYCc2xaJKrp8Yt947Nc6jd",
      status: "4",
      claimId: "449688c31f037561cb2c58568b15450613349c1594fbd76e42cc17087f6433e3",
      location: {
        lat: "18.4241° E",
        long: "33.9249° S"
      }
    },
    {
      date: new Date('2020-11-25T16:03:17.730Z'),
      saDid: "did:sov:CYCc2xaJKrp8Yt947Nc6jd",
      status: "1",
      claimId: "449688c31f037561cb2c58568b15450613349c1594fbd76e42cc17087f6433e3",
      location: {
        lat: "18.4241° E",
        long: "33.9249° S"
      }
    },
    {
      date: new Date('2020-11-25T16:03:17.730Z'),
      saDid: "did:sov:CYCc2xaJKrp8Yt947Nc6jd",
      status: "2",
      claimId: "449688c31f037561cb2c58568b15450613349c1594fbd76e42cc17087f6433e3",
      location: {
        lat: "18.4241° E",
        long: "33.9249° S"
      }
    }
  ] */

  const handleRenderSectionTittle = (status, count): JSX.Element => {
    let title = ''

    switch (status) {
      case EntityClaimStatus.Pending:
        title = `Claims Pending Approval (${count})`
        break;
      case EntityClaimStatus.Approved:
        title = `Claims Approved (${count})`
        break;
      case EntityClaimStatus.Disputed:
        title = `Disputed Claims (${count})`
        break;
      case EntityClaimStatus.Rejected:
        title = `Claims Rejected (${count})`
        break;
      default:
        title = `Saved Claims (${count})`
    }

    return (
      <SectionTitle>
        { title }
      </SectionTitle>
    )
  }

  const handleRenderClaimsPerStatus = (status): JSX.Element => {
    const claimsHasStatus = claims.filter(claim => claim.status === status)
    return (
      <>
        <Divider />
        {
          handleRenderSectionTittle(status, claimsHasStatus.length)
        }
        <ClaimsContainer>
        <ExpandableList limit={6}>
        {
          claimsHasStatus.map((claim, key) => {
            return (
              <EntityClaimRecord claim={claim} key={key} />
            )
          })
        }
        </ExpandableList>
        </ClaimsContainer>
      </>
    )
  }

  const handleRenderClaims = (): JSX.Element[] => {
    return ClaimStatusOrder.map((status) => {
      return handleRenderClaimsPerStatus(status)
    });
  }

  const handleRenderAmountCards = (): JSX.Element[] => {
    return ClaimStatusOrder.map((status, key) => {
      return (
        <AmountCard
          amount={ claims.filter(claim => claim.status === status).length }
          status={ status }
          key={ `status-${key}` }
        >
        </AmountCard>
      )
    })
  }

  return (<EntityImpactLayout match={match}>
    <LayoutWrapper>
      <ContentContainer>
        <SectionTitle>
          All Claims
        </SectionTitle>
        <AmountCardsContainer>
          {
            handleRenderAmountCards()
          }
        </AmountCardsContainer>
        <FilterContainer>
          <ButtonSlider>
            {
              claimTemplates.map((claim, key) =>
                <Button
                  type={ ButtonTypes.dark }
                  onClick={() => handleClaimTemplateClick() }
                  disabled={ false }
                  key={ key }
                >
                  { claim.title }
                </Button>
              )
            }
          </ButtonSlider>
          <SearchBar placeholder="Search Claims" />
        </FilterContainer>
        {
          handleRenderClaims()
        }
      </ContentContainer>
    </LayoutWrapper>
  </EntityImpactLayout>)
}

const mapStateToProps = (state: RootState): any => ({
  entity: entitySelectors.selectSelectedEntity(state),
  claims: entityClaimsSelectors.selectEntityClaims(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(EntityClaims);
