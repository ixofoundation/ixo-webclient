import React, { Component } from 'react'
import { StyledHeaderItem, Token, ValueContainer, Title, Price } from './Style'

export default class HeaderItem extends Component<any> {
  render(): JSX.Element {
    return (
      <StyledHeaderItem>
        {this.props.tokenType ? <Token>{this.props.tokenType}</Token> : null}

        <ValueContainer>
          <Title>{this.props.title}</Title>
          <Price>{this.props.tokenType ? this.props.value : '0%'}</Price>
          <div>
            {this.props.value} {this.props.tokenType ? '' : '%'}
          </div>
        </ValueContainer>
      </StyledHeaderItem>
    )
  }
}
