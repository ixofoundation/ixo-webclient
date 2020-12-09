import React from 'react'
import styled from 'styled-components'
import { EntityClaimStatus, EntityClaimColorSchema } from '../types'

const Container = styled.div`
  text-align: center;
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(180deg, #FFFFFF 0%, #FBFCFF 100%);
  border-radius: 4px;
  width: 13.5rem;
  height: 6.25rem;
  cursor: pointer;
  border: 1px solid transparent;
`

const Amount = styled.div`
  font-size: 2.8rem;
  color: #002A3F;
  font-weight: 400;
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
  onClick: () => void
  isActive: boolean
}

const AmountCard: React.FunctionComponent<Props> = ({amount, status, isActive, onClick}) => {
  return (
    <Container
      onClick={ onClick }
      style={{ borderColor: isActive ? EntityClaimColorSchema[status] : 'transparent' }}
    >
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