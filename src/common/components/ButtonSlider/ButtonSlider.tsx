import * as React from 'react'
import {
  Container,
  NavigateButtonContainer,
  NavContainer,
} from './ButtonSlider.styles'
import Down from 'assets/icons/Down'

class ButtonSlider extends React.Component<{ light?: boolean }> {
  state = {
    reachedRight: true,
    reachedLeft: false,
  }
  buttonsRef = null

  handlePrevClick = (): void => {
    const sLeft = this.buttonsRef.scrollLeft

    this.buttonsRef.scrollTo({
      left: sLeft - 100,
      behavior: 'smooth',
    })

    this.setState({
      reachedRight:
        this.buttonsRef.scrollLeft + this.buttonsRef.offsetWidth + 100 <
        this.buttonsRef.scrollWidth,
    })
  }

  handleNextClick = (): void => {
    const sLeft = this.buttonsRef.scrollLeft

    this.buttonsRef.scrollTo({
      left: sLeft + 100,
      behavior: 'smooth',
    })

    this.setState({
      reachedRight:
        this.buttonsRef.scrollLeft + this.buttonsRef.offsetWidth + 100 >
        this.buttonsRef.scrollWidth,
    })
  }

  render(): JSX.Element {
    const { children, light } = this.props
    const { reachedRight, reachedLeft } = this.state

    return (
      <Container>
        <div className="position-relative d-flex flex-grow-1 overflow-hidden">
          <NavContainer
            ref={(ref): React.ReactNode => (this.buttonsRef = ref)}
            className={reachedRight ? 'right' : ''}
          >
            {children}
          </NavContainer>
          {/* {!reachedRight && React.Children.count(children) !== 1 && (
            <Graident></Graident>
          )} */}
        </div>
        {React.Children.count(children) > 1 && (
          <NavigateButtonContainer light={light}>
            <button
              className="left"
              onClick={this.handlePrevClick}
              disabled={reachedLeft}
            >
              <Down fill="#107591" width={8} />
            </button>
            <button
              className="right"
              onClick={this.handleNextClick}
              disabled={reachedRight}
            >
              <Down fill="#107591" width={8} />
            </button>
          </NavigateButtonContainer>
        )}
      </Container>
    )
  }
}

export default ButtonSlider
