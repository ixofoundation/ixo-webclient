import React from 'react'
import styled from 'styled-components'
import ExpandableText from 'components/ExpandableText/ExpandableText'
import { EntityClaim, EntityClaimColorSchema } from 'components/Entities/SelectedEntity/EntityImpact/EntityClaims/types'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import { EntityClaimStatus } from '../types'

const Container = styled.div`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(180deg, #ffffff 0%, #fbfcff 100%);
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
  color: black;
  font-weight: bold;
`

const Did = styled.div`
  font-size: 12px;
  color: #437c98;
  display: flex;
  justify-content: left;
`

const Indicator = styled.div`
  position: absolute;
  width: 0.5rem;
  height: 1.625rem;
  border-radius: 4px;
  background: ${(props): string => props.theme.highlight.light};
  left: -0.25rem;
  top: 50%;
  transform: translateY(-50%);
`

const Date = styled.div`
  color: #143f54;
`

interface Props {
  claim: EntityClaim
  detailPath: string
}

const EntityClaimRecord: React.FunctionComponent<Props> = ({ claim, detailPath }) => {
  const handleRenderDate = (): JSX.Element => {
    const date = moment(claim.date).format('D MMM ‘YY')
    let title = ''
    switch (claim.status) {
      case EntityClaimStatus.Pending:
        title = `Uploaded ${date}`
        break
      case EntityClaimStatus.Approved:
        title = `Approved ${date}`
        break
      case EntityClaimStatus.Disputed:
        title = `Disputed ${date}`
        break
      case EntityClaimStatus.Rejected:
        title = `Rejected ${date}`
        break
      default:
        title = `Saved ${date}`
    }

    return <Date>{title}</Date>
  }

  return (
    <NavLink to={detailPath} className='text-decoration-none'>
      <Container>
        <Indicator style={{ background: EntityClaimColorSchema[claim.status] }} />
        <Title>
          {claim.templateTitle}/<ExpandableText limit={5}>{claim.claimId}</ExpandableText>
        </Title>
        <Did>
          {claim.saDid}&nbsp;
          <div>{handleRenderDate()}</div>
        </Did>
      </Container>
    </NavLink>
  )
}

export default EntityClaimRecord
