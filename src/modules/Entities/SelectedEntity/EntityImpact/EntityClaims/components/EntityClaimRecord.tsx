import React from 'react'
import styled from 'styled-components'
import ExpandableText from 'common/components/ExpandableText/ExpandableText'
import { EntityClaim, EntityClaimColorSchema } from 'modules/Entities/SelectedEntity/EntityImpact/EntityClaims/types'
import moment from 'moment'
import { EntityClaimStatus } from '../types'

const Container = styled.div`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  background: #023044;
  border-radius: 4px;
  height: 4.25rem;
  position: relative;
  padding-left: 1.8rem;
  padding-right: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.div`
  font-size: 18px;
  color: white;
  font-weight: bold;
`

const Did = styled.div`
  font-size: 12px;
  color: ${/* eslint-disable-line */ (props) => props.theme.fontLightBlue};
  display: flex;
  justify-content: space-between;
`

const Indicator = styled.div`
  position: absolute;
  width: 0.5rem;
  height: 1.625rem;
  border-radius: 4px;
  background: #39C3E6;
  left: -0.25rem;
  top: 50%;
  transform: translateY(-50%);
`

interface Props {
  claim: EntityClaim
}

const EntityClaimRecord: React.FunctionComponent<Props> = ({ claim }) => {

  const handleRenderDate = (): JSX.Element => {
    const date = moment(claim.date).format('D MMM ‘YY');
    let title = ''
    switch (claim.status) {
      case EntityClaimStatus.Pending:
        title = `Uploaded ${date}`
        break;
      case EntityClaimStatus.Approved:
        title = `Approved ${date}`
        break;
      case EntityClaimStatus.Disputed:
        title = `Disputed ${date}`
        break;
      case EntityClaimStatus.Rejected:
        title = `Rejected ${date}`
        break;
      default:
        title = `Saved ${date}`
    }

    return (
      <div>
        { title }
      </div>
    )
  }

  return (
    <Container>
      <Indicator style={{ background: EntityClaimColorSchema[claim.status] }}/>
      <Title>
        Claim/Project Name
      </Title>
      <Did>
        <ExpandableText limit={5}>
          { claim.claimId }
        </ExpandableText>
        <div>
          {
            handleRenderDate()
          }
        </div>
      </Did>
    </Container>
  )
}

export default EntityClaimRecord;