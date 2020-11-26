import React from 'react'
import styled from 'styled-components'
import { EntityClaimStatus, EntityClaimColorSchema } from '../types'

const Container = styled.div`
  text-align: center;
  background: linear-gradient(356.78deg, #002D42 2.22%, #012639 96.94%);
  border-radius: 4px;
  width: 13.5rem;
  height: 6.25rem;
`

const Amount = styled.div`
  font-size: 2.8rem;
  color: white;
`

const Bullet = styled.div`
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  margin-right: 0.625rem;
`

const Status = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
`

interface Props {
  amount: number
  status: EntityClaimStatus
}

const AmountCard: React.FunctionComponent<Props> = ({amount, status}) => {
  return (
    <Container>
      <Amount>
        { amount }
      </Amount>
      <div className="d-flex align-items-center justify-content-center">
        <Bullet style={{ background: EntityClaimColorSchema[status] }}>
        </Bullet>
        <Status style={{ color: EntityClaimColorSchema[status] }}>
          { Object.keys(EntityClaimStatus)[status] }
        </Status>
    </div>
    </Container>
  )
}

export default AmountCard;