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
import IxoBlue from 'assets/icons/IxoBlue'
import ThreeDot from 'assets/icons/ThreeDot'
import { convertPrice } from 'common/utils/currency.utils'

export default class HeaderItem extends Component<any> {
  render(): JSX.Element {
    const { value, decimals } = this.props
    const formattedValue = convertPrice(value, decimals)

    return (
      <StyledHeaderItem
        selected={this.props.selected}
        onClick={this.props.setActiveHeaderItem}
        activeColor={this.props.priceColor}
        isActiveCursor={this.props.to}
      >
        {this.props.isAlpha && <IxoBlue />}
        {this.props.tokenType && (
          <Token backgroundColor={this.props.priceColor}>
            <span>{this.props.tokenType}</span>
          </Token>
        )}

        <ValueContainer>
          <Title>{this.props.title}</Title>
          <Price priceColor={this.props.priceColor}>{formattedValue}</Price>
          <AdditionalInfo>{this.props.additionalInfo}&nbsp;</AdditionalInfo>
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
