import { Component } from 'react'
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

export default class HeaderItem extends Component<any> {
  render(): JSX.Element {
    const { value, isDark } = this.props

    return (
      <StyledHeaderItem
        selected={this.props.selected}
        onClick={() => this.props.setActiveHeaderItem && this.props.setActiveHeaderItem()}
        activeColor={this.props.priceColor}
        isActiveCursor={this.props.to}
        isDark={isDark}
      >
        {this.props.isAlpha && <IxoBlue fill={this.props.priceColor} />}
        {this.props.tokenType && (
          <Token backgroundColor={this.props.priceColor}>
            <span>{this.props.tokenType.toUpperCase()}</span>
          </Token>
        )}

        <ValueContainer>
          <Title>{this.props.title}</Title>
          <Price priceColor={this.props.priceColor}>{value ?? 0}</Price>
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
