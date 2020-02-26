import React, { Component } from 'react'
import { StyledHeaderItem, Token, ValueContainer, Title, Price } from './Style'
import { thousandSeparator } from '../../../../common/utils/formatters'

export default class HeaderItem extends Component<any> {
  render(): JSX.Element {
    return (
      <StyledHeaderItem>
        {this.props.tokenType ? <Token>{this.props.tokenType}</Token> : null}

        <ValueContainer>
          <Title>{this.props.title}</Title>
          <Price>
            {this.props.tokenType ? thousandSeparator(this.props.value) : '0%'}
          </Price>
          <div>
            {thousandSeparator(this.props.value)}{' '}
            {this.props.tokenType ? '' : '%'}
          </div>
        </ValueContainer>
      </StyledHeaderItem>
    )
  }
}
