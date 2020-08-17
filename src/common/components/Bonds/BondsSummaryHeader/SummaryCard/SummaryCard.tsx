import React, { Component } from 'react';
import { thousandSeparator } from 'common/utils/formatters';
import {
  StyledHeaderItem,
  Token,
  ValueContainer,
  Title,
  Price,
  AdditionalInfo,
} from './SummaryCard.styles';

export default class HeaderItem extends Component<any> {
  render(): JSX.Element {
    return (
      <StyledHeaderItem
        selected={this.props.selected}
        onClick={this.props.setActiveHeaderItem}
      >
        {this.props.tokenType && (
          <Token backgroundColor={this.props.priceColor}>
            <span>{this.props.tokenType}</span>
          </Token>
        )}

        <ValueContainer>
          <Title>{this.props.title}</Title>
          <Price priceColor={this.props.priceColor}>
            {this.props.tokenType ? thousandSeparator(this.props.value) : '0%'}
          </Price>
          <AdditionalInfo>{this.props.additionalInfo}</AdditionalInfo>
        </ValueContainer>
      </StyledHeaderItem>
    );
  }
}
