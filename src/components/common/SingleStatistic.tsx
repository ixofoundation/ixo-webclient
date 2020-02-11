import * as React from 'react'
import { StatType, Statistic } from '../../types/models'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
  padding: 20px 15px;
  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoCondensed};
`

const Title = styled.h3`
  text-transform: uppercase;
  color: white;
  font-size: 15px;
  margin-bottom: 4px;
  font-weight: 300;
`

const Amount = styled.p`
  color: ${/* eslint-disable-line */ props => props.theme.fontLightBlue};
  font-size: 29px;
  line-height: 38px;
  margin-bottom: 4px;
  font-weight: 300;

  i:before {
    font-size: 19px;
    top: -2px;
    right: 5px;
    position: relative;
  }
`

const Error = styled.p`
  color: ${/* eslint-disable-line */ props => props.theme.red};
  font-size: 16px;
`

const Warning = styled(Error)`
  color: ${/* eslint-disable-line */ props => props.theme.ixoOrange};
`

const Description = styled.p`
  color: white;
  font-weight: 300;
  font-size: 13px;
  font-family: ${/* eslint-disable-line */ props => props.theme.fontRoboto};
  .text {
    color: white;
  }

  .text-block {
    display: block;
    color: white;
  }

  .number {
    color: ${/* eslint-disable-line */ props => props.theme.fontBlue};
    display: inline-block;
    background: ${/* eslint-disable-line */ props =>
      props.theme.bg.gradientBlue};
    padding: 2px 8px;
    margin: 0 5px;
    border-radius: 3px;
  }

  .number-orange {
    color: ${/* eslint-disable-line */ props => props.theme.ixoOrange};
    background: #012232;
    display: inline-block;
    padding: 2px 15px;
    margin: 10px 5px;
    border-radius: 3px;
    font-size: 30px;
    font-weight: bold;
  }
`

export const SingleStatistic: React.SFC<Statistic> = ({
  type,
  amount,
  title,
  descriptor,
}) => {
  const handleAmount = (): JSX.Element => {
    if (type !== StatType.fraction && amount instanceof Array) {
      return <Error>WRONG INPUT FOR STATISTIC TYPE</Error>
    }
    switch (type) {
      case StatType.decimal:
        return <Amount className="decimal">{amount.toLocaleString()}</Amount>
      case StatType.fraction:
        if (!(amount instanceof Array)) {
          return <Error>INPUT SHOULD BE ARRAY WITH 2 NUMBERS</Error>
        }
        if (amount[0] > amount[1]) {
          return (
            <Error>
              INVALID FORMAT, NUMERATOR CANNOT BE LARGER THAN DENOMINATOR
            </Error>
          )
        }
        if (amount[0] === undefined || amount[1] === undefined) {
          return <Error>UNDEFINED</Error>
        }
        return (
          <Amount>
            {amount[0].toLocaleString()}/
            <strong>{amount[1].toLocaleString()}</strong>
          </Amount>
        )

      case StatType.ixoAmount:
        return (
          <Amount>
            <i className="icon-ixo-small" />
            {amount.toLocaleString()}
          </Amount>
        )
      default:
        return <Warning>UNKNOWN</Warning>
    }
  }

  return (
    <Container>
      {title && <Title>{title}</Title>}
      {handleAmount()}
      {descriptor && (
        <Description>
          {descriptor.map((obj, index) => {
            return (
              <span key={index} className={obj.class}>
                {obj.value}
              </span>
            )
          })}
        </Description>
      )}
    </Container>
  )
}
