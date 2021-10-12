import React, { Component } from 'react'
import {
  StyledHeaderItem,
  Token,
  ValueContainer,
  Title,
  Price,
  AdditionalInfo,
  DotsContainer,
} from './SummaryCard.styles'
import { thousandSeparator } from 'common/utils/formatters'
import IxoBlue from 'assets/icons/IxoBlue'
import ThreeDot from 'assets/icons/ThreeDot'

export default class HeaderItem extends Component<any> {
  render(): JSX.Element {
    return (
      <StyledHeaderItem
        selected={this.props.selected}
        onClick={this.props.setActiveHeaderItem}
        activeColor={ this.props.priceColor }
      >
        {
          this.props.isAlpha && (
            <IxoBlue />
          )
        }
        {this.props.tokenType && (
          <Token backgroundColor={this.props.priceColor}>
            <span>{this.props.tokenType}</span>
          </Token>
        )}

        <ValueContainer>
          <Title>{this.props.title}</Title>
          <Price priceColor={this.props.priceColor}>
            {this.props.tokenType ? thousandSeparator(this.props.value) : 0}
          </Price>
          <AdditionalInfo>{this.props.additionalInfo}</AdditionalInfo>
        </ValueContainer>
        
        {this.props.to ? (
          <DotsContainer>
            <ThreeDot />
          </DotsContainer>
        ) : null}

      </StyledHeaderItem>
    )
  }
}
