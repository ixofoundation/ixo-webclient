import { StatType, Statistic } from 'types/models'
import { Container, Title, Amount, Error, Warning, Description } from './SingleStatistic.styles'

export const SingleStatistic: React.SFC<Statistic> = ({ type, amount, title, descriptor }) => {
  const handleAmount = (): JSX.Element => {
    if (type !== StatType.fraction && amount instanceof Array) {
      return <Error>WRONG INPUT FOR STATISTIC TYPE</Error>
    }
    switch (type) {
      case StatType.decimal:
        return <Amount className='decimal'>{amount.toLocaleString()}</Amount>
      case StatType.fraction:
        if (!(amount instanceof Array)) {
          return <Error>INPUT SHOULD BE ARRAY WITH 2 NUMBERS</Error>
        }
        if (amount[0] > amount[1]) {
          return <Error>INVALID FORMAT, NUMERATOR CANNOT BE LARGER THAN DENOMINATOR</Error>
        }
        if (amount[0] === undefined || amount[1] === undefined) {
          return <Error>UNDEFINED</Error>
        }
        return (
          <Amount>
            {amount[0].toLocaleString()}/<strong>{amount[1].toLocaleString()}</strong>
          </Amount>
        )

      case StatType.ixoAmount:
        return (
          <Amount>
            <i className='icon-ixo-small' />
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
