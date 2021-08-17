import * as React from 'react'
import {
  ApprovedText,
  Descriptor,
  Text,
  TotalText,
  WidgetContainer,
} from './CircleProgressbar.styles'

export interface ParentProps {
  approved: number
  rejected: number
  pending: number
  totalNeeded: number
  descriptor: React.ReactNode
}

export interface State {
  percentApproved: number
  percentRejected: number
  percentPending: number
}

const radius = 45
const svgSize = 100
export class CircleProgressbar extends React.Component<ParentProps, State> {
  state = {
    percentApproved: 0,
    percentRejected: 0,
    percentPending: 0,
  }

  getCircumference = (): number => {
    return 2 * Math.PI * radius
  }

  componentDidMount(): void {
    this.increasePercent('percentApproved')
    this.increasePercent('percentRejected')
    this.increasePercent('percentPending')
  }

  increasePercent = (
    type: 'percentApproved' | 'percentRejected' | 'percentPending',
  ): void => {
    const percent: number = this.state[type] + 1
    const approvedMax = this.getMaxPercent(type)
    let tm = null
    if (percent <= approvedMax) {
      const newState = {}
      newState[type] = percent
      this.setState(newState)
      tm = setTimeout(
        () => this.increasePercent(type),
        this.easingFormula(percent),
      )
    } else {
      clearTimeout(tm)
      return
    }
  }

  calcPercent = (amount: number, total: number): number => {
    return (amount / total) * 100
  }

  easingFormula = (amount: number): number => {
    return amount / 2
  }

  getMaxPercent = (type: string): number | string => {
    const { approved, rejected, pending } = this.props
    let { totalNeeded } = this.props
    const sum = approved + rejected + pending
    if (sum >= totalNeeded) {
      totalNeeded = sum
    }

    if (type === 'percentApproved') {
      return this.calcPercent(approved, totalNeeded)
    } else if (type === 'percentPending') {
      return (
        this.calcPercent(approved, totalNeeded) +
        this.calcPercent(pending, totalNeeded)
      )
    } else if (type === 'percentRejected') {
      return (
        this.calcPercent(approved, totalNeeded) +
        this.calcPercent(pending, totalNeeded) +
        this.calcPercent(rejected, totalNeeded)
      )
    } else {
      return 'type not specified'
    }
  }

  progress = (value): number => {
    const progress = value / 100
    return this.getCircumference() * (1 - progress)
  }

  claimsCount = (): number => {
    const { approved, rejected, pending } = this.props;

    return approved + rejected + pending;
  }

  render(): JSX.Element {
    return (
      <WidgetContainer>
        <Text>
          <div>
            {/* <ApprovedText>{this.claimsCount()}</ApprovedText>
            <TotalText>/{this.props.totalNeeded}</TotalText> */}
            <ApprovedText>{(this.claimsCount() / this.props.totalNeeded * 100).toFixed(0)}%</ApprovedText>
          </div>
          <Descriptor>{this.props.descriptor}</Descriptor>
        </Text>
        <div className="circle">
          <svg className="progress" viewBox={`0 0 ${svgSize} ${svgSize}`}>
            <circle
              className="progress__meter"
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={radius}
              strokeWidth="4"
            />
            <circle
              className="progress__value"
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={radius}
              strokeDasharray={this.getCircumference()}
              strokeWidth="4"
              stroke="url(#gradientRejected)"
              strokeDashoffset={this.progress(this.state.percentRejected)}
            />
            <circle
              className="progress__value"
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={radius}
              strokeWidth="4"
              strokeDasharray={this.getCircumference()}
              stroke="url(#gradientPending)"
              strokeDashoffset={this.progress(this.state.percentPending)}
            />
            <circle
              className="progress__value"
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={radius}
              strokeWidth="4"
              strokeDasharray={this.getCircumference()}
              stroke="url(#gradientApproved)"
              strokeDashoffset={this.progress(this.state.percentApproved)}
            />
            <defs>
              <linearGradient
                id="gradientApproved"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#49BFE0" />
                <stop offset="100%" stopColor="#027b9b" />
              </linearGradient>
              <linearGradient
                id="gradientRejected"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#e2233b" />
                <stop offset="100%" stopColor="#87261c" />
              </linearGradient>
              <linearGradient
                id="gradientPending"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#f89e2a" />
                <stop offset="100%" stopColor="#fcc44a" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </WidgetContainer>
    )
  }
}
